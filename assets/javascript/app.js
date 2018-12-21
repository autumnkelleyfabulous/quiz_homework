$(document).ready(function(){
  

	$("#remaining-time").hide();
	$("#start").on('click', trivia.startGame);
	$(document).on('click' , '.option', trivia.guessChecker);
	
  })
  
  var trivia = {
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	currentSet: 0,
	timer: 30,
	timerOn: false,
	timerId : '',
	

	questions: {
	  q1: "How do the Spellman's get their mail from The Other Realm?",
	  q2: "What does Drell send Hilda everytime he stands her up?",
	  q3: "What does Sabrina turn Libby into?",
	  q4: "Which 90’s pop star did Sabrina’s dad zap in for her, to help combat her lonliness?",
	  q5: "Who streaks at Harvey's Halloween Party?",
	  q6: "Salem was turned into a cat because he was attempting to...",
	  q7: "Where do they live?",
	  q8: "What is the family secret?",
	  q9: "What is Aunt Vesta's one rule?",
	  q10:"What song does Sabrina make a music video for?"
  },
	options: {
	  q1: ["Mailbox", "Owls", "Toaster", "Ice Dispenser"],
	  q2: ["Chocolate", "Pot Roast", "A singing telegram", "A shooting star"],
	  q3: ["A puzzle", "A goat", "A pineapple", "All three"],
	  q4: ["Ashanti", "Britney Spears", "Avril Lavigne"],
	  q5: ["Sabrina", "Sabrina's Clone", "Libby", "Harvey"],
	  q6: ["Take over the World", "Eat humans", "Turn humans into cats", "Stole a Talking Car"],
	  q7: ["The Other Realm", "Massachusetts", "Florida", "Canada"],
	  q8: ["Everyone they kiss turns into a frog", "They're all born with an extra toe", "They're allergic to bees", "Everyone has a twin"],
	  q9: ["Wipe your feet", "Absolutley no mortals", "Dance it off","Never wake her up"],
	  q10: ["Blah, Blah, Blah", "Shake your Whammy Fanny Funky Song", "Soda Pop", "Abracadabra"]
  },
	answers: {
	  q1: "Toaster",
	  q2: "Pot Roast",
	  q3: "All three",
	  q4: "Britney Spears",
	  q5: "Sabrina's Clone",
	  q6: "Take over the World",
	  q7: "Massachusetts",
	  q8: "Everyone has a twin",
	  q9: "Absolutley no mortals",
	  q10:"Shake your Whammy Fanny Funky Song"
	},
	
	startGame: function(){

	  trivia.currentSet = 0;
	  trivia.correct = 0;
	  trivia.incorrect = 0;
	  trivia.unanswered = 0;
	  clearInterval(trivia.timerId);
	  clearTimeout(trivia.timerId);
	  
	
	  $('#game').show();

	  $('#results').html('');
	  

	  $('#timer').text(trivia.timer);
	  

	  $('#start').hide();
  
	  $('#remaining-time').show();
	  

	  trivia.nextQuestion();
	  
	},

	nextQuestion : function(){
	  
	
	  trivia.timer = 25;
	   $('#timer').removeClass('last-seconds');
	  $('#timer').text(trivia.timer);
	
	  if(!trivia.timerOn){
		trivia.timerId = setInterval(trivia.timerRunning, 1000);
	  }
	  

	  var questionContent = Object.values(trivia.questions)[trivia.currentSet];
	  $('#question').text(questionContent);

	  var questionOptions = Object.values(trivia.options)[trivia.currentSet];

	  $.each(questionOptions, function(index, key){
		$('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
	  })
	  
	},

	timerRunning : function(){

	  if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
		$('#timer').text(trivia.timer);
		trivia.timer--;
		  if(trivia.timer === 4){
			$('#timer').addClass('last-seconds');
		  }
	  }

	  else if(trivia.timer === -1){
		trivia.unanswered++;
		trivia.result = false;
		clearInterval(trivia.timerId);
		resultId = setTimeout(trivia.guessResult, 1000);
		$('#results').html('<h3>Out of time! The correct answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
	  }

	  else if(trivia.currentSet === Object.keys(trivia.questions).length){
		

		$('#results')
		  .html('<h3>Thank you for playing!</h3>'+
		  '<p>Correct: '+ trivia.correct +'</p>'+
		  '<p>Incorrect: '+ trivia.incorrect +'</p>'+
		  '<p>Unaswered: '+ trivia.unanswered +'</p>'+
		  '<p>Want to try again?</p>');
		
		
		$('#game').hide();
		
	
		$('#start').show();
	  }
	  
	},

	guessChecker : function() {

	  var resultId;

	  var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
	  

	  if($(this).text() === currentAnswer){
	
		$(this).addClass('btn-success').removeClass('btn-info');
		
		trivia.correct++;
		clearInterval(trivia.timerId);
		trivia.result = true;
		resultId = setTimeout(trivia.guessResult, 3000);
		$('#results').html('<h3>Correct Answer!</h3>');
	  }
	 
	  else{
	
		$(this).addClass('btn-danger').removeClass('btn-info');
		
		trivia.incorrect++;
		clearInterval(trivia.timerId);
		trivia.result = true;
		resultId = setTimeout(trivia.guessResult, 5000);
		$('#results').html('<h3>Better luck next time! '+ "The correct answer was: " + currentAnswer +'</h3>');
	  }
	  
	},

	guessResult : function(){
	  

	  trivia.currentSet++;
	  
	 
	  $('.option').remove();
	  $('#results h3').remove();

	  trivia.nextQuestion();
	   
	}
  
  }




// function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

// 	function showQuestions(questions, quizContainer){
//         var output = []
//         var answers;
// 	}

// 	function showResults(questions, quizContainer, resultsContainer){
// 		// code will go here
// 	}

// 	// show the questions
// 	showQuestions(questions, quizContainer);

// 	// when user clicks submit, show results
// 	submitButton.onclick = function(){
// 		showResults(questions, quizContainer, resultsContainer);
// 	}
// }

// var myQuestions = [
// 	{
// 		question: "How do the Spellman's get their mail from The Other Realm?",
// 		answers: {
// 			a: 'Owls',
// 			b: 'Toaster',
//             c: 'Mailbox',
//             d: 'Ice Dispenser'
// 		},
// 		correctAnswer: 'b'
// 	},
// 	{
// 		question: "What does Drell send Hilda everytime he stands her up?",
// 		answers: {
// 			a: 'Chocolate',
// 			b: 'A Singing Telegram',
//             c: 'A Shooting Star',
//             d: 'A Pot Roast'
// 		},
// 		correctAnswer: 'd'
//     },
//     {
// 		question: "What does Sabrina turn Libby into?",
// 		answers: {
// 			a: 'A Puzzle',
// 			b: 'A Goat',
//             c: 'A Pineapple',
//             d: 'All Of The Above'
// 		},
// 		correctAnswer: 'd'
// 	},
//     {
// 		question: "Which 90’s pop star did Sabrina’s dad zap in for her, to help combat her lonliness?",
// 		answers: {
// 			a: 'Ashanti',
// 			b: 'Britney Spears',
//             c: 'Avril Lavine',
    
// 		},
// 		correctAnswer: 'c'
//     },
//     {
// 		question: "What does Drell send Hilda everytime he stands her up?",
// 		answers: {
// 			a: 'Chocolate',
// 			b: 'A Singing Telegram',
//             c: 'A Shooting Star',
//             d: 'A Pot Roast'
// 		},
// 		correctAnswer: 'd'
//     },
//     {
// 		question: "What does Drell send Hilda everytime he stands her up?",
// 		answers: {
// 			a: 'Chocolate',
// 			b: 'A Singing Telegram',
//             c: 'A Shooting Star',
//             d: 'A Pot Roast'
// 		},
// 		correctAnswer: 'd'
// 	},



// ];