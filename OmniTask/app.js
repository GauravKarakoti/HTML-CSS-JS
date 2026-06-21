// --- Default Initial / Mock Data ---
const DEFAULT_TASKS = [
  {
    id: "task-1",
    title: "Design Landing Page Mockup",
    description: "Create beautiful glassmorphism interfaces and dark mode style guides in Figma.",
    status: "todo",
    priority: "high",
    dueDate: "2026-07-01",
    tags: ["Design", "Figma"]
  },
  {
    id: "task-2",
    title: "Implement Core Theme System",
    description: "Develop index.html and style.css defining premium styles and responsive CSS grid.",
    status: "inprogress",
    priority: "high",
    dueDate: "2026-06-25",
    tags: ["Frontend", "CSS"]
  },
  {
    id: "task-3",
    title: "Integrate Charts & Analytics",
    description: "Build dynamic SVG donut/percentage charts representing project status distributions.",
    status: "inreview",
    priority: "medium",
    dueDate: "2026-06-28",
    tags: ["JS", "SVG"]
  },
  {
    id: "task-4",
    title: "Initial Repository Setup",
    description: "Setup basic files structure and prepare guidelines and environment validation.",
    status: "done",
    priority: "low",
    dueDate: "2026-06-20",
    tags: ["Docs", "Git"]
  }
];

// --- Application State ---
let tasks = JSON.parse(localStorage.getItem("omnitask_tasks")) || DEFAULT_TASKS;
let activeView = "board"; // "board" or "list"

// Save helper
function saveTasks() {
  localStorage.setItem("omnitask_tasks", JSON.stringify(tasks));
}

// --- DOM Elements ---
const searchInput = document.getElementById("searchInput");
const priorityFilter = document.getElementById("priorityFilter");
const tagFilter = document.getElementById("tagFilter");

const boardViewBtn = document.getElementById("boardViewBtn");
const listViewBtn = document.getElementById("listViewBtn");
const boardView = document.getElementById("boardView");
const listView = document.getElementById("listView");

const createTaskBtn = document.getElementById("createTaskBtn");
const taskModal = document.getElementById("taskModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const taskForm = document.getElementById("taskForm");

// Modal fields
const modalTitle = document.getElementById("modalTitle");
const taskIdField = document.getElementById("taskId");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescInput = document.getElementById("taskDescription");
const taskStatusSelect = document.getElementById("taskStatus");
const taskPrioritySelect = document.getElementById("taskPriority");
const taskDueDateInput = document.getElementById("taskDueDate");
const taskTagsInput = document.getElementById("taskTags");

// Columns & Lists
const columns = {
  todo: document.getElementById("list-todo"),
  inprogress: document.getElementById("list-inprogress"),
  inreview: document.getElementById("list-inreview"),
  done: document.getElementById("list-done")
};
const listTableBody = document.getElementById("listTableBody");

// Stat elements
const totalTasksCount = document.getElementById("totalTasksCount");
const todoTasksCount = document.getElementById("todoTasksCount");
const progressTasksCount = document.getElementById("progressTasksCount");
const reviewTasksCount = document.getElementById("reviewTasksCount");
const doneTasksCount = document.getElementById("doneTasksCount");
const completionPercentage = document.getElementById("completionPercentage");
const chartSegments = document.getElementById("chartSegments");

// --- View Toggles ---
boardViewBtn.addEventListener("click", () => setView("board"));
listViewBtn.addEventListener("click", () => setView("list"));

function setView(view) {
  activeView = view;
  if (view === "board") {
    boardViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
    boardView.classList.add("active");
    listView.classList.remove("active");
  } else {
    listViewBtn.classList.add("active");
    boardViewBtn.classList.remove("active");
    listView.classList.add("active");
    boardView.classList.remove("active");
  }
  render();
}

// --- Filtering Helpers ---
function getFilteredTasks() {
  const query = searchInput.value.toLowerCase().trim();
  const priority = priorityFilter.value;
  const tag = tagFilter.value;

  return tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(query) || 
      task.description.toLowerCase().includes(query) ||
      task.tags.some(t => t.toLowerCase().includes(query));
      
    const matchesPriority = priority === "all" || task.priority === priority;
    const matchesTag = tag === "all" || task.tags.includes(tag);

    return matchesSearch && matchesPriority && matchesTag;
  });
}

// --- Render Operations ---
function render() {
  updateStats();
  populateTagFilter();
  
  if (activeView === "board") {
    renderBoard();
  } else {
    renderList();
  }
}

// Render Board Mode
function renderBoard() {
  // Clear columns
  Object.values(columns).forEach(col => col.innerHTML = "");

  const filtered = getFilteredTasks();

  filtered.forEach(task => {
    const card = createTaskCard(task);
    const colBody = columns[task.status];
    if (colBody) {
      colBody.appendChild(card);
    }
  });

  // Update counts on column headers
  const countTodo = filtered.filter(t => t.status === "todo").length;
  const countInprogress = filtered.filter(t => t.status === "inprogress").length;
  const countInreview = filtered.filter(t => t.status === "inreview").length;
  const countDone = filtered.filter(t => t.status === "done").length;

  document.getElementById("count-todo").textContent = countTodo;
  document.getElementById("count-inprogress").textContent = countInprogress;
  document.getElementById("count-inreview").textContent = countInreview;
  document.getElementById("count-done").textContent = countDone;
}

// Create Task Card DOM Elements
function createTaskCard(task) {
  const card = document.createElement("div");
  card.className = "task-card";
  card.setAttribute("draggable", "true");
  card.setAttribute("data-id", task.id);

  // Tags layout
  const tagsHtml = task.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join("");

  card.innerHTML = `
    <div class="task-card-header">
      <span class="task-priority-badge priority-${task.priority}">${task.priority}</span>
    </div>
    <div class="task-title">${escapeHTML(task.title)}</div>
    <div class="task-desc">${escapeHTML(task.description || "No description provided.")}</div>
    <div class="task-tags-container">${tagsHtml}</div>
    <div class="task-footer">
      <div class="task-date">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
        <span>${task.dueDate || "No due date"}</span>
      </div>
      <div class="task-ops">
        <button class="op-btn edit-btn" onclick="editTask('${task.id}')" title="Edit Task">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
        </button>
        <button class="op-btn delete-btn" onclick="deleteTask('${task.id}')" title="Delete Task">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
  `;

  // Attach Drag Events
  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", task.id);
    card.style.opacity = "0.5";
  });

  card.addEventListener("dragend", () => {
    card.style.opacity = "1";
  });

  return card;
}

// Render List Mode
function renderList() {
  listTableBody.innerHTML = "";
  const filtered = getFilteredTasks();

  if (filtered.length === 0) {
    listTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No tasks found matching current filters.</td></tr>`;
    return;
  }

  filtered.forEach(task => {
    const tr = document.createElement("tr");
    const tagsHtml = task.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join("");
    
    tr.innerHTML = `
      <td>
        <div class="table-title">${escapeHTML(task.title)}</div>
        <div class="table-desc">${escapeHTML(task.description)}</div>
      </td>
      <td>
        <span class="table-status-badge table-status-${task.status}">${formatStatus(task.status)}</span>
      </td>
      <td>
        <span class="task-priority-badge priority-${task.priority}">${task.priority}</span>
      </td>
      <td><div class="task-tags-container">${tagsHtml}</div></td>
      <td style="color: var(--text-secondary);">${task.dueDate || "N/A"}</td>
      <td>
        <div class="task-ops">
          <button class="op-btn edit-btn" onclick="editTask('${task.id}')" title="Edit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          </button>
          <button class="op-btn delete-btn" onclick="deleteTask('${task.id}')" title="Delete">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      </td>
    `;
    listTableBody.appendChild(tr);
  });
}

// --- Statistics and Circular SVG Chart Calculation ---
function updateStats() {
  const total = tasks.length;
  const todo = tasks.filter(t => t.status === "todo").length;
  const progress = tasks.filter(t => t.status === "inprogress").length;
  const review = tasks.filter(t => t.status === "inreview").length;
  const done = tasks.filter(t => t.status === "done").length;

  totalTasksCount.textContent = total;
  todoTasksCount.textContent = todo;
  progressTasksCount.textContent = progress;
  reviewTasksCount.textContent = review;
  doneTasksCount.textContent = done;

  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  completionPercentage.textContent = `${percent}%`;

  // Draw circular donut charts dynamically
  chartSegments.innerHTML = "";

  if (total === 0) {
    return;
  }

  // Draw segment rings for statuses
  const counts = [
    { count: todo, color: "var(--status-todo)" },
    { count: progress, color: "var(--status-progress)" },
    { count: review, color: "var(--status-review)" },
    { count: done, color: "var(--status-done)" }
  ];

  let accumulatedPercent = 0;
  const circumference = 2 * Math.PI * 15.9155; // ~100

  counts.forEach(item => {
    if (item.count === 0) return;
    
    const segmentPercent = (item.count / total) * 100;
    
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("class", "circle-segment");
    circle.setAttribute("cx", "18");
    circle.setAttribute("cy", "18");
    circle.setAttribute("r", "15.9155");
    circle.setAttribute("stroke", item.color);
    
    // Offset segment based on accumulated position
    circle.setAttribute("stroke-dasharray", `${segmentPercent} ${100 - segmentPercent}`);
    circle.setAttribute("stroke-dashoffset", `${-accumulatedPercent}`);
    
    chartSegments.appendChild(circle);
    accumulatedPercent += segmentPercent;
  });
}

// Populate tag filter list dynamically
function populateTagFilter() {
  const currentVal = tagFilter.value;
  const tagsSet = new Set();
  
  tasks.forEach(t => t.tags.forEach(tag => tagsSet.add(tag)));
  
  tagFilter.innerHTML = '<option value="all">All Tags</option>';
  tagsSet.forEach(tag => {
    const opt = document.createElement("option");
    opt.value = tag;
    opt.textContent = tag;
    if (tag === currentVal) {
      opt.selected = true;
    }
    tagFilter.appendChild(opt);
  });
}

// --- CRUD Actions ---

// Create & Update Modal Form Submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const id = taskIdField.value;
  const title = taskTitleInput.value.trim();
  const description = taskDescInput.value.trim();
  const status = taskStatusSelect.value;
  const priority = taskPrioritySelect.value;
  const dueDate = taskDueDateInput.value;
  
  // Tag parser: split by comma, clean whitespace
  const tags = taskTagsInput.value
    .split(",")
    .map(t => t.trim())
    .filter(t => t !== "");

  if (id) {
    // Update existing task
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], title, description, status, priority, dueDate, tags };
    }
  } else {
    // Create new task
    const newTask = {
      id: "task-" + Date.now(),
      title,
      description,
      status,
      priority,
      dueDate,
      tags
    };
    tasks.push(newTask);
  }

  saveTasks();
  closeModal();
  render();
});

// Edit Task
window.editTask = function(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  modalTitle.textContent = "Edit Task Details";
  taskIdField.value = task.id;
  taskTitleInput.value = task.title;
  taskDescInput.value = task.description;
  taskStatusSelect.value = task.status;
  taskPrioritySelect.value = task.priority;
  taskDueDateInput.value = task.dueDate;
  taskTagsInput.value = task.tags.join(", ");

  openModal();
};

// Delete Task
window.deleteTask = function(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();
  }
};

// Drag and Drop implementation
Object.entries(columns).forEach(([status, body]) => {
  body.addEventListener("dragover", (e) => {
    e.preventDefault();
    body.classList.add("drag-hover");
  });

  body.addEventListener("dragleave", () => {
    body.classList.remove("drag-hover");
  });

  body.addEventListener("drop", (e) => {
    e.preventDefault();
    body.classList.remove("drag-hover");
    
    const id = e.dataTransfer.getData("text/plain");
    const task = tasks.find(t => t.id === id);
    
    if (task && task.status !== status) {
      task.status = status;
      saveTasks();
      render();
    }
  });
});

// --- Modal Handlers ---
createTaskBtn.addEventListener("click", () => {
  modalTitle.textContent = "Create New Task";
  taskForm.reset();
  taskIdField.value = "";
  // Pre-fill today's date
  taskDueDateInput.value = new Date().toISOString().split("T")[0];
  openModal();
});

closeModalBtn.addEventListener("click", closeModal);
cancelModalBtn.addEventListener("click", closeModal);
taskModal.addEventListener("click", (e) => {
  if (e.target === taskModal) closeModal();
});

function openModal() {
  taskModal.classList.add("active");
  taskTitleInput.focus();
}

function closeModal() {
  taskModal.classList.remove("active");
}

// --- Live Filter Events ---
searchInput.addEventListener("input", render);
priorityFilter.addEventListener("change", render);
tagFilter.addEventListener("change", render);

// --- Helpers ---
function formatStatus(status) {
  switch(status) {
    case "todo": return "To Do";
    case "inprogress": return "In Progress";
    case "inreview": return "In Review";
    case "done": return "Done";
    default: return status;
  }
}

function escapeHTML(str) {
  if (!str) return "";
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// --- Initial Setup ---
render();
