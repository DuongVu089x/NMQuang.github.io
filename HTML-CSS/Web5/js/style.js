function hideContent(showhideDiv){
	var div = document.getElementById(showhideDiv);
	if(div.style.display == "block"){
		div.style.display = "none";
		
	}else{
		div.style.display = "block";
		
	}
}