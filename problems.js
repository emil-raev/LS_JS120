/* eslint-disable max-len */
// class CircularQueue {
//   constructor(size) {
//     this.size = size;
//     this.buffer = [];
//   }

//   enqueue(data) {
//     if (this.isFull()) this.dequeue();
//     this.buffer.push(data);
//   }

//   dequeue() {
//     if (this.isEmpty()) return null;
//     return this.buffer.shift();
//   }

//   isFull() {
//     return this.buffer.length === this.size;
//   }

//   isEmpty() {
//     return this.buffer.length === 0;
//   }
// }

// Object.prototype.ancestors = function () {
//   let proto = Object.getPrototypeOf(this);
//   if (proto === Object.prototype) return ['Object.prototype'];
//   return [proto.name].concat(proto.ancestors());
// };

// // name property added to make objects easier to identify
// let foo = { name: 'foo' };
// let bar = Object.create(foo);
// bar.name = 'bar';
// let baz = Object.create(bar);
// baz.name = 'baz';
// let qux = Object.create(baz);
// qux.name = 'qux';

// // eslint-disable-next-line no-extend-native
// Object.prototype.ancestors = function () {
//   let proto = Object.getPrototypeOf(this);
//   if (proto === Object.prototype) return ['Object.prototype'];
//   return [proto.name].concat(proto.ancestors());
// };

// console.log(qux.ancestors(),  // returns ['baz', 'bar', 'foo', 'Object.prototype']
//   baz.ancestors(),  // returns ['bar', 'foo', 'Object.prototype']
//   bar.ancestors(),  // returns ['foo', 'Object.prototype']
//   foo.ancestors());  // returns ['Object.prototype']

// class Pet {
//   constructor(species, name) {
//     this.species = species;
//     this.name = name;
//   }

//   getInfo() {
//     console.log(`a ${this.species} named ${this.name}`);
//   }
// }

// class Owner {
//   constructor(name) {
//     this.name = name;
//     this.pets = [];
//   }

//   numberOfPets() {
//     return this.pets.length;
//   }

//   addPet(pet) {
//     this.pets.push(pet);
//   }

//   printPets() {
//     this.pets.forEach(pet => pet.getInfo());
//   }
// }

// class Shelter {
//   constructor() {
//     this.adopters = [];
//   }

//   adopt(owner, pet) {
//     owner.addPet(pet);
//     if (!this.adopters.includes(owner)) this.adopters.push(owner);
//   }

//   printAdoptions() {
//     this.adopters.forEach(adopter => {
//       console.log(`${adopter.name} has adopted the following pets:`);
//       adopter.printPets();
//       console.log('');
//     });
//   }
// }

// let butterscotch = new Pet('cat', 'Butterscotch');
// let pudding = new Pet('cat', 'Pudding');
// let darwin = new Pet('bearded dragon', 'Darwin');
// let kennedy = new Pet('dog', 'Kennedy');
// let sweetie = new Pet('parakeet', 'Sweetie Pie');
// let molly = new Pet('dog', 'Molly');
// let chester = new Pet('fish', 'Chester');

// let phanson = new Owner('P Hanson');
// let bholmes = new Owner('B Holmes');

// let shelter = new Shelter();
// shelter.adopt(phanson, butterscotch);
// shelter.adopt(phanson, pudding);
// shelter.adopt(phanson, darwin);
// shelter.adopt(bholmes, kennedy);
// shelter.adopt(bholmes, sweetie);
// shelter.adopt(bholmes, molly);
// shelter.adopt(bholmes, chester);
// shelter.printAdoptions();
// console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
// console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

// class Banner {
//   constructor(message, width = message.length) {
//     this.message = message;
//     this.width = width;
//   }

//   displayBanner() {
//     console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.horizontalRule()].join("\n"));
//   }

//   horizontalRule() {
//     return `+-${'-'.repeat(this.width)}-+`;
//   }

//   emptyLine() {
//     return `| ${' '.repeat(this.width)} |`;
//   }

//   messageLine() {
//     let regex = new RegExp(`.{0,${this.width}}(?=\\s|$)`, "g");
//     let splitMessage = this.message.match(regex);

//     return splitMessage.map(line => `| ${line.padStart((this.width + line.length) / 2).padEnd(this.width)} |`).join('\n');
//   }
// }

// class createStudent {
//   constructor(name, year) {
//     this.name = name;
//     this.year = year;
//     this.courses = [];
//   }

//   info() {
//     return `${this.name} is a ${this.year} year student`;
//   }

//   listCourses() {
//     return this.courses;
//   }

//   addCourse(course) {
//     this.courses.push(course);
//   }

//   addNote(code, noteTxt) {
//     let course = this.courses.find(course => course.code === code);
//     course.note = (course.note || '') + noteTxt;
//   }

//   updateNote(code, noteTxt) {
//     let course = this.courses.find(course => course.code === code);
//     course.note = noteTxt;
//   }

//   viewNotes() {
//     this.courses.filter(course => course.note).forEach(course => console.log(`${course.name}: ${course.note}`));
//   }
// }