function getCurrentDate() {
  const t = new Date();
  const date = ('0' + t.getUTCDate()).slice(-2);
  const month = ('0' + (t.getUTCMonth() + 1)).slice(-2);
  const year = t.getUTCFullYear();
  return date+"/"+month+"/"+year;
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
