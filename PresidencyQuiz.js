//VARIABLES ARE BELOW

//List for the names of the presidents.
var presidentNameList = getColumn("US Presidents","President");
//List for the presidency number.
var presidentNumList = getColumn("US Presidents", "Presidency");
//List for the picture of the presidents.
//List and images are taken from code.org
var presidentPicList = getColumn("US Presidents", "Portrait");
//Generates a random index to use to display images and name
var randomIndex = randomNumber(0,presidentNumList.length-1);

//variables for filtered values
var randomPresidentNum;
var randomPresidentImage;
var randomPresidentName;
var shownPresidents = [];
//Variables for description of how close the user's guess is
var lower = "The answer is lower than your guess. Please Try Again.";
var higher = "The answer is higher than your guess. Please Try Again.";
var numOnly = "Please enter a number only";
var outOfRange = "There have only been 46 terms. Please enter a number between 0 and 46.";


//ONEVENTS ARE BELOW


//Sets the screen to question screen 
onEvent("startButton","click",function(){
  setScreen("qnScreen");
  updateInfo();
});
//Gets user input from text box and sends it to checkGuess function.
var userGuess;
onEvent("checkButton","click",function(){
  userGuess = getText("userGuess");
  checkGuess(userGuess);
});
//Alternative option to get input from text box and send it 
//to checkGuess function
onEvent("userGuess","change",function(){
  userGuess = getText("userGuess");
  checkGuess(userGuess);
});
//Brings the user back to the start screen
onEvent("backHomeButton","click",function(){
  setScreen("HomeScreen");
});
//Ends the game and sets the screen to End Screen
onEvent("endGameButton","click",function(){
  setScreen("EndScreen");
  var presidentString = "";
  for (var i = 0;i<shownPresidents.length;i++){
    presidentString += shownPresidents[i] + ", ";
  }
  setText("PresidentListLabel",presidentString);
});
//Clears the list of shown presidents
onEvent("clearListButton","click",function(){
  shownPresidents = [];
  setText("PresidentListLabel","");
});


//FUNCTIONS ARE BELOW (MAIN CODE)


//Gets the image, name, and presidency number based on the random index generated
function updateInfo(){
  randomPresidentName = presidentNameList[randomIndex];
  randomPresidentImage = presidentPicList[randomIndex];
  randomPresidentNum = presidentNumList[randomIndex];
  setText("presidentNameLabel",randomPresidentName);
  setImageURL("PresidentPic",randomPresidentImage);
  setText("closeDescriptionLabel","");
  setText("userGuess","");
}

//Checks the guess and provides output on how close it is
//Append Item to a new list to display at the end screen which
//shows what presidents were shown.
//Rerolls the randomNumber variable to get a new random number
//updates the screen to the new data using updateInfo() function
function checkGuess(guess){
  if (isNaN(guess)){
    setText("closeDescriptionLabel",numOnly);
  } else if (guess < 0 || guess> 46){
      setText("closeDescriptionLabel",outOfRange);
  } else if (guess == randomPresidentNum){
      for (var i = 0;i<presidentNameList.length-1;i++){
        if (presidentNameList[i] == randomPresidentName){
          appendItem(shownPresidents,presidentNameList[i]);
        }
      }
      randomIndex = randomNumber(0,presidentNumList.length-1);
      updateInfo();
  } else if (guess < randomPresidentNum){
      setText("closeDescriptionLabel",higher);
  } else if(guess > randomPresidentNum){
      setText("closeDescriptionLabel",lower);
    }
}