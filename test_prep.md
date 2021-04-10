# Test Prep for JS129 (Heejae0704)

## Objects

```javascript
const person = {
  name: "John Smith",
  age: 30,
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};
```

One of JavaScript's data types used to store properties (key-value pairs). Property keys must be strings or symbols (usually strings). Values can be of any type. If you define a property with a non - string key, it will first be converted to a string; When dealing with objects we are basically doing one of two things: setting a property or accessing a property. We can do both operations through the property key by using the bracket notation or the dot notation. Difference is brackets can take any UTF - 8 compatible string as the key, while the dot notation requires valid variable names;

```javascript
key in obj //includes prototype
obj.hasOwnProperty(key)
Object.keys //own enumerable
Object.getOwnPropertyNames

obj.propertyIsEnumerable(key)
```
JS objects use an internal `[[Prototype]]` property to keep track of their prototype. When you create an object with Object.create(proto), the new object's `[[Prototype]]` property gets assigned to the proto object; Note `[[Prototype]]` is an internal property. Cannot access it directly in your code. BUT you can access and replace its value with an Object method.

```javascript
 
let a = {
  foo: 1,
  bar: 2,
};
let b = {};
Object.setPrototypeOf(b, a);
Object.getPrototypeOf(b);
```
**Procedural Programming** - programs are a series of steps or procedures (variable declarations, conditionals, loops, and function calls) that we performed one after the other. As the program grows, so does the complexity and, before you know it, you end up with functions all throughout the code split up from the data that they operate on.

 **Object Oriented Programming** is the paradigm of thinking about problems as a collection of objects with state and behavior that interact with each other. OOP uses objects to organize a program. OOP makes our code flexible, easy to understand, and easy to change. Reduces dependencies and makes maintenance easier. Helps break down and solve problems. (Could be larger and less efficient.)


## Object Factories

The factory function lets us create multiple objects of the same "type" with a pre-defined "template." It is one of the possible ways but not necessarily the best one. Good thing about object factory (or factory function) is that you can have private variables using closure, but there are some disadvantages.

- Methods are copied to each object created by the factory function. This is not efficient way of using memory
- You cannot tell which factory function created the object (identify the specific "type" of the object).

```javascript
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`Hello, my name is ${this.name}`);
    },
  };
}

let john = createPerson("John Smith", 30);
john.greet();
```

## Collaborator

Objects that help provide state within another object are called collaborator objects, or more simply, collaborators. A collaborator works in conjunction -- in collaboration -- with the object to which it belongs.

```javascript
let pet = {
  name: "mrCat",
  age: 3,
  species: "cat",
};

let john = {
  name: "John Smith",
  pet: pet,
};

console.log(john.pet.name);
```

## Constructors and Prototypes

Constructor functions technically are regular functions. They are named with capital letter first. They should be executed only with "new" operator. When the function is invoked with `new` keyword, the following steps happen: (arrow, generators, short methods, builtins can't be constructors)

1. A new empty object is created and assigned to `this`.
2. The function body executes. Usually it modifies `this`, adds new properties to it.
3. The `[[Prototype]]` of the new object is set to F.prototype.
4. It returns the new object.

Constructors usually do not have explicit return value. When it does, if the function is invoked with `new` keyword:

- If the explicit return value is an object, it returns the object
- If the explicit return value is primitive, it returns the object created by `new` keyword and ignore the explicit return value

```javascript
function Person(name. age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  console.log(`Hello! My name is ${this.name} and I'm ${this.age} years old.`);
}

function Car(args) {
  Object.assign(this, args);

  this.drive = function() {
    this.started = true;
  };

  // rest of the methods
}
```

## OLOO (Objects Linking to Other Objects)

```javascript
let personPrototype = {
  greet() {
    console.log(
      `Hello! My name is ${this.name} and I'm ${this.age} years old.`
    );
  },

  init(name, age) {
    this.name = name;
    this.age = age;
    return this;
  },
};

let john = Object.create(personPrototype).init("John Smith", 30);
console.log(john);
```

## ES6 Classes

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    `Hello! My name is ${this.name} and I'm ${this.age} years old.`;
  }
}

let john = new Person("John Smith", 30);
```

## Instance and Static Members

Instances are objects created by a constructor. Instances can access the properties and methods in its prototype chain. This can be possible as the instance's hidden property `[[Prototype]]` is pointing to the prototype property of the constructor function.

Static members are the properties belong to the constructor itself. They are supposed to be called as properties or methods of the constructor, not with its instances.

```javascript
class Person {
  static averageAge = 80;
  static sayWord = function () {
    console.log("word!");
  };

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log("Hello!");
  }
}

let john = new Person("John Smith", 30);
console.log(Person.averageAge);
console.log(Person.sayWord());

console.log(john.name);
console.log(john.greet());

function Dog(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;
  Dog.allDogs.push(this);
}

Dog.allDogs = [];
```

## Prototypal inheritance

Objects created with OLOO pattern is actually implementing prototypal inheritance already, because the mechanism of connecting the object's internal `[[Prototype]]` property is pointing to another object, and the object can delegate method calls to that other object.

```javascript
let personPrototype = {
  sayName() {
    console.log(`My name is ${this.name} and I'm ${this.age} old.`);
  },

  init(name, age) {
    this.name = name;
    this.age = age;
    return this;
  },
};

let john = Object.create(personPrototype).init("John Smith", 30);
```

We can further explore OLOO inheritance pattern like this:

```javascript
let studentPrototype = Object.create(personPrototype);
studentPrototype.init = function (name, age, major) {
  personPrototype.init.call(this, name, age);
  this.major = major;
  return this;
};

let james = Object.create(studentPrototype).init("James Roh", 20, "Math");
```

## Pseudo-classical inheritance

```javascript
function Person(name. age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  console.log(`Hello! My name is ${this.name} and I'm ${this.age} years old.`);
}

function Student(name, age, major) {
  Person.call(this, name, age);
  this.major = major;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.study = function() { console.log("Studying!")};
Student.prototype.constructor = Student;
```

Above code is almost the same to the below, using ES6 `class` syntax:

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName() {
    console.log(`My name is ${this.name}.`);
  }
}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }

  sayMajor() {
    console.log(`My name is ${this.name} and my major is ${this.major}.`);
  }
}

let james = new Student("James Dean", 20, "Math");
```

## Encapsulation

Encapsulation is the idea of bundling data (state) and operations related to that data (behavior) in a cohesive unit called an object. In OOP, encapsulation also refers to the idea of restricting access to state and behavior (exposing only the interface needed).(e.g. user - account)

## Polymorphism

Polymorphism refers to the ability of objects with different types to respond in different ways to the same message (or method invocation); that is, data of different types can respond to a common interface.

This can be implemented via inheritance (shadowing inherited methods) and duck-typing (consistency of method naming among unrelated objects.)

## Mix-ins

As JavaScript objects can inherit from only one other object, the inheritance pattern may not be able to model the real world domains and situations. A mixin is a object containing methods that can be used by other classes without a need to inherit from it.

```javascript
let swimMixin = {
  swim() {
    console.log("I can swim");
  },
};

class Person {}
class Teen extends Person {}

Object.assign(Teen.prototype, swimMixin);
```

## Methods and functions

When a function is called as a property of an object, we call the function a method. When a function is called as a method, the execution context will set `this` to be the object that the function is called upon.

```javascript
let obj = {
  foo: "hello",
  bar: function () {
    console.log(`${this.foo}`);
  },
};

obj.bar(); // function bar is called as a method of 'obj' object. 'this' of the function body is 'obj' here. So the code logs 'hello'
```

However, the execution context will be lost when the method is assigned to a variable:

```javascript
let baz = obj.bar;
baz(); // 'this' is now global object, so the code logs 'undefined'
```

## Higher-order functions

functions that pass in other functions as arguments or return a function.

```javascript
[1, 2, 3].map((el) => el * 2); // map function passes in an annonymous function
```

## The global object

JavaScript creates a global object when it starts running. It serves as the implicit execution context for function invocations.


## Method and property lookup sequence

First in the object and then looking up for prototype chain.

## Function execution context and this

The execution context -- or context -- is a concept that refers to the environment in which a function executes. The context (value of the `this` keyword) depends on how the function or method was invoked, not on where the function was defined.

## Implicit and explicit execution context

When a function is called, not as a method of an object, implicit execution context is the global object. When a function is called as a method of an object, `this` binds to the object.

You can use `.call` or `.apply` method to call a function explicitly binding `this` to the first argument of the method.

Or you can also permanently bind `this` to a function by using `.bind` If you do that, binded `this` will not be changed further with `.call` or `.apply`

## Dealing with context loss: call, apply, and bind

Context can be lost when the method is assigned to a variable or passed into an argument, inner function not using the surrounding context. One way to solve this problem is to pass the context object as a second parameter (array methods).

```javascript
someObject.someMethod.call(context, arg1, arg2, arg3, ...)

function logNum() {
  console.log(this.num);
}

let obj = {
  num: 42
};

logNum.call(obj); // logs 42

Function.prototype.bind = function (...args) {
  let fn = this;
  let context = args.shift();

  return function () {
    return fn.apply(context, args);
  };
};

let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    function bar() {
      console.log(this.a + ' ' + this.b);
    }

    bar();
  },
};

obj.foo();        // => undefined undefined

let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    });
  },
};

obj.foo();

// => 1 undefined undefined
// => 2 undefined undefined
// => 3 undefined undefined
```

## Object.assign and Object.create

`Object.create()` creates an empty object. When an object is passed to as an argument, the created object will point the argument object as its prototype, so you can delegate method call to the prototype.

`Object.assign(obj1, obj2)` copies all enumerable own properties from one or more source objects to a target object, and returns the target object. It can be used during mix-in pattern.

## Built-in constructors like Array, Object, String and Number
```javascript
let emptyArray = new Array();
let numbers = new Array(1, 2, 3, 4)
let string = 'EEE';
[].every.call(string, char => char === 'E'); // => true

```

## Reading OO code

The idea behind a spike is to provide a general outline of how the program flows. Spikes take a high-level view, focusing on the general logic of the program; they don't concern ourselves with details like what it means for the game to be over.

Note that the (mostly) empty methods we created both here and earlier are stubs; they serve as placeholders for functions and methods to be written or removed later. They don't have any useful functionality yet; most stubs are either empty or return a constant value.

