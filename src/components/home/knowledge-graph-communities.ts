import { knowledgeNodes, knowledgeEdges, type KnowledgeNode } from './knowledge-story-data';
import { knowledgeNodesEn, researchExamplesEn, designExamplesEn } from './knowledge-story-data-en';
import { knowledgeIds } from './knowledge-story-ids';
import { knowledgeLanguage } from './knowledge-story-library';
import type { Locale } from '@/i18n/locales';

// Authored research examples, isolated from the captured product fixture used by
// the other homepage sections. Questions are study prompts, not research claims.
const research = [
  ['cognition', '認知與學習', 'attention', '注意力與學習', '版面移動是否打斷閱讀？比較側欄開關前後的行首位置、重新定位時間與理解表現。', 'sleep', '睡眠與記憶', '睡眠與記憶表現如何測量？比較夜間溫度、睡眠時段與樣本差異，檢查是否有其他解釋。'],
  ['ecology', '生態與氣候', 'city', '城市熱島', '不同街區的夜間溫度有何差異？保留測量地點、時段與建成環境，再提出與睡眠有關的研究問題。', 'biodiversity', '生物多樣性', '物種在何時、何地被記錄？比較分布變化與可能的移動路線，區分有證據的記錄與推測。'],
  ['history', '歷史與文化', 'evidence', '史料如何互證', '作者、年代與保存脈絡如何影響一份史料？把相互支持與衝突的記錄並列。', 'trade', '古代貿易路線', '地圖、考古材料與文字記錄如何互證貿易路線？比較沿線物種記錄的年代，標註推測與仍待查證的路段。'],
] as const;
const examples: KnowledgeNode[] = research.flatMap(([id,title,a,at,aq,b,bt,bq]) => [
  {id:`research-${id}`,kind:'topic',title,body:`# ${title}\n\n跨學科研究筆記示例。\n\n從 [${at}](#demo:research-${a}) 與 [${bt}](#demo:research-${b}) 開始，比較問題、研究方法與資料來源。`,x:0,y:0},
  ...[[a,at,aq],[b,bt,bq]].map(([key,name,question]) => ({id:`research-${key}`,kind:'page' as const,title:name,topicId:`research-${id}`,body:`# ${name}\n\n${question}\n\n## 閱讀時保留\n\n- 研究問題與採用的方法\n- 原始資料與可回查的引用\n- 不同解釋、限制與下一步\n\n研究筆記示例，尚未填入論文證據或研究結論。`,x:0,y:0})),
]);
// Concrete design briefs give research its own bridge into product work.
// These are authored examples, never additions to the captured App fixture.
const designExamples: KnowledgeNode[] = [
  {id:'research-heat-map',kind:'page',title:'街區高溫地圖',topicId:knowledgeIds.topicDesign,x:0,y:0,
    body:'# 街區高溫地圖\n\n如何讓人看懂街區何時最熱？把 [城市熱島](#demo:research-city) 的地點、時段與量測限制轉成地圖的比較條件。\n\n## 設計要回答\n\n- 切換日間與夜間，保留相同溫度色階\n- 點選街區，查看測量時間與原始記錄\n- 缺測區域明確標記，不用推估值冒充實測\n\n設計筆記示例，尚未接入實測資料或完成產品驗證。'},
  {id:'research-trade-map',kind:'page',title:'貿易路線時間軸',topicId:knowledgeIds.topicDesign,x:0,y:0,
    body:'# 貿易路線時間軸\n\n如何看出不同年代的貿易路線？把 [古代貿易路線](#demo:research-trade) 的年代、地點與史料差異轉成地圖和時間軸的互動。\n\n## 設計要回答\n\n- 拖動時間軸，只顯示該年代有記錄的路段\n- 點選路段，並列地圖、考古與文字依據\n- 推測路段用虛線標示，保留互相衝突的記錄\n\n設計筆記示例，尚未填入史料證據或完成產品驗證。'},
];
export const graphNodes = [...knowledgeNodes,...examples,...designExamples];
// English rendering: same ids, order, links and layout; only title and body differ.
export const graphNodesEn = [...knowledgeNodesEn,...researchExamplesEn,...designExamplesEn];
export const graphNodesFor = (locale: Locale) => knowledgeLanguage(locale)==='en' ? graphNodesEn : graphNodes;
// Authoring aid: communities are written with the captured Traditional Chinese
// titles and resolved to ids once. Everything after this point works on ids.
const zhId = (title:string) => graphNodes.find(n=>n.title===title)!.id;
const exampleEdges = research.flatMap(([id,,a,,,b]) => [
  {from:`research-${id}`,to:`research-${a}`,kind:'about'},
  {from:`research-${id}`,to:`research-${b}`,kind:'about'},
]);
const designEdges = designExamples.map(node=>({from:node.id,to:node.topicId!,kind:'about'}));
// Editorial research leads. These suggest questions to investigate, not findings.
export const researchBridges = [
  {from:'research-attention',to:knowledgeIds.layoutDesign,kind:'example',summary:{'zh-TW':'減少閱讀被打斷','zh-CN':'减少阅读被打断',en:'Reduce reading interruptions'},reason:{
    'zh-TW':'固定行首能否減少閱讀被打斷？把注意力研究轉成側欄開關的驗收問題。',
    'zh-CN':'固定行首能否减少阅读被打断？把注意力研究转成侧栏开关的验收问题。',
    en:'Can a stable line start reduce reading interruptions? Turn attention research into a sidebar usability question.'}},

  {from:'research-sleep',to:'research-city',kind:'example',summary:{'zh-TW':'從夜間高溫研究睡眠','zh-CN':'从夜间高温研究睡眠',en:'Study heat alongside sleep'},reason:{
    'zh-TW':'夜間高溫是否影響睡眠？把城市溫度記錄與睡眠測量並讀。',
    'zh-CN':'夜间高温是否影响睡眠？把城市温度记录与睡眠测量并读。',
    en:'Does nighttime heat affect sleep? Compare city temperature records with sleep measurements.'}},
  {from:'research-biodiversity',to:'research-trade',kind:'example',summary:{'zh-TW':'沿貿易路線查物種記錄','zh-CN':'沿贸易路线查物种记录',en:'Trace species along trade routes'},reason:{
    'zh-TW':'物種可能沿哪些路線移動？用貿易地圖與物種記錄互相查證。',
    'zh-CN':'物种可能沿哪些路线移动？用贸易地图与物种记录互相查证。',
    en:'How might species travel? Cross-check trade maps against species records.'}},
  {from:'research-city',to:'research-heat-map',kind:'example',summary:{'zh-TW':'讓高溫資料可比較','zh-CN':'让高温资料可比较',en:'Make heat records comparable'},reason:{
    'zh-TW':'如何看懂街區何時最熱？把測量地點、時段與缺測資訊轉成地圖的比較條件。',
    'zh-CN':'如何看懂街区何时最热？把测量地点、时段与缺测信息转成地图的比较条件。',
    en:'When is each neighborhood hottest? Turn locations, times and missing measurements into map comparison controls.'}},
  {from:'research-trade',to:'research-trade-map',kind:'example',summary:{'zh-TW':'讓路線隨年代展開','zh-CN':'让路线随年代展开',en:'Explore routes through time'},reason:{
    'zh-TW':'如何看出不同年代的路線？用時間軸篩選路段，點選地圖回查史料與推測。',
    'zh-CN':'如何看出不同年代的路线？用时间轴筛选路段，点选地图回查史料与推测。',
    en:'How did routes differ over time? Filter map segments by date, then inspect their records and uncertainties.'}},
];
// Keep actual citations and membership; broad topic-to-topic associations do
// not explain a shared question in this illustration. The captured fixture is
// unchanged and remains available to other sections.
export const graphEdges = [...knowledgeEdges.filter(edge=>edge.kind!=='related_to'),...exampleEdges,...designEdges,...researchBridges];

// Editorial communities for this explanation, not a claimed clustering output.
const communityDefinitions = [
  {id:'ai',title:'AI 協作',en:'AI collaboration',cn:'AI 协作',cx:235,cy:270,rx:155,ry:175,tilt:-.13,ids:['AI 協作','Claude 與 Codex','AI 工作方式','重試策略','工作交接','Agent Loop','任務拆解','AI 交接清單','拆任務時先寫驗收條件','交接保留依據與下一步'].map(zhId)},
  {id:'design',title:'產品設計',en:'Product design',cn:'产品设计',cx:640,cy:435,rx:175,ry:170,tilt:.18,ids:['產品設計','介面驗收','產品原則','側欄驗收','閱讀版面設計','訪談洞察','引用預覽設計','reading-review','閱讀排版驗收','窄視窗保留閱讀起點','側欄不推移正文','驗收包含側欄開關','四種頁面共用閱讀容器','預覽避開正在閱讀的段落'].map(zhId)},
  {id:'knowledge',title:'知識管理',en:'Knowledge management',cn:'知识管理',cx:990,cy:220,rx:125,ry:145,tilt:-.2,ids:['知識管理','每週知識回顧','閱讀筆記','寫作與思考','每週回顧','摘錄到筆記','來源管理','回顧先整理仍在使用的筆記','摘錄附原始網址與日期'].map(zhId)},
  {id:'cognition',title:'認知與學習',en:'Cognition & learning',cn:'认知与学习',cx:215,cy:720,rx:120,ry:90,tilt:-.23,ids:['認知與學習','注意力與學習','睡眠與記憶'].map(zhId)},
  {id:'ecology',title:'生態與氣候',en:'Ecology & climate',cn:'生态与气候',cx:650,cy:790,rx:130,ry:90,tilt:.15,ids:['生態與氣候','城市熱島','生物多樣性'].map(zhId)},
  {id:'history',title:'歷史與文化',en:'History & culture',cn:'历史与文化',cx:990,cy:710,rx:120,ry:100,tilt:.26,ids:['歷史與文化','史料如何互證','古代貿易路線'].map(zhId)},
];
export const graphCommunities = communityDefinitions.map(group=>({...group,topicId:group.ids[0]}));
const placeNode = (node: KnowledgeNode) => {
  // Place two new briefs inside the existing design outline. Preserve every
  // original point and community contour instead of redistributing the ring.
  // Keep the attention-to-layout bridge on the left of the design region,
  // clear of the ecology and history routes entering from below and right.
  if(node.id===knowledgeIds.layoutDesign) return {px:530,py:455,community:'design'};
  if(node.id==='research-heat-map') return {px:590,py:490,community:'design'};
  if(node.id==='research-trade-map') return {px:710,py:455,community:'design'};
  const group = graphCommunities.find(c=>c.ids.includes(node.id))!;
  const index=group.ids.indexOf(node.id), count=group.ids.length-1;
  const angle=-Math.PI/2 + (index-1)*2*Math.PI/count + group.tilt;
  // Fixed variation gives each neighborhood its own silhouette without runtime
  // simulation or motion that moves a node away from the pointer.
  const radius=.84 + ((index*7+count*3)%11)*.022;
  const localX=index===0?-12:count===2?(index===1?-95:90):Math.cos(angle)*group.rx*radius;
  const localY=index===0?-22:count===2?(index===1?45:64):Math.sin(angle)*group.ry*radius;
  const px=group.cx+localX*Math.cos(group.tilt)-localY*Math.sin(group.tilt);
  const py=group.cy+localX*Math.sin(group.tilt)+localY*Math.cos(group.tilt);
  return {px,py,community:group.id};
};
const layout = new Map(graphNodes.map(node=>[node.id,placeNode(node)]));
const withLayout = (nodes: KnowledgeNode[]) => nodes.map(node=>({...node,...layout.get(node.id)!}));
export const graphPoints = withLayout(graphNodes);
export const graphPointsEn = withLayout(graphNodesEn);
export const graphPointsFor = (locale: Locale) => knowledgeLanguage(locale)==='en' ? graphPointsEn : graphPoints;

type Point = {x:number;y:number};
const turn = (a:Point,b:Point,c:Point) => (b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
function envelope(points:Point[]) {
  const sorted=[...points].sort((a,b)=>a.x-b.x||a.y-b.y);
  const half=(items:Point[])=>{const result:Point[]=[];for(const p of items){while(result.length>1&&turn(result[result.length-2],result[result.length-1],p)<=0)result.pop();result.push(p);}return result.slice(0,-1);};
  return [...half(sorted),...half([...sorted].reverse())];
}
export const communityRegions = graphCommunities.map(group => {
  const nodes=graphPoints.filter(n=>n.community===group.id);
  // Pad the actual node cloud, including room for labels, then round its hull.
  const cloud=nodes.flatMap(n=>Array.from({length:8},(_,i)=>({x:n.px+Math.cos(i*Math.PI/4)*43,y:n.py+Math.sin(i*Math.PI/4)*45+12})));
  const hull=envelope(cloud);
  const mid=(a:Point,b:Point)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2});
  const first=mid(hull[hull.length-1],hull[0]);
  const path=`M ${first.x} ${first.y} `+hull.map((p,i)=>{const next=mid(p,hull[(i+1)%hull.length]);return `Q ${p.x} ${p.y} ${next.x} ${next.y}`;}).join(' ')+' Z';
  return {...group,path,labelX:group.cx,labelY:Math.min(...nodes.map(n=>n.py))-23};
});

export const graphEdgeKey = (edge: {from:string;to:string}) => [edge.from,edge.to].sort().join('|');
export const uniqueGraphEdges = graphEdges.filter((edge,index,all) =>
  all.findIndex(other=>graphEdgeKey(other)===graphEdgeKey(edge))===index);

// A sparse overview keeps every node connected without drawing every cycle.
// Selection restores all direct relationships from the complete graph.
const pointById = new Map(graphPoints.map(point=>[point.id,point]));
const parent = new Map(graphNodes.map(node=>[node.id,node.id]));
const root = (id:string):string => parent.get(id)===id ? id : root(parent.get(id)!);
const cost = (edge:{from:string;to:string}) => {
  const a=pointById.get(edge.from)!, b=pointById.get(edge.to)!;
  return (a.community===b.community?0:2000)+Math.hypot(a.px-b.px,a.py-b.py);
};
export const overviewEdgeKeys = new Set<string>();
for (const edge of [...uniqueGraphEdges].sort((a,b)=>cost(a)-cost(b))) {
  const a=root(edge.from), b=root(edge.to);
  if(a!==b) {parent.set(a,b);overviewEdgeKeys.add(graphEdgeKey(edge));}
}
for (const edge of researchBridges) overviewEdgeKeys.add(graphEdgeKey(edge));

// Reveal the displayed network from the saved decision, not an invented chronology.
export const graphSeed = 'mem_8434be7eda44';
const growthEdges = uniqueGraphEdges.filter(edge=>overviewEdgeKeys.has(graphEdgeKey(edge))||edge.from===graphSeed||edge.to===graphSeed);
const levels = new Map([[graphSeed,0]]);
for (const [id,depth] of levels) {
  for (const edge of growthEdges) {
    const target=edge.from===id?edge.to:edge.to===id?edge.from:null;
    if(target&&!levels.has(target)) levels.set(target,depth+1);
  }
}
export const nodeRevealAt = (id:string) => (levels.get(id)??0)*900;
const foregroundBridges = [researchBridges[0],researchBridges[3],researchBridges[4]];
export const edgeRevealAt = (edge:{from:string;to:string}) => {
  const beat=foregroundBridges.findIndex(bridge=>graphEdgeKey(bridge)===graphEdgeKey(edge));
  return beat<0 ? Math.max(nodeRevealAt(edge.from),nodeRevealAt(edge.to))+350 : 3050+beat*2700;
};
export const regionRevealAt = (community:string) => Math.max(...graphPoints.filter(n=>n.community===community).map(n=>nodeRevealAt(n.id)))+450;

// Only shared research questions take the foreground. Citations and topic
// membership keep growing in the background on the same reveal timeline.
export const graphGrowthHold = 2700;
// Three distinct contributions, once each; extra research links grow quietly.
export const graphGrowthBeats = foregroundBridges.map((edge,index)=>({
  edge, at:3050+index*graphGrowthHold,
  caption: [{x:465,y:610},{x:520,y:655},{x:935,y:565}][index],
}));
export const graphGrowthEnd = graphGrowthBeats[graphGrowthBeats.length-1].at+graphGrowthHold;

// Follow existing edges within the selected field and product design. Topic membership is a navigation step,
// not an assertion that every note in a topic answers the same question.
export function pathToProductDesign(start:string):string[] {
  const originCommunity=pointById.get(start)?.community;
  if (!originCommunity || !['ecology','history'].includes(originCommunity)) return [];
  const target=knowledgeIds.topicDesign;
  const queue=[start];
  const previous=new Map<string,string|null>([[start,null]]);
  for(const id of queue) {
    if(id===target) {
      const path:string[]=[];
      for(let cursor:string|null=target;cursor!==null;cursor=previous.get(cursor)??null) path.unshift(cursor);
      // Include the selected note's own topic when it sits just off the path.
      // This uses its existing membership edge, never a new cross-area link.
      const origin=graphPoints.find(node=>node.kind==='topic'&&node.community===pointById.get(start)?.community);
      if(origin&&!path.includes(origin.id)&&uniqueGraphEdges.some(edge=>edge.kind==='about'&&graphEdgeKey(edge)===graphEdgeKey({from:origin.id,to:start}))) path.unshift(origin.id);
      return path;
    }
    for(const edge of uniqueGraphEdges) {
      if(![edge.from,edge.to].every(id=>[originCommunity,'design'].includes(pointById.get(id)!.community))) continue;
      const next=edge.from===id?edge.to:edge.to===id?edge.from:null;
      if(next&&!previous.has(next)) {previous.set(next,id);queue.push(next);}
    }
  }
  return [];
}
