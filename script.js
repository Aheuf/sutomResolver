const fs = require('fs');
const FIRST_LETTER = 'f';
const WORD_SIZE = 8;
const CONTAINED_LETTER = ['e','i','l','b'];
const NOT_CONTAINED_LETTER = ['a','u','o'];
const CONTAINED_LETTER_AT = [];

function extract() {
    let data = fs.readFileSync("./dict_fr.txt", "utf-8");
    return data.split(/\r\n/);
}

function orderBySize() {
    return extract().filter(word => word.length === WORD_SIZE);
}

function orderByFirstLetter() {
    return orderBySize().filter(word => word[0].toUpperCase() === FIRST_LETTER.toUpperCase());
}

function withLetter(dictionary, letter) {
    return dictionary.filter(word => word.includes(letter));
}

function withoutLetter(dictionary, letter) {
    return dictionary.filter(word => !word.includes(letter));
}

function withLetterAtPlace(dictionary, indexedLetter) {
    return dictionary.filter(word => word.charAt(indexedLetter.index) === indexedLetter.letter);
}

function resolve() {
    let dictionary = orderByFirstLetter();

    dictionary = CONTAINED_LETTER.map(letter => withLetter(dictionary, letter));

    dictionary = NOT_CONTAINED_LETTER.map(letter => withoutLetter(dictionary,letter));

    dictionary = CONTAINED_LETTER_AT.map(indexedLetter => withLetterAtPlace(dictionary, indexedLetter));

    return dictionary;
}

console.log(resolve())