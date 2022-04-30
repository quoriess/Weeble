function getCurrentDate() {
  const t = new Date();
  const date = ('0' + t.getUTCDate()).slice(-2);
  const month = ('0' + (t.getUTCMonth() + 1)).slice(-2);
  const year = t.getUTCFullYear();
  return date+"/"+month+"/"+year;
}
function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return newDate;   
}
function cookieDate(d) {
  function d2(n) { return n < 10 ? '0' + n : n; }
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return '' +
    days[d.getUTCDay()] + ', ' +
    d2(d.getUTCDate()) + '-' +
    months[d.getUTCMonth()] + '-' +
    d.getUTCFullYear() + ' ' +
    d2(d.getUTCHours()) + ':' +
    d2(d.getUTCMinutes()) + ':' +
    d2(d.getUTCSeconds()) + ' GMT';
}
function setCookie(cname, cvalue) {
  var nw=new Date();
  var f=new Date(nw.getUTCFullYear(),nw.getUTCMonth(),nw.getUTCDate()+1);
  let expires = "expires="+f.toString()+" GMT";
  console.log(expires);
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  console.log(document.cookie);
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function load(){
	var s=1;
	while(getCookie("g"+s)!=""){
		nextClue();
		var ne = document.getElementById('g' + s);
		ne.textContent=getCookie("g"+s)=="___"?"":getCookie("g"+s);
		if(getCookie("g"+s)==keys[keyNow]){
			$("#g"+s).css("background-color","red");
			while(clueNo<=6)nextClue();		
			$(".hiddenBox").html("You guessed it right. Shame! <button style='float:right' onclick='copyToCB()'>Share</button>");
			$(".hiddenBox").css("display","block");
			return;
		}
		$("#g"+s).css("background-color","red");
		if(clueNo==6){
			document.getElementById("enter").disabled = true;
			$(".hiddenBox").html("Congrats, you failed! The answer was: <b>"+ keyNow+"</b>");
			$(".hiddenBox").css("display","block");
		}
		s+=1;
	}
}
var rngGen=new Math.seedrandom(getCurrentDate());
function getRandomInt(min,max) {
  return min+Math.floor(rngGen() * (max-min));
}
var shuffled=[]
var clueNo=0;
function generateTileOrder(){
	var alls=[];
	for(var i=0;i<GRID_SIZE*GRID_SIZE;i++){
		alls.push(i);
	}
	var s1 = alls
	  .map(value => ({ value, sort: rngGen() }))
	  .sort((a, b) => a.sort - b.sort)
	  .map(({ value }) => value);
	var ars=[]
	for(var i=0;i<GRID_SIZE/2+GRID_SIZE%2;i++){
		ars.push([])
	}
	for(var r=0;r<GRID_SIZE*GRID_SIZE;r++){
		var i=s1[r];
		var x=Math.floor(i/GRID_SIZE);
		var y=i%GRID_SIZE;
		var fValue=Math.min(Math.min(x,GRID_SIZE-1-x),Math.min(y,GRID_SIZE-1-y))
		ars[fValue].push(i);
	}
	//hardCode for grid size=6
	//20
	//12
	//4
	var vls=[[6,0,0],[4,2,0],[3,3,0],[2,4,1],[3,2,1],[2,1,2]];
	var cumSums=[0,0,0];
	for(var i=0;i<GRID_SIZE; i++){
		for(var j=0;j<3;j++){
			for(var k=0;k<vls[i][j];k++){
				shuffled.push(ars[j][cumSums[j]]);
				cumSums[j]+=1;
			}
		}
	}
}
var steps=[3,4,6,6,6,11]
var curRevealed=0;
function nextClue(){
	for(var j=0;j<steps[clueNo];j++){
		$("#t"+shuffled[curRevealed]).fadeOut();
		curRevealed+=1;
	}
	clueNo+=1;
}
