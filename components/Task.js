const trash = document.querySelector('.trash')
export function Task(item) {
    const taskContainer = document.createElement('div');
    const taskDescriptionElement = document.createElement('p');
    
    taskContainer.draggable = 'true';
    taskContainer.classList.add('task-body');
    taskDescriptionElement.innerHTML = item.description;
    taskContainer.setAttribute('data-id', item.id);
    taskContainer.append(taskDescriptionElement);
    
    taskContainer.ondragstart = () => {
        taskContainer.id = "selected";
        trash.style.right = '10px';
        setTimeout(() => {
            taskContainer.classList.add('hide');
        }, 0);
    };
    
    return taskContainer;
}    
