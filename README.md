# Droptracker

_insert cool logo and a ton of badges from a hundred thousand CI websites so I look hipster and cool as well_

![screenshot](https://i.imgur.com/1fhEaiX.png)

**DISCLAIMER**:

This code is what most people will call 'not so good', so expect bugs and random crashes. I might fix it if people actually start using this
(as a matter of fact I will most likely rewrite the entire thing in erlang since erlang is the best programming language ever \s(not the erlang part though)).

## Running

Make sure you have `elixir ~> 1.5`.

- `mix deps.get`
- `iex -S mix`

## Description

This is a website for tracking drops you get while out with the lads/lasses/mates. It is realtime-shared with your friends, so everyone can collaborate on the same "drop sheet".

It also has fuzzy matching, so if you type `abyslwp`, it will understand that you mean abyssal whip. Same happens if you manage to misspell it slightly, so `abyslswhip` should also return abyssal whip.

The prices are all retrieved from OSBuddy exchange.

## Features

- Fuzzy-finding
- Auto-completion
- Realtime sharing of drops
- Very, very easy to use
- Free as in american internet (oh wait)

## *Very* simple instructions:

- Go to `/room/[random room name]`, and tell your friends to go there as well (doesn't matter if they join later, it syncs up)
- Start typing the name of the item
- Push the down arrow until you get the item you want
- Push [Enter]
- Enter quantity
- Push [Enter]

## What needs to be done

- Frontpage
- Hosting
- Remove entries / Edit
- Design (don't look at me, I'm the programmer)
- Rewrite back-end

## License

Fonts are from this repo: https://github.com/Paradoxis/OSRS-Font-Parser/, which also uses MIT.

Copyright 2017 Fredrik August Madsen-Malmo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
