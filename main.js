import { Column } from "./components/Column"
import { Task } from "./components/Task"
import { reload } from "./utils/helpres"
import { ApiCall } from "./utils/http.request"

const apiService = new ApiCall(import.meta.env.VITE_BATH_URL);
const createNewButton = document.querySelector('.create_new');
const taskFormContainer = document.querySelector('.task-form-container');
const columnFormContainer = document.querySelector('.col-form-container');
const trashBin = document.querySelector('.trash');
const videoPlayer = document.querySelector('.video_trash');
const audioPlayer = document.querySelector('.audio_trash');
const successSound = document.querySelector('.success');
const exitButton = document.querySelector('.exit');
const columnExitButton = document.querySelector('#col_exit');
const columnPlacement = document.querySelector('.cols_place');
const addColumnButton = document.querySelector('.col_btn');
const taskForm = document.forms.namedItem('task-form');
const columnForm = document.forms.namedItem('col-form');

trashBin.ondragover = (e) => {
    e.preventDefault();
};

trashBin.ondragenter = (e) => {
    e.preventDefault();
};

trashBin.ondrop = async (e) => {
    e.preventDefault();
    const draggedTask = document.getElementById('selected');
    const taskId = draggedTask.getAttribute('data-id');
    draggedTask.remove();
    videoPlayer.play();
    videoPlayer.currentTime = 0;
    audioPlayer.play();
    audioPlayer.currentTime = 0;
    const response = await apiService.deleteData('/tasks/' + taskId);

    setTimeout(() => {
        trashBin.style.right = '-1000px';
    }, 1000);
};

let currentStatus = localStorage.getItem('currentStatus') 
    ? parseInt(localStorage.getItem('currentStatus')) 
    : 1;

columnForm.onsubmit = async (e) => {
    e.preventDefault();
    let columnData = {
        title: new FormData(columnForm).get('title'),
        status: currentStatus.toString(), 
    };

    await apiService.postData('/columns', columnData);
    taskFormContainer.classList.remove('active');
    successSound.play();
    successSound.currentTime = 0;
    currentStatus++;
    localStorage.setItem('currentStatus', currentStatus);

    const columnsData = await apiService.getData('/columns');
    reload(columnsData, Column, [columnPlacement], false);
};

const columnsData = await apiService.getData('/columns');
reload(columnsData, Column, [columnPlacement], false);

taskForm.onsubmit = async (e) => {
    e.preventDefault();
    let taskData = {
        description: new FormData(taskForm).get('description'),
        status: new FormData(taskForm).get('status'), 
    };

    await apiService.postData('/tasks', taskData);
    taskFormContainer.classList.remove('active');
    successSound.play();
    successSound.currentTime = 0;
    const tasksData = await apiService.getData('/tasks');
    reload(tasksData, Task, columnCards);
};

const columnCards = document.querySelectorAll('.task-card');
const tasksData = await apiService.getData('/tasks');
reload(tasksData, Task, columnCards);

createNewButton.onclick = () => {
    taskFormContainer.classList.add('active');
};

addColumnButton.onclick = () => {
    columnFormContainer.classList.add('active');
};

exitButton.onclick = () => {
    taskFormContainer.classList.remove('active');
};

columnExitButton.onclick = () => {
    columnFormContainer.classList.remove('active');
};
