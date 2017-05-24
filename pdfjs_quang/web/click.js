var myarray = [];
var memo = true;
var tang = 0;
$(document).ready(function(){

 function pageClick(){
  $('.page').mousedown(function(e) {
    var offset = $(this).offset();
    var relativeX = (e.pageX - offset.left);
    var relativeY = (e.pageY - offset.top);

          //Click  
          var tmpTextArea = "<textarea rows='5' cols='10' id='text_"+tang+"' class='textcl textArea' value='hello'></textarea>";
          $(this).closest('.page').find('.textLayer')
          .append("<div id=ramdom-"+tang+" class=ramdom_><div class=imgme><img class=climg id=imgpin"+tang+" src=../web/images/pushpin.png /></div><div id=diamemo"+tang+" class=dialogmemo>"+ tmpTextArea +"<input id=btnre"+tang+" class=btnrem type=button value=remove /></div></div>");

          //array
          setTimeout(function() {
            $('#text_'+tang).bind("keyup", function(){

              var obje = {
                idtext : '#text_'+tang,
                id :'#imgpin'+tang,
                top: relativeY,
                left : relativeX,
                val : this.value
              }
              // if ($(this).val() == '') {
              //   $(this).val(defaultText); 
              // }
              a = '#text_'+tang;
              b = obje.idtext;
              a == b
              obje.val;
              console.log(obje.val);
              myarray.push(obje);

              alert($(this).val());
            });
          }, 500);


          // var empt = [];
          // var objempt = {
          //   myarray,
          // }
          // empt.push(objempt);
          // console.log(empt);
          console.log(myarray);


          memo=true;
          $('.page').unbind();
          //css
          $('.textLayer').css({"opacity":"1"});
          $('#ramdom-'+tang).css({
            "position":"absolute",
            "left":relativeX,"top":relativeY,
          });
          $('.climg').css({
            "position":"absolute",
            "left":"-50px",
            "width":"30px",
            "height":"30px",
          });
          $('.dialogmemo').css({
            "display":"none",
            "position":"absolute"
          });

        //hover
        var barimg = $('#imgpin'+tang);
        var bar = $('#diamemo'+tang);
        var clicked=false;

        $('#imgpin'+tang).on('click', function() {
          clicked = !clicked;
        });

        barimg.hover(
          function(){
            bar.show()
          },
          function() {
            if (!clicked) {
              bar.hide();
            }
            else {
             barimg.click(function() {
              bar.show();
              return false;
            });
             $(document).click(function() {
              bar.hide();

            });
             bar.click(function(e) {
              e.stopPropagation();
            });
           }
         });


          //remove
          $('.btnrem').on('click',function(){
            $(this).closest('.ramdom_').remove();
          });



        });
        //var
        tang++;
      }
      $('#memoToolbar').bind('click', (function () {
        if (memo == true){
          pageClick();
          memo = false;
          console.log(memo);
        }else {
          $('.page').unbind();
          memo = true;
        }
      }));

    })