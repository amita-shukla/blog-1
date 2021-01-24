---
title: Deep Dive into Evaluating an Expression in Scala
tags: ["FUNCTIONAL PROGRAMMING","SCALA"]
cover: scala_meme.jpg
author: Amita Shukla
---


I have been using Scala for a while now. Coming from a Java background, it was eye soothing to see lesser boilerplate code. However, as I went deeper into more and more code written by Scala devs out there, there were a lot of things I just could not wrap my head around. Wait! This is not going to be a rant on the language. Instead, I will be touching upon the most basic stuff today - **declaring, initializing variables** (let's call them 'variable', though they may not necessarily vary) and **evaluating expressions**. 
 
There are painfully a lot of different ways to declare stuff in Scala, along with the regular `var` and `val`. Let's quickly glance over what we will be looking into: 


- [`var`s](https://www.blogger.com/blogger.g?blogID=1167440767733751967&pli=1#vars)
- [`val`s](https://www.blogger.com/blogger.g?blogID=1167440767733751967&pli=1#vals)
- [`def`](https://www.blogger.com/blogger.g?blogID=1167440767733751967&pli=1#defs)
- - [functions v/s methods, difference b/w `val` and `def`](https://www.blogger.com/blogger.g?blogID=1167440767733751967&pli=1#fvsm)
- [`lazy val`](https://www.blogger.com/blogger.g?blogID=1167440767733751967&pli=1#lazy_vals)
- - [a small exercise](https://www.blogger.com/blogger.g?blogID=1167440767733751967&pli=1#exercise)
- [function parameters](https://www.blogger.com/blogger.g?blogID=1167440767733751967&pli=1#function_params)
- - [call by value v/s call by name](https://www.blogger.com/blogger.g?blogID=1167440767733751967&pli=1#evaluation_strategies)
- [anonymous function](https://www.blogger.com/blogger.g?blogID=1167440767733751967&pli=1#anon_functions)
- [class parameters](https://www.blogger.com/blogger.g?blogID=1167440767733751967&pli=1#class_params)
- [case class parameters](https://www.blogger.com/blogger.g?blogID=1167440767733751967&pli=1#case_class_params)

As we go through all of the above, we shall take a peek into the related concepts.

 


### `var`s, that are allowed to vary

If you're coming from the Java world like me, then the simplest way to declare + define a variable is

 


You can, sometime later, change this value as shown above. 
A `var` must be initialized at the same place it is declared. The only place where it can be left undefined is when it is declared inside an abstract class or trait:

 


### `val`s, that can't vary

- `val`s are absolute values, which once assigned cannot be changed/reassigned at any point of time in the program.
- Like `var`s, `val`s cannot be left undefined outside of an abstract class or trait. But this is kind of obvious here, for something that cannot be changed later must not be left uninitialized.

`val` should be the goto way of using variables, as it helps to **design immutable structures**. While there can be a lot written about immutable data structures, in short we can say that by using immutable values we can avoid the risk of changing them later unintentionally.

 


### Define a variable with `def`

We can also write a variable using `def`:

Observe here, the REPL doesn't indicate the value of `x`, it just calls out that it has registered `x` with itself. Only when I call this _function `x`_ in the next step, that the execution happens. This is unlike what we have seen for `var` and `val`, where the REPL clearly indicates that it is storing an identifier `x` with a value `42`. 


I had seen this style being used in a lot of places, and I found it weird. Why define a variable the way we define a function? When I can write something as `val x = 42`, what difference it makes if I write the statement as `def x = 42` ? Both can be invoked in the same way also:

 


This is because **Scala differentiates between functions and methods**. The 'functions' we are calling out by using `def` is technically not a function but a method. Defining using `val` gives us the function in real sense in Scala. 
 


<re-img src="scala_meme.jpg"></re-img>

 
 


#### Functions v/s Methods

Let's divert briefly to understand the spaghetti that functions and methods are: 


- Functions in scala are instances of `Function0` - `Function22` class, and `Function` class contains methods such as `apply`, `toString`, `compose`, `andThen`. Hence, these functions can be applied on values defined using `val`.
- Methods in scala are a part of a class, just like a method in Java. These methods have access to other members of the same class. Methods also contain an implicit reference to `this`. And that is why we can call `map` on `List` (`map` has access to the instance of `List` it has been called upon).
- Hence, when we want certain behaviours as a part of a class, we define methods on that class, and for all other purposes, we use functions.

Let's come back to where we left. In terms of evaluation, one difference there is: a value defined using `val` is evaluated at the very point, whereas, a value defined using a `def` is evaluated only when it is called.

 


Here, that I have added a print statement at the time of definition. Observe that, `val x` is evaluated immediately at the time of definition, and is never evaluated ever again. On the other hand, `def y` is not evaluated at the time of definition but is rather delayed till its invocation. However, it is evaluated again each time `y` is used (This is synonymous with what is expected from a function).

While delaying execution till the time may be loosely termed as _lazy_, but this is not entirely lazy, as the execution happens every time the value is used.

### Make a value lazy with lazy val

In scala, a value can be made explicitly lazy using the keyword `lazy` before declaring a `val`. This means: 


- The value is not evaluated till its first use,
- The evaluated result is then stored and reused whenever the value is used later.
- If in a program, a `lazy val` is defined but never used, it is never evaluated.
- Lazy `val`s can be used to implement **memoization** technique.

The above snippet first shows the simple case, just add the keyword `lazy` with `val` to make a word lazy. In the next case, we add a print statement to show when is the actual execution is taking place. Observe here that \"y is executed\" is printed only when the `y` is used for the first time. 
 


#### A small exercise

Let's go through a small exercise that I found as a part of [Functional Programming Design in Scala course](https://www.coursera.org/learn/progfun2?specialization=scala), that may help to realize some of the above differences discussed above. 
What should be the result of `println(expr)`? 
 
Let's summarize how `val`, `lazy val` and `def` works here: 


- `val` evaluates the expression on initialization and stores the value with itself. Hence `print(\"x\")` occurs just the first time `val x` it is initialized.
- `lazy val` does not evaluate the expression when initialized. Rather, it evaluates when it is first used, and then stores the value with itself. Hence, `print(\"y\")` occurs not when it is initialized but when first used.
- `def` is not evaluated when it is first declared, but is evaluated every time a call is made. Hence `print(\"z\")` occurs every time `z` is used.

So, did you manage to get the right answer? Let's check: 
Hope you got it right! If not, try going through the steps again.

 


### Function Parameters

Now that we have covered `var`s, `val`s, `def`s and `lazy val`s. Let's look inside the functions. When we define functions, the parameters are `val` values. Here is a demonstration showing that once a parameter is received by a function, its value can't be changed:

#### Call by value v/s Call by name

By default in Scala, function parameters are evaluated before the function is applied/called. This evaluation strategy for function parameters is called **call by value**. 
 
The above statement shows Scala's depicts a call by value behaviour when a function is executed. First, the arguments passed to it are executed, and then the other statements in the body of the function. 
However, we may want to avoid evaluating arguments as soon as the function is executed, and rather delay its execution until it is actually used. This may help us to avoid unnecessary evaluation which may never be needed during the execution of the function. This strategy is called **call by name**. 
 
To accept a parameter as a call by name parameter, we insert a `=>` just before parameter type, like: `a : => Int` (This is the syntactic sugar for writing as `a : () => Int`). Observe the execution statements in the above snippet. The body of the function executes first, and the argument is evaluated only when it is actually needed. 
 


### Anonymous Functions

Anonymous functions also behave in the same way as normal functions and accept arguments as `val`s. 


Note that writing functions using `val` is simply assigning a variable name to an anonymous function. 
 


### Class Parameters

A class in Scala can take parameters, which is regarded as its primary constructor. These parameters can be `var`s or `val`s. 
Each instance of a class can be `var` or `val` too. But if we wish to create an immutable data structure, assigning an instance to a `val` is not sufficient. Instead, we must use `val` for class parameters too. 


A simple class can be created as without specifying a var or val. In that case, the member is private. 
 


### Case Class

A case class can also have `var` and val, but often it is used without keyword, and it defaults to `public val`. In fact, the use of `var` is 'strongly discouraged'. 
 


While we started with something really trivial, but we have covered a lot just by trying to understand how variables are declared and used in Scala programs. A lot of things I have just touched, and a lot are still left unexplored. But as I continue to program, I hope to continue to stumble into more and more challenges of writing beautiful code, and continue to write more and more about them here.

