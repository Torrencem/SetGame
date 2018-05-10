// Our object which stores the DOM divs which wrap each svg image
var images = {
  "de":null,
  "dp":null,
  "ds":null,
  "re":null,
  "rp":null,
  "rs":null,
  "se":null,
  "sp":null,
  "ss":null
}

loadAllImages();
var as = [].slice.call(document.getElementsByClassName("card"));

as.forEach(function(element) {
  element.onclick = function() {
    if (this.classList.contains("chosen")) {
      this.classList.remove("chosen");
    } else {
      this.classList.add("chosen");
    }
    if (howManySelected() == 3) {
      checkSelectedSet();
    }
  }
});

// Images
function loadAllImages() {
  var parser = new DOMParser();

  for (var imagename in images) {
    if (images.hasOwnProperty(imagename)) {
      // Load imagename
      fetch("svg/" + imagename + ".svg").then (response =>
        response.text()
      ).then(svg => {
        let parseSVG = parser.parseFromString(svg, "image/svg+xml").documentElement;
        let divT = document.createElement("div");
        divT.classList.add("svg-wrapper");
        divT.appendChild(parseSVG);
        // Figure out my name
        let itsname = parseSVG.getAttribute("sodipodi:docname").split('.')[0];
        images[itsname] = divT;
      });
    }
  }
}

function TEMPTEST() {
  let card = [].slice.call(document.getElementsByClassName("card"))[0];
  card.appendChild(images["ss"]);
}

function getAllSelected() {
  var cards = [].slice.call(document.getElementsByClassName("card"));
  return cards.filter(c => c.classList.contains("chosen"));
}

function howManySelected() {
  return getAllSelected().length;
}

function unSelectAll() {
  getAllSelected().forEach(function(card) {
    card.classList.remove("chosen");
  });
}

function checkSelectedSet() {
  // Blah Blah Blah
  // Temporary
  TEMPTEST();
  unSelectAll();
}
