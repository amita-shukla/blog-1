---
title: fp cheat sheet
tags: ["fp"]
cover: meme.jpeg
author: amita shukla
---

Functional Programming languages, in general, turn into a challenging venture at the very start. On one hand, it sounds simple when all you have to do is use functions instead of loads of language constructs. 


[Who needs a loop when we have folds](https://amitashukla.in/blog/unfolding-folds.html)! But there is another problem. Now we don't know which function we need to use when. A lot of times for coding a simple task, I had to rush to the docs, search extensively, only to discover half an hour later that all I had to use was a `lift`. or a `fold`. or a `map`. Aghhh! At this learning level, what comes handy is a pool of functions to refer to first before jumping into the sea of all the libraries and functions ever created. Gradually over time, these functions (and their type signatures) embed themselves on our minds, and then programming becomes a breeze.

<re-img src="meme.jpeg" title="meme"></re-img>

\n\n  \n\n\nI have titled this post as something for 'absolute beginners', but this is what I have used most of the time, so I consider myself no more than an absolute beginner. And there is so much more, I guess I will remain an absolute beginner for ages to come. And if you're an absolute beginner, having a basic understanding of these functions will help you sail through a lot of code reading and writing.\n\n  \n\n\n

## How to read this cheat sheet\n\n

In the given cheat sheet, I have used syntax in Haskell. Even if you don't understand Haskell, and you have never used it, with a little bit of syntax knowledge you will see that it is similar to Python with types sprinkled. As we progress, I may use the functions used before somewhere later, but I have kept this really small so just hover over the page and you'll find it. Let's now go over the basic syntax in Haskell first. If you know Haskell basic syntax, you can [skip this section](#fp_cheat_sheet) entirely.\n\n  \n\n\n


### Function Syntax\n\n
In Haskell, everything is a function. These functions can be composed together, in turn creating other functions. Each function begins with its name. And then the input and output types. One thing here we need to remember here is this: **all functions take exactly one parameter**. You may obviously ask, then what do you do when we need more that one parameter? From the current function you return another function that again takes one parameter. In fact, there is not much emphasis on what a function 'returns'. There is no such distinction. The emphasis is on what is the **type signature**. A type signature is just an arrow separated list of what type is the input and what type is the output. Let's go over an example.\n\n  \n\n\n



Let's define a function that takes an integer, adds 1, and returns another integer:  \n\n\n      

addOne :: Int -> Int\n      
addOne x = x + 1\n\n      \n\n

Now this goes by the law, as `addOne` needs to take only 1 parameter. Let's move over to another function `add`, that takes two numbers and adds them to return another number:\n\n      
add :: Int -> Int -> Int\n      
add x y = x + y\n\n      \n\n

This function `add` actually takes one param only, that is the first integer x, and then it returns another function, that takes the second integer y and then returns the final value. So now I am going to cease writing (and stop thinking) in terms of what a function takes as input, and what it returns as output. Instead, let us think of it in terms of what the type signature is.\n\n

Also, functions can be named as symbols also. In this cheat sheet, I have mentioned the common name for the functions written as symbols.  \n\n\n  \n\n\n

### Point Free Notation\n\n

Remember in mathematical equations how we could cancel a variable from both sides of an equation? We can do something similar here, but of course, there are some conditions. One that I use is this: _We can remove an input parameter name, if it is the last parameter and is being used on both sides of the function_. e.g. `addOne` can be shortened as:\n\n      
```haskell
addOne :: Int -> Int
addOne = (+1)
```

Now, this is not a strict rule, and I am not sure how valid this rule stands. We can read more about it in the [Haskell wiki](https://wiki.haskell.org/Pointfree).\n\n

Point free notation makes the code look a lot cleaner, and more importantly, it is very useful in composing functions together. If we don't understand function composition, we can think of Unix pipes, where, the output of one command goes as input to another command. Just as easily we can 'pipe' our functions together by using point-free notation.\n\n  \n\n\n

### List Syntax\n\n

Lists in Haskell are just written by wrapping comma-separated elements in square brackets. For representing types as a list of some other type, say `Int`, can be written as `[Int]`. For a generic type `a`, a list of type `a` is written as `[a]`.\n\n  \n\n\n


I am purposefully not going into more details of Haskell syntax, as I want this to be focussed on general FP and not particularly Haskell. There are plenty of resources that we can learn Haskell from and I am trying hard to not convert this post into a Haskell tutorial.\n\n

## FP Cheat Sheet\n\n

Having said that, here is the list of functions, definitions, constructs I keep coming back to again and again, whenever I have to read FP code or write a functional style code.  \n\n\n  \n\n\n

Hope this list would be helpful to someone (other than me!). All these functions are a topic in themselves and deserve a separate blog post for each of them. I also have tried to explain a lot of such FP practices using Scala and Haskell [here](https://amitashukla.in/blog/unfolding-folds.html), [here](https://amitashukla.in/blog/implement-functional-list-from-scratch-scala.html), [here](https://amitashukla.in/blog/tail-recursion-in-functional-programming.html) and [here](https://amitashukla.in/blog/why-functional-programming.html). I have also refrained from mentioning the laws associated with type classes to which most of these functions belong, but they also form an interesting read.\n
