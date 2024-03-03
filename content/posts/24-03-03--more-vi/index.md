---
title: More on VIM
tags: ["TECHNOLOGY", "SHELL"]
author: Amita Shukla
---

## Move to locations

`Ctrl+o` navigate to the previous location in the jump list (think o as old)
`Ctrl+i` navigate to the next location in the jump list (i and o are usually next to each other)
`g;` go to the previous change location
`g,` go to the newer change location
`gi` place the cursor at the same position where it was left last time in the Insert mode

## Surround a word with quotes (or any other character)
`c` `i` `w` `"` `"` `Esc` `P`
Replace `iw` with any other Vim motion/text object to surround other things with quotes

References:
- https://learnbyexample.github.io/tips/vim-tip-5/
- https://vi.stackexchange.com/questions/21113/vimscript-surround-word-under-cursor-with-quotes
