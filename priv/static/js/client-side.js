// Copyright of Fredrik A. Madsen-Malmo 2017

// Establish which room was joined
const room = window.location.pathname.replace(/^\/room\//, '');;
document.title = `DropTracker - ${room}`;

// Establish a WS connection
const WSPort = window.location.port ? `:${window.location.port}` : '';
const WSSecure = window.location.protocol.endsWith('s:') ? 's' : '';
const WSConn = new WebSocket(`ws${WSSecure}://${window.location.hostname}${WSPort}/ws`);

// Setup handler for WS conn
WSConn.addEventListener('message', message => {
  const messageParsed = JSON.parse(message.data);
  console.log(messageParsed);

  switch (messageParsed["command"]) {
    case "add_drop":
      renderDrop(messageParsed["drop"]["name"], messageParsed["quantity"]);
      break;
  }
});

// Handle the establishment of a connection
WSConn.addEventListener('open', message => {
  console.log('Opened connection to server.');
  console.log(message);

  // Tell server we joined a room
  WSConn.send(JSON.stringify({ command: 'join', room }));
});

let sumOfDrops = 0;

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
  console.log(`Dispatching ${item} x ${quantity} to server`);

  // Clear the input fields, and revert to original focus
  quantityInput.value = '';
  nameInput.value = '';
  nameInput.focus();

  const fixedQuantity = quantity.replace(/k$/, "000");
  console.log(fixedQuantity)

  // Tell the server that we're adding a new drop // alert the other clients
  WSConn.send(JSON.stringify({command: 'add_drop', room, drop: getItemByName(item), quantity: fixedQuantity}))
}

function renderDrop(item, quantity) {
  const itemID = getItemByName(item).id;

  let dropEl = document.createElement('div');
  dropEl.className = `drop item-${itemID}`;

  let nameHeaderEl = document.createElement('h3');
  nameHeaderEl.appendChild(document.createTextNode(item));

  let quantityEl = document.createElement('p');
  quantityEl.appendChild(document.createTextNode(`x ${quantity}`));

  let priceEl = document.createElement('p');
  priceEl.className = 'price';
  priceEl.appendChild(document.createTextNode('Retrieving price...'));

  dropEl.appendChild(nameHeaderEl);
  dropEl.appendChild(quantityEl);
  dropEl.appendChild(priceEl);
  
  dropsEl.prepend(dropEl);
  
  if (itemID === -1) {
    const items = document.querySelectorAll(`.item-${itemID}>.price`);
    for (const item of items) {
      item.innerHTML = `Overall: 1 | Buying: 1 | Selling: 1`;
    }
    
    sumOfDrops += Number(quantity);
    document.querySelector('.tally .total').innerHTML = sumOfDrops;
    return; // stop the query from being sent
  }
  
  fetch(`https://api.rsbuddy.com/grandExchange?a=guidePrice&i=${itemID}`).then((response) => {
    return response.json();
  }).then((blob) => {
    const items = document.querySelectorAll(`.item-${itemID}>.price`);
    for (const item of items) {
      item.innerHTML = `Overall: ${blob.overall} | Buying: ${blob.buying} | Selling: ${blob.selling}`;
    }
    sumOfDrops += blob.overall * quantity;
    document.querySelector('.tally .total').innerHTML = sumOfDrops;
  });
}

function removeDrop(item, quantity) {
  console.log(`Removing ${item} x ${quantity}`);
}
