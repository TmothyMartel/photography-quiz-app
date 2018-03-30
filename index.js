  'use strict'

const QUESTIONS = [ 
	{
		question: "What tool would you use to prevent camera shake?", 
		correct: "A tripod", 
		answers:[
		'A telephoto lens',
		'A prime lens',
		"A tripod",
		'Nothing can']
	},
	{
		question: "Depth of field is affected by what?", 
		correct: "Aperture, subject to camera, and focal length of the lens", 
		answers:[
		'Time of day, flash, and shutter speed',
		"Aperture, subject to camera, and focal length of the lens",
		'Apeture, ISO, and shutter speed',
		'Focal length, ISO, and time of day']
	},
	{ 
		question: "What is one method you can use to capture a fast moving subject?", 
		correct: "Increasing the camera's shutter speed", 
		answers:[
		'Move camera with the subject',
		'Lower the shutter speed',
		"Increase the aperture size",
		"Increasing the camera's shutter speed" ]
	},
	{ 
		question: "A lens with a fixed focal length is commonly called what?", 
		correct: "A prime lens", 
		answers:[
		"A prime lens",
		'A zoom lens',
		'A wide-angle lens',
		'A telephoto lens']
	},
	{ 
		question: "What ISO setting will result in the least amount of noise?", 
		correct: "The Lowest ISO", 
		answers:[
		'The highest ISO',
		'They all have noise',
		'6400',
		"The Lowest ISO"]
	},
	{ 
		question: "What kind of lens can capture a 180 degree view?", 
		correct: "A fisheye lens", 
		answers:[
		'A prime lens',
		"A fisheye lens",
		'A telephoto',
		'a tilt-shift lens']
	},
	{ 
		question: "What camera function would you use to correct the color bias of light?", 
		correct: "White balance", 
		answers:[
		'ISO setting',
		'Auto-focus',
		"White balance",
		'Histogram']
	},
	{ 
		question: "What causes red eye to occur?", 
		correct: "The flash reflecting off blood vessels in the eye", 
		answers:[
		"The flash reflecting off blood vessels in the eye",
		'The person blinking',
		'Red light emitting from the flash',
		'No one really knows' ]
	},
	{ 
		question: "What does DSLR stand for?", 
		correct: "Digital single lens reflex", 
		answers:[
		'Dramatic shooting lens relay',
		'Digital single light reflect',
		'Digital soft light reflector',
		"Digital single lens reflex" ]
	},
	{ 
		question: "What should the background do in a close-up picture?", 
		correct: "Enhance and support the forground objects", 
		answers:[
		'Be the main focus of the picture',
		'Compete with foreground subject',
		"Enhance and support the forground objects",
		"It doesn't matter in close-up pictures" ]
	}

];

let questionIndex;
let currentScore;

function renderStart() {
  //zeroes out score and questionIndex to ensure quiz starts at the beginning.
  questionIndex = 0;
  currentScore = 0;
  $('#score').text(`${currentScore}`);
  $('.scoreboard div').hide();

  // renders start page
	$(`<div class="start-page">
				<h2 class="welcome">Test your knowledge of photography</h2>
				<p> You will be asked 10 questions about some of the core principles of this art form. Can you get them all correct? Click start to begin and good luck!</p>
				<button type="button" name="start" class="btn begin">Start Quiz</button>
			</div>`).hide().appendTo('.container').fadeIn(500);
	startQuiz();
}

// start screen button for user to initiate quiz
function startQuiz() {
	//this function will add an event listener to the start button on the start page
	// when pressed it will take the user to the first question.
	$('.begin').on('click', function(event){
		quizRender(questionIndex);
		$('.start-page').fadeOut(500).remove();
		$('.scoreboard div').fadeIn(500).show();
	});
}

function quizRender(index) {
	  //this function will generate the quiz form by providing the question and the four optional answers
	 $(`<div class="quiz-board">
			<form id="js-question-form" class="question-form" role="form">
				 <h2 class="question">${QUESTIONS[index].question}</h2>
				 <fieldset>
				  	<legend>Pick the correct answer</legend>
				 <button type="button" data-value="${QUESTIONS[index].answers[0]}" class=" btn answer">${QUESTIONS	[index].answers[0]}</button>
			 	 <button type="button" data-value="${QUESTIONS[index].answers[1]}" class="btn answer">${QUESTIONS[	index].answers[1]}</button>
			 	 <button type="button" data-value="${QUESTIONS[index].answers[2]}" class="btn answer">${QUESTIONS[index].answers[2]}</button>
			 	 <button type="button" data-value="${QUESTIONS[index].answers[3]}" class=" btn answer">${QUESTIONS[index].answers[3]}</button>
			 	 </fieldset>
			</form>
			<div class="next-button">
					<button type="button" name="next-question" id="next" class="btn">Next Question</button>
			</div>
			<div class="final-button">
				<button type="button" name="next-question" id="next" class="btn">See final results</button>
			</div>
		 </div>`).hide().appendTo('.container').fadeIn(500);

	$('.next-button').hide();
	$('.final-button').hide();
	answerChecker();
	quizQuestionIncrementer();
} 

function answerChecker() {
	let correctAns = `${QUESTIONS[questionIndex].correct}`;
	$('#js-question-form').on('click', '.btn.answer', function(){
		let correct = $(this).attr('data-value');
		if (correctAns === correct) {
			let feedbackCorrect = `You got it right! ${correctAns} is the correct answer!`;
			feedbackRender(feedbackCorrect);
			$('#js-question-form').remove();
			buttonHandler();
		 	quizScore();
			$('#score').text(`${currentScore}`);
		} else {
			let feedbackWrong =`Sorry, but ${correctAns}, is the correct answer.`;
			feedbackRender(feedbackWrong);
			$('#js-question-form').remove();
			buttonHandler();
		}
	});
	
}

function quizQuestionIncrementer() {
	//this function will be used to increment through the question object array
	//this will also update the quiz number in the scoreboard	
	questionIndex ++;
	questionNum();
	
}

// handler for the next question button
function nextQuestion() {
	$('#next').on('click', function(){
		$('.quiz-board').remove();
		$('.feedback-text').remove();
		quizRender(questionIndex);
	});
}

//does a check to determine if the next question button or final result button should show
function buttonHandler(){
	if (questionIndex < QUESTIONS.length) {
		nextQuestion();
		$('.next-button').fadeIn(500).show();
	} else {
 		$('.final-button').fadeIn(500).show();
		finalResult();
 	}
}

// provides the feedback to user on if they got the question right or wrong
function feedbackRender(text) {
  $(`<h2 class="feedback-text">${text}</h2>`).hide().prependTo('.container').fadeIn(500);
}

//this function will update by 10 points for each correct question.
function quizScore() {
	currentScore += 10;
	return currentScore;
	
}

//update the question number
function questionNum() {
	$('#question-num').text(`${questionIndex}`);
}

function finalResult() {
	// this function renders the final results to the user and provides a message on how they did.
	$('.final-button').on('click', function(){
		$('.scoreboard div').hide();
		$('.feedback-text').remove();
		$('.quiz-board').remove();
		resultFeedback();
		$(this).hide();
		restartHandler();
	});	
}

// generates the apporpiate final results based on how the user did on the quiz
function resultFeedback() {
  if (currentScore >= 70) {
    $(`<div class="quiz-board">
		  <div class="final-score">
		  	<h1 class="final-text">Your final score is ${currentScore}!</h1>
		  	<h2 class="final-text">Your rank is professional</h2>
		  	<p>Amazing! You are a pro with the camera!</p>
		  	<p>Would you like to try again?</p>
		  	<button type="button" name="restart" class="btn restart">Restart</button>
		  	</div>
		 </div>`).hide().appendTo('.container').fadeIn(500);
  } else if (currentScore > 30 && currentScore < 70) {
     $(`<div class="quiz-board">
		  <div class="final-score">
		  	<h1 class="final-text">Your final score is ${currentScore}!</h1>
		  	<h2 class="final-text">Your rank is Amature</h2>
		  	<p>Good Job! You know your way around a camera but haven't quite mastered it. Just keep practicing and you too can be an expert!</p>
		  	<p>Would you like to try again?</p>
		  	<button type="button" name="restart" class="btn restart">Restart</button>
		  	</div>
		 </div>`).hide().appendTo('.container').fadeIn(500);
  } else {
     $(`<div class="quiz-board">
		  <div class="final-score">
		  	<h1 class="final-text">Your final score is ${currentScore}!</h1>
		  	<h2 class="final-text">Your rank is Newbie</h2>
		  	<p>It is clear that you are still new at using a camera but if you dream of being a photographer don't give up! Just keep practicing and you too can be an expert.</p>
		  	<p>Would you like to try again?</p>
		  	<button type="button" name="restart" class="btn restart">Restart</button>
		  	</div>
		 </div>`).hide().appendTo('.container').fadeIn(500);
  }
}

// handler for the restart button
function restartHandler() {
	$('.restart').on('click', function(){
		$('.quiz-board').remove();
		$('.start-page').show();
		renderStart();
	});
}


$(renderStart);