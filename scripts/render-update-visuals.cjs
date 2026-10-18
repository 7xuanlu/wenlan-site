#!/usr/bin/env node
/** Editable, localized explanatory composition. No generated/raster UI inputs. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { createRequire } = require('node:module');
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const root = path.resolve(__dirname, '..');
const out = path.resolve(process.argv[2] || path.join(root, 'public/images/home/readme'));
const W = 1600, H = 720, SCALE = 3;
// Reuse the site's exact Latin font from its local Next build; no network capture.
function siteFont() {
 if (process.env.WENLAN_VISUAL_FONT) return process.env.WENLAN_VISUAL_FONT;
 const staticDir = path.join(root, '.next/static');
 for (const entry of fs.readdirSync(staticDir, {recursive:true})) {
  if (!entry.endsWith('.css')) continue;
  const css = fs.readFileSync(path.join(staticDir, entry), 'utf8');
  for (const rule of css.matchAll(/@font-face\{[^}]+\}/g)) {
   if (!rule[0].includes('font-family:Instrument Sans;') || !rule[0].includes('U+??')) continue;
   const url = rule[0].match(/url\(([^)]+)\)/)[1].replace(/["']/g, '');
   return path.resolve(path.dirname(path.join(staticDir, entry)), url);
  }
 }
 throw new Error('Run the local site build first or set WENLAN_VISUAL_FONT to Instrument Sans.');
}
const latinFontFile = siteFont();
const C = { bg:'#FCFCFB', paper:'#FFFFFF', text:'#202131', secondary:'#626975', muted:'#898E95', line:'#E0E4E9', warm:'#AA7952', blue:'#7393AA', green:'#347C52', greenBg:'#F2F8F3', greenLine:'#CCDCD1', pending:'#866744', pendingBg:'#FBF7EF', pendingLine:'#E5D9C8', highlight:'#FAF0D8', purple:'#6657BD', archive:'#F7F8FA' };
const copies = {
 'en': { suffix:'', font:'Instrument Sans', category:'Knowledge / memory', memory:'Memory', earlier:'V1 · Earlier', updated:'V2 · Updated', old:'Tests passed — done', archived:'Archived', current:'Test and check the screen', retained:'Earlier versions remain traceable.', source:'Source file', file:'UI acceptance.md', before:'Tests pass: ready to ship', after:'Check desktop and mobile UI', steep:'Steep', functions:['Find connections','Update knowledge','Flag contradictions'], automatic:'AI-organized page, not edited by you', protected:'Pages you created or edited', page:'Knowledge page', topTitle:'Acceptance checklist', bottomTitle:'Delivery criteria', done:'Auto-updated', pending:'Awaiting review', topOld:'Automated tests all pass.', topNew:'Check desktop and mobile screens.', lowerOld:'After tests pass,', lowerNew:'check desktop and mobile screens', lowerEnd:'before shipping.', scope:'Apply to this page only', skip:'Skip', approve:'Approve', history:'Earlier version kept' },
 'zh-TW': { suffix:'-zh-Hant', font:'PingFang TC', category:'知識／記憶', earlier:'V1 · 先前', updated:'V2 · 更新', old:'測試通過，就算完成', archived:'已歸檔', current:'測試之外，也要看畫面', retained:'舊版本仍可追溯。', source:'來源文件', file:'介面驗收.md', before:'測試通過即可交付', after:'還須驗收桌面與手機畫面', steep:'沉澱', functions:['找出關聯','更新知識','提醒矛盾'], automatic:'AI 整理，且你尚未修改', protected:'保護你建立或編輯過的頁面', page:'知識頁', topTitle:'介面驗收清單', bottomTitle:'功能交付準則', done:'已自動更新', pending:'待審修訂', topOld:'自動測試全部通過。', topNew:'檢查桌面與手機畫面。', lowerOld:'測試通過後，', lowerNew:'還要檢查桌面與手機畫面', lowerEnd:'，才可以交付。', scope:'僅套用這 1 頁', skip:'跳過', approve:'核准', history:'舊版保留' },
 'zh-CN': { suffix:'-zh-Hans', font:'PingFang SC', category:'知识／记忆', earlier:'V1 · 之前', updated:'V2 · 更新', old:'测试通过，就算完成', archived:'已归档', current:'测试之外，也要看界面', retained:'旧版本仍可追溯。', source:'来源文件', file:'界面验收.md', before:'测试通过即可交付', after:'还须验收桌面与手机界面', steep:'沉淀', functions:['找出关联','更新知识','提醒矛盾'], automatic:'AI 整理，且你尚未修改', protected:'保护你创建或编辑过的页面', page:'知识页', topTitle:'界面验收清单', bottomTitle:'功能交付准则', done:'已自动更新', pending:'待审修订', topOld:'自动测试全部通过。', topNew:'检查桌面和手机界面。', lowerOld:'测试通过后，', lowerNew:'还要检查桌面和手机界面', lowerEnd:'才可以交付。', scope:'仅应用于这 1 页', skip:'跳过', approve:'批准', history:'旧版保留' }
};
const esc = v => String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const rect = (x,y,w,h,fill=C.paper,stroke=C.line,r=8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.3"/>`;
const line = (x1,y1,x2,y2,color=C.line,width=1.2) => `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}"/>`;
const icons = {
 file:'<path d="M5 2h9l5 5v15H5z M14 2v6h5 M8 12h8 M8 16h6"/>',
 check:'<path d="m4 12 5 5L20 6"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/>',
 graph:'<path d="m5 5 14 0-7 14z"/><circle cx="5" cy="5" r="2.5" fill="#FCFCFB"/><circle cx="19" cy="5" r="2.5" fill="#FCFCFB"/><circle cx="12" cy="19" r="2.5" fill="#FCFCFB"/>',
 update:'<path d="M19 8a8 8 0 0 0-13-3L3 8m0-5v5h5 M5 16a8 8 0 0 0 13 3l3-3m0 5v-5h-5"/>',
 alert:'<path d="m12 3 10 18H2z M12 9v5"/><circle cx="12" cy="17.5" r=".8" fill="currentColor" stroke="none"/>'
};
function icon(name,x,y,size=22,color=C.secondary) { return `<g transform="translate(${x} ${y}) scale(${size/24})" fill="none" stroke="${color}" color="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</g>`; }
async function make(locale,c) {
 const family = locale==='en'?'Instrument Sans':'Instrument Sans, '+c.font;
 const bounds=[];
 const text=(value,x,y,size=22,color=C.text,weight=400,anchor='start')=>`<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${esc(value)}</text>`;
 const cache=new Map();
 async function width(value,size=22,weight=400) { const key=[value,size,weight].join('|');if(cache.has(key))return cache.get(key);const d=await sharp({text:{text:`<span weight="${weight}">${esc(value)}</span>`,font:`${c.font} ${size}`,fontfile:latinFontFile,dpi:72,rgba:true}}).png().toBuffer({resolveWithObject:true});cache.set(key,d.info.width);return d.info.width; }
 async function fit(value,max,size=22,weight=400) { const actual=await width(value,size,weight);if(actual>max)throw new Error(`${locale}: ${value} width ${actual} > ${max}`);bounds.push({value,size,width:actual,max});return actual; }
 async function highlight(value,x,y,max,size=24) { const w=await fit(value,max,size);return rect(x-4,y-size+1,w+8,size+8,C.highlight,'none',3)+text(value,x,y,size); }
 async function pill(value,right,y,kind='neutral',withIcon) { const size=18,w=await width(value,size,500)+28+(withIcon?25:0),x=right-w;const fg=kind==='done'?C.green:kind==='pending'?C.pending:C.secondary;const bg=kind==='done'?C.greenBg:kind==='pending'?C.pendingBg:C.archive;const border=kind==='done'?C.greenLine:kind==='pending'?C.pendingLine:C.line;return {x,w,svg:rect(x,y,w,32,bg,border,16)+(withIcon?icon(withIcon,x+11,y+6,20,fg):'')+text(value,x+14+(withIcon?23:0),y+22,size,fg,500)}; }
 const defs=`<defs>${[['warm',C.warm],['gray',C.muted]].map(([id,color])=>`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="m2 1 6 4-6 4" fill="none" stroke="${color}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></marker>`).join('')}</defs>`;
 const arrow=(d,color=C.warm,dashed=false)=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" ${dashed?'stroke-dasharray="7 9"':''} marker-end="url(#${color===C.warm?'warm':'gray'})"/>`;
 let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W*SCALE}" height="${H*SCALE}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc"><title id="title">${esc(locale==='en'?'Source changes update knowledge and preserve history':locale==='zh-TW'?'來源改變，知識更新，歷史保留':'来源改变，知识更新，历史保留')}</title><desc id="desc">Editable explanatory illustration, not an App screenshot.</desc>${defs}<rect width="${W}" height="${H}" fill="${C.bg}"/>`;
 // Connectors first, behind cards. All arrowheads terminate outside text.
 svg+=arrow('M217 240V357',C.muted);
 svg+=arrow('M581 407 C531 434 492 460 418 460');
 svg+=arrow('M690 240V257');
 svg+=arrow('M798 367 C867 367 863 220 936 220');
 svg+=arrow('M798 367 C874 367 857 549 976 549',C.muted,true);
 // Earlier/current records.
 for(const [y,current] of [[60,false],[365,true]]) {
  svg+=rect(25,y,385,current?190:180);
  const badge=await pill(current?c.updated:c.earlier,386,y+21,current?'done':'neutral');
  await fit(c.category,badge.x-49-12,18);
  svg+=text(c.category,49,y+43,18,C.secondary)+badge.svg;
  await fit(current?c.current:c.old,337,25,600);
  svg+=text(current?c.current:c.old,49,y+99,25,current?C.text:C.muted,600);
  svg+=text(current?c.retained:c.archived,49,y+143,17,C.muted);
 }
 // Source-file diff: one label, file title, two compact before/after lines.
 svg+=rect(525,15,330,225)+text(c.source,547,48,18,C.secondary);
 svg+=icon('file',547,66,24)+text(c.file,581,87,25,C.text,600);
 await fit(c.file,250,25,600);
 const beforeWidth=await fit(c.before,286,21);
 svg+=text(c.before,547,131,21,C.muted)+`<path d="M547 124H${547+beforeWidth}" stroke="${C.muted}" stroke-width="1.3"/>`;
 svg+=await highlight(c.after,547,174,286,21);
 // Steep orbit: vector geometry, precise subdued blue and neutral labels.
 svg+=`<circle cx="690" cy="370" r="112" fill="none" stroke="${C.line}" stroke-width="1"/>`;
 for(const d of ['M690 278A92 92 0 0 1 777 339','M782 370A92 92 0 0 1 718 458','M690 462A92 92 0 0 1 603 401','M598 370A92 92 0 0 1 662 282'])svg+=`<path d="${d}" fill="none" stroke="${C.blue}" stroke-width="2"/>`;
 svg+=`<circle cx="598" cy="370" r="4.5" fill="${C.blue}"/><circle cx="782" cy="370" r="4.5" fill="${C.blue}"/>`;
 if(locale==='en')svg+=text(c.steep,690,380,30,C.text,600,'middle');else svg+=text('Steep',690,353,16,C.secondary,400,'middle')+text(c.steep,690,391,30,C.text,600,'middle');
 for(let i=0;i<3;i++){svg+=icon(['graph','update','alert'][i],624,516+i*33,20)+text(c.functions[i],655,533+i*33,21,C.secondary);}
 // Untouched AI page: automatic update.
 svg+=text(c.automatic,945,41,21,C.secondary,500)+rect(945,60,625,230);
 svg+=text(c.page,969,89,18,C.secondary)+text(c.topTitle,969,122,27,C.text,600);
 const done=await pill(c.done,1546,96,'done','check');await fit(c.topTitle,done.x-969-16,27,600);svg+=done.svg;
 svg+=line(945,144,1570,144)+text('•',973,192,25)+text(c.topOld,998,192,24);
 svg+=text('•',973,238,25)+await highlight(c.topNew,998,238,545,24);
 // Edited page: pending review, history beneath.
 svg+=text(c.protected,985,369,21,C.secondary,500);
 svg+=rect(974,398,580,312,'#F6F7F8',C.line,8);
 svg+=rect(982,390,580,288,'#FAFAFA',C.line,8);
 svg+=rect(990,382,580,284)+text(c.page,1014,412,18,C.secondary)+text(c.bottomTitle,1014,447,27,C.text,600);
 const pending=await pill(c.pending,1546,421,'pending','clock');await fit(c.bottomTitle,pending.x-1014-16,27,600);svg+=pending.svg;
 svg+=line(990,469,1570,469)+text(c.lowerOld,1014,512,24);
 const newWidth=await width(c.lowerNew,24),endWidth=await width(c.lowerEnd,24);
 svg+=await highlight(c.lowerNew,1014,550,532,24);
 if(newWidth+endWidth+8<=532)svg+=text(c.lowerEnd,1022+newWidth,550,24);else svg+=text(c.lowerEnd,1014,585,24);
 svg+=line(990,607,1570,607)+text(c.scope,1014,643,18,C.secondary,500);
 for(const [value,x,w,primary] of [[c.skip,1380,67,false],[c.approve,1459,87,true]]){svg+=rect(x,619,w,35,primary?C.purple:C.paper,primary?C.purple:C.line,7)+text(value,x+w/2,643,18,primary?'#FFFFFF':C.text,500,'middle');}
 svg+=text(c.history,996,702,17,C.secondary);
 svg+='</svg>';
 return {svg,bounds};
}
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 await sharp({text:{text:'Wenlan',font:'Instrument Sans 24',fontfile:latinFontFile}}).png().toBuffer();
 const result=[];
 for(const [locale,c] of Object.entries(copies)) {
  const {svg,bounds}=await make(locale,c);const base=`wenlan-updates-history${c.suffix}`;
  fs.writeFileSync(path.join(out,`${base}.svg`),svg);
  const png=await sharp(Buffer.from(svg)).png({compressionLevel:9}).toBuffer();
  const digest=crypto.createHash('sha256').update(png).digest('hex');
  const file=`${base}.${digest.slice(0,12)}.png`;
  fs.writeFileSync(path.join(out,file),png);fs.writeFileSync(path.join(out,`${base}.png`),png);
  result.push({locale,file,sha256:digest,svg:`${base}.svg`,dimensions:[W*SCALE,H*SCALE],textBounds:bounds});
 }
 fs.writeFileSync(path.join(out,'update-vector-manifest.json'),JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify(result.map(({locale,file,dimensions})=>({locale,file,dimensions})),null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
