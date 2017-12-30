// Copyright of Fredrik A. Madsen-Malmo 2017

// Setup autocomplete
const nameInput = document.querySelector('.name>input');

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
  onSelect: (event, term, item) => {
    // term = the item we want to use
    alert(term);
  }
};

const itemCompletion = new autoComplete(options);