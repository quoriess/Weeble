var keyNow=0;
var GRID_SIZE=6;
var uiKeys=[]
$(function() {
    $("#txtbox").keyup(function(event) {
            if (event.keyCode === 13) {
                $("#enter").click();
            }
        }
    );
    $("#txtbox").focus();
	uiKeys=keys.map((x)=>x);
	uiKeys.push("");
    $("#txtbox").autocomplete({
        source: uiKeys
    });
	$( function() {
		$( "#dialog" ).dialog({autoOpen:false});
	} );
	
	$("#rel-container").append("<img id='theImage' src='406163.jpg'/>");
	for(var i=0;i<GRID_SIZE;i++){
		for(var j=0;j<GRID_SIZE;j++){
			var gid=i*GRID_SIZE+j;
			$("#rel-container").append("<div id='t"+gid+"' class='tile'></div>");
			$("#t"+gid).css("top",(100*i)/GRID_SIZE+"%");
			$("#t"+gid).css("left",(100*j)/GRID_SIZE+"%");
		}	
	}
	var f=100/GRID_SIZE;
	$(".tile").css("width",f+"%")
	$(".tile").css("height",f+"%")
	$(".tile").css("position","absolute");
	generateTileOrder();
	var arm=new Math.seedrandom("amogus");
	var t1=new Date(2022,3,30);
	var nw=new Date();
	var utct1=new Date(t1.getUTCFullYear(),t1.getUTCMonth(),t1.getUTCDate());
	var utcd=new Date(nw.getUTCFullYear(),nw.getUTCMonth(),nw.getUTCDate())
	var dayNo= (Math.floor((utcd-utct1)/(24*3600*1000))+1);
	console.log(dayNo);
	var shuffledKeys = keys
	  .map(value => ({ value, sort:  arm() }))
	  .sort((a, b) => a.sort - b.sort)
	  .map(({ value }) => value);
	keyNow=shuffledKeys[dayNo%500];
	$("#theImage").attr("src",data[keyNow]);
	nextClue();
	load();
});
function showFaqs(){
	$("#dialog").dialog('open');
	
}
var tries=0;
function copyToCB(){
	var t1=new Date(2022,3,30);
	var nw=new Date();
	var utct1=new Date(t1.getUTCFullYear(),t1.getUTCMonth(),t1.getUTCDate());
	var utcd=new Date(nw.getUTCFullYear(),nw.getUTCMonth(),nw.getUTCDate())
	var dayNo= (Math.floor((utcd-utct1)/(24*3600*1000))+1);
	navigator.clipboard.writeText("Weeble #"+dayNo+": \n"+"\uD83D\uDFE5".repeat(tries-1)+"\uD83D\uDFE9");
}
function valueEntered() {
    if (clueNo == 6) return;

    var ne = document.getElementById('g' + clueNo);
    var txtbox = document.getElementById('txtbox');
    if (!uiKeys.includes(txtbox.value)) {
        alert("not a valid weebshit");
        return;
    }
    ne.textContent = txtbox.value;
	setCookie("g"+clueNo,txtbox.value==""?"___":txtbox.value);
    if(txtbox.value==keyNow){
		tries=clueNo;
		$("#g"+clueNo).css("background-color","green");	
		while(clueNo<=6)nextClue();		
		$(".hiddenBox").html("You guessed it right. Shame! <button style='float:right' onclick='copyToCB()'>Share</button>");
		$(".hiddenBox").css("display","block");
	}
	else{
		$("#g"+clueNo).css("background-color","red");
		nextClue();
		if (clueNo == 6) {
			document.getElementById("enter").disabled = true;
			$(".hiddenBox").html("Congrats, you failed! The answer was: <b>"+ keyNow+"</b>");
			$(".hiddenBox").css("display","block");
		}
	}
	txtbox.value = "";
    txtbox.focus();
}