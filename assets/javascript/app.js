$(document).ready(function () {
  var incorrectAnswers = 0;
  var unansweredQuestions = 0;
  var timeRemaining = 11;
  var intervalId;
  var restart = 0;
  var answered = false;
  var correctAnswerIndex=0;
  var correctAnswer = "";
  var currentQuestion = {};
  var questions = [{
    question: "What decidedly British beverage is Arthur Dent unable to find anywhere in the Universe?",
    answers: ["Pimm's #1 Cup", "A pint of Bitter", "Tea", "London Dry Gin"],
    correctAnswer: 2,
  }, {
    question: "What did 'The last ever Dolphin message, misinterpreted as a surprisingly sophisticated attempt to do a double backwards somersault through a hoop while whistling the 'Star Spangled Banner'' actually mean?",
    answers: ["Free us you cruel bastards!", "So long and thanks for all the fish", "We're really tired of fish", "Phish sucks!"],
    correctAnswer: 1,
  }, {
    question: "What is a Babel fish?",
    answers: ["A fish that won't stop blathering about", "The sequel to Inarritu's film Babel", "A leech-like fish that attaches to your ear and decodes inter-species languages", "A Danish pop band"],
    correctAnswer: 2,
  }, {
    question: "What did 'The last ever Dolphin message, misinterpreted as a surprisingly sophisticated attempt to do a double backwards somersault through a hoop while whistling the 'Star Spangled Banner'' actually mean?",
    answers: ["Free us you cruel bastards!", "So long and thanks for all the fish", "We're really tired of fish", "Phish sucks!"],
    correctAnswer: 1,
  }, {
    question: "What is the most intelligent species on Earth?",
    answers: ["chimpanzees", "dolphins", "elephants", "mice"],
    correctAnswer: 3,
  }, {
    question: "What is the 'Heart of Gold?",
    answers: ["A spaceship", "A department store that sells sofas", "A famous Vogon poem", "A song written by the legendary Bob Dylan"],
    correctAnswer: 0,
  }, {
    question: "Why did the Vogons destroy Earth?",
    answers: ["They just felt like destroying a random planet", "They were tired of Thanos getting all the cred", "To make way for an inter-galactic by-pass", "Vogons be Vogons"],
    correctAnswer: 2,
  }, {
    question: "Why is a Marvin the Paranoid Android depressed?",
    answers: ["No task he could be given would occupy even the tiniest fraction of his vast intellect.", "Alan Rickman has left this mortal coil.", "Quadratic equations are hard", "He listens to too much Radiohead."],
    correctAnswer: 0,
  }, {
    question: "What is the 'most massively useful thing an interstellar hitchhiker can have?'",
    answers: ["A Babel Fish", "A Ford Prefect", "a Pan Galactic Gargle Blaster", "A towel"],
    correctAnswer: 3,
  }, {
    question: "Who was voted a 'Worst Dressed Sentient Being in the Known Universe?'",
    answers: ["Zaphod Beeblebrox", "Trillian", "Arthur Dent", "Eccentrica Gallumbits"],
    correctAnswer: 0
  }];

  // game functions

  $("#start").on('click', function() {
    startGame();
  });

  $(document).on('click','.answersAll', function(e) {
    click(e);
  });

  function startGame() {
    console.log("started");
    $("#start").remove();
    correctAnswers = 0;
    incorrectAnswers = 0;
    unansweredQuestions = 0;
    loadQandA();
  }

  function loadQandA() {
    answered = false; 
    timeRemaining = 16;
    intervalID = setInterval(function() {timer();}, 1000);
    $('.answersAll').remove();
    if (answered === false) {
      timer();
    }
    restart = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[restart];
    correctAnswerIndex = currentQuestion["correctAnswer"];
    correctAnswer = currentQuestion["answers"][correctAnswerIndex]
    console.log("--- restart:" + restart);
    $('#question').html(currentQuestion["question"]);
    for (var i = 0; i < 4; i++) {
      var answer = questions[restart]["answers"][i];
      $('#answers').append('<button class= answersAll id=' + i + ' data-name=' + i + '>' + answer + '</button>');
    }
  }

  function click(e) {
    clearInterval(timer);
    console.log("--- e.target:" + $(e.target).data("name") + " correct: " + correctAnswer);
    if($(e.target).data("name") == correctAnswerIndex) {1
      correctAnswers++;
      console.log("C0rrect");
      alert("Correct!");
    } else {
      alert("Wrong, the correct answer is " + correctAnswer);
    }
    loadQandA();
  }

  function timer() {
    if (timeRemaining === 0) {
        answered = true;
        clearInterval(intervalID);
        $('#question').text("THE CORRECT ANSWER IS: " + correctAnswer);
        unAnswered();
    } else if (answered === true) {
        clearInterval(intervalId);
    } else {
        timeRemaining--;
        $('#timeRemaining').text("Time Remaining: " + timeRemaining);
    }
  }

});