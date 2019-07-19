import quizData from "./quiz-data.js";

// callback function to check answers
const checkAnswers = function(event) {
  // make sure listener wasn't add to another event
  if (event.type === "submit") {
    event.preventDefault();

    // prepearing array of user answers (should study if exists better pattern)
    const answers = [];
    for (let i = 0; i < quizData.questions.length; i += 1) {
      answers.push(0);
      for (const choice of document.getElementsByName(`question${i + 1}`)) {
        if (choice.checked) {
          answers[answers.length - 1] = Number.parseInt(choice.value);
          break;
        }
      }
    }

    // counting user's scores
    let correctAnswersCounter = 0;
    let scoresCounter = 0;
    const scores = [];

    // use simple 'for' 'couse we need index to compare values in two similar arrays
    for (let i = 0; i < answers.length; i += 1) {
      scores.push(0);
      if (answers[i] === quizData.questions[i].answer + 1) {
        correctAnswersCounter += 1;
        scores[i] = 1 / quizData.questions.length;
        scoresCounter += scores[i];
      }
    }

    // showing result to user
    const resultSection = document.createElement("section");
    const resultSectionHeader = document.createElement("h3");
    resultSectionHeader.textContent =
      (scoresCounter >= 0.8 ? "Тест пройден" : "Тест НЕ пройден") +
      ` (${Math.round(scoresCounter * 100, 2)}%)`;
    const resultSectionList = document.createElement("ol");

    formQuiz.insertAdjacentElement("beforeend", resultSection);
    resultSection.appendChild(resultSectionHeader);
    resultSection.appendChild(resultSectionList);

    for (const score of scores) {
      const resultSectionListItem = document.createElement("li");
      resultSectionListItem.textContent = `${score > 0} - ${Math.round(
        score * 100,
        2
      )}%`;
      resultSectionList.appendChild(resultSectionListItem);
    }

    // implementing styles to section of results
    resultSection.style.border = "2px solid";
    resultSection.style.padding = "2rem 2rem";
    resultSection.style.fontSize = "1.5rem";
    resultSection.style.marginTop = "1.5rem";
    resultSection.style.borderRadius = "5px";
  }
};

// searching for parent node (the form) to insert quiz into
const formSelector = "form";
const formQuiz = document.querySelector(formSelector);

if (formQuiz === null) {
  console.log("Page doesn't contain form object");
} else {
  // implementing styles to the form
  formQuiz.style.border = "2px solid";
  formQuiz.style.padding = "2rem 2rem";
  formQuiz.style.fontSize = "1.5rem";
  formQuiz.style.fontWeight = "bold";
  formQuiz.style.borderRadius = "5px";

  // taking button on the form as an object to insert title and sections before them
  const formButton = formQuiz.querySelector("button");
  // implementing styles to the button on the form
  formButton.style.display = "block";
  formButton.style.margin = "0 auto";
  formButton.style.background = "none";
  formButton.style.border = "2px solid";
  formButton.style.cuesor = "pointer";
  formButton.style.borderRadius = "5px";
  formButton.style.padding = "2rem 2rem";
  formButton.style.fontSize = "1.5rem";
  formButton.style.fontWeight = "bold";

  //   creating and nserting title element to form
  const formTitle = document.createElement("h2");
  formTitle.textContent = quizData.title;
  formQuiz.insertBefore(formTitle, formButton);

  //   creating and inserting sections of qustions
  for (let i = 0; i < quizData.questions.length; i += 1) {
    //use simple 'for' 'couse we need index as qustion number
    const questionItem = quizData.questions[i];
    const formSection = document.createElement("section"); //creating section

    const formSectionTitle = document.createElement("h3"); //creating section title
    formSectionTitle.textContent = `${i + 1} / ${quizData.questions.length}. ${
      questionItem.question
    }`;

    // implementing styles to sections
    formSection.style.border = "2px solid";
    formSection.style.padding = "2rem 2rem";
    formSection.style.fontSize = "1.5rem";
    formSection.style.marginBottom = "1.5rem";
    formSection.style.borderRadius = "5px";

    // creating and inserting answer options
    // creating list of choices
    const formSectionChoicesList = document.createElement("ol");
    // implementing styles to list
    formSectionChoicesList.style.listStyleType = "none";

    for (let j = 0; j < quizData.questions[i].choices.length; j += 1) {
      // use simple 'for' 'couse we need index as answer value
      const formSectionChoice = document.createElement("li");
      const formSectionChoiceLabel = document.createElement("label");
      const formSectionChoiceInput = document.createElement("input");

      // creating TextContent and implementing style to choices
      formSectionChoiceLabel.textContent = quizData.questions[i].choices[j];

      // setting up inputs
      formSectionChoiceInput.type = "radio";
      formSectionChoiceInput.name = `question${i + 1}`;
      formSectionChoiceInput.value = j + 1;

      // implementing style to inputs
      formSectionChoiceInput.style.height = "1.5rem";
      formSectionChoiceInput.style.width = "1.5rem";
      formSectionChoiceInput.style.background = "none";
      formSectionChoiceInput.style.border = "2px";

      // inserting answer object nodes chain into list
      formSectionChoiceLabel.insertAdjacentElement(
        "afterbegin",
        formSectionChoiceInput
      );
      formSectionChoice.appendChild(formSectionChoiceLabel);
      formSectionChoicesList.appendChild(formSectionChoice);
    }

    // inserting title & list into section
    formSection.appendChild(formSectionTitle);
    formSection.appendChild(formSectionChoicesList);

    // inserting section to form (before button)
    formQuiz.insertBefore(formSection, formButton);
  }

  // adding listener to form submit
  formQuiz.addEventListener("submit", checkAnswers);
}
