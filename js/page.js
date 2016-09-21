$(function() {

    jQuery(".slideBox").slide({
        mainCell: ".bd ul",
        effect: "fold",
        autoPlay: true,
        trigger: "click"
    });
    $(".topmenu ul li").hover(function() {
        $(this).find("dl").stop().animate({ height: $(this).find("dd").length * 40 }, 400);
        $(this).find("p a").addClass("hover01");
    }, function() {
        $(this).find("dl").stop().animate({ height: 0 }, 400);
        $(this).find("p a").removeClass("hover01");
    });

    $(".dress ul li").hover(function() {
        $(this).find("tt").stop().animate({ height: 390 }, 600);
        $(this).find("ins").stop().animate({ left: 0 }, 600);
    }, function() {
        $(this).find("tt").stop().animate({ height: 0 }, 600);
        $(this).find("ins").stop().animate({ left: -290 }, 600);
    });

    $("#menu1 li a").wrapInner( '<span class="out"></span>' ).append( '<span class="bg"></span>' );

            // loop each anchor and add copy of text content
            $("#menu1 li a").each(function() {
                $( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
            });

            $("#menu1 li a").hover(function() {
                // this function is fired when the mouse is moved over
                $(".out",   this).stop().animate({'top':    '40px'},    250); // move down - hide
                $(".over",  this).stop().animate({'top':    '0px'},     250); // move down - show
                $(".bg",    this).stop().animate({'top':    '0px'},     120); // move down - show

            }, function() {
                // this function is fired when the mouse is moved off
                $(".out",   this).stop().animate({'top':    '0px'},     250); // move up - show
                $(".over",  this).stop().animate({'top':    '-40px'},   250); // move up - hide
                $(".bg",    this).stop().animate({'top':    '-40px'},   120); // move up - hide
            });
    $(".video ul li").hover(function() {
        $(this).find("ins").stop().animate({ top: 0 }, 600);
    }, function() {
        $(this).find("ins").stop().animate({ top: -500 }, 600);
    });

    $(".newscontent p:has(img)").css({ "border-bottom": "none" });

    $(".newscontent p:not(:has(img))").css({ "text-indent": "2em" });

    $(".invdo li a").hover(function() {
        $(this).find("tt").stop().animate({ top: 0 }, 600);
    }, function() {
        $(this).find("tt").stop().animate({ top: -500 }, 600);
    });

    jQuery(".slideBox").slide({
        mainCell: ".bd ul",
        effect: "fold",
        autoPlay: true,
        trigger: "click"
    });
    $(".lxwm_qq").find("a").attr("href",$(".Qlist").find("a").eq(0).attr("href"));
    $(function() {
        $(window).resize(function() { goTop(); });
        $(window).scroll(function() { goTop(); });
    });

    function goTop() {
        $(".piaofu").stop().animate({
            "top": ($(window).height() + $(window).scrollTop() - ($(window).height() + $(".piaofu").height()) / 2) < 850 ? 850 :

                $(window).height() + $(window).scrollTop() - ($(window).height() + $(".piaofu").height()) / 2
        }, 800);

    }

     $('.sypic .box').slide({ autoPlay: 1, mainCell: ".bd", titCell: '.hd li', interTime: 4000 });
            $('.hobox2 .vo').hover(function () {
                $(this).children('.lay').stop().animate({ top: 0 }, 300);
            }, function () {
                $(this).children('.lay').stop().animate({ top: '-335px' }, 300);
            })
            $('.nnbox dl:lt(2)').addClass('notbor');
            $('.nnbox dl').hover(function () {
                $(this).addClass('on');
            }, function () {
                $(this).removeClass('on');
            })

});
$(function(){
    $('.histBRTitle  td').click(function(){
        _this = $(this);
        _height = $('.histBRContent').find('td').width();
        _this.addClass('current').siblings('td').removeClass('current');
        $('.histBRContent').find('tr').css({'left':-_this.index()*_height+'px'});
        });
    $('.btnB').click(function(){
        _this = $(this).parents('li').find('.historyBottom');
        _id = _this.attr('id');
        if(_id=='Show'){
            _this.removeAttr('id');
            }else{
                _this.attr('id','Show');
                }
        });
    $('.exclReturn').click(function(){
        _this = $(this).parents('li').find('.historyBottom');
        _this.removeAttr('id');
        });
    $(window).scroll(function(){            
        
        });
    $('#close').click(function(){
        $('.pContent').css({'left':'-999em'});
        for(i=0;i<$('.photoContent ul').find('li').length;i++){
            $('.pContent .swiper-button-prev').click();
            }       
        });
    $('.photoContent ul').find('li').click(function(){
        _this = $(this);
        $('.pContent').css({'left':'0'});       
        for(i=0;i<_this.index();i++){
            $('.pContent .swiper-button-next').click();
            }
        });
    });


$(function() {
    var e1 = 0;
    var e3 = 0;
    var e2 = $(".smallImgs ul li").length;
    $(".bigImgs li:eq(0)").show();
    $(".smallImgs ul li:eq(0) a").addClass("hover");

    $("a.next_1,a.next_2").click(function() {
        if (e1 < e2 - 1) {
            e1++;
        } else {
            e1 = 0;
        }
        $(".bigImgs li:eq(" + e1 + ")").fadeIn();
        $(".bigImgs li:eq(" + e1 + ")").siblings().fadeOut();
        $(".smallImgs ul").stop().animate({ left: -182 * e1 }, 1000);
        $(".smallImgs ul li:eq(" + e1 + ") a").addClass("hover");
        $(".smallImgs ul li:eq(" + e1 + ")").siblings().find("a").removeClass("hover");
    });

    $("a.prev_1,a.prev_2").click(function() {
        if (e1 > 0) {
            e1--;
        } else {
            e1 = 0;
        }
        $(".bigImgs li:eq(" + e1 + ")").fadeIn();
        $(".bigImgs li:eq(" + e1 + ")").siblings().fadeOut();
        $(".smallImgs ul").stop().animate({ left: -182 * e1 }, 1000);
        $(".smallImgs ul li:eq(" + e1 + ") a").addClass("hover");
        $(".smallImgs ul li:eq(" + e1 + ")").siblings().find("a").removeClass("hover");
    });

    $(".smallImgs ul li").click(function() {
        var e4 = $(this).index();
        e1 = $(this).index();
        $(".bigImgs li:eq(" + e4 + ")").fadeIn();
        $(".bigImgs li:eq(" + e4 + ")").siblings().fadeOut();
        $(".smallImgs ul").stop().animate({ left: -182 * e4 }, 1000);
        $(".smallImgs ul li:eq(" + e4 + ") a").addClass("hover");
        $(".smallImgs ul li:eq(" + e4 + ")").siblings().find("a").removeClass("hover");
    });


});


function writenum(before, num) {
    var imgs = "";
    for (var i = 0; i < num.length; i++) {
        var src = before + '' + num.charAt(i) + '.gif';
        imgs += '<img src="' + src + '">';
    }
    document.write(imgs);
}

$.fn.extend({
    panav: function(n) {
        var bd = $(this).find('.bd'),
            er = bd.children(),
            pbtn = $(this).find('.prev'),
            nbtn = $(this).find('.next'),
            that = $(this);
        var ele = er.length,
            eww = er.outerWidth(true);
        var po = 0;
        bd.css({ position: 'absolute', width: ele * eww }).wrap('<div class="slidewrapper" style="position:relative; overflow:hidden;" ></div>');
        $('.slidewrapper').css({ width: 'auto', height: bd.height() });
        nbtn.bind('click', function() {
            if (po > (4 - ele)) {
                po--;
                bd.animate({ left: eww * po }, 500);
            }
        });
        pbtn.bind('click', function() {
            if (po < 0) {
                po++;
                bd.animate({ left: eww * po }, 500);
            }
        });
    }
});
$(document).ready(function(e) {
	debugger;
    news_menu();
});
function news_menu() {
    var UL = $(".demo .scroll ul");
    var LI = $(".demo .scroll ul li");
    var PREV = $("a.prevbtn");
    var NEXT = $("a.nextbtn");
    var N = LI.length;
    var i = LI.index($(".demo .scroll ul li.hover"));
    if (i < 0) {
        i = 0;
    }
    var rom = 2;
    var width = 380 * rom;
    if (N > rom) {
        n = Math.ceil(N / rom);
        i = Math.floor(i / rom);
        var i_service = function() {
            function nextclick() {
                if (i == n - 1) {
                    i = 0;
                    serviceppt(i);
                } else {
                    i++;
                    serviceppt(i);
                }
            }

            function prevclick() {
                if (i <= 0) {
                    i = n - 1;
                    serviceppt(i);
                } else {
                    i--;
                    serviceppt(i);
                }
            }
            NEXT.click(function() { nextclick(); });
            PREV.click(function() { prevclick(); });
        };

        function serviceppt(i) {
            UL.stop().animate({ left: i * -width }, 1000, "easeOutQuint");
        }
        i_service();
        serviceppt(i);
    } else {
        PREV.show();
        NEXT.show();
    }
}
