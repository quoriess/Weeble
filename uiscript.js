var keyNow=0;
var GRID_SIZE=6;
$(function() {
    $("#txtbox").keyup(function(event) {
            if (event.keyCode === 13) {
                $("#enter").click();
            }
        }
    );
    $("#txtbox").focus();
    $("#txtbox").autocomplete({
        source: keys
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
	keyNow=keys[getRandomInt(0,keys.length)]
	$("#theImage").attr("src",data[keyNow]);
});
function showFaqs(){
	$("#dialog").dialog('open');
	
}
var gs = 1;
var tries=0;
function copyToCB(){
	  navigator.clipboard.writeText("Weeble #???: \n"+"\uD83D\uDFE5".repeat(tries-1)+"\uD83D\uDFE9");

}
function valueEntered() {
    if (gs == 6) return;

    var ne = document.getElementById('g' + gs);
    var txtbox = document.getElementById('txtbox');
    if (!keys.includes(txtbox.value)) {
        alert("not a valid poet");
        return;
    }
    ne.textContent = txtbox.value;
    if(txtbox.value==keyNow){
		tries=gs;
		$("#g"+gs).css("background-color","green");		
		$(".hiddenBox").html("Well done! <button style='float:right' onclick='copyToCB()'>Share</button>");
		$(".hiddenBox").css("display","block");
	}
	else{
		$("#g"+gs).css("background-color","red");
		
		if (gs == 5) {
			document.getElementById("enter").disabled = true;
			$(".hiddenBox").html("Someone did a fucky yucky uwu ~murr~ The answer was: <b>"+ keyNow+"</b>");
			$(".hiddenBox").css("display","block");
		}
	}
	txtbox.value = "";
    gs += 1;
    txtbox.focus();
   
}