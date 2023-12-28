var c=Object.defineProperty;var u=(r,t,e)=>t in r?c(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var n=(r,t,e)=>(u(r,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();const h="0123456789",m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",p=8,L=36;function T(){return new Date().getTime().toString(L)}function f(r){const t=T(),e=m+h;let s="";const i=e.length;for(let o=0;o<r;o++)s+=e.charAt(Math.floor(Math.random()*i));return`${s}-${t}`}function k(r,t){return r?t.some(s=>s.value===r)?(alert("Task with that value already exists"),!1):!0:(alert("Please enter a task"),!1)}class g{constructor(t="",e=!1){n(this,"id");n(this,"value");n(this,"completed");n(this,"toggleCompleted",()=>{this.completed=!this.completed});n(this,"setCompleted",(t=!0)=>{this.completed=t});n(this,"getCompleted",()=>this.completed);n(this,"setValue",t=>{this.value=t});n(this,"getValue",()=>this.value);this.id=f(p),this.value=t,this.completed=e}}class E{constructor(t){n(this,"list");n(this,"addTask",t=>(this.list.push(t),this.list));n(this,"getTaskById",t=>this.list.find(e=>e.id===t)||null);n(this,"getTaskByIdOrFail",t=>{const e=this.getTaskById(t);if(!e)throw new Error(`Task with id ${t} not found`);return e});n(this,"getTaskByIndex",t=>this.list[t]||null);n(this,"deleteTask",t=>{const e=this.list.findIndex(s=>s.id===t);return e>-1&&this.list.splice(e,1),this.list});this.list=t||[]}}class C{constructor(){n(this,"taskList");n(this,"createTask",t=>{const e=new g(t);return this.taskList.addTask(e),e});n(this,"toggleTaskCompleted",t=>{const e=this.taskList.getTaskByIdOrFail(t);return e.toggleCompleted(),e});n(this,"deleteTask",t=>{const e=this.taskList.getTaskByIdOrFail(t);return this.taskList.deleteTask(t),e});n(this,"getFilteredTasks",(t="")=>this.taskList.list.filter(s=>s.value.toLowerCase().includes(t.toLowerCase())));this.taskList=new E}}class y{constructor(t){n(this,"searchParam","");n(this,"taskListElement");n(this,"pendingOnlyTodoList");n(this,"completedOnlyTodoList");n(this,"bindAddTodoFormEventListener",t=>{t.preventDefault();const s=t.target.querySelector("input");if(!s)throw new Error("Input field not found");const i=s.value;k(i,this.taskControl.getFilteredTasks(this.searchParam))&&(this.taskControl.createTask(i),this.reRender(),s.value="")});n(this,"bindFilterInputEventListener",t=>{var e;this.searchParam=(e=t.target)==null?void 0:e.value,this.render(this.searchParam)});n(this,"bindEventListnersInTodoItem",t=>{const e=t.querySelector("label");if(!e)throw new Error("Label not found");const s=t.querySelector("input");if(!s)throw new Error("Input field not found");const i=t.querySelector("button");if(!i)throw new Error("Delete button not found");const o=s.id;e.addEventListener("click",()=>{this.handleToogleTaskCompleted(o)}),s.addEventListener("change",()=>{this.handleToogleTaskCompleted(o)}),i.addEventListener("click",()=>{this.handleDeleteTask(o)})});n(this,"getOrCreateTodoList",t=>{const e=document.getElementById(t);if(e)return e;const s=document.createElement("ul");return s.classList.add("todo-list","form-control"),s});n(this,"handleToogleTaskCompleted",t=>{this.taskControl.toggleTaskCompleted(t),this.reRender()});n(this,"handleDeleteTask",t=>{this.taskControl.deleteTask(t),this.reRender()});n(this,"createLabel",(t,e)=>{const s=document.createElement("label");return s.setAttribute("for",t),s.classList.add("todo-list__text"),s.textContent=e,s});n(this,"createCheckbox",(t,e)=>{const s=document.createElement("input");return s.id=t,s.setAttribute("type","checkbox"),s.checked=e,s.addEventListener("change",()=>{this.handleToogleTaskCompleted(t)}),s});n(this,"createDeleteBtn",t=>{const e=document.createElement("button");e.classList.add("todo-list__action-btn","todo-list__action-btn--delete"),e.title="Delete",e.addEventListener("click",()=>{this.handleDeleteTask(t)});const s=document.createElement("img");return s.src="./icons/circle-xmark.svg",s.alt="delete",e.appendChild(s),e});n(this,"createActions",(t,e)=>{const s=document.createElement("div");s.classList.add("todo-list__actions");const i=this.createCheckbox(t,e);s.appendChild(i);const o=this.createDeleteBtn(t);return s.appendChild(o),s});n(this,"renderTodoItem",t=>{const{id:e,value:s,completed:i}=t,o=document.createElement("li");o.classList.add("todo-list__item","form-control");const l=this.createLabel(e,s);i&&o.classList.add("todo-list__item--done"),o.appendChild(l);const a=this.createActions(e,i);o.appendChild(a);const d=o.cloneNode(!0);this.bindEventListnersInTodoItem(d),i?this.completedOnlyTodoList.appendChild(d):this.pendingOnlyTodoList.appendChild(d),this.taskListElement.appendChild(o)});n(this,"clearList",()=>{this.taskListElement.innerHTML="",this.pendingOnlyTodoList.innerHTML="",this.completedOnlyTodoList.innerHTML=""});n(this,"renderList",t=>{this.clearList(),t.forEach(this.renderTodoItem)});this.taskControl=t,this.taskListElement=this.getOrCreateTodoList("todoList"),this.pendingOnlyTodoList=this.getOrCreateTodoList("pendingOnlyTodoList"),this.completedOnlyTodoList=this.getOrCreateTodoList("completedOnlyTodoList");const e=document.getElementById("addTodoForm");e==null||e.addEventListener("submit",this.bindAddTodoFormEventListener);const s=document.getElementById("filterInput");s==null||s.addEventListener("input",this.bindFilterInputEventListener)}reRender(){this.render(this.searchParam)}render(t=""){const e=this.taskControl.getFilteredTasks(t);this.renderList(e)}}const v=new C,I=new y(v);I.render();