window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const listEl = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value.trim();
        if (!task) {
            alert('Please fill out the task');
            return;
        }
        const taskEl = createTaskElement(task);
        listEl.appendChild(taskEl);

        input.value = "";
    });

    listEl.addEventListener('click', (e) => {
        const taskEl = e.target.closest('.task');
        if (!taskEl) return;

        if (e.target.classList.contains('delete')) {
            listEl.removeChild(taskEl);
        } else if (e.target.classList.contains('edit')) {
            toggleTaskEditMode(taskEl);
        } else if (e.target.classList.contains('add')) {
            addNewTask(taskEl);
        } else if (e.target.classList.contains('check-mark')) {
            toggleTaskChecked(taskEl);
        }
    });

    function createTaskElement(task) {
        const taskEl = document.createElement("div");
        taskEl.classList.add("task");

        const taskContentEl = document.createElement("div");
        taskContentEl.classList.add("content");
        taskContentEl.innerHTML = `
            <input type="text" class="text" value="${task}" readonly>
            <span class="check-mark">&#10003;</span>
        `;

        const actionEl = document.createElement("div");
        actionEl.classList.add("action");
        actionEl.innerHTML = `
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
            <button class="add">Add</button>
        `;

        taskEl.appendChild(taskContentEl);
        taskEl.appendChild(actionEl);

        return taskEl;
    }

    function toggleTaskEditMode(taskEl) {
        const textInput = taskEl.querySelector('.text');
        textInput.readOnly = !textInput.readOnly;
        textInput.focus();
    }

    function addNewTask(taskEl) {
        const newTaskEl = createTaskElement('');
        listEl.appendChild(newTaskEl);

        const newTextInput = newTaskEl.querySelector('.text');
        newTextInput.readOnly = false;
        newTextInput.focus();
    }

    function toggleTaskChecked(taskEl) {
        taskEl.classList.toggle('checked');
    }
});

