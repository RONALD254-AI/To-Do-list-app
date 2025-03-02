document.addEventListener("DOMContentLoaded", () => {
  const authForm = document.getElementById("auth-form");
  const formTitle = document.getElementById("form-title");
  const submitBtn = document.getElementById("submit-btn");
  const toggleForm = document.getElementById("toggle-form");
  const authContainer = document.getElementById("auth-container");
  const todoContainer = document.getElementById("todo-container");
  let isSignUp = true;

  // Toggle between Sign Up and Sign In
  toggleForm.addEventListener("click", (e) => {
    e.preventDefault();
    isSignUp = !isSignUp;
    formTitle.textContent = isSignUp ? "Sign Up" : "Sign In";
    submitBtn.textContent = isSignUp ? "Sign Up" : "Sign In";
    toggleForm.innerHTML = isSignUp
      ? 'Already have an account? <a href="#">Sign In</a>'
      : 'Don\'t have an account? <a href="#">Sign Up</a>';
  });

  // Handle form submission
  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const endpoint = isSignUp ? "/signup" : "/signin";
    const response = await fetch(`https://sneek-shopping-list-app.onrender.com${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
      if (!isSignUp) {
        // Successful signin
        authContainer.classList.add("hidden");
        todoContainer.classList.remove("hidden");
      }
      authForm.reset();
    } else {
      alert(result.message);
    }
  });

  // To-Do List Functionality
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const showAllBtn = document.getElementById("show-all");
  const showCompletedBtn = document.getElementById("show-completed");
  const showIncompleteBtn = document.getElementById("show-incomplete");

  // Add task
  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      taskInput.value = "";
    }
  });

  // Add task to the list
  function addTask(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      taskList.removeChild(li);
    });

    // Mark as completed
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  // Filter tasks
  showAllBtn.addEventListener("click", () => {
    taskList.querySelectorAll("li").forEach((li) => {
      li.style.display = "flex";
    });
  });

  showCompletedBtn.addEventListener("click", () => {
    taskList.querySelectorAll("li").forEach((li) => {
      if (li.classList.contains("completed")) {
        li.style.display = "flex";
      } else {
        li.style.display = "none";
      }
    });
  });

  showIncompleteBtn.addEventListener("click", () => {
    taskList.querySelectorAll("li").forEach((li) => {
      if (!li.classList.contains("completed")) {
        li.style.display = "flex";
      } else {
        li.style.display = "none";
      }
    });
  });
});