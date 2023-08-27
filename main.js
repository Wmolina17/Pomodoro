const tasks = []
let time = 0
let timer = null
let timerBreak = null
let current = null

const bAdd = document.querySelector("#bAdd")
const itTask = document.querySelector("#itTask")
const form = document.querySelector("#form")
const taskName = document.querySelector("#time #taskName")

renderTime()
renderTasks()

let mensaje = " Pomodoro por cada tarea de inicies tomara 25 minutos para su desarrolo y 5 minutos para descanso, lo que nos ayuda a manejar de mejor manera nuestro tiempo al momento de hacer deberes"
window.prompt(mensaje)

form.addEventListener('submit', e => {
    e.preventDefault()
    document.getElementById("h4").classList.replace("h4", "h42")
    if(itTask.value != ''){
        createTask(itTask.value)
        itTask.value = ""
        renderTasks()
    }
})

function createTask(value){
    const newTask = {
        id : (Math.random() * 100).toString(36).slice(3),
        title : value,
        completed : false
    }
    tasks.unshift(newTask)
}

function renderTasks(){
    
    const html = tasks.map(task => {
        return `
            <div class="task">
            <div class="title"> - ${task.title}</div>
            <div class="completed"> ${task.completed ? `<span class="done">Hecha</span>` : `<button id="butt" class="start-button" data-id="${task.id}">Iniciar</button>`} </div>
            </div>
        `
    })

    const tasksContainer = document.querySelector("#tasks")
    tasksContainer.innerHTML = html.join("")

    const startButtons = document.querySelectorAll(".task .start-button")

    startButtons.forEach(button =>{
        button.addEventListener('click', e =>{
            if(!timer){
                const id = button.getAttribute("data-id")
                startButtonHandler(id)
                button.textContent = "En Progreso ..."
                button.classList.replace("start-button","butt2")

            }
        })
    })
}

function startButtonHandler(id){
    time = 60 * 25
    current = id
    const taskIndex = tasks.findIndex(task => task.id == id)
    
    taskName.textContent = tasks[taskIndex].title
    renderTime()

    timer = setInterval( () => {
        timeHandler(id)
    }, 1000)
}

function timeHandler(id){
    time--
    renderTime()

    if(time == 0){
        clearInterval(timer)
        markCompleted(id)
        timer = null
        // current = null
        // taskName.textContent = ""
        renderTasks()
        startBreak()
    }
}

function renderTime(){
    const timeDiv = document.querySelector("#time #value")
    const minutes = parseInt(time / 60)
    const seconds = parseInt(time % 60)

    timeDiv.textContent =  ` ${minutes < 10 ? "0" : ""} ${minutes} : ${seconds < 10 ? "0" : ""} ${seconds} ` 
}

function markCompleted(id){
    const taskIndex = tasks.findIndex((task) => task.id == id)
    tasks[taskIndex].completed = true
}

function startBreak(){
    time = 60 * 5
    taskName.textContent = "Break..."
    renderTime()
    timerBreak = setInterval( () => {
        timerBreakHandler()
    },1000)
}

function timerBreakHandler(){
    time--
    renderTime()

    if(time == 0){
        clearInterval(timerBreak)
        current = null
        timerBreak = null
        taskName.textContent = ""
        renderTasks()
    }

}