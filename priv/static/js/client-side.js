// Copyright of Fredrik A. Madsen-Malmo 2017

// Setup autocomplete
const nameInput = document.querySelector('.name>input');
const quantityInput = document.querySelector('.quantity>input');
const dropsEl = document.querySelector('.drops');

// This will track the state, so we can add it later
let selectedItem = undefined;
let drops = [];

const fuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "name"
  ],
};

const fuse = new Fuse(items, fuseOptions);

const options = {
  selector: nameInput,
  minChars: 1,
  delay: 0,
  source: (term, suggest) => (
    suggest(fuse.search(term).map(i => i.name))
  ),
  onSelect: (_event, term, _item) => {
    selectedItem = term;
    quantityInput.focus();
  }
};

const itemCompletion = new autoComplete(options);

// Setup callback when the user has selected quantity of item

quantityInput.addEventListener('keydown', e => {
  e.keyCode == 13 ? addDrop(selectedItem, e.target.value) : 0
});

// Callback for when the user has added item

function addDrop(item, quantity) {
  console.log(`Adding ${item} x ${quantity}`);

  // Clear the input fields, and revert to original focus
  quantityInput.value = '';
  nameInput.value = '';
  nameInput.focus();

  // Dispatch a request for price

  let dropEl = document.createElement('div');
  let nameHeaderEl = document.createElement('h3');
  nameHeaderEl.appendChild(document.createTextNode(item));

  let quantityEl = document.createElement('p');
  quantityEl.appendChild(document.createTextNode(`x ${quantity}`));

  dropEl.appendChild(nameHeaderEl);
  dropEl.appendChild(quantityEl);
  
  dropsEl.prepend(dropEl);
}

function removeDrop(item, quantity) {
  console.log(`Removing ${item} x ${quantity}`);
}