const quickSuggestions=['bread','eggs','rice','beans','peanut butter','banana','oats','canned tuna','cheese','apple','tortilla','yogurt','pasta','canned chickpeas','avocado'];

let currentIngredients=[];
let toastTimer=null;

function renderQuickAdds(){
  const container=document.getElementById('quickAdds');
  container.innerHTML='';
  const items=quickSuggestions.filter(s=>!currentIngredients.includes(s)).slice(0,8);
  items.forEach(item=>{
    const btn=document.createElement('button');
    btn.style.cssText='padding:6px 11px;border-radius:20px;border:1.5px solid var(--border);background:var(--cream);font-family:DM Sans,sans-serif;font-size:12px;font-weight:500;cursor:pointer;color:var(--dark);transition:all 0.15s;';
    btn.textContent='+'+item;
    btn.onmouseenter=()=>{btn.style.borderColor='var(--green)';btn.style.color='var(--green)'};
    btn.onmouseleave=()=>{btn.style.borderColor='var(--border)';btn.style.color='var(--dark)'};
    btn.onclick=()=>{
      currentIngredients.push(item);
      renderTags();
      renderQuickAdds();
      updateRemixBtn();
    };
    container.appendChild(btn);
  });
}

function addIngredient(){
  const input=document.getElementById('ingredientInput');
  const val=input.value.trim().toLowerCase();
  if(!val)return;
  if(currentIngredients.includes(val)){showToast('Already added!');input.value='';return;}
  currentIngredients.push(val);
  input.value='';
  renderTags();
  renderQuickAdds();
  updateRemixBtn();
}

function renderTags(){
  const container=document.getElementById('pantryTags');
  if(currentIngredients.length===0){
    container.innerHTML='<span style="font-size:12px;color:var(--text-muted);font-style:italic">No ingredients yet…</span>';
    return;
  }
  container.innerHTML='';
  currentIngredients.forEach((ing,i)=>{
    const tag=document.createElement('div');
    tag.className='pantry-tag';
    tag.innerHTML=ing+' <span class="remove" onclick="removeIngredient('+i+')">✕</span>';
    container.appendChild(tag);
  });
}

function removeIngredient(i){
  currentIngredients.splice(i,1);
  renderTags();
  renderQuickAdds();
  updateRemixBtn();
}

function updateRemixBtn(){
  document.getElementById('remixBtn').disabled=currentIngredients.length<2;
}

async function generateRecipes(){
  if(currentIngredients.length<2)return;
  const output=document.getElementById('recipeOutput');
  const btn=document.getElementById('remixBtn');
  btn.disabled=true;
  btn.innerHTML='<span>⏳</span> Remixing…';
  output.innerHTML='<div class="loading-pulse"><div class="pulse-dots"><div class="pulse-dot"></div><div class="pulse-dot"></div><div class="pulse-dot"></div></div><div class="loading-text">Finding recipes from your pantry…</div></div>';

  const systemPrompt=`You are a nutritionist AI for SafeBite, an app for students on free lunch programs. Given a list of ingredients a student has at home, generate 2 creative, nutritious, NO-COOK recipes (no stove, no oven needed). Each recipe must be simple, fast, and satisfying.

Respond ONLY with valid JSON (no markdown, no extra text):
{
  "recipes": [
    {
      "name": "Recipe Name",
      "time": "5 min",
      "calories": "~400 cal",
      "tags": ["High Protein", "Quick"],
      "ingredients": ["ingredient 1", "ingredient 2"],
      "steps": ["Step one description", "Step two description", "Step three description"]
    }
  ]
}`;

  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:1000,
        system:systemPrompt,
        messages:[{role:'user',content:'Ingredients I have: '+currentIngredients.join(', ')}]
      })
    });
    const data=await res.json();
    const raw=data.content.map(b=>b.text||'').join('');
    const clean=raw.replace(/```json|```/g,'').trim();
    const parsed=JSON.parse(clean);
    renderRecipes(parsed.recipes);
  }catch(e){
    output.innerHTML='<div class="empty-state"><div class="empty-icon">⚠️</div><div class="empty-text">Couldn\'t generate recipes right now. Try again in a moment.</div></div>';
  }

  btn.disabled=false;
  btn.innerHTML='<span>✨</span> Remix My Pantry';
}

function renderRecipes(recipes){
  const output=document.getElementById('recipeOutput');
  if(!recipes||recipes.length===0){
    output.innerHTML='<div class="empty-state"><div class="empty-icon">🤔</div><div class="empty-text">Not enough ingredients for a recipe. Try adding a few more.</div></div>';
    return;
  }
  output.innerHTML='';
  recipes.forEach(recipe=>{
    const tagHtml=(recipe.tags||[]).map(t=>{
      let cls='pill-green';
      if(t.toLowerCase().includes('quick')||t.toLowerCase().includes('fast'))cls='pill-orange';
      if(t.toLowerCase().includes('protein'))cls='pill-gold';
      return`<span class="pill-badge ${cls}">${t}</span>`;
    }).join('');
    const ingHtml=(recipe.ingredients||[]).map(i=>`<span class="recipe-ing">${i}</span>`).join('');
    const stepsHtml=(recipe.steps||[]).map((s,i)=>`<div class="recipe-step"><div class="step-num">${i+1}</div><div class="step-text">${s}</div></div>`).join('');
    const card=document.createElement('div');
    card.className='recipe-card';
    card.innerHTML=`
      <div class="recipe-header">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <div class="recipe-title">${recipe.name}</div>
          <span class="no-cook-badge">🔥 No Cook</span>
        </div>
        <div style="display:flex;gap:6px;align-items:center;margin-bottom:10px">
          <span style="font-size:12px;color:var(--text-muted)">⏱ ${recipe.time||'10 min'}</span>
          <span style="font-size:12px;color:var(--text-muted)">·</span>
          <span style="font-size:12px;color:var(--text-muted)">🔥 ${recipe.calories||'~350 cal'}</span>
        </div>
        <div class="recipe-tags">${tagHtml}</div>
      </div>
      <div class="recipe-body">
        <div class="recipe-section-label">Ingredients Used</div>
        <div class="recipe-ingredients">${ingHtml}</div>
        <div class="recipe-section-label">How to Make It</div>
        <div class="recipe-steps">${stepsHtml}</div>
      </div>`;
    output.appendChild(card);
  });
}

function switchTab(tab,el){
  document.querySelectorAll('#mainApp > .screen').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById(tab+'Screen').classList.add('active');
  el.classList.add('active');
}

function doLogin(){
  const id=document.getElementById('schoolId').value.trim();
  const pin=document.getElementById('pin').value.trim();
  if(!id||pin.length<4){showToast('Please fill in both fields');return;}
  document.getElementById('loginScreen').classList.remove('active');
  document.getElementById('mainApp').classList.add('active');
  renderTags();
  renderQuickAdds();
}

function switchToLogin(){
  document.getElementById('mainApp').classList.remove('active');
  document.getElementById('loginScreen').classList.add('active');
  document.getElementById('schoolId').value='';
  document.getElementById('pin').value='';
}

function claimMeal(btn,place){
  btn.disabled=true;
  btn.textContent='Claimed ✓';
  btn.style.background='var(--green-pale)';
  btn.style.color='var(--green)';
  const slots=btn.closest('.meal-card-bottom').querySelector('.meal-slots');
  const count=parseInt(slots.textContent)||0;
  if(count>0)slots.textContent=(count-1)+' meals left today';
  showToast('🎉 Meal claimed at '+place+'!');
}

function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.classList.add('show');
  if(toastTimer)clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2400);
}

function generateBarcodeSVG(code){
  const svg=document.getElementById('barcodeSvg');
  const W=280,H=80;
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  svg.innerHTML='';
  const seed=code.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
  const bars=[];
  let x=0;
  const pattern=[2,1,3,1,2,3,1,2,1,3,2,1,1,3,2,1,3,1,2,2,1,3,1,2,3,1,1,2,3,1,2,1,3,2,1,2,3,1,1,2,3,2,1,1,3,2,1,2,1,3,2,3,1,1,2,3,2,1,1,3];
  let totalW=0;
  const widths=pattern.map((p,i)=>{
    const w=((seed*(i+7)*31+i*17)%3)+p;
    totalW+=w;
    return w;
  });
  const scale=(W-20)/totalW;
  x=10;
  widths.forEach((w,i)=>{
    const bw=Math.max(1,Math.round(w*scale));
    if(i%2===0){
      const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');
      rect.setAttribute('x',x);
      rect.setAttribute('y',0);
      rect.setAttribute('width',bw);
      rect.setAttribute('height',H);
      rect.setAttribute('fill','#1A1A14');
      svg.appendChild(rect);
    }
    x+=bw;
  });
}

function showBarcode(place,item,val,expires,emoji,bg,code){
  document.getElementById('barcodeEmoji').textContent=emoji;
  document.getElementById('barcodeEmoji').style.background=bg;
  document.getElementById('barcodePlace').textContent=place;
  document.getElementById('barcodeItem').textContent=item;
  document.getElementById('barcodeVal').textContent=val;
  document.getElementById('barcodeExpires').textContent=expires;
  document.getElementById('barcodeCode').textContent=code;
  generateBarcodeSVG(code);
  document.getElementById('barcodeModal').classList.add('open');
  document.body.style.overflow='hidden';
}

function closeBarcode(){
  document.getElementById('barcodeModal').classList.remove('open');
  document.body.style.overflow='';
}
