$( function() {
    	$("#day").datepicker({
      		changeMonth: true, // Whether the month should be rendered as a dropdown instead of text.
      		changeYear: true, // Whether the year should be rendered as a dropdown instead of text. 
            		yearRange: "1990:2030", // option to control which years are made available for selection.
            		// Whether to display dates in other months (non-selectable) at the start or end of the current month.
      		showOtherMonths: true, 
            		// Whether days in other months shown before or after the current month are selectable. 
      		selectOtherMonths: true 
    	});
          // Format display date in textbox ass day/month/year format. 
      	$( "#day" ).datepicker( "option", "dateFormat", "dd/mm/yy" );
  });