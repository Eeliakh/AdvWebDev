1- its pretty much just an introduction of people and some idea of what is going to be shown in the JS videos.

2- JS is dynamically tight language. JS runs on server and from node.JS. most used programming language in the world (2019)slack, VScode, ect have been made with JS.

3- JS has access to something called "DOM" Document Object Module. node.js handles server tasks, not an actual file. on web browser JS works with script tags, and JS on servers work with node.js.

4- best tools for working with JS,- VScode is lightweight and works well. also open source and written in JS.
there are great VScode extensions for JS developing like ESLint and Prettier. Using NVM you can install node.js to manage updates and multiple environments.

5- i installed node.js via their own webpage, and added couple extensions like prettier and eslint into VScode to start off.

6- console.log lets you write messages from your code out to the console, you can use even emoji on the code and theyre valid. you can use substitutions as consts for data that program will know but user wont.

7- code comments, works with // to add text that is ignored in the code but will be shown for the developer. also /* */ works aswell for multiple lines. you probably wont need as much comments as you think.

8- comments can be great to make things more clear for the reader. i learned that i can write code and its components to explain itself by using terms as the functions.

9- declaring variables var let const. Var can be a problem in some cases because it can be declared almost anywhere. Let is only in the block. const is similar with let, its block scoped but cannot be changed afterwards.

10- i should use const mostly, but let variable can be useful in loops.

11- i can use str### variables in strings to list them in short names.

12- using quotations is important and proper spacing is essential to input messages into the code.

13- proper formatting with strings is important.

14- i didn't really grasp the idea of the expressions here. i need to practise it in own use first probably.

15- JS is weakly typed, checking type; typeof and instanceof. == ; true, type coerced, === ; false, type respected

16- i can check the types of strings via typeof or instanceof to find out what data type theyre.

17- just basic math variations and functions.

18- by using console.log(<different math commands>) i can form different math operations

19- conversions work with parseInt and parseFloat

20- converting strings to integers for instance= parseInt(`100`)); prints 100. but parseInt(`ABC`)); prints NaN

21- exceptions are interruptions in the intended execution. error is same as exceptions, but with incorrect syntax. you can handle these with try, catch, finally.

22- using logError i can log different errors from catch try and finally. 

23- Dates and how they work,- time is a construct and JS object. internally time is stored as number of milliseconds since 1 jan 1970. they are also consts. months start with zero.

24- const now = new Date(); console.log(now); gives us the date and the time UTC. dates can be specified with days and dates in the code.

25- != check for non equality regardless of data type, !== check for non equal values and data types. == checks for equality regardless of data type, === checks for equal values and data types. (triple usually better, same with !==)

26- you can run without curly braces if the code lines are single lines. running without curly braces can be an issue and cause unexpected errors. it will behave exactly same, but it can produce other errors.

27-  strings are case sensitive. its important to pay attention to your strings and names that they are the same. operators are & and &&, or | and || for comparisons. I.E else if (status === 400 || status === 500) other is switch case statements. case checks equality.

28- video shows an examples of how can i use && or || in loops. in this example we were using OK! and Error! and Unknown status. 

29- Arrays are lists or collection of values. each value has an index. after an array is created, you can check its length at any time with arrayName.length

30- setting up array length is important. you can do it I.E let arrayLength = 5;. then using let arr1 = Array(arraylength); you create one that has length of 5. 

31- adding data to an Array; 
let arrayLength = 2;
let arr2 = Array(arrayLength);
arr2[0] = "value at index 0";
console.log(arr2[0]); // shows "value at index 0"
console.log(arr2[1]); // shows undefined
First item in array always has index 0.

32- shows different examples of arrays being used and adding new data within them. this also shows what happens if there isnt any value in specific array. 

33- array methods; push and pop affects end of array. array.push(values) adds one or more value to end of array and returns its new length. array.pop() remove value from end of array and returns removed value shift and unshift does the same, but in front of the array. concat joins two arrays to make new one.

34- more examples of array methods that can be useful. push, pop, and shoft and unshift and lastly, concat.

35- loops; executes code multiple times. hard coded value, iterate through a list, while something is true. Common loop types are while, for and for ... of. you might want to consider which loops are the best for your code and needs.

36- going through several options of loops and examples of them that we covered in video #35. we used examples of while, for and for - of loops.

37- functions; we went through definition of function syntaxes. then, function usage, invocation. it is also good to name functions with something that tells what it does. I.E, function sayHello$() {}

38- in this video we went through multiple scenarios of functions. defining one, invocating, naming, parameters, and return.

39- fat arrow function! must be used immediately or assigned to a variable. this context is inherited from parent scope. single line arrow function will always be implicit. (even if its undefined)

40- examples for using arrow function. 
const add = (a, b) => a + b;
console.log(add(1, 2));
// results 3
Const substract = (a, b) => {
    const result = a - b;
    return result;
}
console.log(subtract(1, 1));
// results 0

41- JSON is language independent format because any modern programming language that supports 2 kinds of data structures can use JSON. converting into json uses stringify. restoring one uses json.parse. works also in arrays, jsonArray and parse.

42- examples of json usage. all you need to remember well is stringify and parse. you can use json effectively to find flattened format of data and its user readable.

43- objects are essentially inventory checking. it tells us information we need, like title, author, and is it available. we also went through object creation and properties. (dot notation or brackets) if youre on browser and JS on it,  global object is the window

44- a lot of code covered in this chapter, writing some below here. going through things we covered in #43.
const blank = {};
console.log("blank type:",typeof blank);
console.log("blank type:",blank);

