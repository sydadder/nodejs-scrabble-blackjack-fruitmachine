"use strict";

const e = require("express");

class blackjack {
  constructor() {
    this.cardList = {
      AS: 11,
      JS: 10,
      QS: 10,
      KS: 10,
      AD: 11,
      JD: 10,
      QD: 10,
      KD: 10,
      AC: 11,
      JC: 10,
      QC: 10,
      KC: 10,
      AH: 11,
      JH: 10,
      QH: 10,
      KH: 10,
      "2S": 2,
      "3S": 3,
      "4S": 4,
      "5S": 5,
      "6S": 6,
      "7S": 7,
      "8S": 8,
      "9S": 9,
      "10S": 10,
      "2D": 2,
      "3D": 3,
      "4D": 4,
      "5D": 5,
      "6D": 6,
      "7D": 7,
      "8D": 8,
      "9D": 9,
      "10D": 10,
      "2C": 2,
      "3C": 3,
      "4C": 4,
      "5C": 5,
      "6C": 6,
      "7C": 7,
      "8C": 8,
      "9C": 9,
      "10C": 10,
      "2H": 2,
      "3H": 3,
      "4H": 4,
      "5H": 5,
      "6H": 6,
      "7H": 7,
      "8H": 8,
      "9H": 9,
      "10H": 10,
    };

    this.currentCardList = [];
    this.SamCards = [];
    this.DealerCards = [];
    this.deck();
    console.log("initiating blackjack");
  }

  shuffle = function (array) {
    array.sort(() => Math.random() - 0.5);
  };

  deck = function () {
    this.currentCardList = Object.keys(this.cardList);
    this.shuffle(this.currentCardList);
    return this.currentCardList;
  };

  deal = function (player) {
    if (player == "sam") {
      this.SamCards = [this.currentCardList[0], this.currentCardList[1]];
    } else {
      this.DealerCards = [this.currentCardList[0], this.currentCardList[1]];
    }
    console.log(`count : ${this.currentCardList.length}`);
    //Remove the two from the deck
    this.currentCardList.shift();
    this.currentCardList.shift();

    console.log(`count : ${this.currentCardList.length}`);
    console.log(this.currentCardList);
    console.log(this.SamCards);
    console.log(this.DealerCards);
  };
}

var hit = new blackjack();
hit.deal("dealer");

//module.exports = blackjack;
