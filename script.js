"use strict";
const body = document.body;
const showQuestion = document.createElement("div");
showQuestion.classList.add("container", "quiz-box");
let nocheckbox = 0; // to check if all radio buttons are checked

function setAttributes(ele, attributes) {
  for (let keys in attributes) {
    let id_name = keys;
    let value = attributes[keys];
    ele.setAttribute(id_name, value);
  }
}
// To get data questions sets from Quiz API
const getQuestions = function () {
  fetch(
    "https://quizapi.io/api/v1/questions?apiKey=vFWAySoVU4YrdfSRJI5jq4Z6YgXyK01yqmFe1unM&limit=20&tags=JavaScript"
  )
    .then((response) => response.json())
    .then((data) => {
      Questions(data);
    })
    .catch((err) => console.error(err));
};

// To start the game
const gameStart = document.getElementById("play");
gameStart.addEventListener("click", () => {
  getQuestions();
  gameStart.classList.add("hidden");
});

function Questions(set) {
  showQuestion.innerHTML = ``;
  const currentQuestion = document.createElement("div");
  currentQuestion.classList.add("question", "quiz-box");
  currentQuestion.innerText = `Question: ${set[0].question}`;
  showQuestion.append(currentQuestion);
  let options = document.createElement("div");
  options.classList.add("options", "container");
  let qoptions = set[0].answers;
  let answerList = set[0].correct_answers;
  // To get the right answer
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
  let rightAnswer = getKeyByValue(answerList, "true");
  rightAnswer = rightAnswer.slice(0, -8);
  // To get options
  for (let keys in qoptions) {
    if (qoptions[keys] !== null) {
      const input_options = document.createElement("input");
      setAttributes(input_options, {
        name: "grp1",
        type: "radio",
        value: `${qoptions[keys]}`,
        id: `${keys}`,
      });

      const inputLabel = document.createElement("label");
      setAttributes(inputLabel, { for: `${keys}` });
      inputLabel.innerText = `${qoptions[keys]}`;
      let skipLine = document.createElement("br");
      options.append(input_options, inputLabel, skipLine);
    }
  }

  showQuestion.append(options);
  const checkAnswer = document.createElement("div");
  checkAnswer.classList.add("next-question");
  showQuestion.append(checkAnswer);
  const checkAnswerButton = document.createElement("button");
  checkAnswerButton.classList.add("next-btn");
  checkAnswerButton.setAttribute("id", "check");
  checkAnswerButton.innerText = "Check answer";
  checkAnswer.append(checkAnswerButton);
  const nextQuestion = document.createElement("div");
  nextQuestion.classList.add("next-question");
  showQuestion.append(nextQuestion);
  const nextButton = document.createElement("button");
  nextButton.classList.add("next-btn");
  nextButton.setAttribute("id", "next");
  nextButton.innerText = "Next Question";
  nextQuestion.append(nextButton);

  body.append(showQuestion);
  const checkBtn = document.querySelector("#check");
  const title = document.querySelector(".title-box");
  // To check answer
  checkBtn.addEventListener("click", () => {
    const radioButtons = document.querySelectorAll('input[name="grp1"]');
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        if (radioButton.id == rightAnswer) {
          title.innerText = "Correct";
          title.style.backgroundColor = "green";
        } else {
          title.style.backgroundColor = "red";
          title.innerText = "InCorrect";
        }
      } else {
        nocheckbox += 1;
      }
    }
    if (nocheckbox === radioButtons.length) alert("Please choose an option");
  });
  // To switch to next Question
  nextQuestion.addEventListener("click", () => {
    title.innerText = "Crack on!!!";
    title.style.backgroundColor = "#2e0249";
    showQuestion.innerHTML = ``;
    set.shift();
    if (set.length === 0) {
      showQuestion.classList.add("hidden");
      title.innerText = "Thats all for the day, Come Again";
      title.style.backgroundColor = "#5902EC";
      setTimeout(() => {
        location.reload();
      }, 3000);
    } else {
      Questions(set);
    }
  });
}