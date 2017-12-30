// Copyright of Fredrik A. Madsen-Malmo 2017

// Establish which room was joined
const room = window.location.pathname.replace(/^\/room\//, '');;

// Establish a WS connection
const WSConn = new WebSocket('ws://localhost:4001/ws');

// Setup handler for WS conn
WSConn.addEventListener('message', message => {
  console.log(message);
});

// Handle the establishment of a connection
WSConn.addEventListener('open', message => {
  console.log('Opened connection to server.');
  console.log(message);

  // Tell server we joined a room
  WSConn.send(JSON.stringify({ command: 'join', room }));
});

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

  // Tell the server that we're adding a new drop // alert the other clients
  WSConn.send(JSON.stringify({command: 'add_drop', drop: getItemByName(item), quantity}))

  let dropEl = document.createElement('div');
  dropEl.className = 'drop';

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