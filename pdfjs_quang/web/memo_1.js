var count = 0;
var bool = true;
var arrayMemoTemp = new Array();
var arrayMemo = new Array();

$(document).ready(function() {
	/*start function showMemo */
    showMemo = function() {
        $('.page').mousedown(function(e) {
            var offset = $(this).offset();
			var currentX = (e.pageX - offset.left);
			var currentY = (e.pageY - offset.top);
			var textMemo = "<div class=text_container id=text-container-"+count+"><textarea rows='7' cols='10' id=text-"+count+" class=textArea ></textarea><input class=Input id=delete-"+count+" type=button value=delete /></div>";
			var imageIcon = "<div class=image_container><img class=image id=image-"+count+" src=images/memo_icon.png /></div>";
			var memoContainer = "<div class=div id=div-"+count+"><a id=link-"+count+" name=link-"+count+"></a>"+imageIcon+textMemo+"</div>";
			
			$(this).closest('.page').find('.textLayer').append(memoContainer);

			/*save into arrayMemo*/
			
            /*style for all*/
			//css div memoContainer
			$('#div-'+count).css({
				"position":"absolute",
				"left": currentX,
				"top": currentY,
				
			});
			$('.textLayer').css({"opacity":1});
			//css imageIcon
			$('.image_container').css({
				"position":"absolute",
	            "left":"-50px",
	            "width":"30px",
	            "height":"30px",
			});
			$('.image').css({
				"position":"absolute",
				"width":"30px",
				"height":"30px",
			});
			//css textMemo
			$('.text_container').css({
				"display":"none",
				"position":"absolute",
			});

			//get index of memo
			var strId = $('#delete-'+count).attr('id');
			strId = strId.substring(7);

			$('textarea#text-'+strId).blur(function() {
				// alert($(this).val());
				var text = $(this).val();
				arrayMemo.push({value:memoContainer, texts:text, x:currentX, y:currentY});
				localStorage["arrayMemo"] = JSON.stringify(arrayMemo);
				arrayMemoTemp = JSON.parse(localStorage["arrayMemo"]);
			});
			
			/*start hover icon*/
			$('#delete-'+count).click(function() {
				var a = $(this).attr('id');
	        	a = a.substring(7);
	        	$(this).closest('.div').remove();
	        	arrayMemoTemp.splice(a+1,1);
	        	localStorage["arrayMemo"] = JSON.stringify(arrayMemoTemp);
	        });
			bool = true;
			$('.page').unbind();

			 /*start hover icon*/
	        var imageContainer = $('#image-'+count);
	        var textContainer = $('#text-container-'+count);
	        var clicked=false;

	        $('#image-'+count).on('click', function() {
	          clicked = !clicked;
	        });

	        imageContainer.hover(function() {
	        		textContainer.show()
	        	},
	        	function() {
	        		if(!clicked) {
	        			textContainer.hide();
	        		} else {
	        			imageContainer.click(function() {
	        				textContainer.show();
	        				return false;
	        			});
	        			$(document).click(function() {
	        				textContainer.hide();
	        			});
	        			textContainer.click(function(e) {
	        				e.stopPropagation();
	        			});
	        		}
	        	}
	        );
			count++;
        });		
	
	}/*end function showMemo */





    /*start click memoToolbar*/
	$('#memoToolbar').click(function() {
	    if(bool == true) {
			showMemo();
			bool = false;
		} else {
			$('.page').unbind();
			bool = true;
		}
    });	
	/*end click memoToolbar*/
});