---
title: More on VIM
tags: ["TECHNOLOGY", "SHELL"]
author: Amita Shukla
---

In my previous post [Inevitable Vi](https://amitashukla.in/blog/inevitable-vi/), I talked about getting started with Vi (or Vim), but I have come a long way since then. Who could have realised that one would need to open so many files on so many servers, where you have no sophisticated text editors to help you? It started from there, but I slowly realised what power we have when we get so not need to lift your hand to reach over to the mouse (or trackpad) when you can control everything using keyboard? Today, I look for vim anywhere I can. I use it in all my IDEs, in command line, as well as in browsers!

In this post I will be covering how I have evolved in using Vim as my primary tool for editing and navigating.

## Reasons for which I use Vim
Vim does have a slight learning curve. The convenience is something we do not realize until we try it and have developed some muscle memory. But once we adapt to the way of thinking in terms of vim commands, our life on computers becomes a little easier. We're able to keep our hands steady, our fingers find there home, with left index on `F` and right index on `J`.
1. Freedom from learning keyboard shortcuts for every app: I have had to switch my IDEs, operating systems, text editors, browsers from time to time. A lot of times I have to alternate between these. That means to be able to *really* use it, I would need to learn each of these keyboard shortcuts. This is a HUGE hassle. So - I look for Vim. I use it everywhere. That way I get to remember only one set of powerful commands - and I am powerful everywhere.
2. Vim is everywhere: Vim comes preinstalled on almost all unix systems - so basic Vim becomes a requirement anyway.
2. Navigation: Writing is different from Typing. Writing is a combination of - reading, thinking and typing. When I am writing, I am not only typing, I am frequently trying to scroll text up and down. The arrowkeys in a traditional laptop is very far from the letters. Having navigation possible at `H, J, K, L`. I liked how the downward navigation is `J`, which is where our right index finger rests.    
3. Independence from mouse: Vim is totally keyboard enabled. I realized early on that using mouse for minor things, like scrolling, selecting, changing tabs or screens, browsing through files etc caused a break in my overall flow.
4. Extra clipboard: To be honest, I find vim's clipboard tedious. I have to copy and paste a lot of things from a lot of places, and even when I have vim enabled everywhere, they are not synchronised with each other. This means that something copied from browser will not paste directly into my IDE using Vim. Hence I use the system's copy paste in insert mode. Which in turn means, I have an extra clipboard for in-app usecases!

## That doesn't mean I will only use Vim
Just like my last point above, vim is an *addition* to my skills, and not a complete replacement. Maybe I am not that versed till now, but I use vim alongwith other app shortcuts to customize my workflow.
1. I still prefer using an app's built in search functionalities instead of vim. For in-file, one word, no-regex searches, sure I just press `*` on the word and search. But for sophisticated ones, I still prefer in app search.
2. Clipboard: A lot of times, system's copy-paste works for me better. So, ctrl-v is used for paste instead of visual mode.
3. I keep Sublime text vim free for times when my brain freezes.

## Common Applications to Use Vim in
- IdeaVim for Intellij or Pycharm
- Vim extension for VS code
- Vimium extention for browser (is available in chrome, firefox, brave)
- terminal keybindings for Mac and Ubuntu:
  - `set -o vi` [https://unix.stackexchange.com/questions/4870/is-it-possible-to-have-vim-key-bindings-in-terminal]
  - `bindkey -v` use vi key bindings in zsh
  - `bindkey -v '^?' backward-delete-char` avoid the annoying backspace/delete issue where backspace stops deleting characters
  - `bindkey '^R' history-incremental-search-backward` use ctrl-r to reverse search

## Common Vim Commands
- `h`, `j`, `k`, `l` 
- `H`
- `J`
- `K`
- `L`
- `u` undo
- `ctrl + r` redo

## Word Navigation
- `w` move to first char of the next word (a word is separated by any punctuation except underscore)
- `b`
- `e`
- `ge`
- `W` move to first char of the next WORD (the next character after whitespace)
- `ciw` change the word where your cursor is
- `dt<char>` 
- `df<char>`
- `shift + [` and `shift + ]` Move cursor block-wise - moves cursor up and down the block of code.
- `shift + v` select the current block 
- `10j` move a certain number of lines: select the number of lines when you don’t have a block of code: `shift + v + 10j` would do the trick.
- `%` toggle between 2 parentheses 
- `*` move to next occurrence of the current word
- `^` or `0w` move to beginning of the first word of the line 

## Move to locations

- `Ctrl+o` navigate to the previous location in the jump list (think o as old)
- `Ctrl+i` navigate to the next location in the jump list (i and o are usually next to each other)
- `g;` go to the previous change location
- `g,` go to the newer change location
- `gi` place the cursor at the same position where it was left last time in the Insert mode

## Command mode
- `:set number` show line numbers
- `:set relativenumber number` show both line numbers relative to the cursor and line numbers

## Surround a word with quotes (or any other character)
`c` `i` `w` `"` `"` `Esc` `P`
Replace `iw` with any other Vim motion/text object to surround other things with quotes

## vimrc
Add the following code to enable a blinking bar in insert mode in `~/.vimrc`. This is vimscript code. The comments start with a double quote.
```bash
if &term =~ "xterm"
  let &t_SI = "\e[6 q"   " Insert mode — bar
  let &t_EI = "\e[2 q"   " Normal mode — block
endif
```

## References:
- https://learnbyexample.github.io/tips/vim-tip-5/
- https://vi.stackexchange.com/questions/21113/vimscript-surround-word-under-cursor-with-quotes
