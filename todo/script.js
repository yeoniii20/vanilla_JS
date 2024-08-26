// 필요한 요소들 가져오기
const taskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");
const selectedDateInput = document.getElementById("selected-date");

// 날짜별 할 일 목록을 저장할 객체
let tasksByDate = {};

// 로컬 스토리지에서 데이터를 로드하는 함수
function loadTasks() {
  const storedTasks = localStorage.getItem("tasksByDate");
  if (storedTasks) {
    tasksByDate = JSON.parse(storedTasks);
    renderTasksForSelectedDate();
  }
}

// 로컬 스토리지에 데이터를 저장하는 함수
function saveTasks() {
  localStorage.setItem("tasksByDate", JSON.stringify(tasksByDate));
}

// 선택한 날짜에 해당하는 할 일 목록을 렌더링하는 함수
function renderTasksForSelectedDate() {
  const selectedDate = selectedDateInput.value;
  taskList.innerHTML = "";

  if (tasksByDate[selectedDate]) {
    tasksByDate[selectedDate].forEach((task) => {
      const taskItem = createTaskElement(task);
      taskList.appendChild(taskItem);
    });
  }
}

// 새로운 할 일을 추가하는 함수
function addTask() {
  const taskText = taskInput.value.trim();
  const selectedDate = selectedDateInput.value;

  if (taskText !== "" && selectedDate !== "") {
    if (!tasksByDate[selectedDate]) {
      tasksByDate[selectedDate] = [];
    }

    const newTask = {
      text: taskText,
      id: Date.now(), // 고유 ID를 부여
      completed: false, // 처음에는 완료되지 않은 상태로 설정
    };

    tasksByDate[selectedDate].push(newTask);
    saveTasks();
    renderTasksForSelectedDate();

    taskInput.value = "";
    taskInput.focus();
  }
}

// 할 일 항목을 생성하는 함수
function createTaskElement(task) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", function () {
    task.completed = checkbox.checked;
    saveTasks();
    renderTasksForSelectedDate();
  });

  const taskTextElement = document.createElement("p");
  taskTextElement.textContent = task.text;
  taskTextElement.classList.add("task-text");
  if (task.completed) {
    taskTextElement.classList.add("completed");
  }

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");

  // 삭제 버튼 클릭 시 할 일을 삭제하는 이벤트 리스너 추가
  deleteButton.addEventListener("click", function () {
    const selectedDate = selectedDateInput.value;
    tasksByDate[selectedDate] = tasksByDate[selectedDate].filter(
      (t) => t.id !== task.id
    );
    saveTasks();
    renderTasksForSelectedDate();
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(deleteButton);

  return taskItem;
}

// 초기화 및 이벤트 리스너 추가
loadTasks();

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

selectedDateInput.addEventListener("change", renderTasksForSelectedDate);
