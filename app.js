const form=document.getElementById("form"), promptBox=document.getElementById("prompt"), chat=document.getElementById("chat"), welcome=document.getElementById("welcome");
let history=[];
function addBubble(text,role){const el=document.createElement("div");el.className="bubble "+role;el.textContent=text;chat.appendChild(el);el.scrollIntoView({behavior:"smooth",block:"end"});return el}
async function send(text){if(!text.trim())return;welcome.hidden=true;history.push({role:"user",content:text});addBubble(text,"user");promptBox.value="";const waiting=addBubble("يفكر OXAM AI…","assistant");
try{const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:history})});const d=await r.json();if(!r.ok)throw new Error(d.error||"تعذر الحصول على رد");waiting.textContent=d.reply;history.push({role:"assistant",content:d.reply})}catch(e){waiting.textContent=e.message}}
form.addEventListener("submit",e=>{e.preventDefault();send(promptBox.value)});
document.querySelectorAll(".suggestions button").forEach(b=>b.addEventListener("click",()=>send(b.textContent)));
document.getElementById("theme").addEventListener("click",()=>document.body.classList.toggle("light"));
if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}));