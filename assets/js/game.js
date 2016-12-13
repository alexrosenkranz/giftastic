$(document).ready(function() {

  // Collect Questions and Answers

    // Show only New Game info on page load
  $('.game').hide();
  $('.results').hide();
  // Create HTML for game

  // Set Variables
  
  var correct;
  var wrong;
  var answer;
  var counter;
  var count;
  var timeout;
  var i = 0;

  var activeQuestion = {
    question: "",
    answer: '',
    choices: [],
  }

  // Questions 
    // Possible Answers
    // Correct Answer

  // This will be filled in during New Game function and emptied out throughout the game
  var questions = {};

  function setQuestions() {
    questions = {
      q1: {
        question: "What was the 1st video ever played on MTV?",
        answer: 'Video Killed The Radio Star',
        choices: ['Video Killed The Radio Star', 'Rock The Casbah', 'Billie Jean', 'Controversy','Back In Black'],
      },
      q2: {
        question: "What's the highest selling album of the 1980's in the US?",
        answer: '"Thriller" by Michael Jackson',
        choices: ['"Thriller" by Michael Jackson', '"Born In The USA" by Bruce Springsteen','"Purple Rain" by Prince','"Make It Big" by Wham!'],
      },
      q3: {
        question: "What was the title of Kayne West's debut album release in 2004?",
        answer: 'The College Dropout',
        choices: ['The College Dropout','Graduation','808s and Heartbreaks','The Life of Pablo','My Dark Twisted Fantasy','Yeezus','Late Registration'],
      },
      q4: {
        question: "Who is the most hated Canadian artist?",
        answer: 'Nickleback',
        choices: ['Nickleback','Bryan Adams','Drake','Justin Bieber','Avril Lavigne', 'Sum 41'],
      },
      q5: {
        question: "After Ian Curtis passed away in 1980, the remaining members of Joy Division went on to form this band.",
        answer: 'New Order',
        choices: ['New Order','The Talking Heads','Metallica','Bow Wow Wow','The Psychedlic Furs'],
      },
      q6: {
        question: "What Brooklyn-based band is originally from Ridgewood, NJ?",
        answer: 'Real Estate',
        choices: ['Real Estate','Small Black','Beach Fossils','Heavenly Beat','Kurt Vile'],
      },
      q7: {
        question: "What New Brunswick, NJ music venue has hosted the likes of The Gaslight Anthem and The Bouncing Souls?",
        answer: 'The Court Tavern',
        choices: ['The Court Tavern','Olde Queens','Knight Club','The State Theatre','Sigma Chi Fraternity House'],
      },
      q8: {
        question: "In what NJ town would you find E Street (of E-Street Band fame)",
        answer: 'Belmar',
        choices: ['Belmar','Asbury Park','Freehold','Long Branch','Red Bank'],
      },
      q9: {
        question: "RHCP frontman Anthony Kiedis appears in this movie.",
        answer: 'Point Break',
        choices: ['Point Break','Back To The Future','Forrest Gump','Surf Ninjas','Addams Family Values'],
      }
    };
  }


  // Timer Settings
  var questionTimer = {
    //Time Per Question
    time: 15,
    reset: function(t) {
      questionTimer.time = t;
      $('.timeLeft').html('Time Left: ' + questionTimer.time);
    },
    gameTimeout: function(){
      timeout = setTimeout(questionTimer.timeUp, 1000*16);
    },
    count: function() {
      $('.timeLeft').html('Time Left: ' +questionTimer.time);
      questionTimer.time--;
    },
    countDown: function(){
      counter = setInterval(questionTimer.count,1000);
    },
    stopTimer: function(){
      clearInterval(counter);
    },
    timeUp: function(){
      wrong++;
      questionTimer.reset(5)
      $('.answers').html('<h2>Incorrect! The answer is ' + activeQuestion.answer + ' </h2>');
      setTimeout(game, 5000);
    },
  };

  // Run this to make sure there are still questions left
  function gameOver() {
    if (Object.keys(questions).length === 0) {
      questionTimer.stopTimer();
      $('.game').hide();
      $('.results').show();
      $('.correct').html('Number Correct: ' + correct);
      $('.wrong').html('Number Incorrect: ' + wrong);
      activeQuestion = false;
    };
  };

  // Check if selected answer is correct or incorrect
  function answerCheck() {
    if (answer == activeQuestion.answer && questionTimer.time > 0) {
      correct++;
      questionTimer.reset(5);
      $('.answers').html('<h2>Correct! The answer is ' + activeQuestion.answer + ' </h2>');
      setTimeout(game, 5000);   
    }
      
    if (answer != activeQuestion.answer){
      questionTimer.timeUp();
    }
  }

   //Randomize order of possible answers
  function randomize() {
    activeQuestion.choices.sort(function() { 
      return 0.5 - Math.random(); 
    });
  };

  // Starts up the game
  function game(){

    // Checks to see if there are no more questions first
    gameOver();

    // If there are still questions left
    if (Object.keys(questions).length > 0) {

      // Get Question
      var keys = Object.keys(questions);
      var objIndex = keys[ keys.length * Math.random() << 0];
      activeQuestion = questions[objIndex];

      // Reorder the choices so it's not obvious
      randomize();

      // Delete question so it can't be pulled again
      delete questions[objIndex];

      // Empty out answer area from previous question
      $('.answers').empty();

      // Stop and Reset timer incase it was running
      questionTimer.stopTimer();
      questionTimer.reset(15);
      questionTimer.gameTimeout()

      // Start Timer
      questionTimer.countDown();

      // Place question information into .game area
      $('.question').html(activeQuestion.question);
      // Reset counter
      i=0;

      //Create buttons for possible answers
      $(activeQuestion.choices).each(function() {
      $('.answers').append('<button class="btn btn-lg option text-center">' + activeQuestion.choices[i] + '</button>');
      i++;
      });
    }; 

    // When you click on a possible answer
    $('.option').on('click', function(){
        answer = $(this).html();
        answerCheck();
        clearTimeout(timeout);
      });
  };

   // New Game Function
    // Resets score to zero
    // Sets new time countdown
  function newGame() {
    $('.results').hide();
    // questions = questionInfo;
    correct = 0;
    wrong = 0;
    $('.game').show();
  }

 
  $('.home').on('click','.start',function(){
    setQuestions();
    newGame();
    
    game();
  });
    

});