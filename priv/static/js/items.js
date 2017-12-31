const items = [
  {id: 554, name: 'Fire rune'},
  {id: 555, name: 'Water rune'},
  {id: 556, name: 'Air rune'},
  {id: 4151, name: 'Abyssal whip'},
  {id: 4153, name: 'Granite maul'},
  {id: 532, name: 'Big bones'},
  {id: 314, name: 'Feather'},
  {id: 9185, name: 'Rune crossbow'},
  {id: 1289, name: 'Rune sword'},
  {id: 2503, name: 'Black d\'hide body'},
  {id: 11826, name: 'Armadyl helmet'},
  {id: 11828, name: 'Armadyl chestplate'},
  {id: 11830, name: 'Armadyl chainskirt'},
  {id: 9144, name: 'Rune bolts'},
  {id: 558, name: 'Mind rune'},
  {id: 892, name: 'Rune arrow'},
  {id: 9244, name: 'Dragon bolts(e)'},
  {id: -1, name: 'Coins'}, // this will have a custom handler, as there is no G.E. info for coins
  {id: 267, name: 'Dwarf weed'},
  {id: 5303, name: 'Dwarf weed seed'},
  {id: 169, name: 'Ranging potion(3)'},
  {id: 163, name: 'Super defence(3)'},
  {id: 989, name: 'Crystal key'},
  {id: 5315, name: 'Yew seed'},
  {id: 11818, name: 'Godsword shard 1'},
  {id: 11820, name: 'Godsword shard 2'},
  {id: 11822, name: 'Godsword shard 3'},
  {id: 11810, name: 'Armadyl hilt'}
];

function getItemByName(name) {
  return items.find(item => name == item.name);
}
