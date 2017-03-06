$(document).ready(function() {
	var index = 1;
	showDiv(index);
	/*
	show div content
	@param {int} n position of div
	*/
	function showDiv(n) {
		$("#film_" + n).show();
		$("#icon_" +n).removeClass("sub_active");
	}
	/*
	hide div content
	@param {int} n position of div
	*/
	function hideDiv(n) {
		$("#film_" + n).hide();
		$("#icon_" +n).addClass("sub_active");
	}

	jQuery.fn.onClick = function(n) {
		hideDiv(index);
		showDiv(n);
		index = n;
	}
	jQuery.fn.ondbClick = function(n) {
		hideDiv(n);
	}
});