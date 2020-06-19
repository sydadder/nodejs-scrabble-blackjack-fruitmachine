"use strict";
require("dotenv").config();

function customConsole(string) {
  if (process.env.LOG == true) console.log(string);
}

function treasuresplit() {
  return {
    run: function (arr) {
      //cleanse the input
      arr = arr
        .replace(/, +/g, ",")
        .split(",")
        .map(Number)
        .sort(function (a, b) {
          return b - a;
        });
      customConsole(
        `Data obtained ${arr} - count of items that can be distributed ${arr.length} `
      );

      //first get the sum of them all
      let sumOfAllValues = arr.reduce((a, b) => a + b, 0);

      //Get all possible factors of the sum (sum of all values)
      const factors = (sumOfAllValues) =>
        Array.from(Array(sumOfAllValues + 1), (_, i) => i).filter(
          (i) => sumOfAllValues % i === 0
        );

      customConsole("Sum of all : " + sumOfAllValues);

      let AllFactors = factors(sumOfAllValues);
      customConsole(`Possible factors ${AllFactors}`);

      AllFactors = AllFactors.filter(function (x) {
        return x > 1 && x <= arr.length;
      });

      customConsole(
        `Possible factors - reduced by count of values - ${AllFactors}`
      );

      let removeThese = [];
      for (let f = 0; f < AllFactors.length; f++) {
        let element = AllFactors[f];
        let sumofalldividedbyfactor = sumOfAllValues / element;
        customConsole(
          ` Checking if there is any value greater than ${AllFactors[f]} in the main items array while the item distribution value is ${sumofalldividedbyfactor}`
        );
        // Remove from array
        if (arr.some((el) => el > sumofalldividedbyfactor)) {
          //customConsole(`Should remove ${element} and key ${f}`);
          removeThese.push(f);
        }
      }

      //Remove items which have a group total which is smallar than one of the values in the main items array
      for (var i = removeThese.length - 1; i >= 0; i--)
        AllFactors.splice(removeThese[i], 1);

      customConsole(
        `Possible factors - reduced by removing the values which are lower than the max - ${AllFactors}`
      );

      let finalOutput = {};
      let testData = [];
      //Loop through the possible divisions possible and see if the items can be equally divided
      for (let d = 0; d < AllFactors.length; d++) {
        let valueToDistribute = sumOfAllValues / AllFactors[d];
        customConsole(
          `${AllFactors[d]} people can have ${valueToDistribute} each `
        );

        //split the items into n members having x amount each
        let cloneArray = [...arr];
        let finalArray = []; // Complete distribution list
        let tempArray = []; // This will store the coin distribution (temporary array) values temporarily
        let coin = 0;

        let i = 1;
        while (cloneArray.length > 0) {
          customConsole(
            `----------- starting with array ${cloneArray} -----------`
          );

          if (tempArray.reduce((a, b) => a + b, 0) == valueToDistribute) {
            customConsole("############ RESET ################");
            finalArray.push(tempArray);
            tempArray = []; // Empty Temporary coins array
            coin = 0;
          }

          if (coin < cloneArray.length) {
            let check = tempArray.reduce((a, b) => a + b, 0) + cloneArray[coin]; //Sum of current tempArray and next coin value
            customConsole(
              `${cloneArray[coin]} : check if at index ${coin}  ${check} is less than ${valueToDistribute} and then add the value  ${cloneArray[coin]} to the tempArray`
            );

            if (check <= valueToDistribute) {
              //Check if the array sum is still under the distribution threshold
              tempArray.push(cloneArray[coin]);
              customConsole(
                `adding ${cloneArray[coin]} and removing ${cloneArray[coin]} from ${coin} position making tempArray ${tempArray}`
              );
              cloneArray.splice(coin, 1);
              if (cloneArray.length == 0) {
                finalArray.push(tempArray);
              }
            } else {
              //Create new temp array and move on
              customConsole(
                `NOT Adding tempArray ${tempArray} to the finalArray which currently is ${finalArray}`
              );

              coin = coin + 1;
            }
          } else {
            customConsole(
              `${cloneArray[coin]} is not defined Should end the loop`
            );
            break;
          }
        }

        if (finalArray === undefined || finalArray.length == 0) {
          // don't add this distribution
        } else {
          finalOutput[
            AllFactors[d] +
              " People Get total of " +
              valueToDistribute +
              " each"
          ] = finalArray;
          testData.push(AllFactors[d]);
        }

        customConsole(finalArray);
      }
      customConsole(finalOutput);

      var return_values = {
        item_values: arr,
        finalOutput,
        testData,
      };

      return return_values;
    },
  };
}

//console.log(treasuresplit().run("4,4,4,4").testData);
module.exports.treasuresplit = treasuresplit;
