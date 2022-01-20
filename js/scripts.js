// Utility Logic
function noInputtedWord() {
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i].trim().length === 0) {
      return true;
    }
  }
  return false;
}

// Business Logic

function wordCounter(text) {
  if (noInputtedWord(text)) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function (element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function (element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function boldPassage(word, text) {
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function (element, index) {
    if (word === element) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== textArray.length - 1) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

function topThreeWords(text) {
  let count = [];
  let countedWords = [];
  const wordArray = text.toLowerCase().split(" ");
  wordArray.forEach(function (word) {
    let num = numberOfOccurrencesInText(word, text);
    if (!countedWords.includes(word)) {
      countedWords.push(word);
      count.push(num + " " + word);
    }
  });
  let initialOutput = count.sort();
  let finalOutput = initialOutput.reverse();
  let finalOutputArray =
    finalOutput[0] + " " + finalOutput[1] + " " + finalOutput[2];
  let string = finalOutputArray.split(" ");

  let firstWord = string[1] + " : " + string[0];
  let secondWord = string[3] + " : " + string[2];
  let thirdWord = string[5] + " : " + string[4];
  let commonWordsArray = [firstWord, secondWord, thirdWord];
  return commonWordsArray;
}

function arrayToList(text) {
  let htmlString = "";
  text.forEach(function (element) {
    htmlString = htmlString.concat("<li>" + element + "</li>");
  });
  return htmlString;
}

function firstInstanceOfWord(word, text) {
  const textArray = text.split(" ");
  let position = -1;
  textArray.forEach(function (element, index) {
    if (word === element && position === -1) {
      position = index;
    }
  });
  return position;
}

// UI Logic

$(document).ready(function () {
  $("form#word-counter").submit(function (event) {
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    const commonWords = topThreeWords(passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    $("#top-three-words").html(arrayToList(commonWords));
  });
});
