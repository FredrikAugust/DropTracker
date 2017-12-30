const items = [
  {id: 554, name: 'Fire Rune'},
  {id: 555, name: 'Water Rune'},
  {id: 556, name: 'Air Rune'},
  {id: 4151, name: 'Abyssal Whip'},
  {id: 4153, name: 'Granite Maul'}
];

function getItemByName(name) {
  return items.find(item => name == item.name);
}