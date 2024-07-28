let notesListRootElement = document.querySelector("#notesList");
let deleteAllNotes = document.querySelector("#deleteAllNotes");
let createNote = document.querySelector("#createNoteButton");
let titleValue = document.querySelector("#createNoteTitle");
let contentValue = document.querySelector("#createNoteContent");

let notes = [];

deleteAllNotes.addEventListener("click", () => {
  let allNotes = document.querySelectorAll(".note");
  allNotes.forEach((note) => {
    note.remove();
  });
  localStorage.removeItem("notes");
  notes = [];
});

createNote.addEventListener("click", () => {
  let uniqueID = `note${Math.floor(Math.random() * 1000)}`;

  let note = {
    title: titleValue.value,
    content: contentValue.value,
    id: uniqueID,
  };

  // Checks if the title and content value are empty. If empty, alert!! If not, executes below functions.
  if (titleValue.value === "" || contentValue.value === "") {
    alert("Note Title and Note Content is required");
  } else {
    addNoteToLocalStorage(note);
    renderNoteToList(note);
  }
});

// Creates notes!
function renderNoteToList(note) {
  let noteDiv = document.createElement("div");
  noteDiv.classList.add("note", note.id);

  let subDivTitle = document.createElement("div");
  subDivTitle.className = "noteHead";

  let noteTitle = document.createElement("h4");
  let noteIcon = document.createElement("img");

  let noteContent = document.createElement("p");
  noteContent.className = "noteDesc";

  let noteDeleteButton = document.createElement("button");
  noteDeleteButton.className = "noteDeleteButton";

  noteDeleteButton.addEventListener("click", () => {
    removeElementFromNotesList(note.id);
    noteDiv.remove();
    removeNoteFromLocalStorage(note.id);
  });

  noteTitle.textContent = note.title;
  noteIcon.setAttribute("src", new URL("/images/C1.svg", import.meta.url).href);
  noteIcon.setAttribute("alt", "note icon");
  noteIcon.setAttribute("width", "25rem");
  noteContent.textContent = note.content;
  noteDeleteButton.textContent = "Delete Note";

  subDivTitle.appendChild(noteTitle);
  subDivTitle.appendChild(noteIcon);
  noteDiv.appendChild(subDivTitle);
  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(noteDeleteButton);

  notesListRootElement.appendChild(noteDiv);

  // To make the Title and Content Blank after appending
  titleValue.value = "";
  contentValue.value = "";
}

// If local storage has available elements, the elements are rendered to screen
function renderElementsToScreen() {
  if (localStorage.getItem("notes")) {
    notes = JSON.parse(localStorage.getItem("notes"));
    notes.forEach((note) => {
      renderNoteToList(note);
    });
  }
}

function addNoteToLocalStorage(note) {
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function removeElementFromNotesList(id) {
  let noteElement = document.querySelector(`.${id}`);
  if (noteElement) {
    noteElement.remove();
  }
}

function removeNoteFromLocalStorage(id) {
  // If note.id is not equal to the provided id, the note is added in the notes array. 
  // If note.id is equal to id, the note is excluded from the notes array.
  notes = notes.filter((note) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// To delete Existing notes using event handler(Notes: Colt Steele)
function addDeleteEventListeners() {
  let deleteButtons = document.querySelectorAll(".noteDeleteButton");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let noteElement = event.target.closest(".note");
      if (noteElement) {
        noteElement.remove();
      }
    });
  });
}
// Initial setup: add event listeners to all existing delete buttons
addDeleteEventListeners();

renderElementsToScreen();
