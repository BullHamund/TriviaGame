$("#start").on("click", function () {
  $("#start").remove();
  game.loadQuestion();
});

$(document).on('click', '.answer-button', function (e) {
  game.clicked(e);
})

$(document).on('click', '#reset', function () {
  game.reset();
})

let questions = [{
    question: "What decidedly British beverage is Arthur Dent unable to find anywhere in the Universe?",
    answers: ["Pimm's #1 Cup", "A pint of Bitter", "Tea", "London Dry Gin"],
    correctAnswer: "Tea"
  },
  {
    question: "What did 'The last ever Dolphin message, misinterpreted as a surprisingly sophisticated attempt to do a double backwards somersault through a hoop while whistling the 'Star Spangled Banner'' actually mean?",
    answers: [
      "Free us you cruel bastards!",
      "So long and thanks for all the fish",
      "We're really tired of fish",
      "Phish sucks!",
    ],
    correctAnswer: "So long and thanks for all the fish"
  },
  {
    question: "What is a Babel fish?",
    answers: [
      "A fish that won't stop blathering about",
      "The sequel to Inarritu's film Babel",
      "A leech-like fish that attaches to your ear and decodes inter-species languages",
      "A Danish pop band",
    ],
    correctAnswer: "A leech-like fish that attaches to your ear and decodes inter-species languages"
  },
  {
    question: "What did 'The last ever Dolphin message, misinterpreted as a surprisingly sophisticated attempt to do a double backwards somersault through a hoop while whistling the 'Star Spangled Banner'' actually mean?",
    answers: [
      "Free us you cruel bastards!",
      "So long and thanks for all the fish",
      "We're really tired of fish",
      "Phish sucks!",
    ],
    correctAnswer: "So long and thanks for all the fish"
  },
  {
    question: "What is the most intelligent species on Earth?",
    answers: ["chimpanzees", "dolphins", "elephants", "mice"],
    correctAnswer: "mice"
  },
  {
    question: "What is the 'Heart of Gold?",
    answers: [
      "A spaceship",
      "A department store that sells sofas",
      "A famous Vogon poem",
      "A song written by the legendary Bob Dylan",
    ],
    correctAnswer: "A spaceship"
  },
  {
    question: "Why did the Vogons destroy Earth?",
    answers: [
      "They just felt like destroying a random planet",
      "They were tired of Thanos getting all the cred",
      "To make way for an inter-galactic by-pass",
      "Vogons be Vogons",
    ],
    correctAnswer: "To make way for an inter-galactic by-pass"
  },
  {
    question: "Why is a Marvin the Paranoid Android depressed?",
    answers: [
      "No task he could be given would occupy even the tiniest fraction of his vast intellect.",
      "Alan Rickman has left this mortal coil.",
      "Quadratic equations are hard",
      "He listens to too much Radiohead.",
    ],
    correctAnswer: "No task he could be given would occupy even the tiniest fraction of his vast intellect."

  },
  {
    question: "What is the 'most massively useful thing an interstellar hitchhiker can have?'",
    answers: [
      "A Babel Fish",
      "A Ford Prefect",
      "a Pan Galactic Gargle Blaster",
      "A towel",
    ],
    correctAnswer: "A towel"
  },
  {
    question: "Who was voted a 'Worst Dressed Sentient Being in the Known Universe?'",
    answers: [
      "Zaphod Beeblebrox",
      "Trillian",
      "Arthur Dent",
      "Eccentrica Gallumbits",
    ],
    correctAnswer: "Zaphod Beeblebrox"
  },
];

let game = {
  questions: questions,
  currentQuestion: 0,
  counter: 30,
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  countdown: function () {
    game.counter--;
    $("#counter").html(game.counter);
    if (game.counter <= 0) {
      console.log("TIMES UP!");
      game.timesUp();
    }
  },
  loadQuestion: function () {
    timer = setInterval(game.countdown, 1000);
    $('#subwrapper').html("<h2>Time Remaining: <span id = 'counter'>30</span> Seconds</h2>");
    $('#subwrapper').append(
      '<h2>' + questions[game.currentQuestion].question + '</h2>'
    );
    for (let i = 0; i < questions[game.currentQuestion].answers.length; i++) {
      $("#subwrapper").append(
        '<button class = "answer-button" id = "button-' +
        i +
        '" data-name="' +
        questions[game.currentQuestion].answers[i] +
        '">' + questions[game.currentQuestion].answers[i] + '</button>'
      );
    }
  },
  nextQuestion: function () {
    game.counter = 30;
    $('#counter').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timesUp: function () {
    clearInterval(timer);
    game.unanswered++;
    $('#subwrapper').html('<h2>TIME IS UP!</h2>');
    $('#subwrapper').append('<h3>The correct answer is: ' +
      questions[game.currentQuestion].correctAnswer + '</h3>');
    if (game.currentQuestion == questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function () {
    clearInterval(timer);
    $('#subwrapper').html('<h2>GAME OVER!</h2>');
    $('#subwrapper').append("<h3>Correct: " + game.correct + "</h3>");
    $('#subwrapper').append("<h3>Incorrect: " + game.incorrect + "</h3>");
    $('#subwrapper').append("<h3>Unanswered: " + game.unanswered + "</h3>");
    $('#subwrapper').append("<button id = 'reset'>START OVER </button>");
  },
  clicked: function (e) {
    clearInterval(timer);
    if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
      game.answeredCorrectly();
    } else {
      game.answeredIncorrectly();
    }
  },
  answeredCorrectly: function () {
    console.log("correct!");
    clearInterval(timer);
    game.correct++;
    $('#subwrapper').html('<h2>YOU ARE CORRECT, SIR!<h2>');
    if (game.currentQuestion == questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredIncorrectly: function () {
    console.log("INCORRECT!")
    clearInterval(timer);
    game.incorrect++;
    $('#subwrapper').html('<h2>INCORRECT!<h2>');
    $('#subwrapper').append('<h3>The correct answer is: ' +
      questions[game.currentQuestion].correctAnswer + '</h3>');
    if (game.currentQuestion == questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function () {
    game.currentQuestion = 0;
    game.counter = 0;
    game.correct = 0;
    game.incorrect = 0;
    game.unanswered = 0;
    game.loadQuestion();
  },
};