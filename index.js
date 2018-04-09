  'use strict'

  const QUESTIONS = [{
          question: "What tool would you use to prevent camera shake?",
          correct: "2",
          answers: [
              'A telephoto lens',
              'A prime lens',
              "A tripod",
              'Nothing can'
          ]
      }, {
          question: "Depth of field is affected by what?",
          correct: "1",
          answers: [
              'Time of day, flash, and shutter speed',
              "Aperture, subject to camera, and focal length of the lens",
              'Apeture, ISO, and shutter speed',
              'Focal length, ISO, and time of day'
          ]
      }, {
          question: "What is one method you can use to capture a fast moving subject?",
          correct: "3",
          answers: [
              'Move camera with the subject',
              'Lower the shutter speed',
              "Increase the aperture size",
              "Increasing the camera's shutter speed"
          ]
      }, {
          question: "A lens with a fixed focal length is commonly called what?",
          correct: "0",
          answers: [
              "A prime lens",
              'A zoom lens',
              'A wide-angle lens',
              'A telephoto lens'
          ]
      }, {
          question: "What ISO setting will result in the least amount of noise?",
          correct: "3",
          answers: [
              'The highest ISO',
              'They all have noise',
              '6400',
              "The Lowest ISO"
          ]
      }, {
          question: "What kind of lens can capture a 180 degree view?",
          correct: "1",
          answers: [
              'A prime lens',
              "A fisheye lens",
              'A telephoto',
              'a tilt-shift lens'
          ]
      }, {
          question: "What camera function would you use to correct the color bias of light?",
          correct: "2",
          answers: [
              'ISO setting',
              'Auto-focus',
              "White balance",
              'Histogram'
          ]
      }, {
          question: "What causes red eye to occur?",
          correct: "0",
          answers: [
              "The flash reflecting off blood vessels in the eye",
              'The person blinking',
              'Red light emitting from the flash',
              'No one really knows'
          ]
      }, {
          question: "What does DSLR stand for?",
          correct: "3",
          answers: [
              'Dramatic shooting lens relay',
              'Digital single light reflect',
              'Digital soft light reflector',
              "Digital single lens reflex"
          ]
      }, {
          question: "What should the background do in a close-up picture?",
          correct: "2",
          answers: [
              'Be the main focus of the picture',
              'Compete with foreground subject',
              "Enhance and support the forground objects",
              "It doesn't matter in close-up pictures"
          ]
      }

  ];

  let questionIndex;
  let currentScore;


  function renderStart() {
      // //zeroes out score and questionIndex to ensure quiz starts at the beginning.
      questionIndex = 0;
      currentScore = 0;
      $('#score').text(`${currentScore}`);
      $('.scoreboard div').hide();
      $('.start-page').fadeIn(500); // renders start page
  }

  function setupListeners() {
      answerChecker();
      nextQuestion();
      restartHandler();
      finalResult();
      startQuiz();
  }

  // start screen button for user to initiate quiz
  function startQuiz() {
      //this function will add an event listener to the start button on the start page
      // when pressed it will take the user to the first question.
      $('.begin').on('click', function(event) {
          quizRender(questionIndex);
          $('.start-page')
              .fadeOut(500)
              .hide();
          $('.scoreboard div')
              .fadeIn(500)
              .show();
      });
  }

  function quizRender(index) {
      //this function will generate the quiz form by providing the question and the four optional answers
      $('.quiz-board').fadeIn(500);
      $('#js-question-form').fadeIn(500);
      $('.question').text(QUESTIONS[index].question);
      $('#question-num').text(`${questionIndex + 1}`);
      QUESTIONS[index].answers.forEach((answer, index) => {
          $(`#answer-${index}`).text(answer)
      });
      $('.next-button').hide();
      $('.final-button').hide();
  }

  function answerChecker() {

      $('#js-question-form').on('click', '.btn.answer', function() {
          let correctAnswer = `${QUESTIONS[questionIndex].correct}`;
          let userAnswer = $(this).attr('data-value');
          let correctAnswerText = QUESTIONS[questionIndex].answers[correctAnswer];
          let feedback;

          if (userAnswer === correctAnswer) {
              feedback = `You got it right! ${correctAnswerText} is the correct answer!`;
              incrementQuizScore();
          } else {
              feedback = `Sorry, but ${correctAnswerText}, is the correct answer.`;
          }
          feedbackRender(feedback);
          $('#js-question-form').hide();
          buttonHandler();
      });

  }


  // handler for the next question button
  function nextQuestion() {
      $('#next').on('click', function() {
          $('.feedback-text').hide();
          $('#js-question-form').fadeIn(500);
          quizRender(questionIndex); 
      });
  }

  //does a check to determine if the next question button or final result button should show
  function buttonHandler() {
      if (questionIndex < QUESTIONS.length - 1) {
          $('.next-button')
              .fadeIn(500)
              .show();
      } else {
          $('.final-button')
              .fadeIn(500)
              .show();
      }

  }

  // provides the feedback to user on if they got the question right or wrong
  function feedbackRender(text) {
      $('.feedback-text').text(`${text}`).fadeIn(500);
  }

  //this function will update by 10 points for each correct question.
  function incrementQuizScore() {
      currentScore += 10;
      $('#score').text(`${currentScore}`);

  }

 
  function finalResult() {
      // this function renders the final results to the user and provides a message on how they did.
      $('.final-button').on('click', function() {
          $('.scoreboard div').hide();
          $('.feedback-text').hide();
          $('.quiz-board').hide();
          resultFeedback();
          $(this).hide();
      });
  }

  // generates the apporpiate final results based on how the user did on the quiz
  function resultFeedback() {
      $(`.final-score`).fadeIn(500);

      let rank;
      let description;

      if (currentScore >= 70) {
          rank = "Your rank is professional";
          description = "Amazing! You are a pro with the camera!";
      } else if (currentScore > 30 && currentScore < 70) {
          rank = "Your rank is Amateur";
          description = "Good Job! You know your way around a camera but haven't quite mastered it. Just keep practicing and you too can be an expert!";
      } else {
          rank = "Your rank is Newbie";
          description = "It is clear that you are still new at using a camera but if you dream of being a photographer don't give up! Just keep practicing and you too can be an expert.";
      }
      $(`#rank-description`).text(description);
      $(`#rank`).text(rank);
  }

  // handler for the restart button
  function restartHandler() {
      $('.restart').on('click', function() {
          $('.final-score').hide();
          $('.start-page').show();
          renderStart();
      });
  }


  $(function() { 
  	setupListeners();
  	renderStart();
  });