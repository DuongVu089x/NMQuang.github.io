var arrayValue = new Array();
var valueTemp;
var count = -1;
var temp = 0;
var page;
$(document).ready(function() {
  
  window.onload = function(e) {
    valueTemp = JSON.parse(localStorage["arrayValue"]);
    if($.isEmptyObject(valueTemp)) {
      alert("bad job");
    } else {
      for(var i = 0; i < valueTemp.length; i++) {
        $('#container-value ul').append("<li><a href=#a_"+valueTemp[i].counts+" name=list_"+valueTemp[i].counts+"_"+valueTemp[i].pages+" id=list_"+valueTemp[i].counts+">"+valueTemp[i].val+"</a></li>");
        loadList();
        
      
        $('#list_'+valueTemp[i].counts).click(function() {
            var textList = $(this).text();
            $('*').highlight(textList);
        });
      }
    }
  }

  $('#viewer').on('mouseup', function(e) {

    var selectedValue = getSelectedText();
    /*click class page*/
    $('.page').click(function() {
      page = $(this).attr('data-page-number');
    });/*end click class page*/
    
    if(selectedValue !== '') {
        $(this).after($("<img src=./images/favorite.png class=btn- id=btn_"+count+" ><a name=a_"+temp+" id=a_"+temp+"><span></span></a>"));

         var offset = $(this).offset();
         var currentX = (e.pageX - offset.left);
         var currentY = (e.pageY - offset.top);

         $(this).mousedown(function() {
          $('.btn-').hide();
         });
         
         /*css*/

         $('span').css({
          "display":"none",

         });

         $('.btn-').css({
          "position":"absolute",
          "left":currentX,
          "top":currentY,
         });

         $('#btn_'+count).css({
          "width":"100px", 
         });

         $('#a_'+temp).css({
          "position":"absolute",
          "left":currentX - 25,
          "top":currentY - 25,
         });

         $('.highlight').css({
          "color":"red",
          "font":"16px",
         });

         $('span').css({
          "display":"block",
          "width":"auto",
         });
         /*click button add*/
         $('#btn_'+count).click(function(e) {
           click = true;
           e.preventDefault();
           $(this).hide();

           var value = selectedValue;
           arrayValue.push({val:value,page:page});
           localStorage["arrayValue"] = JSON.stringify(arrayValue);
           valueTemp = JSON.parse(localStorage["arrayValue"]);

           if(value.length > 50) {
            value = value.substring(0,49);
           }

           $('#container-value ul').append("<li><a href=#a_"+count+" name=list_"+count+"_"+page+" id=list_"+count+">"+value+"</a></li>");
           loadList();
            /* click a item in list*/ 
            $('#list_'+count).click(function() {
              var textList = $(this).text();
              $('*').highlight(textList);
            });
           /* end click a item in list*/
           
          });/* end click #btn*/   
    }

    count++;
    temp++;
  });/* end #viewerContainer*/

  /*get value when clipboard a text*/
  function getSelectedText() {
    
    if (window.getSelection) {
       return window.getSelection().toString();
    } else if (document.selection) {
      return document.selection.createRange().text;
    }
    return '';
  }/* end getSelectedText()*/

  /*create a list to push item value*/
  function loadList() {
    var div = $('#container-value');
    div.css({
      "width":200,
      "height":"auto",
      "background-color":"aqua",
      "margin-top":30,
      // "display":"block",
    });
    div.show();
  }/*end loadList()*/

  function searchText(searchText) {
    if(searchText) {
      var content = $('#viewer').text();
      var searchExp = new RegExp(searchText,"ig");
      var match = content.match(searchExp);
      if(match) {
        $("div:contains('html')").css("color","red");
      }
    }
  }
});
