var viewBtn = document.querySelector(".open-popup");
var popup = document.querySelector(".popup");
var close = popup.querySelector(".close");
var field = popup.querySelector(".field");
var input = field.querySelector("input");
var copy = field.querySelector("button");

viewBtn.onclick = ()=>{
  popup.classList.toggle("show");
}
close.onclick = ()=>{
  viewBtn.click();
}

copy.onclick = ()=>{
  input.select(); //select input value
  if(document.execCommand("copy")){ //if the selected text copy
    field.classList.add("active");
    copy.innerText = "Copié!";
    setTimeout(()=>{
      window.getSelection().removeAllRanges(); //remove selection from document
      field.classList.remove("active");
      copy.innerText = "Copier";
    }, 3000);
  }
}