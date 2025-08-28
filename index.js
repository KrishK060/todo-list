document.addEventListener('DOMContentLoaded',()=>{
const todo_input = document.getElementById('input');
const add_task = document.getElementById('add-task');
const task_list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => renderTask(task))

add_task.addEventListener("click",()=>{
    const taskList = todo_input.value.trim();
    if(taskList === "") return;

    const newTask = {
        id: Date.now(),
        text: taskList,
        completed: false,
    };
    tasks.push(newTask);
    renderTask(newTask);
    saveTask();
    todo_input.value = "";
    console.log(tasks);
});

function renderTask(task){
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if(task.completed) li.classList.add("completed");
    li.innerHTML=`
    <span class="text">${task.text}</span>
    <button class="toggle">Complete</button>
    <button class="delete">Delete</button>
    `;
    const toggleBtn = li.querySelector(".toggle");
    toggleBtn.innerHTML = task.completed ? "Completed" : "Complete";
    li.addEventListener("click",(e)=>{
        const target = e.target;
        if(!(target && target.tagName)) return;
        if(target.classList && target.classList.contains("toggle")){
            task.completed = !task.completed;
            li.classList.toggle("completed");
            target.innerHTML = task.completed ? "Completed" : "Complete";
            saveTask();
        } else if(target.classList && target.classList.contains("delete")){
            e.stopImmediatePropagation();
            tasks = tasks.filter((t)=> t.id!==task.id);
            li.remove();
            saveTask();
        }
    });

    task_list.appendChild(li);

}

function saveTask(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
})