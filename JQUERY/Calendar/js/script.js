$(document).ready(function() {
	$('h2').css('color','aqua');
	/*$('#calendar-panel').css('display','none');*/
	
	//Show calendar
	function showCalendar() {
		$('#calendar-panel').css('display','block');
	}
	
	//Hide calendar
	function hideCalendar() {
		$('#calendar-panel').css('display','none');
	}

	$('#currentMonth').attr('colSpan','2');

	//global variable
	var arrayCalendarDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	var arrayCalendarMonths = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
	var dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var calendarPanel = $('#calendar-panel');
	var months = $('#month');
	var years = $('#year');
	var currentInput = $('#calendar-input');
	var currentDay = new Date();
	var currentMonth = currentDay.getMonth();
	var currentYear = currentDay.getFullYear();
	var MONTH = 1;
	var DAYOFWEEK = 7;
	var calendarTable = $('table')[0];

	//create calendar
	function createCalendar() {
		drawTable();
		setMonth();
		setYear();
		drawCalendar();
	}
	
	//call function createCalendar
	createCalendar();
	
	//cleare calendar to draw it again
	function clearCalendar() {
		for(var i = calendarTable.rows.length - 1; i > 0; i--) {
			calendarTable.deleteRow(i);
		}
	}

	//draw table include day in current month
	function drawTable() {
		for( var i = 0; i < MONTH; i++) {
			var row = calendarTable.insertRow();
			for( var j = 0; j < DAYOFWEEK; j++) {
				var cell = row.insertCell();
				cell.append(document.createTextNode(arrayCalendarDays[j]));
				cell.className = 'label';
			}
		}
		calendarPanel.append(calendarTable);
	}
	
	//draw calendar
	/*
	@param {string, string} month, year
	draw calendar with this month and year
	*/
	function drawCalendar(month,year) {
		if(isNaN(month) || month == null) {
			this.month = currentMonth;
		} else {
			this.month = month;
		}
		
		if(isNaN(year) || year == null) {
			this.year = currentYear;
		} else {
			this.year = year;
		}
		var prevMonth = this.month - 1;
		var nextMonth = this.month + 1;
		if(prevMonth < 0) {
			prevMonth = 11;
		}
		if(nextMonth == 12) {
			nextMonth = 0;
		}
		//Find curent day
		var firstDay = new Date(this.year, this.month, 1);
		var startDay = firstDay.getDay();
		var monthLength = dayInMonth[this.month];

		if(this.month == 1) {
			if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0) {
				monthLength = 29;
			}
		}
		
		var prevMonthLength = dayInMonth[prevMonth];
		var day = 1;
		var flag = 1; //flag to check end of month
		var tmpStartDay = startDay;
		var inMonth = true;//flag to check is in month

		for( var i = 0; i < 6; i++) {
			var row = calendarTable.insertRow();
			for( var j = 0; j <= 6; j++) {
				var cell = row.insertCell();
				if(j < startDay && i == 0) {
					var prevDay = prevMonthLength - tmpStartDay + 1;
					cell.append(document.createTextNode(prevDay));
					cell.style.background = "grey";
					cell.setAttribute('onclick','doSelectedDate('+prevDay+','+(this.month -1)+','+this.year+')');
					tmpStartDay--;
				}
				if(i > 0 || j >= startDay) {
					//set in days in month baclground color
					cell.append(document.createTextNode(day));
					cell.setAttribute("onclick","doSelectedDate("+day+", "+this.month+", "+this.year+")");
					cell.className = "day";
					cell.style.background = "#1385C0";
					day++;
					flag++;
					//set today background color
					if ((day === currentDay.getDate() + 1) && this.month === currentDay.getMonth() && this.year === currentDay.getFullYear()) {
						cell.style.background = "red";
					}
					//if day draw to last of month, sset day back to 1
					if(day > monthLength) {
						day = 1;
						this.month+= 1;
					}
					//check if end month, set booolean inMonth = false
					if( flag > monthLength + 1) {
						inMonth = false;
					}
					// if currentmonth is larger than Dec, set it back to Janu, also move curent year to next year
					if(this.month > 11) {
						this.month = 0;
						this.year+= 1;
					}
				}
				if(!inMonth) {
					cell.style.background = "grey";
				}
				if( (day === currentDay.getDate() + 1) && this.month === currentDay.getMonth() && this.year === currentDay.getFullYear()) {
					cell.style.background = "red";
				}
			}
		}
	}
	//Set months list for select tag
function setMonth() {
	for(var month = 0; month < arrayCalendarMonths.length; month++) {
		$("#month").append(new Option(arrayCalendarMonths[month],month));
	}
	months.value = this.currentMonth;
}

//Set years list for select tag
function setYear() {
	for(var year = 1910; year < 2030; year++) {
		$("#year").append(new Option(year,year));
	}
	years.value = this.currentYear;
}

//Move to next month
function nextMonth() {
	tmpCurrentmonth = months.options[months.selectedIndex].val();
	currentMonth = parseInt(tmpCurrentmonth);
	currentMonth++;
	if (currentMonth == 12) {
		currentMonth = 0;
		currentYear +=1;
	}
	setMonth();
	setYear();
	clearCalendar();
	drawTable();
	drawCalendar(currentMonth, currentYear);
}

//Move to prev month
	$("#prev_month").on("click",function(){
	tmpCurrentmonth = 
	currentMonth--;
	if (currentMonth < 0) {
		currentMonth = 11;
		currentYear -=1;
	}
	setMonth();
	setYear();
	clearCalendar();
	drawTable();
	drawCalendar(currentMonth, currentYear);
	}); 


//Move to next year
function nextYear() {
	tmpCurrentyear = years.options[years.selectedIndex].val();
	currentYear = parseInt(tmpCurrentyear);
	currentYear++;
	if (currentYear == 2030) {
		currentYear = currentDay.getFullYear();
	}
	setMonth();
	setYear();
	clearCalendar();
	drawTable();
	drawCalendar(currentMonth, currentYear);
}

//Move to prev year
function prevYear() {
	tmpCurrentyear = years.options[years.selectedIndex].val();
	currentYear = parseInt(tmpCurrentyear);
	currentYear--;
	if (currentYear < 1990) {
		currentYear = currentDay.getFullYear();
	}
	setMonth();
	setYear();
	clearCalendar();
	drawTable();
	drawCalendar(currentMonth, currentYear);
}
/* 
 Set time when we click another day in calendar, in textbox will have this day
 @param {number} day
 @param {number} month
 @param {numeber} year
*/
function doSelectedDate(day, month, year) {
	var currentDay = day + "/" + (parseInt(month) + 1) + "/" + year;
	currentInput.value = currentDay;
	hideCalendar();
}

});