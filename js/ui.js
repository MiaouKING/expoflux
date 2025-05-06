function addItem(expo, expo_uuid, group) {
    group.querySelector(".row__inner").innerHTML = group.querySelector(".row__inner").innerHTML + `<div class="gui-card"><a href="expo.html?id=` + expo_uuid + `" target="_blank">
      <div class="gui-card__media">
        <img class="gui-card__img" src="` + expo.icon + `" alt=""  />
      </div>
      <div class="gui-card__details">
        <div class="gui-card__title">
          ` + expo.name + `
        </div>
      </div>
    </a>
    </div>`;
};

function createGroup(name, container) {
    var group = document.createElement("div");
    group.className = "slider";
    group.innerHTML = "<h3>" + name + `</h3>
    <span onmouseover="scrolltoLeft(event)" onmouseout="clearScroll()" class="handle handlePrev active">
    <i class="fa fa-caret-left" aria-hidden="true"></i>
    </span>

    <div id="scroller" class="row">
    <div class="row__inner">
    </div>
    </div>
    <span onmouseover="scrollRight(event)" onmouseout="clearScroll()"  class="handle handleNext active">
    <i class="fa fa-caret-right" aria-hidden="true"></i>
    </span>`;
    document.querySelector(container).appendChild(group);
    var br = document.createElement("br");
    document.querySelector(container).appendChild(br);
    var br2 = document.createElement("br");
    document.querySelector(container).appendChild(br2);
    return group;
};

function emptyGroup(group) {
  group.querySelector(".row__inner").innerHTML = "";
};

function emptyAllGroups() {
  for (let l in window.subjects) {
    if (window.subjects.hasOwnProperty(l)) {
      emptyGroup(window.subjects[l]);
    }
  }
};

function createAllGroups() {
  window.groups = {
    lastmonth:createGroup("Ces 30 derniers jours", ".container"),
    known:createGroup("50+ vues", ".container")
  };
  window.subjects = {
    islam:createGroup("Éthique musulmane", ".container"),
    eps:createGroup("EPS", ".container"),
    fr:createGroup("Français", ".container"),
    eng:createGroup("Anglais LVA", ".container"),
    engrenf:createGroup("Anglais renforcé", ".container"),
    engeuro:createGroup("Anglais euro", ".container"),
    ar:createGroup("Arabe LVB", ".container"),
    arrenf:createGroup("Arabe renforcé", ".container"),
    alm:createGroup("Allemand LVB", ".container"),
    esp:createGroup("Espagnol LVB", ".container"),
    lat:createGroup("Latin", ".container"),
    svt:createGroup("S.V.T.", ".container"),
    ps:createGroup("Physique-Chimie", ".container"),
    techno:createGroup("Technologie", ".container"),
    ap:createGroup("Arts plastiques", ".container"),
    em:createGroup("Éducation musicale", ".container"),
    h:createGroup("Histoire", ".container"),
    geo:createGroup("Géographie", ".container"),
    emc:createGroup("EMC", ".container"),
  };
}