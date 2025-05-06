var intervalo;

async function scrollRight(e){
  try {
    var t = e.target.parentElement.children[2].scrollLeft;
  } catch {return}
    window.tempe = e;
    intervalo = await setInterval(function(){ window.tempe.target.parentElement.children[2].scrollLeft += 1 }, 5);
};
async function scrolltoLeft(e){
  try {
    var t = e.target.parentElement.children[2].scrollLeft;
  } catch {return}
  window.tempe = e;
  intervalo = await setInterval(function(){ window.tempe.target.parentElement.children[2].scrollLeft -= 1 }, 5);
};
function clearScroll(){
  clearInterval(intervalo);
};
