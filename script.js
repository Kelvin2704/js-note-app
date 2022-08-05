const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popTitle = popupBox.querySelector("header p"),
  addBtn = popupBox.querySelector("button"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = popupBox.querySelector("input"),
  descTag = popupBox.querySelector("textarea");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  popupBox.classList.add("show");
  popTitle.innerText = "Add a new note";
  addBtn.innerText = "Add Note";
});

closeIcon.addEventListener("click", () => {
  popupBox.classList.remove("show");
});

function showNotes() {
  document.querySelectorAll(".note").forEach((li) => li.remove());
  notes.forEach((note, id) => {
    // let filterDesc = note.description.replaceAll("\n", "<br/>");
    let filterDesc = note.description.replaceAll("\n", "<br/>");
    let liTag = `<li class="note">
     <div class="details">
       <p>${note.title}</p>
       <span>${filterDesc}</span>
     </div>
     <div class="bottom-content">
       <span>${note.date}</span>
       <div class="settings">
         <i onclick='showMenu(this)' class="uil uil-ellipsis-h"></i>
         <ul class="menu">
           <li onclick="updateNote(${id} ,'${note.title}','${filterDesc}')">
             <i  class="uil uil-pen"></i>Edit
           </li>
           <li onclick="deleteNote(${id})">
             <i class="uil uil-trash"></i>Delete
           </li>
         </ul>
       </div>
     </div>
   </li>`;
    //insert liTag after addBox
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function showMenu(element) {
  //show element
  element.parentElement.classList.add("show"); //element is <i></i>
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != element) {
      //I is <i></i>
      element.parentElement.classList.remove("show");
    }
  });
}

function updateNote(noteId, title, filterDesc) {
  let description = filterDesc.replaceAll("<br/>", "\r\n");
  updateId = noteId;
  isUpdate = true;
  addBox.click();
  titleTag.value = title;
  descTag.value = description;
  popTitle.innerText = "Update a Note";
  addBtn.innerText = "Update Note";
  console.log(isUpdate, updateId);
}

function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value.trim(),
    description = descTag.value.trim();
  //   console.log(title, description);
  if (title || description) {
    let currentDate = new Date(),
      month = months[currentDate.getMonth()],
      day = currentDate.getDate(),
      year = currentDate.getFullYear();
    // console.log(month, day, year);
    //initial an object for noteInfo
    let noteInfo = { title, description, date: `${month} ${day}, ${year}` };
    if (!isUpdate) {
      //isUpdate = false, not update then push noteInfo into notes array
      notes.push(noteInfo);
    } else {
      //isUpdate = true
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    console.log(isUpdate);

    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();
  }
});
