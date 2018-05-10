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
};

var deck = [];
createDeck();
shuffleDeck();

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
  unSelectAll();
}

function createDeck() {
  ['r', 'g', 'b'].forEach(function (color) {
    ['1', '2', '3'].forEach(function (num) {
      ['d', 'r', 's'].forEach(function (style) {
        ['e', 's', 'p'].forEach(function (fill) {
          deck.push(color + num + style + fill);
        });
      });
    });
  });
}

function shuffleDeck() {
  var j, x, i;
    for (i = deck.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = deck[i];
        deck[i] = deck[j];
        deck[j] = x;
    }
}

function applyStyleToCard(card, style) {
  // Clear the current DOM under the card
  while (card.firstChild) {
    card.removeChild(card.firstChild);
  }
  // Add our own style to card
  var styleToUse = style[2] + style[3];
  var num = parseInt(style[1]);

  console.log(styleToUse);
  let toAdd = images[styleToUse].cloneNode(true);
  toAdd.classList.add("svg-wrapper" + num);

  let itsColor = "#333";
  if (style[0] == "r")
    itsColor = "#F33";
  if (style[0] == "g")
    itsColor = "#3F3";
  if (style[0] == "b")
    itsColor = "#33F";

  toAdd.firstChild.style.stroke = itsColor;
  toAdd.firstChild.style.fill = itsColor;

  card.appendChild(toAdd);
  if (num == 2)
    card.appendChild(toAdd.cloneNode(true));
  if (num == 3)
    card.appendChild(toAdd.cloneNode(true));
}

setTimeout(function () {
  let card = document.getElementsByClassName("card")[0];
  applyStyleToCard(card, "b2dp");
}, 500);
