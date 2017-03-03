//Get list image in slideImage
var slideImage = document.getElementsByClassName("slide-image");

//Get list small image in smallImage
var smallImage = document.getElementsByClassName("small-image");

//Set visible for the first image in slideImage
slideImage[0].style.display = "block";

//Set first image index
var index = 1;

var interval = setInterval(function(){
	nextImage(+1);
},12000);

/*
Move to next image
@param {number} n
*/
function nextImage(n){
	index = index + n;
	showImage(index);
}

/*
Move to prev image
@param {number} n
*/
function prevImage(n){
	index = index - n;
	showImage(index);
}

/*
Show big image in slideImage
@param {number} n position of image
*/

function showImage(n){
	for(i = 0; i < slideImage.length; i++) {
		slideImage[i].style.display = "none";
		smallImage[i].classList.remove("active");
	}
	if(n == 0){
		//current image is the first image, if move to prev image, set current image is the last image
		index = slideImage.length;
	}else{
		//current image is the last image, if move to next image, set current image is the first image
		if(n > slideImage.length){
			index = 1;
		}else{
			index = n;
		}
	}
	//set current image to visible
	slideImage[index-1].style.display = "block";
	//set curent small image to active mode
	smallImage[index-1].classList.add("active");
}
