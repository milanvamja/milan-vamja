jQuery(document).ready(function ($) {

    // For wow animation 
    new WOW().init();

    // For Text Animation
    var words = document.getElementsByClassName('word');
    var wordArray = [];
    var currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (var i = 0; i < words.length; i++) {
        splitLetters(words[i]);
    }

    function changeWord() {
        var cw = wordArray[currentWord];
        var nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
        for (var i = 0; i < cw.length; i++) {
            animateLetterOut(cw, i);
        }

        for (var i = 0; i < nw.length; i++) {
            nw[i].className = 'letter behind';
            nw[0].parentElement.style.opacity = 1;
            animateLetterIn(nw, i);
        }

        currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
    }

    function animateLetterOut(cw, i) {
        setTimeout(function () {
            cw[i].className = 'letter out';
        }, i * 80);
    }

    function animateLetterIn(nw, i) {
        setTimeout(function () {
            nw[i].className = 'letter in';
        }, 340 + (i * 80));
    }

    function splitLetters(word) {
        var content = word.innerHTML;
        word.innerHTML = '';
        var letters = [];
        for (var i = 0; i < content.length; i++) {
            var letter = document.createElement('span');
            letter.className = 'letter';
            letter.innerHTML = content.charAt(i);
            word.appendChild(letter);
            letters.push(letter);
        }

        wordArray.push(letters);
    }

    changeWord();
    setInterval(changeWord, 3000);




    // For Testimonial Slider
    $('.testimonial-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        row: 0,
        infinite: true,
        dots: true,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                dots: true,
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                dots: true,
            }
        }]
    });



    /* Scroll To Top JS */
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#scrollToTop').fadeIn();
        } else {
            $('#scrollToTop').fadeOut();
        }
    });
    $('#scrollToTop').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    

    /* Sticky Header JS */
    $(window).scroll(function () { // this will work when your window scrolled.
        var height = $(window).scrollTop(); //getting the scrolling height of window
        if (height > 300) {
            $(".site-header").addClass("sticky_head");
        } else {
            $(".site-header").removeClass("sticky_head");
        }
    });

    // For Header Menu Active
    // $('.main-menu li').click(function () {
    //     $(this).addClass("active").siblings().removeClass("active");
    // })


    // For Scroll To Header Nav Menu Active
    var sections = $('section')
        , nav = $('nav')
        , nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        var $el = $(this)
            , id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height
        }, 500);

        return false;
    });


    // For Mobile Dropdown
    var window_size = $(window).width();
    if (window_size <= 991) {
        $('.menu-toggle').click(function () {
            $(".main-navigation").toggleClass('toggled');
            $(".menu-item-has-children").removeClass('active-sub-menu');
            $(".menu-item-has-children").find('.sub-menu').css('display', 'none');
        })

        /* dropDown mobile menu */
        $(".menu-item-has-children a").first().attr('href', 'javascript:void(0);');

        /* dropDown mobile menu show and hide */
        $('body').on('click', '#primary-menu .menu-item-has-children', function () {
            if (($(this).hasClass('active-sub-menu'))) {
                $(this).removeClass('active-sub-menu');
                $(this).find('.sub-menu').css('display', 'none');
            }
            else {
                $(".menu-item-has-children").removeClass('active-sub-menu');
                $(".sub-menu").css('display', 'none');
                $(this).addClass('active-sub-menu');
                $(this).find('.sub-menu').css('display', 'block');
            }
        });

        $(".main-menu li a").click(function () {
            $(".main-navigation").removeClass("toggled");
        });
    }

    /* Mobile Menu JS */


});