// Cibler leadModal et l'enregistrer avec une variable
// le mot-clé var n'est plus utilisé - on préfèrera le mot-clé let
let modal = document.getElementById("leadModal");
console.log(modal, 'console log de modal');

// Cibler le bouton de refus
let btn = document.getElementById("btnNo");
console.log(btn, 'btnNo');

// Firefox OK
let scrollTop = document.documentElement.scrollTop;
console.log(scrollTop, 'scrolltop');

// Modifier le texte du bouton si cliqué
btnMailto.onclick = function(){
  console.log('la fonction est bien appelée');
  document.getElementById("btnMailto").innerHTML="A très bientôt";
  console.log('après avoir ciblé élément');
}

// Option 1
btn.onclick = function(){
  modal.style.display = "none";
}

// Option 2 - utilisation de la méthode addEventListener à la place de onclick
// btn.addEventListener('click', function(){
//   modal.style.display = 'none';
// })


function modalHomePage(){
  if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350){
    modal.style.display = "block";
    // Annule l'événément window.onscroll
    window.onscroll = null;
  }
}

window.onscroll = function (){
  modalHomePage()
};










