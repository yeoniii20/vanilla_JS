// 메모를 저장할 배열
let notes = [];

// HTML 요소 선택
const noteInput = document.getElementById("note-input");
const saveNoteButton = document.getElementById("save-note");
const notesContainer = document.getElementById("notes");

// 메모를 로컬 스토리지에 저장하는 함수
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes)); // notes 배열을 문자열로 변환하여 저장
}

// 로컬 스토리지에서 메모를 불러오는 함수
function loadNotes() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notes = JSON.parse(storedNotes); // 저장된 문자열을 다시 객체로 변환
    renderNotes(); // 불러온 메모를 화면에 렌더링
  }
}

// 메모를 화면에 렌더링하는 함수
function renderNotes() {
  notesContainer.innerHTML = ""; // 메모 영역 초기화
  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    const noteDate = document.createElement("div");
    noteDate.classList.add("note-date");
    noteDate.textContent = new Date(note.date).toLocaleString(); // 메모 작성 시간 표시

    const noteContent = document.createElement("div");
    noteContent.textContent = note.content; // 메모 내용 표시

    noteElement.appendChild(noteDate);
    noteElement.appendChild(noteContent);
    notesContainer.appendChild(noteElement);
  });
}

// "Save Note" 버튼 클릭 시 실행되는 함수
function handleSaveNote() {
  const noteContent = noteInput.value.trim(); // 입력된 메모 내용에서 앞뒤 공백 제거

  if (noteContent !== "") {
    const newNote = {
      content: noteContent, // 메모 내용
      date: new Date().toISOString(), // 현재 날짜와 시간을 ISO 형식으로 저장
    };
    notes.push(newNote); // 새로운 메모를 notes 배열에 추가
    saveNotes(); // 메모를 로컬 스토리지에 저장
    renderNotes(); // 화면에 메모를 렌더링
    noteInput.value = ""; // 입력 필드를 비웁니다.
  }
}

// 로컬 스토리지에서 메모 불러오기
loadNotes();

// "Save Note" 버튼에 클릭 이벤트 리스너 추가
saveNoteButton.addEventListener("click", handleSaveNote);
