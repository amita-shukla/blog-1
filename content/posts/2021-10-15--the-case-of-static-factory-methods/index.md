---
title: The Case of Static Factory Methods 
tags: ["PROGRAMMING", "JAVA", "EFFECTIVE JAVA"]
author: Amita Shukla
---

There is ample evidence how we can use constructors to create new objects, but still we can opt out the use of constructors somtimes. In the object oriented world, where everything is an object, sometimes need not be so. It is obvious to use the `new` keyword, as the only way to deal with an object. 

But we may not want that all the time. Lets consider a very common scenario of `Boolean`. We know that a boolean value represents one of the two values, `true` or `false`. When we attempt to create a boxed type for the same, we can create a `Boolean` object like this:

```java
class Boolean {
  boolean value;
  Boolean (boolean val){
    this.val = val;
  }
}
```

Let's try to instantiate it now:
```java
Boolean t = new Boolean(true);
Boolean t2 = new Boolean(true);
```

For the same value `true` we have now created the two objects. Is this ok? While the code is alright, but it has some major problems:
1. The class design is conceptually wrong. Here, `t` and `t2`, even though they contain the same value `true`, the condtion `t==t2` is going to return `false` coz ultimately they are different objects. To resolve this, we need to implement the `equals` method:

```java
boolean equals(Boolean b){
  return b.val == this.val ? true : false;
}
```

Now we need to use `equals` method for `Boolean` object comparison: `t.equals(t2) //true`. You see for such a simple object as Boolean, we have to add this extra complexity.

2. The second problem is the practical problem, and that is, afterall how much memory are we going to allocate to all the objects created in a huge program that uses it just for saving `true` or `false`? So you see, in this case, we don't actually need so many instances of boolean values, but just two,

We therefore make use of the **static factory methods** for this class:

```java
public Boolean {
  private boolean value;
  
  // make the constructor private
  private Boolean(boolean value) {this.value = value}

  // create two true and false objects, which are static
  private static Boolean TRUE = new Boolean(true);
  private static Boolean FALSE = new Boolean(false);

  // create static factory to access the above
  public static Boolean valueOf(boolean b){
    return b ? Boolean.TRUE : Boolean.FALSE; 
  }
}
```

As in the example above, static factory methods are some of the most commonly used guidelines for such cases. It can help us with the above case, where we have one of a fixed number of items to choose from. If we have more than 2 choices, we can also create a map of `<Val1, Type>` and return the valid values from there. 

Static Factory methods can also help us with Singleton classes, where we always need to return a single object of everything.

Another use is with returning some specific implementation of the class, depending on some criteria. 
