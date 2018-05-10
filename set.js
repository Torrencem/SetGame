
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
