---

---

While we frequently and casually use subtyping while coding, in this post we take it to a level further and understand how Variance affects our code behaviour.

Let's begin with an example. Let's say we have a class `Animal`. It can `speak`, `eat` and `describe` itself.

```scala
class Animal(val name: String){
  def speak(): Unit = println("animal speaking")
  def eat(): Unit = println("animal eats")
  override def toString = "animal: " + name
}
```

While `Animal` has general properties, it can also be of two types: `Cat` and `Dog`. `Cat` and `Dog` `speak`, `eat` and `describe` themselves in their own way. Also, a dog has its own added function as well, `dogonly`. Similarly, a cat is special in its own way, say `catonly`.

```scala
class Cat(override val name: String) extends Animal(name) {
  override def speak(): Unit = println("meow")
  override def eat(): Unit = println("fish")
  def catonly : String = "cat only"
}

class Dog(override val name: String) extends Animal(name) {
  override def speak(): Unit = println("woof")
  override def eat(): Unit = println("bone")
  def dogonly : String = "dog only"
}
```

With the above examples in mind, let's over some concepts formally.
  
## Type
A type or a data type represents the type of data which tells the compiler/interpreter as to how the programmer intends to use that data. So, a type can be `Integer`, `String`, `Boolean`. We can create our own types as well, such as `Animal`, `Cat` and `Dog` as above. A type, the way it is defined, indicates what values it can take and what operations can be done on it.

## Subtyping 
Subtyping talks about the relationship between different types. We have a subtype and we have a supertype.

We can say that a type `B` is a subtype of `A` if:
- we can substitute `B` subtype in place of `A` supertype. 
- we can perform all the operations on `B` that can be performed on `A`. 

This is often written as `A :> B`, meaning that an instance of type `B` can be safely used wherever type `A` is expected. 

Let's be very clear on this as this will be the basis of our article: 
> If `Animal :> Cat`, then we can use `Cat` wherever we expect an `Animal`. 

So, if we have a list that expects objects of `Animal` type:

```scala
val animal1 = new Animal("animal1")
val animal2 = new Animal("animal2")
val animals : List[Animal] = List(animal1, animal2)
```

Then I can add a `Cat` type and a `Dog` type object to it as well:

```scala
val cat1 = new Cat("cat1")
val dog1 = new Dog("dog1")
val allTypesOfAnimals : List[Animal] = cat1 :: dog1 :: animals // this works as expected
```

But what about the reverse case? Does this relation hold true when the directions are reversed? 
Lets try passing an object of type `A` where `B` is expected when `A :> B`:

```scala
val cats : List[Cat] = List(cat1, cat2)
val brokenCats : List[Cat] = animal1 :: cats // error
```

Using the above example, it becomes clear that while we can add a `Cat` to a `List[Animal]`, we cannot add an `Animal` to a `List[Cat]`. The intuition behind this is that a subtype is special in some sense, and a supertype cannot replace it. Here, if we were to successfully pass `Animal` to a `List[Cat]`, it would break in case we call `catonly()` on `List[Cat]`. 

Working in OOP based lanuages makes this sound kinda obvious as we think about the same concept it in terms of Inheritance: an object of subclass cannot be passed where an object of superclass is required.

### Subtyping v/s Inheritance
At this point you may ask me, "Amita, why are you confusing us with subtyping and inheritance? Aren't we talking about inheritance here?" Well, actually, yes and no. I found this article [here](https://www.cmi.ac.in/~madhavan/courses/pl2009/lecturenotes/lecture-notes/node28.html#:~:text=In%20the%20object%2Doriented%20framework,refers%20to%20compatibility%20of%20interfaces.&text=Inheritance%20refers%20to%20reuse%20of%20implementations.) that can help:

> Subtyping refers to compatibility of interfaces. A type `B` is a subtype of `A` if every function that can be invoked on an object of type `A` can also be invoked on an object of type `B`.

> Inheritance refers to reuse of implementations. A type `B` inherits from another type `A` if some functions for `B` are written in terms of functions of `A`.

In OOPs, inheritance and subtyping usually go hand in hand, the syntax being the same makes it more confusing. For example, in our case, `Cat` and `Dog` are subtypes of `Animal`: any operations done on `Animal` can be done on `Cat` and `Dog` as well. Also, `Cat` and `Dog` inherit from `Animal`: we have redefined (overridden) the function in `Animal` in `Dog` and `Cat`.

The objective of this article is about understanding this difference. Inheritance helps you reuse the implementations  of methods/instance variables inside the super class, on the other hand, Subtyping deals with the safe behaviour of this class (a type) on the whole when it is passed to another data structure or function (formally called Variance).

> Subclassing doesn't guarentee Subtyping.

As here we are not discussing about reusing implementations, but actually dvelving into the beaviours of types in different conditions, we can get rid of this confusion and  rightly focus on the subtyping at this point.

## Variance -  Subtyping for complex types
Now that we have established how subtypes and super types are used and how they behave, lets take it a bit further. What about complex types? 

### Complex Types
Complex types are types which are composed of other types. e.g. `List`s, `Map`s, `Option`s, `Function`s etc... A `List` alone has no meaning. They are to be used as list of some type, say `List[Integer]`, `List[Animal]` etc. Similarly, a `function` has a type signature, say, `func (a : Integer, b : String) : Boolean`. Here a function `func` has the type signature as `(Integer -> String) -> Boolean`.

Variance defined formally is 
> Variance is the correlation of subtyping relationships of complex types and the subtyping relationships of their component types.

We are going to continue with our example above to understand this concept step by step. We will take a complex type, a `List`. If we have types `A` and `B` such that `A:>B`, how do we relate `List[A]` to a `List[B]`?

Reiterating on what we established above, if `A:>B`, we can pass `B` wherever we expect `A`. Can we then pass `List[B]` wherever we expect `List[A]`? Let's find out.

I have a function that expects a `List[Animal]` and does something with it:

```scala
def expectingListOfSupertype(animals : List[Animal]): Unit ={
  println(animals.map(_.toString))
}
```
Can I pass `cats: List[Cat]` in place of `animals: List[Animal]`?

```scala
expectingListOfSupertype(animals)
expectingListOfSupertype(cats) // yes, I can!
```

This proves a direct relationship: 

> if `A:>B`, then `List[A]:>List[B]`

Can I do the converse?

```scala
def expectingListOfSubtype(cats: List[Cat]): Unit = {
  println(cats.map(_.catonly))
}

expectingListOfSubtype(cats)
expectingListOfSubtype(animals) //type mismatch compile time error
```

No I can't. This makes sense because if we could pass `List[Animal]` to the function where `List[Cat]` is expected, it would have fail on calling the special function `catonly` on an animal. 

```scala
val cat1 = new Cat("cat1")
val cat2 = new Cat("cat2")
val cats : List[Cat] = List(cat1, cat2)
cats.map(e => e.catonly)

val dog1 = new Dog("dog1")
val dog2 = new Dog("dog2")
val dogs : List[Dog] = List(dog1, dog2)
dogs.map(e => e.dogonly)

val animal1 = new Animal("animal1")
val animal2 = new Animal("animal2")
val animals = List(cat1, dog1, animal1)

//val newCats : List[Cat] = cats.::(animal) // you can't add an animal to a list of cats
val newAnimals : List[Animal] = animals.::(cat1) // but you can do the opposite as Animal is supertype
```

/*
But what about complex types?
*/

/*
if A :> B,
implies that anywhere A is expected, we can pass B
therefore List[A] > List[B],
because, anywhere List[A] is expected, we can pass List[B]
*/
def expectingListOfSupertype(animals : List[Animal]): Unit ={
println(animals.map(_.toString))
}

expectingListOfSupertype(animals)
expectingListOfSupertype(cats)
// Observe above that we can pass a list of subtype where a list of supertype is expected

def expectingListOfSubtype(cats: List[Cat]): Unit = {
println(cats.map(_.catonly))
}

expectingListOfSubtype(cats)

//expectingListOfSubtype(animals) //type mismatch compile time error

// On the other hand,
// we cannot pass a list of supertype where a list of subtype is expected

/**
* Let's talk about functions now
*/
val superTypeFunction : Animal => String = animal => s"${animal.name} is here"
superTypeFunction(animal1)
superTypeFunction(cat1)

val subTypeFunction : Cat => String = cat => s"${cat.name} cat is here"
subTypeFunction(cat1)
// subTypeFunction(animal) // this won't work as per definition ( Just as in case of Lists):
// can't pass a supertype where a subype is expected
// but vice-versa holds true (again, as expected)

def funcThatExpectsSupertypeFunction(fun: Animal => String) = {
val fish = new Animal("nemo")
println(fun(fish))
}

funcThatExpectsSupertypeFunction(superTypeFunction)
//funcThatExpectsSupertypeFunction(subTypeFunction) // type mismatch

// observe above that we cannot pass a function of subtype where a function of supertype is expected

def funcThatExpectsSubTypeFunction(fun : Cat => String) = {
val cat = new Cat("fun cat")
println(fun(cat))
}

funcThatExpectsSubTypeFunction(subTypeFunction)
funcThatExpectsSubTypeFunction(superTypeFunction)
// on the other hand, we can pass a function of supertype where subtype is expected

// so you can't pass a sub type function that expects a super type func.
// this is opposite to the case we have for list
// we call this variance: lists are covariant whereas functions are contravariant

// So: if A:>B,
// List[A] :> List[B] (covariance)
// Function[A] <: Function[B] (contravariance)


/*
Let's talk about another structure, Arrays
*/

val catsArray : Array[Cat] = Array(cat1, cat2)
val animalArray : Array[Animal] = Array(animal1, animal2)


val seq = Seq(Seq("abc","f","12",1.0,2.0,3.0))
