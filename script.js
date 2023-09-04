const fs = require('fs');
const FIRST_LETTER = 'h';
const WORD_SIZE = 5;
const CONTAINED_LETTER = [];
const NOT_CONTAINED_LETTER = ['a','t','s'];
const CONTAINED_LETTER_AT = [
    {
        letter:'',
        index:2
    },
];

function extract() {
    let data = fs.readFileSync("./dict_fr.txt", "utf-8");
    let dictionary = data.split(/\r\n/);
    console.log(`initial words : ${dictionary.length}`);
    return dictionary
}

function orderBySize() {
    const dictionary = extract();
    let newDictionary = [];

    dictionary.forEach(word => {
        if (word.length === WORD_SIZE) {
            newDictionary.push(word)
        }
    })
    console.log(`size checked words : ${newDictionary.length}`);
    return newDictionary
}

function orderByFirstLetter() {
    const dictionary = orderBySize();
    let newDictionary = [];

    dictionary.forEach(word => {
        if (word[0].toUpperCase() === FIRST_LETTER.toUpperCase()) {
            newDictionary.push(word);
        }
    })
    console.log(`first letter checked words : ${newDictionary.length}`);
    return newDictionary
}

function withLetter(dictionary) {
    let newDictionary = []
    let lettersArePresent = true;

    dictionary.forEach(word => {
        CONTAINED_LETTER.forEach(letter => {
            if (!word.includes(letter)) {
                lettersArePresent = false;
            }
        })
        if (lettersArePresent) {
            newDictionary.push(word)
        }
        lettersArePresent = true;
    })
    console.log(`with letter(s) checked words : ${newDictionary.length}`);
    return newDictionary;
}

function withoutLetter(dictionary) {
    let newDictionary = []
    let lettersAreAbsent = true;

    dictionary.forEach(word => {
        NOT_CONTAINED_LETTER.forEach(letter => {
            if (word.includes(letter)) {
                lettersAreAbsent = false;
            }
        })
        if (lettersAreAbsent) {
            newDictionary.push(word)
        }
        lettersAreAbsent = true;
    })

    console.log(`without letter(s) checked words : ${newDictionary.length}`);
    return newDictionary;
}

function withLetterAtPlace(dictionary) {
    let newDictionary = []
    let lettersArePresent = true;

    dictionary.forEach(word => {
        CONTAINED_LETTER_AT.forEach(element => {
            if (word.charAt(element.index) !== element.letter) {
                lettersArePresent = false;
            }
        })
        if (lettersArePresent) {
            newDictionary.push(word)
        }
        lettersArePresent = true;
    })

    console.log(`with letter at index checked words : ${newDictionary.length}`);
    return newDictionary;
}

function resolve() {
    let dictionary = orderByFirstLetter();
    if (CONTAINED_LETTER.length !== 0) {
        dictionary = withLetter(dictionary);
    }
    if (NOT_CONTAINED_LETTER.length !== 0) {
        dictionary = withoutLetter(dictionary);
    }
    if (CONTAINED_LETTER_AT.length !== 0) {
        dictionary = withLetterAtPlace(dictionary);
    }

    return dictionary;
}

console.log(resolve())