$(document).ready(function() {

    var bool = true;
    var arrayMemo = new Array();
    var page;
    loadMemo();

    var scaleHeight;
    var scaleWidth;

    /**show Memo */
    function showMemo(count, page) {
        $('#viewer').mouseup(function() {
            $('.page').click(function() {
                page = $(this).attr('data-page-number');
                // var divCanvas = document.getElementById('page' + page);
                // var context = divCanvas.getContext('2d');
                // var pa = document.getElementsByClassName('page');
                // initialize();

                // function initialize() {
                //     window.addEventListener('resize', resizeCanvas, false);
                //     resizeCanvas();
                // }

                // function redraw() {
                //     context.strokeStyle = 'blue';
                //     context.lineWidth = '5';
                //     context.strokeRect(0, 0, pa.innerWidth - 100, pa.innerHeight - 100);
                // }

                // function resizeCanvas() {
                //     divCanvas.width = pa.innerWidth;
                //     divCanvas.height = pa.innerHeight;
                //     redraw();
                // }
            });

        });

        $('.page').mousedown(function(e) {
            var texts = '';
            var offset = $(this).offset();
            var currentX = (e.pageX - offset.left);
            var currentY = (e.pageY - offset.top);
            var textMemo = "<div class=text_container id=text-container-" + count + "><textarea rows='7' cols='10' id=text-" + count + " class=textArea ></textarea><input class=Input id=delete-" + count + " type=button value=delete /></div>";
            var imageIcon = "<div class=image_container><img class=image id=image-" + count + " src=images/memo_icon.png /></div>";
            var memoContainer = "<div class=div id=div-" + count + ">" + imageIcon + textMemo + "</div>";
            var currHeight;
            var currWidth;

            $(this).closest('.page').find('.textLayer').append(memoContainer);
            $(this).closest('.page').find('.canvasWrapper').append(memoContainer);

            function deleteElement(arr, pos) {
                for (var i = pos + 1; i < arr.length; i++) {
                    arr[i - 1] = arr[i];
                }
                arr.length--;
            }

            $('textarea#text-' + count).blur(function() {
                texts = $(this).val();
                arrayMemo.push({ id: count, value: memoContainer, textMemo: texts, x: currentX, y: currentY, page: page });
                for (var i = 0; i < arrayMemo.length - 1; i++) {
                    for (var j = i + 1; j < arrayMemo.length; j++) {
                        if (arrayMemo[i].id == arrayMemo[j].id) {
                            deleteElement(arrayMemo, i);
                            i--;
                        }
                    }
                }
                localStorage["arrayMemo"] = JSON.stringify(arrayMemo);
                arrayMemo = JSON.parse(localStorage["arrayMemo"]);
            });

            $('#delete-' + count).click(function() {
                $(this).closest('.div').remove();
                var idCount = $(this).attr('id').substring(7);
                arrayMemo = $.grep(arrayMemo, function(e) {
                    return e.id != idCount;
                });
                localStorage["arrayMemo"] = JSON.stringify(arrayMemo);

            });

            currHeight = $(this).closest('.page').height();
            currWidth = $(this).closest('.page').width();
            var scale;
            $('.dropdownToolbarButton').mouseleave(function() {
                scale = $('select[id=scaleSelect]').val();
                switch (scale) {
                    case '0.5':
                        {
                            scaleHeight = 528;
                            scaleWidth = 408;
                            break;
                        }
                    case '0.75':
                        {
                            scaleHeight = 792;
                            scaleWidth = 612;
                            break;
                        }
                    case '1':
                        {
                            scaleHeight = 1056;
                            scaleWidth = 816;
                            break;
                        }
                    case '1.25':
                        {
                            scaleHeight = 1319;
                            scaleWidth = 1019;
                            break;
                        }
                    case '1.5':
                        {
                            scaleHeight = 1584;
                            scaleWidth = 1224;
                            break;
                        }
                    case '2':
                        {
                            scaleHeight = 2112;
                            scaleWidth = 1632;
                            break;
                        }
                    default:
                        {
                            scaleHeight = 1319;
                            scaleWidth = 1019;
                        }
                }

                // var div = $('#div-' + count);
                // div.left = currentX * scaleWidth / currWidth;
                // div.top = currentY * scaleHeight / currHeight;
                // console.log(div.left + '_' + div.top);



            });


            /*style for all*/
            //css div memoContainer
            $('#div-' + count).css({
                "position": "absolute",
                "left": currentX,
                "top": currentY,
            });
            $('.textLayer').css({ "opacity": 1 });
            //css imageIcon
            $('.image_container').css({
                "position": "absolute",
                // "left": "-50px",
                "width": "30px",
                "height": "30px",
            });
            $('.image').css({
                "position": "absolute",
                "width": "30px",
                "height": "30px",
            });
            //css textMemo
            $('.text_container').css({
                "display": "none",
                "position": "absolute",
            });

            $('#li-' + count + 'a').css({
                "text-decoration": "none",
            });


            bool = true;
            $('.page').unbind();

            /*start hover icon*/
            var imageContainer = $('#image-' + count);
            var textContainer = $('#text-container-' + count);
            var clicked = false;

            $('#image-' + count).on('click', function() {
                clicked = !clicked;
            });

            imageContainer.hover(function() {
                    textContainer.show()
                },
                function() {
                    if (!clicked) {
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
            /*end hover icon*/
        });
    }

    function loadMemo() {
        var temp = 0;


        /*start click memoToolbar*/
        $('#memoToolbar').click(function() {

            if (arrayMemo.length > 0) {
                temp = arrayMemo.length + 1;
            }
            if (bool == true) {
                showMemo(temp, page);
                bool = false;
            } else {
                $('.page').unbind();
                bool = true;
                temp++;
            }
        });
        /*end click memoToolbar*/

        $(window).load(function() {
            arrayMemo = JSON.parse(localStorage["arrayMemo"]);
            var divs = $();
            var strCount;
            var widthViewer = $('#viewer').width();

            for (var i = 0; i < arrayMemo.length; i++) {
                strCount = arrayMemo[i].value.substr(22, 1);
                divs = divs.add(arrayMemo[i].value);
                $('#viewer').append(divs);
                $('textarea#text-' + strCount).val(arrayMemo[i].textMemo);
                $('#div-' + strCount).css({
                    "position": "absolute",
                    "left": arrayMemo[i].x,
                    "top": arrayMemo[i].y + 1584 * (arrayMemo[i].page - 1),
                });
                $('.text_container').css({
                    "display": "none",
                    "position": "absolute",
                });

                $('textarea#text-' + strCount).blur(function() {
                    var idTemp = $(this).attr('id').substring(5);
                    texts = $(this).val();
                    for (var i = 0; i < arrayMemo.length; i++) {
                        if (arrayMemo[i].id == idTemp) {
                            arrayMemo[i].textMemo = texts;
                        }
                        localStorage["arrayMemo"] = JSON.stringify(arrayMemo);
                        arrayMemo = JSON.parse(localStorage["arrayMemo"]);
                    }
                });

                /**
                 * delete element in arrayMemo when click button delete
                 */
                $('#delete-' + strCount).click(function() {
                    $(this).closest('.div').remove();
                    var idTemp = $(this).attr('id').substring(7);
                    arrayMemo = $.grep(arrayMemo, function(e) {
                        return e.id != idTemp;
                    });
                    localStorage["arrayMemo"] = JSON.stringify(arrayMemo);
                    arrayMemo = JSON.parse(localStorage["arrayMemo"]);
                });

                /**
                 * hover icon memo
                 */
                var clicked = false;
                $('#image-' + strCount).hover(
                    function() {
                        var idTemp = $(this).attr('id').substring(6);
                        $('#text-container-' + idTemp).show();
                    },
                    function() {

                        var idTemp = $(this).attr('id').substring(6);
                        $('#image-' + idTemp).click(function() {
                            clicked = !clicked;
                        });
                        if (!clicked) {
                            $('#text-container-' + idTemp).hide();
                        } else {
                            $('#image-' + idTemp).click(function() {
                                $('#text-container-' + idTemp).show();
                                return false;
                            });
                            $(document).click(function() {
                                $('#text-container-' + idTemp).hide();
                            });
                            $('#text-container-' + idTemp).click(function(e) {
                                e.stopPropagation();
                            });
                        }

                    }
                );
            }
            // var c = $('#page' + page);
            // var ct = c.get(0).getContext('2d');
            // var container = $(c).parent();

            // //Run function when browser resizes
            // $(window).resize(respondCanvas);

            // function respondCanvas() {
            //     c.attr('width', $(container).width()); //max width
            //     c.attr('height', $(container).height()); //max height

            //     //Call a function to redraw other content (texts, images etc)
            // }

            // //Initial call
            // respondCanvas();
        });
    }
});