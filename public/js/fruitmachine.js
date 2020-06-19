"use strict";
let MoneyInTheMachine_value = 100;
let spinlimit = 10;
let limitPlayerSpending = 15;
let alreadySpent = 0;
let totalWinningAmount = 0;

//OnLoad
document.getElementById(
  "MoneyInTheMachine"
).innerText = MoneyInTheMachine_value;

const checkallowance = () => {
  alreadySpent++;
  if (alreadySpent == limitPlayerSpending) {
    //Not allowed to spend more
    document.getElementById("MoneyInTheMachine").innerText =
      "Unfortunately you have spent your allowance and cannot proceed.  Thank you for playing. \n" +
      MoneyInTheMachine_value;
    document.getElementById("fruitMachinePull").remove();
  } else {
    rollFruitMachine();
  }
};

// Fruit Machine Roll begins.
const rollFruitMachine = () => {
  //Shuffle All x times
  for (let i = 0; i < spinlimit; i++) {
    setTimeout(function timer() {
      let final_list = spintheslots();
      //console.log(`The i is ${i} and spinlimit is ${spinlimit}`);
      if (i == spinlimit - 1) {
        //Check win status
        checkWin(final_list);
      }
    }, i * 50);
  }

  //Increase the money
  document.getElementById("MoneyInTheMachine").innerText =
    MoneyInTheMachine_value + 1;
  MoneyInTheMachine_value++;
  //console.log("Done incremeant");
};

const spintheslots = () => {
  //Generate Shuffled colors
  let SlotValueGenerationList = ["black", "white", "green", "yellow"];
  let final_list = [];
  shuffle(SlotValueGenerationList);
  //console.log(SlotValueGenerationList);
  //Remove existing class and replace with the new one.
  let current_fruit_machine_slot = document
    .getElementById("fruit-machine")
    .getElementsByTagName("li");
  for (let i = 0; i < current_fruit_machine_slot.length; i++) {
    current_fruit_machine_slot[i].className = SlotValueGenerationList[i];
    final_list[i] = SlotValueGenerationList[i];
  }
  return final_list;
};

const shuffle = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * 4);
    //console.log(`Trying ${currentIndex} Random Index ${randomIndex}` );
    currentIndex -= 1; // Loop limiter
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    //array[randomIndex] = temporaryValue;  // Force All Different.
  }
  return array;
};

const checkWin = (final_list) => {
  let checkifallequal = final_list.every((val, i, arr) => val === arr[0]);
  let checkifunique = new Set(final_list);
  //console.log(checkifunique.size);

  if (checkifallequal) {
    document.getElementById("MoneyInTheMachine").innerText =
      "Congratulations.  You have won " + MoneyInTheMachine_value;
    //totalWinningAmount
    totalWinningAmount = totalWinningAmount + MoneyInTheMachine_value;
    document.getElementById(
      "totalWinningAmount"
    ).innerText = totalWinningAmount;

    //Remove the amount
    MoneyInTheMachine_value = 0;
  }

  if (checkifunique.size == 4) {
    document.getElementById("MoneyInTheMachine").innerText =
      "Congratulations.  You have won half the amount " +
      MoneyInTheMachine_value +
      " which is " +
      MoneyInTheMachine_value / 2;

    //totalWinningAmount
    totalWinningAmount = totalWinningAmount + MoneyInTheMachine_value / 2;
    document.getElementById(
      "totalWinningAmount"
    ).innerText = totalWinningAmount;

    //Remove the amount
    MoneyInTheMachine_value = MoneyInTheMachine_value / 2;
  }
};

// Machine Lever pull
document
  .getElementById("fruitMachinePull")
  .addEventListener("click", checkallowance);
