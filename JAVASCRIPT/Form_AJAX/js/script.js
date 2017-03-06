//Set calendar is invisible
document.getElementById("calendar-panel").style.display = "none";

//Show calendar
function showCalendar() {
	document.getElementById("calendar-panel").style.display = "block";
}
document.getElementById("currentMonth").colSpan = 2;
//Hide calendar
function hideCalendar() {
	document.getElementById("calendar-panel").style.display = "none";
}

var arrayCalendarDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

var arrayCalendarMonths = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

var dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//global variable
var calendarPanel = document.getElementById("calendar-panel");

var months = document.getElementById("month");
var years = document.getElementById("year");
var currentInput = document.getElementById("calendar-input");
var currentDay = new Date();
var currentMonth = currentDay.getMonth();
var currentYear = currentDay.getFullYear();
var MONTH = 1;
var DAYOFWEEK = 7;
var calendarTable = document.getElementById("calendar");


//Create Calendar
function createCalendar() {
	drawTable();
	setMonth();
	setYear();
	drawCalendar();
}

createCalendar();
// Clear calendar to draw it again
function clearCalendar() {
	for (var i = calendarTable.rows.length - 1; i > 0; i --) {
		calendarTable.deleteRow(i);
	}
}

//Draw table include day in current month
function drawTable() {
	for (var i = 0; i < MONTH; i++) {
		var row = calendarTable.insertRow();
		for (var j = 0; j < DAYOFWEEK; j++) {
			var cell = row.insertCell();
			cell.appendChild(document.createTextNode(arrayCalendarDays[j]));
			cell.className = "label";
		}
	}
	calendarPanel.appendChild(calendarTable);
}

//Draw calendar
function drawCalendar(month,year) {
	if(isNaN(month) || month == null) {
		this.month = currentMonth;
	}else {
		this.month = month;
	}
	
	if(isNaN(year) || year == null) {
		this.year = currentYear;
	}else {
		this.year = year;
	}
	
	var prevMonth = this.month -1;
	if(prevMonth < 0) {
		prevMonth = 11;
	}
	if(nextMonth == 12) {
		nextMonth = 0;
	}

	var nextMonth = this.month + 1;

	//Find current day
	var firstDay = new Date(this.year, this.month, 1);
	var startDay = firstDay.getDay();
	var monthLength = dayInMonth[this.month];

	if (this.month == 1) { // February only!
		if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
			monthLength = 29;
		}
	}

	var prevMonthLength = dayInMonth[prevMonth];
	
	var day = 1;
	var flag = 1;//flag to check the end of month
	var tmpStartDay = startDay;
	var inMonth = true;//flag to check is in month

	//
	for(var i= 0; i < 6; i++) {
		var row = calendarTable.insertRow();
		for(var j = 0; j <= 6; j++) {
			var cell = row.insertCell();
			if (j < startDay && i == 0) {
				var prevDay = prevMonthLength - tmpStartDay + 1
				cell.appendChild(document.createTextNode(prevDay));
				cell.style.background = "grey";
				cell.setAttribute("onClick", "doSelectedDate("+prevDay+", "+(this.month-1)+", "+this.year+")");
				tmpStartDay--;
			}

			if (i > 0 || j >= startDay) {
				// set in days in month background color
				cell.appendChild(document.createTextNode(day));
				cell.setAttribute("onClick", "doSelectedDate("+day+", "+this.month+", "+this.year+")");
				cell.className = "day";
				cell.style.background = "#1385C0";
				day++;
				flag++;
				// set today background color
				if ((day === currentDay.getDate() + 1) && this.month === currentDay.getMonth() && this.year === currentDay.getFullYear()) {
					cell.style.background = "red";
				}
				// If day draw to last day of month, set day back to 1 
				if (day > monthLength) {
					day = 1;
					this.month += 1;
				}
				// 	check if end month, set boolean inMonth = false		
				if (flag > monthLength+ 1) {
					inMonth = false;
				}
				/* If current month is larger than December, 
				   set it back to January, also move current year
				   to next year
				*/ 
				if (this.month > 11) {
					this.month = 0;
					this.year += 1;
				}
			}
			if (!inMonth) {
					cell.style.background = "grey";
			}
		}	
	}
}

//Set months list for select tag
function setMonth() {
	for(var month = 0; month < arrayCalendarMonths.length; month++) {
		months.options.add(new Option(arrayCalendarMonths[month],month));
	}
	months.value = currentMonth;
}

//Draw calendar by month selected
function drawMonth() {
	currentMonth = months.options[months.selectedIndex].value;
	clearCalendar();
	drawTable();
	drawCalendar(currentMonth,currentYear);
}

//Set years list for select tag
function setYear() {
	for(var year = 1990; year < 2030; year++) {
		years.options.add(new Option(year,year));
	}
	years.value = currentYear;
}

//Draw calendar by year selected
function drawYear() {
	currentYear = months.options[years.selectedIndex].value;
	clearCalendar();
	drawTable();
	drawCalendar(currentMonth,currentYear);
}

//Move to next month
function nextMonth() {
	tmpCurrentmonth = months.options[months.selectedIndex].value;
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
function prevMonth() {
	tmpCurrentmonth = months.options[months.selectedIndex].value;
	currentMonth = parseInt(tmpCurrentmonth);
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
}

//Move to next year
function nextYear() {
	tmpCurrentyear = years.options[years.selectedIndex].value;
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
	tmpCurrentyear = years.options[years.selectedIndex].value;
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

