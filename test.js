let array1 = [{ number: 1, letter: "a" }, { number: 2, letter: "b" }, { number: 3, letter: "c" }, { number: 4, letter: "d" }, { number: 5, letter: "e" }]

let x = "2b"

let array2 = array1.filter((element) => { return element.number + element.letter !== x });
console.log(array2);
