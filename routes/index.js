var express = require("express");
var router = express.Router();
require.cache = {};

router.get("/", function (req, res, next) {
  res.render("games", {
    title: "Game List",
  });
});

router.get("/games", function (req, res, next) {
  res.render("games", {
    title: "Game List",
  });
});

router.get("/blackjack/", function (req, res, next) {
  res.render("blackjack", {
    title: "Black Jack",
  });
});

router.get("/blackjack/trigger", function (req, res, next) {
  var blackjackObject = require("../src/blackjack.js");
  var hit = new blackjackObject();
  console.log(hit.deal()); // Produces an object.
  res.render("blackjack_data", {
    title: "Blackjack Trigger",
  });
});

router.get("/treasuresplit/", function (req, res, next) {
  res.render("treasuresplit", {
    title: "Treasure Split",
  });
});

router.get("/treasuresplit/?:value", function (req, res, next) {
  var value = req.params.value;
  var treasuresplitJS = require("../src/treasuresplit");
  //console.log(treasuresplitJS.treasuresplit().run(value).finalOutput);

  res.render("treasuresplit_data", {
    title: "treasuresplit",
    data: treasuresplitJS.treasuresplit().run(value),
    item_values: treasuresplitJS.treasuresplit().run(value).item_values,
    finalOutput: treasuresplitJS.treasuresplit().run(value).finalOutput,
  });
});

router.get("/fruitmachine", function (req, res, next) {
  res.render("fruitmachine", {
    title: "fruitmachine",
  });
});

/* GET Scrabble page. */
router.get("/scrabble", function (req, res, next) {
  res.render("scrabble", {
    title: "Scrabble",
  });
});

router.get("/scrabble/trigger/:randomstring", function (req, res) {
  var randomstring = req.params.randomstring;
  var scrabbleJS = require("../src/scrabble");
  var scrabbleJS_data = scrabbleJS.triggerScrabble().run(randomstring);
  //console.log(scrabbleJS_data);

  //console.log(scrabbleJS.triggerScrabble(randomstring).random_seven);

  res.render("scrabble_data", {
    RandomWordGenerated: randomstring,
    longestWordSize: scrabbleJS_data.MaxSizeWord,
    WordMaxScore: scrabbleJS_data.maxScore,
    LongestStringWords: scrabbleJS_data.LongestStringWords,
    HighScoringWords: scrabbleJS_data.HighScoringWords,
  });
});

module.exports = router;
