"use strict";
require("dotenv").config();

function customConsole(string) {
  if (process.env.LOG == true) console.log(string);
}

/*FileToArray*/
let fs = require("fs");
let dictionary = fs
  .readFileSync("public/twl06.txt")
  .toString("utf-8")
  .split("\r\n");

/*ARRAY: scores of alphabet*/
const letters = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};
/*VAR: count scores*/
let sum;

/*FUNCTION: return score of letter*/
const lettersToScore = (letter) => {
  for (var index in letters) {
    if (
      Object.keys(letters).indexOf(
        letters[index].indexOf(letter) !== -1 ? index.toString() : "-1"
      ) !== -1
    ) {
      return parseInt(index);
    }
  }
};

/*FUNCTION: count final score*/
const score = (input) => {
  sum = 0;
  if (input === null || input === "") {
    return 0;
  }

  input
    .toUpperCase()
    .split("")
    .forEach(function (elem) {
      sum += lettersToScore(elem);
    });
  return sum;
};

//customConsole(`Random string ${random_seven}`); // Random Tiles for player

/*Recursive loop to generate all possible words from string*/
const tree = (leafs) => {
  let branches = [];
  if (leafs.length == 1) return leafs;
  for (var k in leafs) {
    let leaf = leafs[k];
    tree(leafs.join("").replace(leaf, "").split(""))
      .concat("")
      .map(function (subtree) {
        branches.push([leaf].concat(subtree));
      });
  }
  return branches;
};

/*
let generated_list_of_words = tree(random_seven.split("")).map(function (str) {
  return str.join("");
});
*/

/* Check if the words exist in the dictionary*/
const arrayContains = (needle, arrhaystack) => {
  return arrhaystack.indexOf(needle) > -1;
};

function scrabbleTrigger() {
  return {
    run: function (randomstring) {
      // Obtain the random 7 character value
      let generated_list_of_words = tree(randomstring.split("")).map(function (
        str
      ) {
        return Array.isArray(str) ? str.join("") : str;
      });

      generated_list_of_words = generated_list_of_words.filter(
        (v, i, a) => a.indexOf(v) === i
      );

      //customConsole("List of words ");
      //customConsole(generated_list_of_words);

      let generated_list_of_wordsLength = generated_list_of_words.length;
      let WordList = [];
      let WordListSize = [];
      let maxScore = 0;
      let MaxSizeWord = 0;
      for (var i = 0; i < generated_list_of_wordsLength; i++) {
        if (arrayContains(generated_list_of_words[i], dictionary)) {
          WordList.push(generated_list_of_words[i]); //Complete word list
          var WordScore = score(generated_list_of_words[i]);
          if (WordScore > maxScore) maxScore = WordScore;
          if (generated_list_of_words[i].length > MaxSizeWord)
            MaxSizeWord = generated_list_of_words[i].length;

          WordListSize.push({
            value: generated_list_of_words[i],
            size: generated_list_of_words[i].length,
            score: WordScore,
          });
        }
      }

      var return_values = {
        randomstring,
        //dictionary: dictionary,
        MaxSizeWord: MaxSizeWord,
        maxScore: maxScore,
        WordListSize: WordListSize,
        LongestStringWords: WordListSize.filter(function (WordListSize) {
          return WordListSize.size == MaxSizeWord;
        }),
        HighScoringWords: WordListSize.filter(function (WordListSize) {
          return WordListSize.score == maxScore;
        }),
      };

      return return_values;
    },
  };
}

module.exports.triggerScrabble = scrabbleTrigger;
