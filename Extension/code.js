setTimeout(function(){

var cx,cy;
    var doit=0,sName;
    if (document.getElementById("user_tag") != undefined){
    var name1=document.getElementById("user_tag").innerText;
          var name1H=name1.innerText;
    }
    var nameC=document.getElementsByClassName("text ulpt");
    //var name2=document.getElementsByClassName("text ulpt")[0];
   //  var name2=document.getElementsByClassName("text ulpt")[0];
  
    for (var i=0;i<nameC.length;i++)
    {
        console.log("@");
            if (nameC[i].innerText.indexOf(' ')!==-1) {
        sName = nameC[i].innerText.split(" ")[1]
} else {
let something = nameC[i].innerText;
do {
let i = something.indexOf(' ')
something = something.slice(i+1)
sName = something
}
while (something.indexOf(' ')!==-1)
} 
        console.log(name1,sName);
        if (name1 == sName)
        {doit = 1;

        }
    }

     
    if (document.getElementsByClassName("signin button button-empty")[0] != undefined) {
    var anonc = document.getElementsByClassName("signin button button-empty")[0];
    if (anonc.innerText == "SIGN IN")
        doit = 1;}
      //  var name2H=name2.innerText.split(" ")[0];
   // console.log(name1H,name2H);

if (doit == 1) {
   




console.log(document.cookie);
     var exdays = 1000;
     function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

     function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return decodeURIComponent(c.substring(name.length, c.length));
    }
  }
  return "";
}

//var lichess = document.getElementsByClassName("round__side")[0];
    var lichess = document.getElementById("main-wrap");

var keyORnot,KeyCO;
      KeyCO = getCookie("KeyB");
     if (KeyCO != "") {keyORnot = parseInt(KeyCO, 10);} else { keyORnot = 1;}

   // var button1 = document.createElement("button");
     var container = document.createElement("div");
   // var pieces = document.createElement("div");
   // pieces.id = "pieces";

     lichess.appendChild(container);
  //  lichess.appendChild(pieces);
container.id = "container";
    container.innerHTML = '<div id="container">' +
        '<button id="KeyboardO">Show</button>' +
        '<div id="pieces">' +
      '<label>Pawn Up :</label><input type="text" value="w" id="Kpawnu" class="keyB">'+
      '<label>Pawn ⇖ :</label><input type="text" value="q" id="Kpawnl" class="keyB">'+
      '<label>Pawn ⇗ :</label><input type = "text" value="e" id="Kpawnr" class="keyB">'+
      '<label>Queen :</label><input type="text" value="s" id="Kqueen" class="keyB">' +
     '<label>Rook :</label><input type="text" value="1" id="Krookl" class="keyB">' +
      '<label>Rook ▣ :</label><input type="text" value="3" id="Krookr" class="keyB">' +
     '<label>Knight :</label><input type="text" value="a" id="Kknightl" class="keyB">' +
      '<label>Knight ▣ :</label><input type="text" value="d" id="Kknightr" class="keyB">' +
      '<label>Bishop :</label><input type="text" value="Space" id="Kbishop" class="keyB">' +
    '<label>King :</label><input type="text" value="shift" id="Kking" class="keyB">' +
        '<label><button id="Save">Save</button></label>' +
      '<summary> Hover the cursor over a destination square and press a corresponding key* </summary>' +
    //  '<a href="https://ultrabullet.com/keyboard" id="readm" target="_blank">*Read more</a>' +
 '</div>' +



 '</div>' 
 
 
/*  +
 `
 <div style="display:inline;">
 <input type="checkbox" style="display:inline;" id="drag">

 </input>
 Drag Experimental (smoother moves)
 </div>
 `  */

    var button1 = document.getElementById("KeyboardO");
   //  var container = document.createElement("div");
    var pieces = document.getElementById("pieces");
  //  pieces.id = "pieces";
 var myInputs = document.getElementsByClassName("keyB");

var pFKc,pLKc,pRKc,qKc,roLc,roRc,knLc,knRc,biKc,kingKc;
var pFK,pLK,pRK,qK,roL,roR,knL,knR,biK,kingK;

   // button1.id = "KeyboardO";
  //  button1.innerText = "Hide";
    button1.addEventListener ("click", function(e) {
    e.preventDefault();
    if (keyORnot == 1)
    {
button1.innerText = "Show";
document.getElementById("pieces").style.display = "none";
RemoveInputListen();
keyORnot = 0;
       setCookie("KeyB", "0");
    } else
    {
         keyORnot = 1;
        button1.innerText = "Hide";
        document.getElementById("pieces").style.display = "block";
       AddInputListen();
       setCookie("KeyB", "1");
    }
button1.blur();
});


    var save = document.getElementById("Save");
    save.addEventListener ("click", function(e) {save.blur();});

 var focusK = 0;
     var storeK;



    if (keyORnot == 1) {button1.innerText = "Hide";
        document.getElementById("pieces").style.display = "block";
       AddInputListen();} else {button1.innerText = "Show";
document.getElementById("pieces").style.display = "none";}





     function AddInputListen() {
     for (var kk = 0; kk < myInputs.length; ++kk) {
    myInputs[kk].addEventListener('keydown', InputDown, false);
    myInputs[kk].addEventListener('focus', InputFocus, false);
    myInputs[kk].addEventListener('blur', InputBlur, false);
}
     }

     function InputDown(event){
         event.preventDefault();
        storeK = event.key.toLowerCase();
         //storeK = storeK.toLowerCase();
AssignKeys(this.id);}

     function InputFocus(event){focusK = 1;}
     function InputBlur(event){focusK = 0;
      /* if (oneKey() == true)
{
    document.getElementsByTagName("summary")[0].innerText = "Please make sure you use different keys for each piece";
    document.getElementsByTagName("summary")[0].style.color = "orange";
    document.body.removeEventListener("mousemove", MouseMove);
} else {
    document.getElementsByTagName("summary")[0].innerText = "Hover the cursor over a destination square and press a corresponding key";
    document.getElementsByTagName("summary")[0].style.color = "#b6a9b9";
    document.body.addEventListener("mousemove", MouseMove, false);
}*/}

    function RemoveInputListen() {
  for (var kk = 0; kk < myInputs.length; ++kk) {
    myInputs[kk].removeEventListener('keydown', InputDown);
    myInputs[kk].removeEventListener('focus', InputFocus);
    myInputs[kk].removeEventListener('blur', InputBlur);
}
    }


     function AssignKeys(idK)
     {

         //document.getElementById(idK).value = "";
         if (storeK == " "){
             document.getElementById(idK).value = "Space";
         } else {
       document.getElementById(idK).value = storeK; }
        // console.log(idK);
if (idK == "Kpawnu")
{pFK = storeK; if (storeK == " "){setCookie("pawn", "Space");}else{setCookie("pawn", pFK);}
}
    if (idK == "Kpawnl")
    {pLK = storeK; if (storeK == " "){setCookie("pawnl", "Space");}else{setCookie("pawnl", pLK);}
    }
    if (idK == "Kpawnr")
    {pRK = storeK; if (storeK == " "){setCookie("pawnr", "Space");}else{setCookie("pawnr", pRK);}
    }
    if (idK == "Kqueen")
    {qK = storeK; if (storeK == " "){setCookie("queen", "Space");}else{setCookie("queen", qK);}
    }
         if (idK == "Krookl")
         { roL = storeK; if (storeK == " "){setCookie("rookl", "Space");}else{setCookie("rookl", roL);}
         }
    if (idK == "Krookr")
    { roR = storeK; if (storeK == " "){setCookie("rookr", "Space");}else{setCookie("rookr", roR);}
    }
    if (idK == "Kknightl")
    { knL = storeK; if (storeK == " "){setCookie("knightl", "Space");}else{setCookie("knightl", knL);}
    }
    if (idK == "Kknightr")
    { knR = storeK; if (storeK == " "){setCookie("knightr", "Space");}else{setCookie("knightr", knR);}
    }
    if (idK == "Kbishop")
    { biK = storeK; if (storeK == " "){setCookie("bishop", "Space");}else{setCookie("bishop", biK);}
    }
    if (idK == "Kking")
    {kingK = storeK; if (storeK == " "){setCookie("king", "Space");}else{setCookie("king", kingK);}
    }
//fixKeys();
//console.log(pFK,pLK,pRK,qK,roL,roR,knL,knR,biK,kingK);

        if (oneKey() == true)
{
    //document.getElementsByTagName("summary")[0].innerText = "Please make sure you use different keys for each piece";
   // document.getElementsByTagName("summary")[0].style.color = "orange";

//document.getElementById(idK).style.backgroundColor = "#971400";
   for(var b = 0; b < 10; b++) {
myInputs[b].style.backgroundColor = "#636064";
};

for(var v = 0; v < 10; v++) {
   var samK = myInputs[v].value;

    for(var z = 0; z < 10; z++) {
    if (myInputs[z].value == samK && z != v) {
myInputs[z].style.backgroundColor = "#971400";
    myInputs[v].style.backgroundColor = "#971400";}
    }
};
    document.body.removeEventListener("mousemove", MouseMove);
}
         else {
    if (ch1skeys == 1){
    document.getElementsByTagName("summary")[0].innerText = "Hover the cursor over a destination square and press a corresponding key";
    document.getElementsByTagName("summary")[0].style.color = "#b6a9b9"; ch1skeys = 0;}

    for(var t = 0; t < 10; t++) {
myInputs[t].style.backgroundColor = "#636064";
}
    document.body.addEventListener("mousemove", MouseMove, false);
}

     }

  if (document.getElementsByClassName("mchat__say")[0] != undefined){
  var chat = document.getElementsByClassName("mchat__say")[0];
    chat.addEventListener("focus",function() {document.removeEventListener("keydown",KeyDown);console.log('f')});
    chat.addEventListener("blur",function() {document.addEventListener("keydown",KeyDown, false);console.log('b')});
    }

//var pFKc,pLKc,pRKc,qKc,roLc,roRc,knLc,knRc,biKc,kingKc;
//var pFK,pLK,pRK,qK,roL,roR,knL,knR,biK,kingK;
pFKc = getCookie("pawn"); if (pFKc != "") {if (pFKc == "Space"){pFK = " ";}else{pFK = pFKc;} document.getElementById("Kpawnu").value = pFKc;} else {pFK = "w"; }
pLKc = getCookie("pawnl"); if (pLKc != "") {if (pLKc == "Space"){pLK = " ";}else{pLK = pLKc;} document.getElementById("Kpawnl").value = pLKc;} else {pLK = "q"; }
pRKc = getCookie("pawnr"); if (pRKc != "") {if (pRKc == "Space"){pRK = " ";}else{pRK = pRKc;} document.getElementById("Kpawnr").value = pRKc;} else {pRK = "e"; }
qKc = getCookie("queen"); if (qKc != "") {if (qKc == "Space"){qK = " ";}else{qK = qKc;} document.getElementById("Kqueen").value = qKc;} else {qK = "s"; }
roLc = getCookie("rookl"); if (roLc != "") {if (roLc == "Space"){roL = " ";}else{roL = roLc;} document.getElementById("Krookl").value = roLc;} else {roL = "1"; }
roRc = getCookie("rookr"); if (roRc != "") {if (roRc == "Space"){roR = " ";}else{roR = roRc;} document.getElementById("Krookr").value = roRc;} else {roR = "3"; }
knLc = getCookie("knightl"); if (knLc != "") {if (knLc == "Space"){knL = " ";}else{knL = knLc;} document.getElementById("Kknightl").value = knLc;} else {knL = "a"; }
knRc = getCookie("knightr"); if (knRc != "") {if (knRc == "Space"){knR = " ";}else{knR = knRc;} document.getElementById("Kknightr").value = knRc;} else {knR = "d"; }
biKc = getCookie("bishop"); if (biKc != "") {if (biKc == "Space"){biK = " ";}else{biK = biKc;} document.getElementById("Kbishop").value = biKc;} else {biK = " "; }
kingKc = getCookie("king"); if (kingKc != "") {if (kingKc == "Space"){kingK = " ";}else{kingK = kingKc;} document.getElementById("Kking").value = kingKc;} else {kingK = "shift"; }


   function oneKey() {
   var Parr = [];
       Parr.push(pFK);
       Parr.push(pLK);
       Parr.push(pRK);
       Parr.push(qK);
       Parr.push(roL);
       Parr.push(roR);
       Parr.push(knL);
       Parr.push(knR);
       Parr.push(biK);
       Parr.push(kingK);
       console.log(Parr);
       return hasDuplicates(Parr);
console.log(hasDuplicates(Parr));
    }

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

    var ch1skeys = 0;
if (oneKey() == true)
{
    document.getElementsByTagName("summary")[0].innerText = "Please make sure you use different keys for each piece";
    document.getElementsByTagName("summary")[0].style.color = "red";
    ch1skeys = 1;
  //  document.body.removeEventListener("mousemove", MouseMove);

             keyORnot = 1;
        button1.innerText = "Hide";
        document.getElementById("pieces").style.display = "block";
       AddInputListen();
       setCookie("KeyB", "1");


    for(var v = 0; v < 10; v++) {
   var samK = myInputs[v].value;

    for(var z = 0; z < 10; z++) {
    if (myInputs[z].value == samK && z != v) {
myInputs[z].style.backgroundColor = "#971400";
    myInputs[v].style.backgroundColor = "#971400";}
    }

}



}


/* 
let drag = false;
let dragCheck = document.getElementById('drag')
if (getCookie("drag")!=="") {drag=true;dragCheck.checked=true;}
const dragCheckFunc = x =>
{
   if (!dragCheck.checked) {
      // dragCheck.checked=false
       drag = false
       setCookie("drag","")
} else {
   //dragCheck.checked=true
    drag = true
    setCookie("drag","drag")
}
} 
dragCheck.addEventListener('change', dragCheckFunc)

 */
    

    document.getElementById("clinput").remove();
/*
pFK = "w";    //pawn forward
pLK = "q";     //pawn takes to the left
pRK = "e";   //pawn takes to the right
qK = "s";   //queen
roL = "1";   //left rook
roR = "3";   //right rook
knL = "a";   //left knight
knR = "d";   //right knight
biK = " ";   //bishop
kingK = "shift";   //king */
var rmtch = "7";  // offer rematch
var cprm = "8";   //cancel premoves


var bparent = $(".cg-wrap")[0];
    var wclock, bclock;
    var mycolor;
    wclock = $("div.clock_white");
    wclock = wclock.length ? wclock[0] : null;
     function isFlipped() {
        return bparent.className.includes("orientation-black");
    }
   function get_color() {
        var mycolor = isFlipped() ? "black" : "white";
        var fen_els = $("input.copyable");
        if (fen_els.length > 0)
            mycolor = fen_els[0].value.split(" ")[1] === "w" ? "white" : "black";
        if (wclock) mycolor = wclock.className.includes("clock_bottom") ? "white" : "black";
        // TODO: in puzzles, detect that it's not a game and therefore mycolor = getTurn()
        //console.log("mycolor=" + mycolor);
        return mycolor;
    }



   // var colorclock = document.getElementsByClassName("time")[1].title;
   // var mycolor = colorclock.replace(/ .*/,'');

    mycolor = get_color();

    //console.log(mycolor);
//console.log(get_color());
    var nn0,nn1;
    if (mycolor == "white")
    {
        nn0=0;
        nn1=1;

         if (document.getElementsByClassName(mycolor+" rook")[nn1] != undefined)
       document.getElementsByClassName(mycolor+" rook")[nn1].style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDUgNDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1IDQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6I0ZGRkZGRjtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lam9pbjpyb3VuZDt9LnN0MXtmaWxsOiNGRkZGRkY7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuNTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fS5zdDJ7ZmlsbDojRkZGRkZGO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7fS5zdDN7ZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7fS5zdDR7ZmlsbDojM0VBRjRFO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjE4MjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO308L3N0eWxlPjxnPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05LDM5aDI3di0zSDlWMzl6IE0xMiwzNnYtNGgyMXY0SDEyeiBNMTEsMTRWOWg0djJoNVY5aDV2Mmg1VjloNHY1Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTM0LDE0bC0zLDNIMTRsLTMtMyIvPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0zMSwxN3YxMi41SDE0VjE3Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTMxLDI5LjVsMS41LDIuNWgtMjBsMS41LTIuNSIvPjxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMSwxNGgyMyIvPjwvZz48cmVjdCB4PSIyOC44IiB5PSIyOCIgY2xhc3M9InN0NCIgd2lkdGg9IjEzLjgiIGhlaWdodD0iMTMuOCIvPjwvc3ZnPg==')";
         if (document.getElementsByClassName(mycolor+" knight")[nn1] != undefined)
     document.getElementsByClassName(mycolor+" knight")[nn1].style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDUgNDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1IDQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6I0ZGRkZGRjtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9LnN0MXtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9LnN0MntmaWxsOiMzRUFGNEU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuMTgyMTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fTwvc3R5bGU+PGc+PHBhdGggY2xhc3M9InN0MCIgZD0iTTIyLDEwYzEwLjUsMSwxNi41LDgsMTYsMjlIMTVjMC05LDEwLTYuNSw4LTIxIi8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTI0LDE4YzAuNCwyLjktNS41LDcuNC04LDljLTMsMi0yLjgsNC4zLTUsNGMtMS0wLjksMS40LTMsMC0zYy0xLDAsMC4yLDEuMi0xLDJjLTEsMC00LDEtNC00YzAtMiw2LTEyLDYtMTJzMS45LTEuOSwyLTMuNWMtMC43LTEtMC41LTItMC41LTNjMS0xLDMsMi41LDMsMi41aDJjMCwwLDAuOC0yLDIuNS0zYzEsMCwxLDMsMSwzIi8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTkuNSwyNS41QzkuNSwyNS44LDkuMywyNiw5LDI2cy0wLjUtMC4yLTAuNS0wLjVTOC43LDI1LDksMjVTOS41LDI1LjIsOS41LDI1LjV6IE0xNC45LDE1LjdjLTAuNCwwLjctMC45LDEuMi0xLjIsMS4xYy0wLjItMC4xLTAuMS0wLjgsMC4zLTEuNWMwLDAsMCwwLDAsMGMwLjQtMC43LDAuOS0xLjIsMS4yLTEuMUMxNS41LDE0LjMsMTUuNCwxNSwxNC45LDE1LjdDMTQuOSwxNS43LDE0LjksMTUuNywxNC45LDE1Ljd6Ii8+PHJlY3QgeD0iMjguOCIgeT0iMjgiIGNsYXNzPSJzdDIiIHdpZHRoPSIxMy44IiBoZWlnaHQ9IjEzLjgiLz48L2c+PC9zdmc+')";
    }
     if (mycolor == "black")
    {
        nn0=1;
        nn1=0;
        if (document.getElementsByClassName(mycolor+" rook")[nn1] != undefined)
         document.getElementsByClassName(mycolor+" rook")[nn1].style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDUgNDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1IDQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30uc3Qxe3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7fS5zdDJ7ZmlsbDpub25lO3N0cm9rZTojRUNFQ0VDO3N0cm9rZS1saW5lY2FwOnJvdW5kO30uc3Qze2ZpbGw6IzNFQUY0RTtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MS4xODIxO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9PC9zdHlsZT48Zz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNOSwzOWgyN3YtM0g5VjM5eiBNMTIuNSwzMmwxLjUtMi41aDE3bDEuNSwyLjVIMTIuNXogTTEyLDM2di00aDIxdjRIMTJ6Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTE0LDI5LjV2LTEzaDE3djEzSDE0eiIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNCwxNi41TDExLDE0aDIzbC0zLDIuNUgxNHogTTExLDE0VjloNHYyaDVWOWg1djJoNVY5aDR2NUgxMXoiLz48cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTIsMzUuNWgyMSBNMTMsMzEuNWgxOSBNMTQsMjkuNWgxNyBNMTQsMTYuNWgxNyBNMTEsMTRoMjMiLz48L2c+PHJlY3QgeD0iMjguOCIgeT0iMjgiIGNsYXNzPSJzdDMiIHdpZHRoPSIxMy44IiBoZWlnaHQ9IjEzLjgiLz48L3N2Zz4=')";
     if (document.getElementsByClassName(mycolor+" knight")[nn1] != undefined)
      document.getElementsByClassName(mycolor+" knight")[nn1].style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDUgNDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1IDQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30uc3Qxe2ZpbGw6I0VDRUNFQztzdHJva2U6I0VDRUNFQztzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9LnN0MntmaWxsOiNFQ0VDRUM7fS5zdDN7ZmlsbDojM0VBRjRFO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDoxLjE4MjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO308L3N0eWxlPjxnPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMiwxMGMxMC41LDEsMTYuNSw4LDE2LDI5SDE1YzAtOSwxMC02LjUsOC0yMSIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNCwxOGMwLjQsMi45LTUuNSw3LjQtOCw5Yy0zLDItMi44LDQuMy01LDRjLTEtMC45LDEuNC0zLDAtM2MtMSwwLDAuMiwxLjItMSwyYy0xLDAtNCwxLTQtNGMwLTIsNi0xMiw2LTEyczEuOS0xLjksMi0zLjVjLTAuNy0xLTAuNS0yLTAuNS0zYzEtMSwzLDIuNSwzLDIuNWgyYzAsMCwwLjgtMiwyLjUtM2MxLDAsMSwzLDEsMyIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05LjUsMjUuNUM5LjUsMjUuOCw5LjMsMjYsOSwyNnMtMC41LTAuMi0wLjUtMC41UzguNywyNSw5LDI1UzkuNSwyNS4yLDkuNSwyNS41eiBNMTQuOSwxNS43Yy0wLjQsMC43LTAuOSwxLjItMS4yLDEuMWMtMC4yLTAuMS0wLjEtMC44LDAuMy0xLjVjMCwwLDAsMCwwLDBjMC40LTAuNywwLjktMS4yLDEuMi0xLjFDMTUuNSwxNC4zLDE1LjQsMTUsMTQuOSwxNS43QzE0LjksMTUuNywxNC45LDE1LjcsMTQuOSwxNS43eiIvPjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0yNC41LDEwLjRsLTAuNSwxLjRsMC41LDAuMWMzLjEsMSw1LjYsMi41LDcuOSw2LjhzMy4zLDEwLjMsMi44LDIwLjJsMCwwLjVoMi4zbDAtMC41YzAuNS0xMC4xLTAuOS0xNi44LTMuMy0yMS4zcy01LjgtNi42LTkuMi03LjJDMjUuMSwxMC41LDI0LjYsMTAuNCwyNC41LDEwLjR6Ii8+PC9nPjxyZWN0IHg9IjI4LjgiIHk9IjI4IiBjbGFzcz0ic3QzIiB3aWR0aD0iMTMuOCIgaGVpZ2h0PSIxMy44Ii8+PC9zdmc+')";

/*
             if (document.getElementsByClassName(mycolor+" rook")[nn1] != undefined)
       document.getElementsByClassName(mycolor+" rook")[nn1].style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxNDEuNyAxNDEuNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTQxLjcgMTQxLjc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7ZmlsbDojMUYxQTE3O30uc3Qxe2ZpbGw6dXJsKCNTVkdJRF8xXyk7fS5zdDJ7ZmlsbDojM0VBRjRFO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDozLjM0MDc7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04MC41LDI2LjFoMTJ2LTkuNmgxOS4zdjI2LjRsLTE1LjYsMTJ2MzMuNmwxMiwxMnYxNC40aDEwLjh2MTYuOGgtOTZ2LTE2LjhoMTAuOHYtMTQuNGwxMi0xMlY1NC45bC0xNS42LTEyVjE2LjVoMTkuMnY5LjZoMTJ2LTkuNmgxOS4yVjI2LjF6Ii8+PGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItMjA0LjUwNDYiIHkxPSIyNjMuNDE1NyIgeDI9Ii0xNDguMjM5NiIgeTI9IjI2My40MTU3IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDIuODM0NiAwIDAgLTIuODM0NiA2NDAuMjkxNCA4MjAuNzc4KSI+PHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRkZGRiIvPjxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkZGRkY7c3RvcC1vcGFjaXR5OjAiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05My44LDUwLjFsOC45LTcuMkgzOS4xbDksNy4ySDkzLjh6IE0xMTQuMiwxMTkuNkgyNy43djcuMmg4Ni41VjExOS42eiBNMTAzLjMsMTA1LjNIMzguNnY5LjZoNjQuN0wxMDMuMywxMDUuM3ogTTkxLjMsNTQuOUg1MC41djMzLjZoNDAuOFY1NC45eiBNMTA2LjksMzguMVYyMS4zaC05LjZ2OS42SDc1LjZ2LTkuNmgtOS41djkuNkg0NC41di05LjZoLTkuNnYxNi44SDEwNi45eiBNMTAxLjUsMTAwLjVsLTcuMi03LjJINDcuNmwtNy40LDcuMkgxMDEuNXoiLz48cmVjdCB4PSI5NS41IiB5PSI5NS4xIiBjbGFzcz0ic3QyIiB3aWR0aD0iMzkiIGhlaWdodD0iMzkiLz48L3N2Zz4=')";
         if (document.getElementsByClassName(mycolor+" knight")[nn1] != undefined)
     document.getElementsByClassName(mycolor+" knight")[nn1].style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxNDEuNyAxNDEuNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTQxLjcgMTQxLjc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7ZmlsbDojMUYxQTE3O30uc3Qxe2ZpbGw6dXJsKCNTVkdJRF8xXyk7fS5zdDJ7ZmlsbDojM0VBRjRFO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDozLjM0MDc7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03NC4yLDI2LjZjNy40LDAuNSwxNC4yLDIuNCwyMC41LDUuN2M2LjMsMy4zLDExLjYsNy42LDE2LDEyLjhjMy4xLDMuNiw2LDguMSw4LjcsMTMuMmMyLjgsNS4yLDUsMTAuNyw2LjYsMTYuNGMxLjksNi45LDMuMSwxNCwzLjYsMjEuMWMwLjUsNy40LDAuNywxNC4yLDAuNywyMC41djE1LjNINDMuOGMtMC40LDAtMC42LTEuMi0wLjYtMy40YzAtMi4zLDAuMi00LjIsMC41LTUuNmMwLjItMS4xLDAuNi0yLjcsMS4zLTQuOGMwLjctMi4xLDEuOS00LjYsMy41LTcuNWMwLjctMS41LDIuNS0zLjcsNS4zLTYuNmMyLjgtMi45LDYtNi4yLDkuNy0xMGMyLjEtMi4yLDMuNy00LjksNC45LTguMmMxLjItMy4zLDEuNy02LjIsMS41LTguOWMtMS43LDEuNC0zLjYsMi42LTUuNywzLjVjLTkuOSwzLjYtMTcuMSw4LjctMjEuNiwxNS41Yy0wLjMsMC40LTEuNCwyLjMtMy4yLDUuN2MtMC45LDEuOC0xLjgsMy0yLjQsMy42Yy0wLjksMC45LTIuMiwxLjQtMy45LDEuNWMtMi42LDAuMS00LjctMS4xLTYuMS0zLjhjLTIsMC42LTMuNywwLjgtNS4zLDAuN2MtMi42LTEtNC41LTItNS43LTMuMmMtMi40LTIuNC0zLjktNC44LTQuNy03LjJjLTAuNy0yLjUtMS4xLTUuMS0xLjEtNy43YzAtMy45LDIuNC05LjEsNy4zLTE1LjZjNS43LTcuNCw4LjgtMTMuMSw5LjEtMTdjMC0xLjcsMC4yLTMuNiwwLjUtNS43YzAuMy0xLjUsMC45LTIuOSwxLjgtNC4yYzAuNi0wLjksMS0xLjYsMS4yLTEuOWMwLjItMC40LDAuNi0wLjksMS4yLTEuNmMwLjQtMC42LDAuOC0xLDEuMS0xLjNjMC4zLTAuMywwLjYtMC43LDEuMS0xLjJjMC41LTAuNiwxLjItMS4zLDItMi4xYy0yLjUtNi44LTMuNS0xNC0zLTIxLjFDNDIsMTYuNyw0OS44LDIyLDU2LjEsMjkuMWMxLjYtNS4zLDQuNi05LjYsOS4xLTEyLjlDNjksMTguOSw3MiwyMi4zLDc0LjIsMjYuNnoiLz48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzFfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9Ii0yMDQuNDc1NiIgeTE9IjI2My41MzY3IiB4Mj0iLTE0OC4yMzk2IiB5Mj0iMjYzLjUzNjciIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMi44MzQ2IDAgMCAtMi44MzQ2IDY0MC4yOTE0IDgyMC43NzgpIj48c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGIi8+PHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRkZGRjtzdG9wLW9wYWNpdHk6MCIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggY2xhc3M9InN0MSIgZD0iTTEyMS44LDEyNi43YzAsMCwwLTEuMywwLjEtMy44YzAuMS0yLjYsMC4yLTUuMywwLjItOC4zYzAtNS45LDAtMTEuOSwwLTE4LjJjLTAuMS02LjMtMC45LTEyLjYtMi41LTE4LjdjLTEuNi02LTMuNC0xMS4xLTUuMy0xNS40Yy0xLjktNC4yLTQtNy45LTYuMy0xMWMtMy40LTUuMS04LTkuNC0xMy44LTEyLjljLTUuOC0zLjUtMTEuOS01LjgtMTguMi02LjljMC40LDIuMywwLjYsNC42LDAuNiw2LjhjLTAuMSwxLjctMC45LDIuNS0yLjQsMi41Yy0xLjcsMC0yLjUtMC44LTIuMy0yLjVjMC4xLTYuMi0yLjEtMTEuNS02LjYtMTUuOWMtMy41LDMuNy01LjUsOC4xLTUuOCwxMy4xYy0wLjEsMS43LTAuOSwyLjQtMi41LDIuMmMtMS41LDAtMi4yLTAuOS0yLjItMi42YzAsMCwwLTAuMiwwLjEtMC42Yy0xLjksMC42LTMuOSwxLjUtNiwyLjZjLTEuMywwLjktMi40LDAuNy0zLjMtMC43Yy0wLjgtMS40LTAuNS0yLjUsMS4xLTMuM2MyLTEsMy41LTEuOCw0LjYtMi4zYy00LTQuMS04LjYtNy41LTEzLjgtMTBjMC41LDYuNSwyLjQsMTIuOCw1LjQsMTguNWMwLjgsMS4yLDAuNiwyLjMtMC42LDMuMmMtMS4zLDEtMi40LDAuOS0zLjMtMC41Yy0wLjUtMC44LTEtMS43LTEuNC0yLjVjLTEsMS0xLjcsMS43LTIsMi4yYy0wLjMsMC40LTAuOSwxLjQtMS43LDIuOGMtMC44LDEuNS0xLjQsMi43LTEuOCwzLjZjLTAuNCwxLjItMC42LDIuMS0wLjUsMi45YzAuMSwwLjcsMC4xLDEuNSwwLjIsMi40Yy0wLjQsMi44LTEuNCw1LjQtMi45LDcuOGMtMS44LDMtMy43LDYtNS43LDguOWMtMS43LDIuNS0zLjMsNS4xLTUuMSw3LjZjLTEuMiwxLjctMi4xLDMuOC0yLjcsNi41Yy0wLjQsMS42LTAuNCwzLjUsMCw1LjhjMC40LDIuMywxLjMsNC4xLDIuNyw1LjNjMi4yLDIuMiw0LjIsMy4yLDYuMywzYzAuNiwwLDEuNS0wLjMsMi42LTAuOGMxLjEtMC41LDEuOS0xLjUsMi42LTNjMS4yLTIuNywyLjItNCwzLTRjMS4yLDAsMS44LDAuNywxLjksMmMwLDAuMy0wLjQsMS41LTEuMSwzLjVjLTAuNCwwLjktMSwxLjktMS43LDNjLTAuOSwxLjItMS4zLDEuNy0xLjIsMS41YzAuNywyLjcsMiwzLjEsMy43LDEuNGMwLjUtMC41LDEuMS0xLjUsMS44LTIuOWMwLjctMS40LDEuNy0zLjMsMy4xLTUuN2MxLjctMi44LDMuNC01LDUuMy02LjhjMS45LTEuNywzLjUtMy4xLDUtNC4yYzAuOC0wLjYsMS45LTEuMywzLjEtMi4xYzEuMi0wLjgsMi45LTEuNiw0LjktMi41YzEuNi0wLjYsMy41LTEuNSw1LjQtMi40YzItMSwzLjgtMi4yLDUuMy0zLjdjMi4yLTIuMSwzLjgtNC43LDUtNy44YzAuNi0xLjcsMC44LTMuOSwwLjctNi40Yy0wLjQtMS42LDAuNC0yLjQsMi40LTIuNGMxLjUsMCwyLjQsMC44LDIuNSwyLjNjMCw1LjMtMS41LDEwLjEtNC41LDE0LjVjMSwzLDEuMiw2LjMsMC44LDkuOGMtMC40LDIuOS0xLjQsNS45LTMsOS4yYy0xLjYsMy4yLTQuOCw2LjktOS41LDEwLjhjLTkuNyw4LjEtMTQuMywxNi40LTEzLjgsMjQuOWgzNC41TDEyMS44LDEyNi43eiBNMjYuNSw4My45Yy0xLjQsMC44LTIuMiwyLTIuNSwzLjRjMCwxLjUtMC43LDIuNC0yLjIsMi41Yy0xLjcsMC4yLTIuNS0wLjUtMi41LTIuMWMwLjItMy4xLDEuNi01LjUsNC4yLTcuNGMxLjItMSwyLjQtMC45LDMuNCwwLjNDMjcuOSw4MS45LDI3LjcsODMsMjYuNSw4My45TDI2LjUsODMuOXogTTQ3LjMsNTAuNGMwLjYsMC45LDAuOCwxLjksMC43LDNjLTAuNSwzLTIuMSw0LjItNSwzLjhjLTAuNy0wLjEtMS40LTAuNC0yLTAuOGMtMC4yLDAuMi0wLjUsMC43LTAuOCwxLjVjLTAuNSwxLjUtMS41LDItMywxLjZjLTEuNC0wLjYtMi0xLjYtMS43LTMuMmMyLjEtNS40LDUuOS05LjEsMTEuNC0xMS4xYzEuNi0wLjUsMi43LDAsMy4yLDEuNGMwLjYsMS41LDAuMSwyLjUtMS4zLDMuMWMtMC4yLDAuMS0wLjUsMC4zLTAuOCwwLjRDNDcuOSw1MC4xLDQ3LjYsNTAuMyw0Ny4zLDUwLjR6Ii8+PHJlY3QgeD0iOTUuNSIgeT0iOTUuMSIgY2xhc3M9InN0MiIgd2lkdGg9IjM5IiBoZWlnaHQ9IjM5Ii8+PC9zdmc+')";
    }
     if (mycolor == "black")
    {
        nn0=1;
        nn1=0;
        if (document.getElementsByClassName(mycolor+" rook")[nn1] != undefined)
         document.getElementsByClassName(mycolor+" rook")[nn1].style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxNDEuNyAxNDEuNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTQxLjcgMTQxLjc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7ZmlsbDojMUYxQTE3O30uc3Qxe2ZpbGw6dXJsKCNTVkdJRF8xXyk7fS5zdDJ7ZmlsbDojM0VBRjRFO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDozLjM0MDc7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04MC41LDI2LjFoMTJ2LTkuNmgxOS4zdjI2LjRsLTE1LjYsMTJ2MzMuNmwxMiwxMnYxNC40aDEwLjh2MTYuOGgtOTZ2LTE2LjhoMTAuOHYtMTQuNGwxMi0xMlY1NC45bC0xNS42LTEyVjE2LjVoMTkuMnY5LjZoMTJ2LTkuNmgxOS4yVjI2LjF6Ii8+PGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItMjA0LjcwOTciIHkxPSIyNjEuNjk3OCIgeDI9Ii0xNDguMTY1NiIgeTI9IjI2MS44MjA4IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDIuODM0NiAwIDAgLTIuODM0NiA2NDAuMjkxNCA4MjAuNzc4KSI+PHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRkZGRiIvPjxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkZGRkY7c3RvcC1vcGFjaXR5OjAiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03MC45LDk5LjNINDEuOGwtMy4yLDN2NC4xaDY0Ljd2LTQuMWwtMy4yLTNINzAuOXogTTM4LjYsMTEzLjd2Ny4yaDY0Ljd2LTcuMkgzOC42eiBNNzAuOSwzN2gtMzZ2My4ybDUuMSwzLjloNjEuOGw1LTMuOVYzN0g3MC45eiBNNzAuOSw0OC44SDQ2LjNsNC4yLDMuM3Y0aDQwLjh2LTRsNC4yLTMuM0w3MC45LDQ4Ljh6IE03MC45LDg3LjJINTAuNXYzLjJsLTQuMiw0LjFoNDkuMmwtNC4yLTQuMXYtMy4ySDcwLjl6Ii8+PHJlY3QgeD0iOTUuNSIgeT0iOTUuMSIgY2xhc3M9InN0MiIgd2lkdGg9IjM5IiBoZWlnaHQ9IjM5Ii8+PC9zdmc+')";
     if (document.getElementsByClassName(mycolor+" knight")[nn1] != undefined)
      document.getElementsByClassName(mycolor+" knight")[nn1].style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgdGV4dC1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxNDEuNyAxNDEuNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTQxLjcgMTQxLjc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7ZmlsbDojMUYxQTE3O30uc3Qxe2ZpbGw6dXJsKCNTVkdJRF8xXyk7fS5zdDJ7ZmlsbDojM0VBRjRFO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDozLjM0MDc7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03NC4yLDI2LjZjNy40LDAuNSwxNC4yLDIuNCwyMC41LDUuN2M2LjMsMy4zLDExLjYsNy42LDE2LDEyLjhjMy4xLDMuNiw2LDguMSw4LjcsMTMuMmMyLjgsNS4yLDUsMTAuNyw2LjYsMTYuNGMxLjksNi45LDMuMSwxNCwzLjYsMjEuMWMwLjUsNy40LDAuNywxNC4yLDAuNywyMC41djE1LjNINDMuOGMtMC40LDAtMC42LTEuMi0wLjYtMy40YzAtMi4zLDAuMi00LjIsMC41LTUuNmMwLjItMS4xLDAuNi0yLjcsMS4zLTQuOGMwLjctMi4xLDEuOS00LjYsMy41LTcuNWMwLjctMS41LDIuNS0zLjcsNS4zLTYuNmMyLjgtMi45LDYtNi4yLDkuNy0xMGMyLjEtMi4yLDMuNy00LjksNC45LTguMmMxLjItMy4zLDEuNy02LjIsMS41LTguOWMtMS43LDEuNC0zLjYsMi42LTUuNywzLjVjLTkuOSwzLjYtMTcuMSw4LjctMjEuNiwxNS41Yy0wLjMsMC40LTEuNCwyLjMtMy4yLDUuN2MtMC45LDEuOC0xLjgsMy0yLjQsMy42Yy0wLjksMC45LTIuMiwxLjQtMy45LDEuNWMtMi42LDAuMS00LjctMS4xLTYuMS0zLjhjLTIsMC42LTMuNywwLjgtNS4zLDAuN2MtMi42LTEtNC41LTItNS43LTMuMmMtMi40LTIuNC0zLjktNC44LTQuNy03LjJjLTAuNy0yLjUtMS4xLTUuMS0xLjEtNy43YzAtMy45LDIuNC05LjEsNy4zLTE1LjZjNS43LTcuNCw4LjgtMTMuMSw5LjEtMTdjMC0xLjcsMC4yLTMuNiwwLjUtNS43YzAuMy0xLjUsMC45LTIuOSwxLjgtNC4yYzAuNi0wLjksMS0xLjYsMS4yLTEuOWMwLjItMC40LDAuNi0wLjksMS4yLTEuNmMwLjQtMC42LDAuOC0xLDEuMS0xLjNjMC4zLTAuMywwLjYtMC43LDEuMS0xLjJjMC41LTAuNiwxLjItMS4zLDItMi4xYy0yLjUtNi44LTMuNS0xNC0zLTIxLjFDNDIsMTYuNyw0OS44LDIyLDU2LjEsMjkuMWMxLjYtNS4zLDQuNi05LjYsOS4xLTEyLjlDNjksMTguOSw3MiwyMi4zLDc0LjIsMjYuNnoiLz48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzFfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9Ii0yMDQuNjQ4NiIgeTE9IjI2MS42MDk0IiB4Mj0iLTE0OC4yNjA2IiB5Mj0iMjYxLjczMjQiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMi44MzQ2IDAgMCAtMi44MzQ2IDY0MC4yOTE0IDgyMC43NzgpIj48c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGIi8+PHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRkZGRjtzdG9wLW9wYWNpdHk6MCIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggY2xhc3M9InN0MSIgZD0iTTQ0LjUsNTAuNGwxLjUtMC44YzEuNC0wLjUsMS44LTEuNiwxLjMtMy4xYy0wLjYtMS40LTEuNi0xLjktMy4yLTEuNGMtNS41LDItOS4zLDUuNy0xMS40LDExLjFjLTAuMywxLjUsMC4yLDIuNiwxLjcsMy4yYzEuNSwwLjUsMi40LDAsMy0xLjZjMC40LTAuOCwwLjYtMS4zLDAuOC0xLjVjMC41LDAuNCwxLjIsMC43LDIsMC44YzIuOSwwLjUsNC41LTAuOCw1LTMuOEM0NS4zLDUyLjMsNDUuMSw1MS4zLDQ0LjUsNTAuNHogTTMyLjgsOTcuOWMwLjItMC40LDAuNS0xLjEsMC45LTEuOWMwLjgtMiwxLjItMy4xLDEuMi0zLjVjLTAuMS0xLjMtMC44LTItMi0yYy0wLjksMC0yLDEuMy0zLjMsNGMtMC4yLDAuNC0wLjUsMC43LTAuOCwxYy0xLjMsMS4zLTEuMSwyLjQsMC41LDMuM0MzMC44LDk5LjcsMzEuOSw5OS40LDMyLjgsOTcuOUwzMi44LDk3Ljl6IE03NC4zLDcxLjhjMy4zLTQuMyw0LjktOS4xLDQuOC0xNC40Yy0wLjItMS42LTEuMS0yLjMtMi43LTIuM2MtMi4yLDAtMywwLjgtMi41LDIuNGMwLjEsMi42LTAuMSw0LjctMC44LDYuNGMtMS4xLDIuNy0yLjMsNC43LTMuNiw2Yy0wLjcsMS40LTAuMywyLjQsMS4zLDMuMUM3Mi4zLDczLjcsNzMuNSw3My4zLDc0LjMsNzEuOHogTTU1LjksMzcuNWMtMC4yLTEuOC0wLjItMy43LDAuMS01LjVjLTIuOCwwLjUtNS40LDEuOS03LjksMy45Yy0xLjUsMC44LTEuOCwxLjktMS4xLDMuM2MwLjgsMS40LDEuOSwxLjcsMy4zLDAuN2MxLTAuNSwxLjktMSwyLjctMS40QzUzLjksMzguMSw1NC44LDM3LjgsNTUuOSwzNy41TDU1LjksMzcuNXogTTEyMS44LDEyNi43YzAsMCwwLTEuMywwLjEtMy44YzAuNC04LjgsMC4zLTE3LjYsMC4yLTI2LjRjLTAuMS02LjMtMC45LTEyLjYtMi41LTE4LjdjLTIuNC05LjQtNi0xOC40LTExLjUtMjYuNGMtNy41LTEwLjktMTkuMy0xNy4xLTMyLTE5LjhjMC40LDIuMiwwLjEsNC40LDAuMiw2LjZjNC41LDEuNSw4LjgsMy40LDEyLjksNS44YzEyLDcuMiwxOC4yLDIwLjYsMjAuNCwzMy44YzMuNiwxNy40LDEuMywzMi44LDIuMyw0OUgxMjEuOHogTTI2LjgsODUuNGMxLjMtMSwxLjUtMi4xLDAuNC0zLjRjLTEuMS0xLjEtMi40LTEuMi0zLjctMC4zYy0yLjksMS45LTQuNCw0LjMtNC42LDcuNGMwLDEuNSwxLDIuMywyLjgsMi4yYzEuNy0wLjEsMi41LTEsMi40LTIuNkMyNC41LDg3LjIsMjUuMyw4Ni4xLDI2LjgsODUuNHoiLz48cmVjdCB4PSI5NS41IiB5PSI5NS4xIiBjbGFzcz0ic3QyIiB3aWR0aD0iMzkiIGhlaWdodD0iMzkiLz48L3N2Zz4=')";
*/





    }


    var rect,x0,y0,w,sqsize;
    var board = document.querySelectorAll("cg-board")[0];
    rect = board.getBoundingClientRect();
        x0 = rect.left;
        y0 = rect.top;
        w = rect.width;
        sqsize = w / 8;
//var cou = 0;
var boardx,boardy,horiz,vertic,horiz2,vertic2;
    var horiz0,vertic0;
   // var time1,n11=0;
   // var Bapp = document.getElementsByClassName("round")[0];
     // document.addEventListener("mousemove",function(e) {

if (ch1skeys == 0){
        document.body.addEventListener("mousemove", MouseMove, false);}

    function MouseMove(e) {
         cx = e.clientX;
    cy = e.clientY;
boardx = cx - rect.left;
    boardy = cy - rect.top;
horiz = Math.ceil(boardx/sqsize);
   vertic = 9-Math.ceil(boardy/sqsize);
          if (horiz != horiz2 || vertic != vertic2)
              {
                  keysT = keys.slice(0);
                  horiz0 = horiz;
          vertic0 = vertic;
                  makemoves();
      }
       horiz2 = horiz;
          vertic2 = vertic;
        }

 function register(x,y,el=board) {
        var ev = new MouseEvent("mouseup", {
            "view": window,
            "bubbles": true,
            "cancelable": false,
            "clientX": x,
            "clientY": y
        });
        el.dispatchEvent(ev);
        //console.log(x,y);
    }

var mp;
var keysT = [];
    var numK,checkpiece,pieceX,pieceY,toX,toY;
    var pawnX, pawnY, pawnC, pawnrect, pawnN, pawn2X,pawn2Y,p2;
    var pawnLX, pawnLY, pawnLC, pawnLrect;
    var pawnRX, pawnRY, pawnRC, pawnRrect;
    var kingC,kingrect,kingX,kingY;
    var queenC,queenrect,queenX,queenY,queenN;
    var bishC,bishrect,bishX,bishY,bishN;
    var rook0C,rook0rect,rook0X,rook0Y;
    var rook1C,rook1rect,rook1X,rook1Y;
    var rookC,rookrect,rookX,rookY,rookN,rooktX,rooktY,rooktrect;
    var knightC,knightrect,knightX,knightY,knightN;
    // function Making moves
     function makemoves() {

hor = horiz0;
 vert = vertic0;

         mp = 0;
         if (turnC == 1)
         {
           //  console.log("notpremove");
             for (var chk = 0; chk < st.length; ++chk) {
                // console.log(horiz0*10+vertic, st[chk],st.length,st);
                 if ((horiz0*10+vertic0) == st[chk])
                     {
                        mp = 1;
                        // console.log("piece");
                         break;
                     } else {
                         mp = 0;
                     }

             }
         }




         if (mp == 0)
         {


     //if (turnC == 1 && 1) {
         numK = keysT.length;
           //  if (numK > 1)
           //  {numK = 1;}
           //  console.log(numK,keys,keysT);
            // keysT = keys.slice(0);
   for( var y = 0; y < numK; y++){
       //console.log(keysT);

       // Making moves


if (keysT[0] == pFK) {
    pawnC = document.getElementsByClassName(mycolor+" pawn");
    //console.log(pawnC);
    pawnN = pawnC.length;
    p2 = 0;
        if (document.getElementsByClassName("ghost "+mycolor+" pawn")[0] != undefined && document.getElementsByClassName("ghost "+mycolor+" pawn")[0] != null)
        {
            pawnN = pawnN-1;
        }
    for( var pn = 0; pn < pawnN; pn++){
        pawnrect = pawnC[pn].getBoundingClientRect();
pawnX = Math.ceil(((pawnrect.left+sqsize/2)-rect.left)/sqsize)
    pawnY = 9-Math.ceil(((pawnrect.top+sqsize/2)-rect.top)/sqsize)
       // console.log(pawnX,pawnY,horiz0,vertic0);
if ((pawnX == horiz0) && (pawnY == vertic0-1))
{

    toX = (horiz0)*sqsize+rect.left-sqsize/2;
   toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnrect.left+sqsize/2,pawnrect.top+sqsize/2,toX,toY,cx,cy)
tts(pawnrect.left+sqsize/2,pawnrect.top+sqsize/2,toX,toY);
    //console.log("pawn");
p2 = 0;
break;
//} else if ((pawnX == horiz0) && (pawnY == vertic0-2)) {
    } else if ((pawnX == horiz0) && (pawnY == 2) && (vertic0 == 4)) {
        // console.log(pawnX,horiz0,pawnY,vertic0);
        p2 = 1;
        pawn2X = pawnrect.left+sqsize/2;
            pawn2Y = pawnrect.top+sqsize/2;
/*toX = (horiz0)*sqsize+rect.left-sqsize/2;
   toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnrect.left+sqsize/2,pawnrect.top+sqsize/2,toX,toY,cx,cy)
tts(pawnrect.left+sqsize/2,pawnrect.top+sqsize/2,toX,toY);
break;*/
}
    }
    if (p2 == 1)
        {
            toX = (horiz0)*sqsize+rect.left-sqsize/2;
   toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
            tts(pawn2X,pawn2Y,toX,toY);
        }
    };

if (keysT[0] == pLK) {
    pawnLC = document.getElementsByClassName(mycolor+" pawn");
    pawnN = pawnLC.length;
        if (document.getElementsByClassName("ghost "+mycolor+" pawn")[0] != undefined && document.getElementsByClassName("ghost "+mycolor+" pawn")[0] != null)
        {
            pawnN = pawnN-1;
        }
    for( var pnL = 0; pnL < pawnN; pnL++){
        pawnLrect = pawnLC[pnL].getBoundingClientRect();
pawnLX = Math.ceil(((pawnLrect.left+sqsize/2)-rect.left)/sqsize)
    pawnLY = 9-Math.ceil(((pawnLrect.top+sqsize/2)-rect.top)/sqsize)
       // console.log(pawnLX,pawnLY,horiz0,vertic0);
if ((pawnLX == horiz0+1) && (pawnLY == vertic0-1))
{
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
   toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
tts(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY);
break;
}
    }
    };

if (keysT[0] == pRK) {
    pawnRC = document.getElementsByClassName(mycolor+" pawn");
    pawnN = pawnRC.length;
        if (document.getElementsByClassName("ghost "+mycolor+" pawn")[0] != undefined && document.getElementsByClassName("ghost "+mycolor+" pawn")[0] != null)
        {
            pawnN = pawnN-1;
        }
    for( var pnR = 0; pnR < pawnN; pnR++){
        pawnRrect = pawnRC[pnR].getBoundingClientRect();
pawnRX = Math.ceil(((pawnRrect.left+sqsize/2)-rect.left)/sqsize)
    pawnRY = 9-Math.ceil(((pawnRrect.top+sqsize/2)-rect.top)/sqsize)
       // console.log(pawnLX,pawnLY,horiz0,vertic0);
if ((pawnRX == horiz0-1) && (pawnRY == vertic0-1))
{
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
   toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
tts(pawnRrect.left+sqsize/2,pawnRrect.top+sqsize/2,toX,toY);
break;
}
    }
    };

if (keysT[0] == kingK) {
    kingC = document.getElementsByClassName(mycolor+" king")[0];
   // console.log(kingC);
    kingrect = kingC.getBoundingClientRect();
kingX = Math.ceil(((kingrect.left+sqsize/2)-rect.left)/sqsize)
    kingY = 9-Math.ceil(((kingrect.top+sqsize/2)-rect.top)/sqsize)
       // console.log(pawnLX,pawnLY,horiz0,vertic0);
if (((kingX == horiz0) && (kingY == vertic0-1)) || ((kingX == horiz0) && (kingY == vertic0+1)) || ((kingX == horiz0-1) && (kingY == vertic0)) || ((kingX == horiz0+1) && (kingY == vertic0)) || ((kingX == horiz0-1) && (kingY == vertic0-1)) || ((kingX == horiz0-1) && (kingY == vertic0+1)) || ((kingX == horiz0+1) && (kingY == vertic0-1)) || ((kingX == horiz0+1) && (kingY == vertic0+1)) || ((kingX == horiz0+2) && (kingY == vertic0)) || ((kingX == horiz0-2) && (kingY == vertic0)))
{
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
   toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
tts(kingrect.left+sqsize/2,kingrect.top+sqsize/2,toX,toY);
}
    };

if (keysT[0] == qK) {
    queenC = document.getElementsByClassName(mycolor+" queen");
    queenN = queenC.length;
        if (document.getElementsByClassName("ghost "+mycolor+" queen")[0] != undefined && document.getElementsByClassName("ghost "+mycolor+" queen")[0] != null)
        {
            queenN = queenN-1;
        }
    for( var qR = 0; qR < queenN; qR++){

    queenrect = queenC[qR].getBoundingClientRect();
  queenX = Math.ceil(((queenrect.left+sqsize/2)-rect.left)/sqsize)
  queenY = 9-Math.ceil(((queenrect.top+sqsize/2)-rect.top)/sqsize)
    // console.log(pawnLX,pawnLY,horiz0,vertic0);
if (((queenX == horiz0) || (queenY == vertic0) || (Math.abs(horiz0-queenX) == Math.abs(vertic0-queenY))) && !((queenX == horiz0) && (queenY == vertic0)))
{
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(queenrect.left+sqsize/2,queenrect.top+sqsize/2,toX,toY);
    break;
}
    }
};

if (keysT[0] == biK) {
    bishC = document.getElementsByClassName(mycolor+" bishop");
    //console.log(bishC);
    bishN = bishC.length;
        if (document.getElementsByClassName("ghost "+mycolor+" bishop")[0] != undefined && document.getElementsByClassName("ghost "+mycolor+" bishop")[0] != null)
        {
            bishN = bishN-1;
        }
    for( var bR = 0; bR < bishN; bR++){
bishrect = bishC[bR].getBoundingClientRect();
bishX = Math.ceil(((bishrect.left+sqsize/2)-rect.left)/sqsize)
bishY = 9-Math.ceil(((bishrect.top+sqsize/2)-rect.top)/sqsize)
if ((Math.abs(horiz0-bishX) == Math.abs(vertic0-bishY)) && !((bishX == horiz0) && (bishY == vertic0)))
{
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    tts(bishrect.left+sqsize/2,bishrect.top+sqsize/2,toX,toY);
    break;
}
}
    };

if (keysT[0] == roL) {
  /*  rook0C = document.getElementsByClassName(mycolor+" rook")[nn0];
    rook0rect = rook0C.getBoundingClientRect();
  rook0X = Math.ceil(((rook0rect.left+sqsize/2)-rect.left)/sqsize)
  rook0Y = 9-Math.ceil(((rook0rect.top+sqsize/2)-rect.top)/sqsize)
    // console.log(pawnLX,pawnLY,horiz0,vertic0);
if ((rook0X == horiz0) || (rook0Y == vertic0))
{
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(rook0rect.left+sqsize/2,rook0rect.top+sqsize/2,toX,toY);
} else {
  rook1C = document.getElementsByClassName(mycolor+" rook")[nn1];
    rook1rect = rook1C.getBoundingClientRect();
  rook1X = Math.ceil(((rook1rect.left+sqsize/2)-rect.left)/sqsize)
  rook1Y = 9-Math.ceil(((rook1rect.top+sqsize/2)-rect.top)/sqsize)
    // console.log(pawnLX,pawnLY,horiz0,vertic0);
if ((rook1X == horiz0) || (rook1Y == vertic0))
{
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(rook1rect.left+sqsize/2,rook1rect.top+sqsize/2,toX,toY);
}
}
*/
    if (mycolor == "white")
    {
    rookC = document.getElementsByClassName(mycolor+" rook");
       // console.log(rookC);
        rookN = rookC.length;
        if (document.getElementsByClassName("ghost "+mycolor+" rook")[0] != undefined && document.getElementsByClassName("ghost "+mycolor+" rook")[0] != null)
        {
            rookN = rookN-1;
        }
    for( var rR = 0; rR < rookN; rR++){
  rookrect = rookC[rR].getBoundingClientRect();
  rookX = Math.ceil(((rookrect.left+sqsize/2)-rect.left)/sqsize)
  rookY = 9-Math.ceil(((rookrect.top+sqsize/2)-rect.top)/sqsize)
      //  console.log(rookX,rookY,horiz0,vertic0);
    if (((rookX == horiz0) || (rookY == vertic0)) && !((rookX == horiz0) && (rookY == vertic0)))
{
    //trying to fix rooks on the same line

    if ((rR == 0) && (turnC == 1) && (rookN>1)) {
//time = performance.now();
        rooktrect = rookC[1].getBoundingClientRect();
        rooktX = Math.ceil(((rooktrect.left+sqsize/2)-rect.left)/sqsize)
  rooktY = 9-Math.ceil(((rooktrect.top+sqsize/2)-rect.top)/sqsize)
//console.log(rooktY,rookY,horiz0);
if (((rooktX == rookX && rookX == horiz0) && ((rooktY<vertic0 && rookY<vertic0 && rookY<rooktY) || (rooktY>vertic0 && rookY>vertic0 && rookY>rooktY))) || ((rooktY == rookY && rookY == vertic0) && ((rooktX<horiz0 && rookX<horiz0 && rookX<rooktX) || (rooktX>horiz0 && rookX>horiz0 && rookX>rooktX))))
{

    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(rooktrect.left+sqsize/2,rooktrect.top+sqsize/2,toX,toY);

    break;

}

    }
    //end

   // console.log(rookX,rookY,horiz0,vertic0);
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(rookrect.left+sqsize/2,rookrect.top+sqsize/2,toX,toY);
    break;
}
    }
    }
    if (mycolor == "black")
    {
    rookC = document.getElementsByClassName(mycolor+" rook");
        rookN = rookC.length;
        if (document.getElementsByClassName("ghost "+mycolor+" rook")[0] != undefined && document.getElementsByClassName("ghost "+mycolor+" rook")[0] != null)
        {
            rookN = rookN-1;
        }
    for( var rbR = rookN-1; rbR>(-1); rbR--){
  rookrect = rookC[rbR].getBoundingClientRect();
  rookX = Math.ceil(((rookrect.left+sqsize/2)-rect.left)/sqsize)
  rookY = 9-Math.ceil(((rookrect.top+sqsize/2)-rect.top)/sqsize)
    if (((rookX == horiz0) || (rookY == vertic0)) && !((rookX == horiz0) && (rookY == vertic0)))
{
    //trying to fix rooks on the same line

    if ((rbR == rookN-1) && (turnC == 1) && (rookN>1)) {

        rooktrect = rookC[rookN-2].getBoundingClientRect();
        rooktX = Math.ceil(((rooktrect.left+sqsize/2)-rect.left)/sqsize)
  rooktY = 9-Math.ceil(((rooktrect.top+sqsize/2)-rect.top)/sqsize)

if (((rooktX == rookX && rookX == horiz0) && ((rooktY<vertic0 && rookY<vertic0 && rookY<rooktY) || (rooktY>vertic0 && rookY>vertic0 && rookY>rooktY))) || ((rooktY == rookY && rookY == vertic0) && ((rooktX<horiz0 && rookX<horiz0 && rookX<rooktX) || (rooktX>horiz0 && rookX>horiz0 && rookX>rooktX))))
{

    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(rooktrect.left+sqsize/2,rooktrect.top+sqsize/2,toX,toY);
    break;
}

    }
    //end
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(rookrect.left+sqsize/2,rookrect.top+sqsize/2,toX,toY);
    break;
}
    }
    }
};

if (keysT[0] == roR) {
    if (mycolor == "white")
    {
    rookC = document.getElementsByClassName(mycolor+" rook");
        rookN = rookC.length;
        if (document.getElementsByClassName("ghost "+mycolor+" rook")[0] != undefined && document.getElementsByClassName("ghost "+mycolor+" rook")[0] != null)
        {
            rookN = rookN-1;
        }
    for( var r1bR = rookN-1; r1bR>(-1); r1bR--){
  rookrect = rookC[r1bR].getBoundingClientRect();
  rookX = Math.ceil(((rookrect.left+sqsize/2)-rect.left)/sqsize)
  rookY = 9-Math.ceil(((rookrect.top+sqsize/2)-rect.top)/sqsize)
    if (((rookX == horiz0) || (rookY == vertic0)) && !((rookX == horiz0) && (rookY == vertic0)))
{
    //trying to fix rooks on the same line

    if ((r1bR == rookN-1) && (turnC == 1) && (rookN>1)) {

        rooktrect = rookC[rookN-2].getBoundingClientRect();
        rooktX = Math.ceil(((rooktrect.left+sqsize/2)-rect.left)/sqsize)
  rooktY = 9-Math.ceil(((rooktrect.top+sqsize/2)-rect.top)/sqsize)

if (((rooktX == rookX && rookX == horiz0) && ((rooktY<vertic0 && rookY<vertic0 && rookY<rooktY) || (rooktY>vertic0 && rookY>vertic0 && rookY>rooktY))) || ((rooktY == rookY && rookY == vertic0) && ((rooktX<horiz0 && rookX<horiz0 && rookX<rooktX) || (rooktX>horiz0 && rookX>horiz0 && rookX>rooktX))))
{

    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(rooktrect.left+sqsize/2,rooktrect.top+sqsize/2,toX,toY);
    break;
}

    }
    //end
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(rookrect.left+sqsize/2,rookrect.top+sqsize/2,toX,toY);
    break;
}
    }
    }
    if (mycolor == "black")
    {
    rookC = document.getElementsByClassName(mycolor+" rook");
        rookN = rookC.length;
        if (document.getElementsByClassName("ghost "+mycolor+" rook")[0] != undefined && document.getElementsByClassName("ghost "+mycolor+" rook")[0] != null)
        {
            rookN = rookN-1;
        }
    for( var r1R = 0; r1R < rookN; r1R++){
  rookrect = rookC[r1R].getBoundingClientRect();
  rookX = Math.ceil(((rookrect.left+sqsize/2)-rect.left)/sqsize)
  rookY = 9-Math.ceil(((rookrect.top+sqsize/2)-rect.top)/sqsize)
    if (((rookX == horiz0) || (rookY == vertic0)) && !((rookX == horiz0) && (rookY == vertic0)))
{
    //trying to fix rooks on the same line

    if ((r1R == 0) && (turnC == 1) && (rookN>1)) {

        rooktrect = rookC[1].getBoundingClientRect();
        rooktX = Math.ceil(((rooktrect.left+sqsize/2)-rect.left)/sqsize)
  rooktY = 9-Math.ceil(((rooktrect.top+sqsize/2)-rect.top)/sqsize)
//console.log(rooktY,rookY,horiz0);
if (((rooktX == rookX && rookX == horiz0) && ((rooktY<vertic0 && rookY<vertic0 && rookY<rooktY) || (rooktY>vertic0 && rookY>vertic0 && rookY>rooktY))) || ((rooktY == rookY && rookY == vertic0) && ((rooktX<horiz0 && rookX<horiz0 && rookX<rooktX) || (rooktX>horiz0 && rookX>horiz0 && rookX>rooktX))))
{

    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(rooktrect.left+sqsize/2,rooktrect.top+sqsize/2,toX,toY);
    break;
}

    }
    //end
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(rookrect.left+sqsize/2,rookrect.top+sqsize/2,toX,toY);
    break;
}
    }
    }
};

if (keysT[0] == knL) {
    if (mycolor == "white")
    {
    knightC = document.getElementsByClassName(mycolor+" knight");
        //console.log(knightC);
        knightN = knightC.length;
        if (document.getElementsByClassName("ghost "+mycolor+" knight")[0] != undefined && document.getElementsByClassName("ghost "+mycolor+" knight")[0] != null)
        {
            knightN = knightN-1;
        }
    for( var kR = 0; kR < knightN; kR++){
  knightrect = knightC[kR].getBoundingClientRect();
  knightX = Math.ceil(((knightrect.left+sqsize/2)-rect.left)/sqsize)
  knightY = 9-Math.ceil(((knightrect.top+sqsize/2)-rect.top)/sqsize)
    if (((knightX == horiz0+1) && (knightY == vertic0-2)) || ((knightX == horiz0+2) && (knightY == vertic0-1)) || ((knightX == horiz0+2) && (knightY == vertic0+1)) || ((knightX == horiz0+1) && (knightY == vertic0+2)) || ((knightX == horiz0-1) && (knightY == vertic0+2)) || ((knightX == horiz0-2) && (knightY == vertic0+1)) || ((knightX == horiz0-2) && (knightY == vertic0-1)) || ((knightX == horiz0-1) && (knightY == vertic0-2)))
{
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(knightrect.left+sqsize/2,knightrect.top+sqsize/2,toX,toY);
    break;
}
    }
    }
    if (mycolor == "black")
    {
    knightC = document.getElementsByClassName(mycolor+" knight");
        knightN = knightC.length;
     if (document.getElementsByClassName("ghost "+mycolor+" knight")[0] != undefined && document.getElementsByClassName("ghost "+mycolor+" knight")[0] != null)
        {
            knightN = knightN-1;
        }
    for( var kbR = knightN-1; kbR>(-1); kbR--){
  knightrect = knightC[kbR].getBoundingClientRect();
  knightX = Math.ceil(((knightrect.left+sqsize/2)-rect.left)/sqsize)
  knightY = 9-Math.ceil(((knightrect.top+sqsize/2)-rect.top)/sqsize)
    if (((knightX == horiz0+1) && (knightY == vertic0-2)) || ((knightX == horiz0+2) && (knightY == vertic0-1)) || ((knightX == horiz0+2) && (knightY == vertic0+1)) || ((knightX == horiz0+1) && (knightY == vertic0+2)) || ((knightX == horiz0-1) && (knightY == vertic0+2)) || ((knightX == horiz0-2) && (knightY == vertic0+1)) || ((knightX == horiz0-2) && (knightY == vertic0-1)) || ((knightX == horiz0-1) && (knightY == vertic0-2)))
{
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(knightrect.left+sqsize/2,knightrect.top+sqsize/2,toX,toY);
    break;
}
    }
    }
};

if (keysT[0] == knR) {
    if (mycolor == "white")
    {
    knightC = document.getElementsByClassName(mycolor+" knight");
        knightN = knightC.length;
        if (document.getElementsByClassName("ghost "+mycolor+" knight")[0] != undefined && document.getElementsByClassName("ghost "+mycolor+" knight")[0] != null)
        {
            knightN = knightN-1;
        }
    for( var k1bR = knightN-1; k1bR>(-1); k1bR--){
  knightrect = knightC[k1bR].getBoundingClientRect();
  knightX = Math.ceil(((knightrect.left+sqsize/2)-rect.left)/sqsize)
  knightY = 9-Math.ceil(((knightrect.top+sqsize/2)-rect.top)/sqsize)
    if (((knightX == horiz0+1) && (knightY == vertic0-2)) || ((knightX == horiz0+2) && (knightY == vertic0-1)) || ((knightX == horiz0+2) && (knightY == vertic0+1)) || ((knightX == horiz0+1) && (knightY == vertic0+2)) || ((knightX == horiz0-1) && (knightY == vertic0+2)) || ((knightX == horiz0-2) && (knightY == vertic0+1)) || ((knightX == horiz0-2) && (knightY == vertic0-1)) || ((knightX == horiz0-1) && (knightY == vertic0-2)))
{
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(knightrect.left+sqsize/2,knightrect.top+sqsize/2,toX,toY);
    break;
}
    }
    }
    if (mycolor == "black")
    {
    knightC = document.getElementsByClassName(mycolor+" knight");
        knightN = knightC.length;
        if (document.getElementsByClassName("ghost "+mycolor+" knight")[0] != undefined && document.getElementsByClassName("ghost "+mycolor+" knight")[0] != null)
        {
            knightN = knightN-1;
        }
    for( var k1R = 0; k1R < knightN; k1R++){
  knightrect = knightC[k1R].getBoundingClientRect();
  knightX = Math.ceil(((knightrect.left+sqsize/2)-rect.left)/sqsize)
  knightY = 9-Math.ceil(((knightrect.top+sqsize/2)-rect.top)/sqsize)
    if (((knightX == horiz0+1) && (knightY == vertic0-2)) || ((knightX == horiz0+2) && (knightY == vertic0-1)) || ((knightX == horiz0+2) && (knightY == vertic0+1)) || ((knightX == horiz0+1) && (knightY == vertic0+2)) || ((knightX == horiz0-1) && (knightY == vertic0+2)) || ((knightX == horiz0-2) && (knightY == vertic0+1)) || ((knightX == horiz0-2) && (knightY == vertic0-1)) || ((knightX == horiz0-1) && (knightY == vertic0-2)))
{
    toX = (horiz0)*sqsize+rect.left-sqsize/2;
    toY = (9-vertic0)*sqsize+rect.top-sqsize/2;
    //console.log(pawnLrect.left+sqsize/2,pawnLrect.top+sqsize/2,toX,toY,cx,cy)
    tts(knightrect.left+sqsize/2,knightrect.top+sqsize/2,toX,toY);
    break;
}
    }
    }
};

//console.log(keysT);
keysT.splice(0, 1);
      //console.log(keysT);


}

/*if ((document.getElementsByClassName("move-dest") != undefined) && (document.getElementsByClassName("move-dest") != null) && (turnC == 1))
    {
    cancelPrem();
    }*/
     }
     };




      function formation(x,y,el=board) {
        var ev = new MouseEvent("mousedown", {
            "view": window,
            "bubbles": true,
            "cancelable": false,
            "clientX": x,
            "clientY": y,
        });
        el.dispatchEvent(ev);
    }




       function tts1(x,y,el=board) {
       formation(x,y,el);
       register(x,y,el);
    }
    var hor,vert;
    var movecount = 0;
    function tts(x,y,tx,ty,el=board) {

if (true||drag===false) {
       tts1(x,y,el);
       tts1(tx,ty,el);
} else {
    formation(x,y,el);
    register(tx,ty,el);
}

        movecount = movecount+1;
       console.log(movecount,"data",x,y,tx,ty);
        //console.log(performance.now()-time);
        //deselecting experiment

        if (true||drag===false) {
         window.setTimeout(function(){
                var ds = board.children;
                //console.log(c);
                for (var ii = 0; ii < ds.length; ++ii) {
                    if (ds[ii].className.includes("selected")) {
                        tts1(tx,ty,el);
                        return;
                    }
                }
            },0);
}


        //end
       // movecount = movecount+1;
       // console.log(performance.now()-time);
    };


var keys = [];
var twice;
document.addEventListener('keydown', KeyDown);

function KeyDown(event){

     var key = event.key.toLowerCase();
    //key = key.toLowerCase();
    console.log(key);
    if (key == cprm)
    {
cancelPrem();
    }
    // keys[event.key] = true;

 //window.Mousetrap.bind("f", function() {});

     if (key == "f") {
        if (event.target.tagName != "INPUT")
        event.preventDefault(); // Prevent the default action
      //  console.log(event.target.tagName);
        //anotherFunction();
    }

     if (key === "z"||key === "h"||key === "j"||key === "k"||key === "l") {
       event.preventDefault();
        }

   // if (!keys.includes(event.key) && event.key != 'Control' && event.key != 'Alt')
    if (!keys.includes(key) && key != 'Control' && key != 'Alt')
    {
       // time = performance.now();

    //keys.unshift(event.key);
       // keysT.unshift(event.key);
         keys.unshift(key);
        keysT.unshift(key);

        makemoves();
   // console.log(keys);
    }
    /*
//for( var v = 0; v < 1; v++){
      if (key == rmtch) {
           if (document.getElementsByClassName("fbt rematch white")[0] != undefined)
           { document.getElementsByClassName("fbt rematch white")[0].click();}
      }
      if (key == biK) {
      for (var ee = 0; ee < document.getElementsByClassName(mycolor+" bishop").length; ee++) {
                   document.getElementsByClassName(mycolor+" bishop")[ee].style.backgroundColor = "blue";
      };
      } else if
      (key == qK) {
           if (document.getElementsByClassName(mycolor+" queen")[0] != undefined)
           { document.getElementsByClassName(mycolor+" queen")[0].style.backgroundColor = "blue";}
      } else if
      (key == roL) {
          if (document.getElementsByClassName(mycolor+" rook")[nn0] != undefined)
          {document.getElementsByClassName(mycolor+" rook")[nn0].style.backgroundColor = "blue";}
      } else if
      (key == roR) {
           if (document.getElementsByClassName(mycolor+" rook")[nn1] != undefined)
           {document.getElementsByClassName(mycolor+" rook")[nn1].style.backgroundColor = "blue";}
      } else if
      (key == knL) {
           if (document.getElementsByClassName(mycolor+" knight")[nn0] != undefined)
           { document.getElementsByClassName(mycolor+" knight")[nn0].style.backgroundColor = "blue";}
      } else if
      (key == knR) {
          if (document.getElementsByClassName(mycolor+" knight")[nn1] != undefined)
          { document.getElementsByClassName(mycolor+" knight")[nn1].style.backgroundColor = "blue";}
      } else if
      (key == kingK) {
      document.getElementsByClassName(mycolor+" king")[0].style.backgroundColor = "blue";
      } else if
      (key == pLK || key == pFK || key == pRK) {
      for (var e1 = 0; e1 < document.getElementsByClassName(mycolor+" pawn").length; e1++) {
      document.getElementsByClassName(mycolor+" pawn")[e1].style.backgroundColor = "blue";
   //   }
      }
      }*/
      if (key == rmtch) {
           if (document.getElementsByClassName("fbt rematch white")[0] != undefined)
      document.getElementsByClassName("fbt rematch white")[0].click();
      };
      if (key == biK) {
      for (var ee = 0; ee < document.getElementsByClassName(mycolor+" bishop").length; ee++) {
                   document.getElementsByClassName(mycolor+" bishop")[ee].style.backgroundColor = "blue";
      };
      };
      if (key == qK) {
           if (document.getElementsByClassName(mycolor+" queen")[0] != undefined)
      document.getElementsByClassName(mycolor+" queen")[0].style.backgroundColor = "blue";
      };
      if (key == roL) {
          if (document.getElementsByClassName(mycolor+" rook")[nn0] != undefined)
      document.getElementsByClassName(mycolor+" rook")[nn0].style.backgroundColor = "blue";
      };
      if (key == roR) {
           if (document.getElementsByClassName(mycolor+" rook")[nn1] != undefined)
      document.getElementsByClassName(mycolor+" rook")[nn1].style.backgroundColor = "blue";
      };
      if (key == knL) {
           if (document.getElementsByClassName(mycolor+" knight")[nn0] != undefined)
      document.getElementsByClassName(mycolor+" knight")[nn0].style.backgroundColor = "blue";
      };
      if (key == knR) {
          if (document.getElementsByClassName(mycolor+" knight")[nn1] != undefined)
      document.getElementsByClassName(mycolor+" knight")[nn1].style.backgroundColor = "blue";
      };
      if (key == kingK) {
      document.getElementsByClassName(mycolor+" king")[0].style.backgroundColor = "blue";
      };
      if (key == pLK || key == pFK || key == pRK) {
      for (var e1 = 0; e1 < document.getElementsByClassName(mycolor+" pawn").length; e1++) {
      document.getElementsByClassName(mycolor+" pawn")[e1].style.backgroundColor = "blue";
      };
      }
};

    document.addEventListener('keyup', KeyUp);
    function KeyUp(event){
     var key = event.key.toLowerCase();
    
//key = key.toLowerCase();
        for( var i = 0; i < keys.length; i++){
   if ( keys[i] === key) {
     keys.splice(i, 1);
   }
}

        for( var j = 0; j < keysT.length; j++){
   if ( keysT[j] === key) {
     keysT.splice(j, 1);
   }
}

       // makemoves();

      if (key == biK) {
      for (var ee = 0; ee < document.getElementsByClassName(mycolor+" bishop").length; ee++) {
                   document.getElementsByClassName(mycolor+" bishop")[ee].style.backgroundColor = "";
      };
      };
      if (key == qK) {
          //console.log("this");
          if (document.getElementsByClassName(mycolor+" queen")[0] != undefined)
      document.getElementsByClassName(mycolor+" queen")[0].style.backgroundColor = "";
      };
      if (key == roL) {
          if (document.getElementsByClassName(mycolor+" rook")[nn0] != undefined)
      document.getElementsByClassName(mycolor+" rook")[nn0].style.backgroundColor = "";
      };
      if (key == roR) {
          if (document.getElementsByClassName(mycolor+" rook")[nn1] != undefined)
      document.getElementsByClassName(mycolor+" rook")[nn1].style.backgroundColor = "";
      };
      if (key == knL) {
          if (document.getElementsByClassName(mycolor+" knight")[nn0] != undefined)
      document.getElementsByClassName(mycolor+" knight")[nn0].style.backgroundColor = "";
      };
      if (key == knR) {
          if (document.getElementsByClassName(mycolor+" knight")[nn1] != undefined)
      document.getElementsByClassName(mycolor+" knight")[nn1].style.backgroundColor = "";
      };
      if (key == kingK) {
         // if (document.getElementsByClassName(mycolor+" king")[0] != undefined)
      document.getElementsByClassName(mycolor+" king")[0].style.backgroundColor = "";
      };
      if (key == pLK || key == pFK || key == pRK) {
      for (var e1 = 0; e1 < document.getElementsByClassName(mycolor+" pawn").length; e1++) {
      document.getElementsByClassName(mycolor+" pawn")[e1].style.backgroundColor = "";
      };
      }
     //  keys[event.key] = false;
       // console.log(keys);

    };
    var mypieces,st = [],pcc,pccn,time;
    var turnC;
    var observer;
    var config;
    var oncebeep = 0,whosmove;
    var target = document.getElementsByClassName('rclock-bottom')[0];
observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        //console.log(mutation.type);
        if (document.getElementsByClassName("rclock rclock-bottom running")[0] != undefined && document.getElementsByClassName("rclock rclock-bottom running")[0] != null)
        {
            if (oncebeep == 1) {
      //  console.log("mymove");
            turnC = 1;
            keysT = keys.slice(0);
                oncebeep = 0;
                st = [];
                //trying to avoid illegal moves (capturing my own pieces)
                window.setTimeout(function(){
            mypieces = board.children;


                //time = Date.now;
                for (var ppp = 0; ppp < mypieces.length; ++ppp) {
                    if ((mypieces[ppp].className.includes(mycolor)) && !(mypieces[ppp].className.includes("ghost"))) {
                       pcc = mypieces[ppp].getBoundingClientRect();
                       // console.log(mypieces[ppp]);
                        pccn = (1+Math.round((pcc.left-rect.left)/sqsize))*10+(8-Math.round((pcc.top-rect.top)/sqsize));
                        st.push(pccn);

                    }
                }

               //console.log(Date.now-time);
                //end of the experiment
               // time = performance.now();
                    //console.log("moveonmyturn",keysT,keys);
       makemoves();

                    },40);

            }
        }
        if (document.getElementsByClassName("rclock rclock-bottom running")[0] == undefined || document.getElementsByClassName("rclock rclock-bottom running")[0] == null)
        {
            if (oncebeep == 0) {
      //  console.log("oppmove");
            turnC = 0;
                st = [];
            keysT = keys.slice(0);
               // time = performance.now();
                //trying to prevent wrong clicking
                if ((hor != horiz0) || (vert != vertic0))
                    {
                window.setTimeout(function(){
        makemoves();
                     },15);
                }
                //timeout end

                oncebeep = 1;
            }
        }
    });
});
config = {
     attributes: true,
   // childList: true,
   subtree: false
};
    if (target != undefined && target != null)
{
     observer.observe(target, config);
}
/*
var keys = { length: 0 };

document.onkeydown = function(e){
    if(!keys[e.key]) {
        keys[e.key] = true;
        keys.length++;
        console.log(keys);
    }
}

document.onkeyup = function(e){
    if(keys[e.key]) {
        keys[e.key] = false;
        keys.length--;
        console.log(keys);
    }
}
*/
var premove,prerect;
    function getPremove() {
        if (document.getElementsByClassName("current-premove")[0] != undefined && document.getElementsByClassName("current-premove")[0] != null)
        {
premove = 1;
        }
    };

    function cancelPrem() {
           tts1(rect.left+5,rect.bottom-5);
        tts1(rect.left+5,rect.bottom-5);
    };
}

    }, 300);
