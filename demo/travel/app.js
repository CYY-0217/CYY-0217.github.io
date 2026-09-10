const data=window.JOURNAL_DATA;
const state={theme:'nordic',focus:'story',density:'full'};
const labels={theme:{nordic:'北欧清新',paper:'纸本纪实',night:'夜读模式'},focus:{story:'故事优先',landscape:'地貌优先',knowledge:'见闻优先'},density:{full:'完整成刊',compact:'快速翻阅'}};

const stops=document.getElementById('mapStops');
const dayNav=document.getElementById('dayNav');
const routeDetail=document.getElementById('routeDetail');
const car=document.getElementById('mapCar');

data.days.forEach(day=>{
  const group=document.createElementNS('http://www.w3.org/2000/svg','g');
  group.classList.add('map-stop'); group.dataset.day=day.d; group.setAttribute('transform',`translate(${day.x} ${day.y})`);
  group.innerHTML=`<circle r="6"/><text x="11" y="4">${day.d===1||day.d===18?day.place:`D${day.d}`}</text>`;
  group.addEventListener('click',()=>selectDay(day.d)); stops.appendChild(group);
  const button=document.createElement('button'); button.type='button'; button.textContent=`D${day.d}`; button.addEventListener('click',()=>selectDay(day.d)); dayNav.appendChild(button);
});

function selectDay(number){
  const day=data.days[number-1];
  routeDetail.innerHTML=`<span class="terrain">${day.terrain}</span><span class="day">DAY ${String(day.d).padStart(2,'0')} · ${day.date}</span><h3>${day.place}</h3><p>${day.story}</p><p class="distance">${day.km}</p>`;
  car.setAttribute('transform',`translate(${day.x} ${day.y-20})`);
  document.querySelectorAll('.map-stop').forEach(node=>node.classList.toggle('active',+node.dataset.day===number));
  [...dayNav.children].forEach((node,index)=>node.classList.toggle('active',index===number-1));
  dayNav.children[number-1].scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
}
selectDay(1);

const chapterList=document.getElementById('chapterList');
data.chapters.forEach(chapter=>{
  const days=data.days.filter(day=>day.chapter===chapter.id);
  const section=document.createElement('section'); section.className='chapter'; section.id=`chapter-${chapter.id}`;
  section.innerHTML=`<div class="chapter-cover"><figure><img src="${chapter.image}" alt="${chapter.title}的无人像地貌照片"></figure><div class="chapter-meta"><span class="chapter-no">CHAPTER ${chapter.no}</span><h3>${chapter.title}</h3><span class="range">${chapter.range} · ${chapter.terrain}</span><p>${chapter.intro}</p></div></div><div class="day-list">${days.map(day=>`<article class="day-entry"><time>DAY ${String(day.d).padStart(2,'0')}<br>${day.date}<br>${day.km}</time><div class="day-copy"><h4>${day.title}</h4><p>${day.story}</p><p class="detail">${day.detail}</p><blockquote>${day.quote}</blockquote><button class="day-photo" type="button" data-image="${day.image}" data-caption="${day.caption}"><img src="${day.image}" alt="${day.caption}"><figcaption><span>${day.caption}</span><span>VIEW ↗</span></figcaption></button></div></article>`).join('')}</div>`;
  chapterList.appendChild(section);
});

const learningNav=document.getElementById('learningNav');
const learningStory=document.getElementById('learningStory');
data.learning.forEach(item=>{const button=document.createElement('button');button.type='button';button.textContent=item.label;button.dataset.id=item.id;button.addEventListener('click',()=>showLearning(item.id));learningNav.appendChild(button)});
function showLearning(id){const item=data.learning.find(entry=>entry.id===id);learningStory.innerHTML=`<div><span class="learning-icon">${item.icon}</span><h3>${item.title}</h3></div><div><p class="lead">${item.lead}</p><p class="body">${item.body}</p><p class="fact">${item.fact}</p></div>`;[...learningNav.children].forEach(button=>button.classList.toggle('active',button.dataset.id===id))}showLearning('plants');

document.querySelectorAll('[data-control]').forEach(group=>group.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;const control=group.dataset.control;state[control]=button.dataset.value;group.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',item===button));document.body.dataset[control]=state[control];updateStatus()}));
function updateStatus(){document.getElementById('composeStatus').innerHTML=`<span></span><p><b>当前版本</b><br>${labels.theme[state.theme]} · ${labels.focus[state.focus]} · ${labels.density[state.density]}</p>`}
document.getElementById('composeButton').addEventListener('click',()=>{document.getElementById('issue').scrollIntoView({behavior:'smooth'});const toast=document.getElementById('toast');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)});

const lightbox=document.getElementById('lightbox');document.addEventListener('click',event=>{const photo=event.target.closest('.day-photo');if(!photo)return;lightbox.querySelector('img').src=photo.dataset.image;lightbox.querySelector('p').textContent=photo.dataset.caption;lightbox.showModal()});lightbox.querySelector('button').addEventListener('click',()=>lightbox.close());lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()});

const menu=document.querySelector('.menu-button');const nav=document.querySelector('.site-header nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.textContent=open?'×':'＋';menu.setAttribute('aria-expanded',open)});nav.addEventListener('click',()=>{nav.classList.remove('open');menu.textContent='＋';menu.setAttribute('aria-expanded','false')});
