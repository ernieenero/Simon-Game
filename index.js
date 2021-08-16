var sequence = ["red", "blue", "green", "yellow"];

var setOf = [];
var level = 1;
var numOfClicked = 0;
// return random number for next color
function nextSeq(){
  return Math.floor(Math.random() * 4)
}
//show the next box and what you clicked
function show(numOfClicked){
  $("#" + setOf[numOfClicked]).addClass("pressed");
  setTimeout(function(){
    $("#" + setOf[numOfClicked]).removeClass("pressed");
  }, 100);
}
//color sound
function sound_color(color){
  let sound = new Audio('sounds/'+color+'.mp3');
  sound.play();
}
//show the next sequence
function next_button(number){
  show(number);
  sound_color(setOf[number]);

}

setOf.push(sequence[nextSeq()]);


$(document).on("keydown", function(event) {

  if (event.originalEvent.key == "Enter"){
    $("#level").text("Level: "+level);
    next_button(0);
    $("div.btn").on("click", function(event){
      let clicked = event.target.id;
      if(clicked == setOf[numOfClicked]){
        next_button(numOfClicked);
        numOfClicked++;
        if(numOfClicked == level){
          let num = nextSeq()
          setOf.push(sequence[num]);
          setTimeout(function next_button(){
            $("#" + sequence[num]).addClass("pressed");
            setTimeout(function(){
              $("#" + sequence[num]).removeClass("pressed");
            }, 100);
            sound_color(sequence[num]);
          }, 1000);
          level++;
          $("#level").text("Level: "+level);
          numOfClicked = 0;
        }
      }
      else{
        sound_color('wrong');
        $('body').addClass("game-over");
        $('#level').text('Game Over\nPress Any Key to Continue');
        $(document).keydown(function(){
          window.location.reload();
        });
      }
    });
  }
});
