const parseWithScope = require("babel-eslint/lib/parse-with-scope")

### 1.Given an array of objects[{ banana: 5, apples: 5 }, { pear: 6 }, { apples: 5 }, { banana: 2 }], return an object with the sum of all the fruits.

    Solution -
    let arr = [{ banana: 5, apples: 5 }, { pear: 6 }, { apples: 5 }, { banana: 2 }]

function sumOfFruits(arr) {

return arr.reduce((acc, curr) => {

    for (let x in curr) {

      acc['totalFruits'] = (acc['totalFruits'] || 0) + curr[x]
    }
    return acc

}, {})

}
let result = sumOfFruits(arr)






### 2. - count on the basis of name.

const person1 = { name: 'aryan', height: 178 };
const person2 = { name: 'kaush', height: 182 };
const person3 = { name: 'abhishek', height: 176 };
const person4 = { name: 'aryan', height: 78 };
const person5 = { name: 'kaush', height: 82 };
const person6 = { name: 'abhishek', height: 76 };
const person7 = { name: 'aryan', height: 18 };
const person8 = { name: 'kaush', height: 18 };
const person9 = { name: 'abhishek', height: 16 };

const arrs = [person1, person2, person3, person4, person5, person6, person7, person8, person9];

const result = arrs.reduce((acc, curr) => {

for (let x in curr) {
if (typeof curr[x] === 'string') {
acc[curr[x]] = (acc[curr[x]] || 0) + 1
}
}

return acc

}, {})

console.log(result, 'result')



### 3. Given a number in string format, return a single-digit no by recursively adding the digits in a string format .

Solution - 1.
let n = 9624
function ab(n, stri) {

if (n === 0) {
return n
}
if (n % 9 === 0) {
return 9
}
else {
return n % 9
}
}
let res = ab(n)

// OR

// Solution .2.

function ab(value) {

let newValue = 0

let str = String(value)

for (let x of str) {
newValue += Number(x)

}
if (newValue > 9) {
return ab(newValue)
}

return newValue

}

const res = ab(55555)

console.log(res, 'ressssssssssssss')


### 4. Reverse string at same place = 'you are winner'
// Ans -

let str = 'you are winner'

const rever = (str) => {
let spli = str.split(" ")
let arr = []

for (let x of spli) {
arr.push(x.split("").reverse().join(""))

}
return arr.join(" ")

}
const result = rever(str)
console.log(result)





### 5. Sort on this basis of height,ig height is same then sort on name.

const person1 = { name: 'aryan', height: 178 };
const person2 = { name: 'kaush', height: 182 };
const person3 = { name: 'abhishek', height: 176 };
const person4 = { name: 'aryan', height: 78 };
const person5 = { name: 'kaush', height: 82 };
const person6 = { name: 'abhishek', height: 76 };
const person7 = { name: 'zaryan', height: 18 };
const person8 = { name: 'kaush', height: 18 };
const person9 = { name: 'abhishek', height: 16 };
const person10 = { name: 'abhishea', height: 16 };

const arr = [person1, person2, person3, person4, person5, person6, person7, person8, person9, person10];

const result = arr.sort((a, b) => {

if (a['height'] > b['height']) {
return 1
}
if (a['height'] < b['height']) {
return -1
}

if (a['height'] === b['height']) {

    return -1

}
})

console.log(result, 'result')



### 6. find smallest word by length in an array.if length match then compare by ascii character.

const arr=['hello','cat','data','sata','apple','game','do','famous','bo',]

// Method /1.
function smallest(arr){
let smallLength= arr[0]
for(let x of arr){
if(smallLength.length>x.length){
smallLength=x
}
if(smallLength.length===x.length){
if(smallLength >x ){
smallLength = x
}
}
}
return smallLength
}
const result = smallest(arr) o/p = 'bo'



### 7. find 2nd largest Number.

// method .1.
// const arr = [2,6,3,8,9,11,4] // no duplicates are there.
// const result = arr.sort((a,b)=>b-a)
// console.log(result)

// when duplicates are there.
function sortarr(){
const arr2 = [4,2,14,11,5,14]
const newarr= arr2.reduce((acc,curr)=>{
if(acc.includes(curr)){
return acc
}
acc.push(curr)
return acc

    },[]).sort((a,b)=>b-a)[1]

return newarr
}
const result =sortarr()
console.log(result)



### 8 . Group book objects by genre:

Ans - Using GroupBy

const books = [
{ title: 'The Catcher in the Rye', genre: 'Fiction' },
{ title: 'Sapiens', genre: 'Non-Fiction' },
{ title: 'Dune', genre: 'Science Fiction' },
{ title: 'To Kill a Mockingbird', genre: 'Fiction' },
];

const group = Object.groupBy(books, (book) => book.genre);
OR
const group = Object.groupBy(books, ({genre}) => genre);

Ans - By using Reduce Method.

const result = books.reduce((acc,curr)=>{
acc[curr.genre] = acc[curr.genre] ? [...acc[curr.genre],curr] : [curr]
return acc
},{})



### 9. categorize numbers into odd and even groups:

const numbers = [1, 2, 6, 5, 4, 9];

Solution .1.
const result = Object.groupBy(numbers,(num)=> num%2===0 ? 'even' : 'odd')

Solution .2.
const res = numbers.reduce((acc,curr)=>{
if(curr%2===0){
acc['even']= acc['even'] ? [...acc['even'],curr] : [curr]
}else{
acc['odd']= acc['odd'] ? [...acc['odd'],curr] : [curr]
}
return acc
},{})


###  10. find duplicate key-value pairs.


const obj1 = {
a:1,
b:2,
c:3,
d:10,
e:12
}

const obj2= {
a:2,
f:6,
d:10,
e:12
}

// Answer : {d: 10, e: 12}

// Solution

function cal(val1,val2){
let dup={}

    for(let x in val1){

      for(let y in val2){
        if(x===y && val1[x]===val2[y]){
          dup[x]=val1[x]
        }
      }
    }

return dup
}
const res = cal(obj1,obj2)
