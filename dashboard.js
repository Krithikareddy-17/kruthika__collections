// Initialize state arrays from local storage using the exact database key "tasks"
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 1. ADD TASK: Create Functionality
function addTask() {
    const input = document.getElementById("taskInput");
    
    if (!input.value.trim()) {
        return alert("Task cannot be empty!");
    }

    // Stores structure strictly using the "name" property mapped in assignment guidelines
    tasks.push({ 
        id: Date.now(), 
        name: input.value.trim(),
        completed: false 
    });
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    displayTasks();
}

// 2. READ & RENDER: Display Logic with integrated Edit/Toggle elements
function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(t => {
        const li = document.createElement("li");
        // Apply styling class if marked as completed
        if (t.completed) {
            li.className = "completed-task-row";
        }

        li.innerHTML = `
            <div class="task-item-left">
                <input type="checkbox" ${t.completed ? 'checked' : ''} onclick="toggleTask(${t.id})">
                <span id="text-${t.id}" class="task-text-display">${t.name}</span>
            </div>
            <div class="task-item-actions">
                <button onclick="editTask(${t.id})" class="edit-btn">Edit</button>
                <button onclick="deleteTask(${t.id})" class="delete-btn">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });
}

// 3. DELETE TASK: Remove Functionality
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// 4. EDIT TASK: Update Functionality
function editTask(id) {
    const targetTask = tasks.find(t => t.id === id);
    if (!targetTask) return;

    const currentText = targetTask.name;
    const newText = prompt("Edit your task description:", currentText);

    // If user hits cancel or submits an empty string, abort update gracefully
    if (newText === null || newText.trim() === "") {
        return;
    }

    targetTask.name = newText.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// 5. TOGGLE COMPLETION (Optional Task Feature Requirement)
function toggleTask(id) {
    const targetTask = tasks.find(t => t.id === id);
    if (targetTask) {
        targetTask.completed = !targetTask.completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

// 6. SEARCH TASKS: Search and Filtering Mechanics matching snippet selectors exactly
function searchTasks() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    document.querySelectorAll("#taskList li").forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(query) ? "" : "none";
    });
}

// Initial system loader trigger execution invocation
displayTasks();