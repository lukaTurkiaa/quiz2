var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.getElementById("save_card").addEventListener("click", () => {
  addFlashcard();
});

document.getElementById("delete_cards").addEventListener("click", () => {
  localStorage.clear();
  flashcards.innerHTML = '';
  contentArray = [];
});

document.getElementById("show_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "block";
});

document.getElementById("close_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "none";
});

flashcardMaker = (text, delThisIndex) => {
  const flashcard = document.createElement("div");
  const question = document.createElement('h2');
  const answer = document.createElement('h2');
  const del = document.createElement('i');
  const edit = document.createElement('button');
  //edit button
  edit.innerHTML = "Edit"
  //edit.setAttribute(onclick,  clkFunction());
  
  flashcard.className = 'flashcard';
  //drag and drop
  flashcard.setAttribute("draggable", true);
  //flashcard.setAttribute("ondragstart", drag(event));  
  //flashcard.setAttribute("ondrop", drop(event)); 
 // flashcard.setAttribute("ondragover", allowDrop(event)); 
  question.setAttribute("style", "border-top:1px solid red; padding: 15px; margin-top:30px");
  question.textContent = text.my_question;
  //edit.setAttribute("style", "padding: 15px; margin-top:30px" )
  answer.setAttribute("style", "text-align:center; display:none; color:red");
  answer.textContent = text.my_answer;
  
  del.className = "fas fa-minus";
  del.addEventListener("click", () => {
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem('items', JSON.stringify(contentArray));
    window.location.reload();
  })

  flashcard.appendChild(question);
  flashcard.appendChild(answer);
  flashcard.appendChild(del);
  flashcard.appendChild(edit);
  flashcard.addEventListener("click", () => {
    if(answer.style.display == "none")
      answer.style.display = "block";
    else
      answer.style.display = "none";
  })

  document.querySelector("#flashcards").appendChild(flashcard);
}

contentArray.forEach(flashcardMaker);

addFlashcard = () => {
  const question = document.querySelector("#question");
  const answer = document.querySelector("#answer");
  
  localStorage.setItem(question, answer);
  //local storage save 
  let flashcard_info = {
    'my_question' : question.value,
    'my_answer'  : answer.value
  }
  contentArray.push(flashcard_info);
  localStorage.setItem('items', JSON.stringify(contentArray));
  flashcardMaker(contentArray[contentArray.length - 1], contentArray.length - 1);
  question.value = "";
  answer.value = "";
}
function drag_start(event) {
  var style = window.getComputedStyle(event.target, null);
  event.dataTransfer.setData("text/plain",
  (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
} 

function drop(event) {
  var offset = event.dataTransfer.getData("text/plain").split(',');
  var dm = document.getElementById('dragme');
  dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
  dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
  event.preventDefault();
  return false;
}

function drag_over(event) {
  event.preventDefault();
  return false;
} 

var dm = document.getElementById('flashcard');
dm.addEventListener('dragstart',drag_start,false);
document.body.addEventListener('dragover',drag_over,false);
document.body.addEventListener('drop',drop,false); 
//on pressing Button we make information editable for 0.5 minutes
/*function clkFunction(){
  setTimeout(editable(),30000);
  function editable(){
    flashcard.question.setAttribute("contenteditable",true);
    flashcard.answer.setAttribute("contenteditable",true);
  }
  flashcard.question.removeAttribute("contenteditable",true);
    flashcard.answer.removeAttribute("contenteditable",true);
}*/
