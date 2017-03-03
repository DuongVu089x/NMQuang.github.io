$(document).ready(function(){
	//Set first iamge index
	var index = 1;
	
	//Show the first image
	showImage(index);

	/*
	Show image
	@param {number} n position of image
	*/
	function showImage(n){
		$("#slide-image-" + n).show();
		$("#small-image-" +n).addClass("active");
	}
	/*
	Hide image
	@param {number} n position of image
	*/
	function hideImage(n){
		$("#slide-image-" + n).hide();
		$("#small-image-" +n).removeClass("active");
	}
	
	//Click prev icon
	$("#prev").click(function(){
		//Hide the current image
		hideImage(index);
		//Move the position of curent image to prev position
		index--;
		//if the current image is first position, set position of the current image is the last position
		if( index < 1){
			index = 4;
		}
		//Show image
		showImage(index);
	});
	//Click next icon
	$("#next").click(function(){
		//Hide the current image
		hideImage(index);
		//Move the position of curent image to next position
		index++;
		//if the current image is last position, set position of the current image is the first position
		if( index > 4){
			index = 4;
		}
		//Show image
		showImage(index);
	});
	
	jQuery.fn.onClick = function(n){
		hideImage(index);
		showImage(n);
		index = n;
	};
});