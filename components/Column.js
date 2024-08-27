const baseURL = 'http://localhost:5173'
import { TrueToastify } from "../utils/toastify"
import { WrongToastify } from "../utils/toastify"
import { ApiCall } from "../utils/http.request"

const apiCall = new ApiCall(import.meta.env.VITE_BATH_URL)
const trash = document.querySelector('.trash')
const form_cont = document.querySelector('.task-form-container')

export function Column(item){
    const columnElement = document.createElement('div');
    const headerElement = document.createElement('div');
    const titleElement = document.createElement('h3');
    const optionsButton = document.createElement('button');
    const cardElement = document.createElement('div');
    const footerElement = document.createElement('div');
    const addCardButton = document.createElement('button');
    
    columnElement.classList.add('col');
    headerElement.classList.add('task-header');
    titleElement.classList.add('task-title');
    optionsButton.classList.add('task-options');
    cardElement.classList.add('task-card');
    cardElement.draggable = 'true';
    footerElement.classList.add('task-footer');
    addCardButton.classList.add('task_btn');
    
    titleElement.innerHTML = item.title;
    optionsButton.innerHTML = 'x';
    addCardButton.innerHTML = '+ Добавить карточку';
    
    columnElement.append(headerElement, cardElement, footerElement);
    headerElement.append(titleElement, optionsButton);
    footerElement.append(addCardButton);
    
    addCardButton.onclick = () => {
        form_cont.classList.add('active');
    };
    
    optionsButton.onclick = async () => {
        columnElement.remove();
        const response = await apiCall.deleteData('/columns/' + item.id);
    };
    
    cardElement.ondragover = (event) => {
        event.preventDefault();
    };
    
    cardElement.ondragenter = (event) => {
        event.preventDefault();
    };
    
    cardElement.ondrop = async () => {
        const draggedTask = document.getElementById('selected');
        cardElement.append(draggedTask);
        setTimeout(() => {
            trash.style.right = '-1000px';
        }, 1000);
        draggedTask.removeAttribute('id');
        const response = await fetch(`${baseURL}/tasks/${draggedTask.getAttribute('data-id')}`, {
            method: "PATCH",
            body: JSON.stringify({ status: item.status }),
        });
        console.log(item.status);
        
        if (response.status === 200) {
            TrueToastify();
        } else {
            WrongToastify();
        }
    };
    
    return columnElement;
}