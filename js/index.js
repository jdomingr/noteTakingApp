const form = document.getElementById('note-form');
const title = document.getElementById('title');
const noteContent = document.getElementById('note-content');
const myNotes = document.getElementById('my-notes');
const newNote = document.getElementById('new-note');
const section = document.querySelector('section');
const addContainer = document.getElementById('add-container');

let notes = [
    {id: '1', title: 'Hola', noteContent: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their.'},
    {id: '2', title: 'Hola', noteContent: 'Este es una prueba'},
    {id: '3', title: 'Hola', noteContent: 'Este es una prueba'},
    {id: '4', title: 'Hola', noteContent: 'Este es una prueba'},
    {id: '5', title: 'Hola', noteContent: 'Este es una prueba'}
];

myNotes.addEventListener('click', () => {

    setActive(myNotes, newNote);
    section.innerHTML = myNotesView();
});

function myNotesView() {
    return `<div>
            <div class="note-list-container">
                ${ notes.map( (note) => {
                    return `<div class="card">
                            <i class="fas fa-trash-alt" onclick="deleteNote(${note.id})"></i>
                            <h3>${note.title}</h3>

                            <div class="card-body">
                                <p>${note.noteContent}</p>
                            </div> 
                            <button id="delete">adasdasd</button>
                        </div>`
                    }).join('') 
                }
            
            </div>
        </div>`;
}

newNote.addEventListener('click', () => {

    setActive(newNote, myNotes);

    section.innerHTML = `<div id="add-container" class="add-note-container" onsubmit="addNewNote(event)">
                            <h1>Add note</h1>
                            <form class="note-form" id="note-form">
                                <div class="form-control">
                                    <label for="title">Title</label>
                                    <input class="form-input" type="text" placeholder="Title" id="title" />
                                    <i class="fas fa-check-circle"></i>
                                    <i class="fas fa-exclamation-circle"></i>
                                    <small>Error Message</small>
                                </div>

                                <div class="form-control">
                                    <label for="note-content">Note</label>
                                    <textarea class="form-input" rows="15" placeholder="Note content" id="note-content"></textarea>
                                    <i class="fas fa-check-circle"></i>
                                    <i class="fas fa-exclamation-circle"></i>
                                    <small>Error Message</small>

                                </div>
                                <button type="submit" class="button-submit"> Add note</button>
                            </form>
                        </div>`;
})


function addNewNote(e) {
    e.preventDefault();
    if( checkInputs() ){
        saveNote();
    }

    return;
}

function checkInputs() {
    const titleValue = title.value.trim();
    const noteContentValue = noteContent.value.trim();

    if( titleValue === ''){
        setErrorMessage( title, 'Title is required');
        return false;
    }else{
        setSuccess( title );
    }

    if( noteContentValue === ''){
        setErrorMessage( noteContent, 'Note content is required');
        return false;
    }else{
        setSuccess( noteContent );
    }

    return true;
}

//params input and message
function setErrorMessage(input, message){

    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error';

}

//params input
function setSuccess( input ){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function setActive(element, element2) {
    element.parentElement.className="active";
    element2.parentElement.className = ''
}

function saveNote() {
   
    let note = {
        id: new Date().getMilliseconds(),
        title: title.value.trim(),
        noteContent: noteContent.value.trim()
    }
    notes.push(note);
}

function deleteNote(noteId) {
    
    notes = notes.filter( note => note.id != noteId);
    section.innerHTML = myNotesView();
    
}
