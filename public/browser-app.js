const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");
const paginationDOM = document.querySelector(".pagination");
const prevBtnDOM = document.querySelector(".prev-btn");
const nextBtnDOM = document.querySelector(".next-btn");
const pageInfoDOM = document.querySelector(".page-info");

const PAGE_SIZE = 5;
let currentPage = 1;
let hasNextPage = false;
let hasPrevPage = false;

const updatePaginationUI = (pagination = {}) => {
  const page = Number(pagination.page || 1);
  const totalPages = Math.max(1, Number(pagination.totalPages || 1));

  currentPage = page;
  hasNextPage = Boolean(pagination.hasNextPage);
  hasPrevPage = Boolean(pagination.hasPrevPage);

  pageInfoDOM.textContent = `Page ${page} of ${totalPages}`;
  prevBtnDOM.disabled = !hasPrevPage;
  nextBtnDOM.disabled = !hasNextPage;
  paginationDOM.style.display = totalPages > 1 ? "flex" : "none";
};

// Load tasks from /api/tasks
const showTasks = async (page = currentPage) => {
  loadingDOM.style.visibility = "visible";
  try {
    const {
      data: { tasks, pagination },
    } = await axios.get("/api/v1/tasks", {
      params: { page, limit: PAGE_SIZE },
    });

    if (tasks.length < 1) {
      if (page > 1) {
        await showTasks(page - 1);
        return;
      }
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      updatePaginationUI();
      loadingDOM.style.visibility = "hidden";
      return;
    }
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name } = task;
        return `<div class="single-task ${completed && "task-completed"}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">



<!-- edit link -->
<a href="task.html?id=${taskID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`;
      })
      .join("");
    tasksDOM.innerHTML = allTasks;
    updatePaginationUI(pagination);
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
    paginationDOM.style.display = "none";
  }
  loadingDOM.style.visibility = "hidden";
};

showTasks();

prevBtnDOM.addEventListener("click", () => {
  if (hasPrevPage) {
    showTasks(currentPage - 1);
  }
});

nextBtnDOM.addEventListener("click", () => {
  if (hasNextPage) {
    showTasks(currentPage + 1);
  }
});

// delete task /api/tasks/:id

tasksDOM.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = el.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks(currentPage);
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});

// form

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;

  try {
    await axios.post("/api/v1/tasks", { name });
    showTasks(1);
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, task added`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
