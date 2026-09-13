#!/usr/bin/env node
import {createHash} from 'node:crypto';
import {readFile,writeFile,readdir} from 'node:fs/promises';
import {resolve,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const root=resolve(import.meta.dirname,'..');
export const CONTRACT_BLOCKS=['FROZEN-GOAL-CONTRACT','AUTHORITY-FIRST-CORRECTION','SUCCESSOR-GOAL-CONTRACT','SUCCESSOR-WAITING-WORK','CONTENT-EXPANSION-CORRECTION'];
// Include marker bytes here; the main verifier checks approved contract body hashes.
const CONTRACT_HASHES=[
  '959eebcff62f285d9a4771d4d1bdb28a4f031635e720bcb2b42371dc1b431952',
  '2e7d94a4b220c0af0f75bcce68684a607a124c3a4527b225e4b3fbba1c1b85f0',
  '4618dcec1ee90ed74e46073bee7fbd7e682844496e1b55a1841f8118ee0ce7cf',
  '965c50f9f98a253e7706395f362c2a2fbb158713bb0ef6ff365c9c236871317a',
  '06f348ad534dfc45fc8349c18fb36efeb9b69e6c8ff5f069e3a50e14f347299a',
];
const OPERATIONS='ACTIVE-CONTROL-OPERATIONS';
const OPERATIONS_SHA='9676821af056d7b0a436267d565d230d5a45d2d6f26aed3d6a2ac15e80c06c03';
export const ACTIVE_VIEW_PATH='docs/seo-active-control.md';

function block(plan,id){
  const start=`<!-- ${id}:START -->`,end=`<!-- ${id}:END -->`;
  if(plan.split(start).length!==2||plan.split(end).length!==2||plan.indexOf(end)<plan.indexOf(start))throw Error(`Missing or duplicate control block: ${id}`);
  return plan.slice(plan.indexOf(start),plan.indexOf(end)+end.length);
}
export function renderActiveControl(plan){
  // Check structure without injecting historical contracts or mutable narration.
  for(const id of CONTRACT_BLOCKS)block(plan,id);
  const operations=block(plan,OPERATIONS)
    .replace(`<!-- ${OPERATIONS}:START -->`, '')
    .replace(`<!-- ${OPERATIONS}:END -->`, '').trim();
  // The source is root-relative in SEO-CAMPAIGN.md; this derived guide lives in docs/.
  const linked=operations.replace(/\]\((SEO-CAMPAIGN\.md|EXPERIMENTS\.md)([#)])/g, '](../$1$2').replace(/\]\(docs\//g, '](');
  const text=`# Wenlan SEO reading guide\n\nGenerated from SEO-CAMPAIGN.md by \`pnpm seo:goal:control --update\`; do not edit.\n\n${linked}\n`;
  if(Buffer.byteLength(text)>6000)throw Error('SEO reading guide exceeds 6000 bytes; move detail to task bookmarks');
  return text;
}
export function validateActiveControl(plan,active){
  try{
    const hash=createHash('sha256').update(block(plan,OPERATIONS)).digest('hex');
    if(hash!==OPERATIONS_SHA)return ['Operational amendment changed without explicit approval and verifier update'];
    for(const [index,id] of CONTRACT_BLOCKS.entries()){
      if(createHash('sha256').update(block(plan,id)).digest('hex')!==CONTRACT_HASHES[index])return [`Protected contract changed: ${id}`];
    }
    return active===renderActiveControl(plan)?[]:['Active control missing, stale or altered; run pnpm seo:goal:control --update and review'];
  }catch(e){return [e.message];}
}
export function fingerprintInputs(entries){
  const h=createHash('sha256');
  for(const [name,body] of [...entries].sort(([a],[b])=>a<b?-1:a>b?1:0))h.update(JSON.stringify([name,Buffer.byteLength(body)])).update(body);
  return h.digest('hex');
}
export function canReuseControl(known,current,verified){return verified===true&&typeof known==='string'&&/^[a-f0-9]{64}$/.test(known)&&known===current;}
async function files(dir){
  const out=[];
  for(const entry of await readdir(dir,{withFileTypes:true})){
    const path=resolve(dir,entry.name);
    if(entry.isDirectory())out.push(...await files(path));
    else if(entry.isFile())out.push(path);
  }
  return out;
}
async function fingerprint(){
  const paths=['PLAN.md','SEO-CAMPAIGN.md','EXPERIMENTS.md','AGENTS.md','package.json'].map(f=>resolve(root,f));
  for(const dir of ['docs','scripts','src'])paths.push(...await files(resolve(root,dir)));
  return fingerprintInputs(await Promise.all(paths.map(async path=>[relative(root,path),await readFile(path)])));
}
async function run(){
  const args=process.argv.slice(2).filter(arg=>arg!=='--');
  const plan=await readFile(resolve(root,'SEO-CAMPAIGN.md'),'utf8');
  if(args.length===1&&args[0]==='--update'){
    await writeFile(resolve(root,ACTIVE_VIEW_PATH),renderActiveControl(plan));
    console.log(`Generated ${ACTIVE_VIEW_PATH}; run verification before action.`);return;
  }
  if(args.length&&!(args.length===2&&args[0]==='--known-fingerprint'&&/^[a-f0-9]{64}$/.test(args[1])))throw Error('Usage: seo:goal:control [--update | --known-fingerprint <sha256>]');
  const before=await fingerprint();
  const check=spawnSync(process.execPath,['--import','tsx',resolve(root,'scripts/seo-goal-check.mjs')],{cwd:root,encoding:'utf8'});
  if(check.status!==0)throw Error(check.stderr||check.error?.message||'Goal verifier failed');
  const active=await readFile(resolve(root,ACTIVE_VIEW_PATH),'utf8');
  const after=await fingerprint();
  if(before!==after)throw Error('Control inputs changed during verification; retry after concurrent work settles');
  console.log(`[seo-control] PASS fingerprint=${after}`);
  if(canReuseControl(args[1],after,true))console.log('UNCHANGED: reuse the complete view already read in this context. Do not poll a scheduled external wait.');
  else console.log(active);
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))run().catch(e=>{console.error(`[seo-control] ${e.message}`);process.exitCode=1;});
