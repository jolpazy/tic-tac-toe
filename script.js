$(document).ready(function(){

 $(".playground").hide();


 var getField = function(arr){
 var res = [];
  var res2 = [];
  for (var x in arr){
    for (var i in arr[x]){
      if(!res.includes(arr[x][i]) && !fieldsFull.includes(arr[x][i])) {res.push(arr[x][i])}
      else if (!fieldsFull.includes(arr[x][i])){res2.push(arr[x][i])}
    }
  };
    var resodd = res.filter(function(item){
      return item%2 !=0;
    });
    if (res.length == 0){
      var random = Math.floor(Math.random() * fieldsFree.length);
      return fieldsFree[random];
    }
  if (res2.length == 0){ if (resodd.length>0){
    var random = Math.floor(Math.random() * resodd.length);
    return resodd[random];} else { var random = Math.floor(Math.random() * res.length);
    return res[random];}
  }
   if (res2.length>1){
    var random = Math.floor(Math.random() * res2.length);
    return res2[random];
  } else {return res2[0]};
  };//getField;

  getWin = function(arr, fields){
function getWinArr(a, y){
  for (var i in a){
    var counter = 0;
    for (var x in y){
      if (a[i].includes(y[x])){counter ++};
      if (counter == 2){return a[i]}
    }
}
}
var x = getWinArr(arr, fields);
if (x == undefined){return false};
for (y in fields){
  x = x.filter(function(item){
    return item != fields[y]
  })
}
if (fieldsFull.includes(x)){return false}

return x;
 };//gw
 
 var draw = true;
  var player;
  var ai;
  var victory = false;
 var playerTurn = false;
  var  playerFields = [];
    var aiFields = [];
  var fieldsFull = playerFields.concat(aiFields);
  var fieldsFree = ["1", "2", "3","4", "5", "6","7", "8", "9"];
 
  var playerWin = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["3", "5", "7"], 
    ["1", "5", "9"]
  ];
    aiWin = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["3", "5", "7"], 
    ["1", "5", "9"]
  ];
  var aiPlay = function(id){

    if (fieldsFree.includes("" + id)){
        $("#" + id).html(ai);
      aiFields.push($("#" + id).attr("id"));
      fieldsFull = playerFields.concat(aiFields);
      playerTurn = true;
      playerWin = playerWin.filter(function(item){
        return !item.includes( "" +id);
      });
      fieldsFree = fieldsFree.filter(function(item){
        return !item.includes( "" +id);
      });
    }
    
  };

  $(".choice").click(function(){
    player = $(this).html();
    $(".promt").hide();
    $(".playground").show();
     if (player == "X"){
    ai = "O";
    playerTurn = true;
  }
  else {ai = "X"; }
  if (player == "O"){
    aiMove();
  }
})


var reset = function(){
  $(".field").html("");
  playerWin = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["3", "5", "7"], 
    ["1", "5", "9"]
  ];
   aiWin = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["3", "5", "7"], 
    ["1", "5", "9"]
  ];

  fieldsFree = ["1", "2", "3","4", "5", "6","7", "8", "9"];
  fieldsFull = [];
  player = undefined;
  ai = undefined;
  playerTurn = false;
 playerFields = [];
  aiFields = [];
  $(".playground").hide();
  $(".promt").show();
  victory = false;
  draw = true;
  

};//reset

check = function(){
  
  if (victory == true){

    var al = function(){alert("AI wins!")};
    var re = function(){reset()};
    
    var aa = function(){
          xy = setTimeout(al, 500);
      }();
        
        var ab = function(){
          xy = setTimeout(re, 500);
      }();
        

    
  
  }
  if (fieldsFree.length == 0 && draw == true){

     var al = function(){alert("Draw!")};
    var re = function(){reset()};
    
    var aa = function(){
          xy = setTimeout(al, 1000);
      }();
        
        var ab = function(){
          xy = setTimeout(re, 1000);
      }();


  }

}//check

//aimove
  var aiMove = function(){

    if (fieldsFree.includes("5") ){aiPlay("5")}

     else if (getWin(aiWin, aiFields)){
    var y =  getWin(aiWin, aiFields);
    aiPlay(y);
    playerTurn = false;
    victory = true;
     draw = false;
  
  }
    else if (getWin(playerWin, playerFields)){
    var y =  getWin(playerWin, playerFields);
    aiPlay(y);
  } 
    else if(aiFields.length == 1 && aiFields[0] == "5" && ai == "O"){
     
     var x = aiWin.reduce(function(a,b){ return a.concat(b)})
     var options = x.filter(function(item){return item%2 == 0});
      console.log("options", options)
     if (options.length == 3){

      var res1 = [];
      var res2 = [];
      for(var i in options){
        if (res1.includes(options[i])){res2.push(options[i])}
        else {res1.push(options[i])}
      }
      aiPlay(res2[0])
     } else {
     
      var random = Math.floor(Math.random() * options.length);
      aiPlay(options[random]); }
    }//case

   else  {
    var y = getField(aiWin);
      aiPlay(y)
  }

  check();
  };//aimove

 $(".field").click(function(){
      
   if (playerTurn == true &&  $(this).html() == ""){
     $(this).html(player);
     playerFields.push( $(this).attr("id"));
     fieldsFull = playerFields.concat(aiFields);
     var thisId = $(this).attr("id");
     aiWin = aiWin.filter(function(item){
       return !item.includes(thisId);
       });
      fieldsFree = fieldsFree.filter(function(item){
        return !item.includes(thisId);
      });
       playerTurn = false;
       
      var lateAi = function(){
          xy = setTimeout(aiMove, 1000);
      }();
    }
console.log(aiWin);
    });//player click

});//dc ready


