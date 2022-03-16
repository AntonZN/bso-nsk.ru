/**
 * createIT main javascript file.
 */
var $devicewidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var $deviceheight = (window.innerHeight > 0) ? window.innerHeight : screen.height;

var $lgWidth = 1199;
var $mdWidth = 991;
var $smWidth = 767;
var $xsWidth = 479;

var $bodyel = jQuery("body");

var $navbarel = jQuery(".navbar");
var $topbarel = jQuery(".ct-topBar");


/* ========================== */
/* ==== HELPER FUNCTIONS ==== */

function validatedata($attr, $defaultValue) {
    "use strict";
    if ($attr !== undefined) {
        return $attr
    }
    return $defaultValue;
}

function parseBoolean(str, $defaultValue) {
    "use strict";
    if (str == 'true') {
        return true;
    } else if (str == "false") {
        return false;
    }
    return $defaultValue;
}

(function ($) {
    "use strict";


// Parallax //----------------------------------------------------------------------------------

    $(window).on("load", function(){
        if(!device.mobile() && !device.tablet() && !jQuery("html").hasClass("ie8") ){
            $(window).stellar({
                horizontalScrolling   : false,
                verticalScrolling     : true,
                responsive            : true,
                horizontalOffset      : 0,
                verticalOffset        : 0,
                parallaxBackgrounds   : true,
                parallaxElements      : true,
                scrollProperty        : 'scroll',
                positionProperty      : 'position',
                hideDistantElements   : true
            });
        }


        //Media section running
        $(".ct-mediaSection").mediaSection();


    });

    // Snap start // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    if(document.getElementById('ct-js-wrapper')){
        var snapper = new Snap({
            element: document.getElementById('ct-js-wrapper')
        });

        snapper.settings({
            disable: "left",
            easing: 'ease-out',
            transitionSpeed: 0.4,
            addBodyClasses: true
        });
    }

    var $navbarel = jQuery(".navbar");


    $(document).ready(function () {

        if ($('html').hasClass('ie8'))
            {
                $('body').removeClass('ct-headroom--fixedMenu');

            }

        var accordionPanel = $('.ct-panelSecondVariations .panel'),
            elIndex,
            panelOffset;

        $('.ct-js-accordionList > li').on("click",function (e) {

            elIndex = $(this).index();
            panelOffset = accordionPanel.eq(elIndex).offset().top;
            $("body,html").animate({scrollTop: panelOffset-74}, 1200);

            e.preventDefault();
        });


        //Magnific Popup///////////////////////////////////////////////////////////////////////////////////////////
        if(jQuery().magnificPopup){
            jQuery('.ct-js-popupGallery').each(function() { // the containers for all your galleries
                jQuery(this).magnificPopup({
                    disableOn: 700,
                    type: 'image',
                    mainClass: 'ct-magnificPopup--image',
                    removalDelay: 160,
                    preloader: true,
                    delegate: '.ct-js-popup',
                    closeBtnInside: true,
                    closeOnContentClick: false,
                    closeOnBgClick: true,
                    gallery: {
                        enabled: true
                    }
                });
            });
        }

        if(jQuery(".ct-zoom").length > 0) {
            if (!(device.mobile() || device.ipad() || device.androidTablet())){
                $(".ct-js-zoomImage").elevateZoom({

                    zoomType	: "lens",
                    lensShape : "round",
                    lensSize : 200
                });
            }
        }

        if (($().appear) && ($("body").hasClass("cssAnimate"))) {
            $('.progress').appear(function () {
                var $this = $(this);
                $this.each(function () {
                    var $innerbar = $this.find(".progress-bar");
                    var percentage = $innerbar.attr("aria-valuenow");
                    $innerbar.addClass("animating").css("width", percentage + "%");

                });
            }, {accY: -100});
        } else {
            $('.progress').each(function () {
                var $this = $(this);
                var $innerbar = $this.find(".progress-bar");
                var percentage = $innerbar.attr("aria-valuenow");
                $innerbar.addClass("animating").css("width", percentage + "%");

            });
        }


// Progress Icons // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $('.progress-icons').each(function () {
            var $this = $(this);
            var $total = $this.attr("data-total");
            var $icon = $this.attr("data-icon");
            var htmldata = "";

            $this.css("font-size", ($this.attr("data-font-size") + "px"));

            var i;
            for (i = 0; i < $total; i++) {
                htmldata += '<i class="fa ' + $icon + '"></i> ';
            }

            $this.html(htmldata);

            if (($().appear) && ($("body").hasClass("cssAnimate"))) {
                $('.progress-icons').appear(function () {
                    var $this = $(this);
                    var $active = $this.attr("data-active");
                    var $icons = $this.find('i:lt(' + $active + ')');
                    var $delay = parseInt(validatedata($this.attr("data-delay"), 20))

                    var delay = $delay;
                    for (i = 0; i < $icons.length; i++) {
                        setTimeout((function (i) {
                            return function () {
                                i.style.color = $this.attr("data-icon-color");
                            }
                        })($icons[i]), delay);
                        delay += $delay;
                    }
                }, {accY: -100});
            } else {
                $this.each(function () {
                    var $active = $this.attr("data-active");
                    var $icons = $this.find('i:lt(' + $active + ')');
                    $icons.css('color', $this.attr("data-icon-color"))
                });
            }
        })

       // Icons Boxes hover // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $('.ct-iconBoxes .ct-iconBoxes-title').on("mouseenter",function() {
            $(this).prev().addClass('active');
        });
        $('.ct-iconBoxes .ct-iconBoxes-title').on("mouseleave",function() {
            $(this).prev().removeClass('active');
        });

        // Link Scroll to Section // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        function goToByScroll(id) {
            $('html,body').animate({scrollTop: $(id).offset().top - 70}, 'slow');
        }

            $('body .ct-js-btnScroll').on("click",function () {
                goToByScroll($(this).attr('href'));
                return false;
            });

        $('.ct-js-btnScrollUp').on("click",function (e) {
            e.preventDefault();
            $("body,html").animate({scrollTop: 0}, 1200);
            $navbarel.find('.onepage').removeClass('is-active');
            $navbarel.find('.onepage:first-child').addClass('is-active');
            return false;
        });

        // One Page Scroller // -----------------------------------------------------------------------------

            if ($().pageScroller) {

                if($devicewidth < 768){
                    $('body').pageScroller({
                        navigation: '.ct-menuMobile .onepage', sectionClass: 'section', scrollOffset: -70
                    });
                } else{
                    $('body').pageScroller({
                        navigation: '.ct-stretchedMenu .nav.navbar-nav .onepage', sectionClass: 'section', scrollOffset: -70
                    });
                }
            }
        $(".ct-stretchedMenu .nav.navbar-nav li:first-child").addClass('is-active');


        // Google Map //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        var $googleMap = $(".ct-googleMap");

        // 100% Height -----------------------------------------------
        if ($googleMap.attr("data-height") == "100%")
        {
            $googleMap.css("height", $deviceheight + "px");
        }


        /* ================== */
        /* ==== COUNT TO ==== */

        if (($().countTo) && ($().appear) && ($("body").hasClass("cssAnimate"))) {
            $('.ct-js-counter').data('countToOptions', {
                formatter: function (value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
                }
            }).appear(function () {
                $(this).each(function (options) {
                    var $this = $(this);
                    var $speed = validatedata($this.attr('data-speed'), 1400);
                    options = $.extend({}, options || {
                        speed: $speed
                    }, $this.data('countToOptions') || {});
                    $this.countTo(options);
                });
            });
        } else if(($().countTo)){
            $('.ct-js-counter').data('countToOptions', {
                formatter: function (value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
                }
            });
            $('.ct-js-counter').each(function (options) {
                var $this = $(this);
                var $speed = validatedata($this.attr('speed'), 1200);
                options = $.extend({}, options || {
                    speed: $speed
                }, $this.data('countToOptions') || {});
                $this.countTo(options);
            });
        }

// OWL atribute
    $(".ct-js-owl").attr("data-snap-ignore", true);

/////////////////////////////////////////////////////////////////////////////////////////////////


        // Add Background Image// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $(".ct-js-background").each(function(){
            $(this).css("background-image", 'url(' + $(this).attr("data-bg") + ')')
            $(this).css("background-repeat", validatedata($(this).attr("data-bgrepeat"), 'repeat'))
        })



        // Focus function on input element //------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $('.form-group .form-control').on('focusin', function(){
            $(this).closest('.form-group').addClass('focus');
        });
        $('.form-group .form-control').on('focusout',function(){
            $(this).closest('.form-group').removeClass('focus');
        });
        // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Navbar Search // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        var $searchform = $(".ct-navbar-search");
        $('#ct-js-navSearch').on("click",function (e) {
            e.preventDefault();

            $(this).toggleClass('is-active');
            $searchform.fadeToggle(250, function () {
                if (($searchform).is(":visible")) {
                    $searchform.find("[type=text]").focus();
                }
            });
            return false;
        })

        $(document).mouseup(function (e) {
            var $searchform = $(".ct-navbar-search");

            if (!$('#ct-js-navSearch').is(e.target)) {
                if (!$searchform.is(e.target) // if the target of the click isn't the container...
                    && $searchform.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    $searchform.hide();
                    $('#ct-js-navSearch').removeClass('is-active');
                }
            }
        });


        // Tooltips and Popovers // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $("[data-toggle='tooltip']").tooltip();

        $("[data-toggle='popover']").popover({trigger: "hover", html: true});


        // Placeholder Fallback // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if ($().placeholder) {
            $("input[placeholder],textarea[placeholder]").placeholder();
        }


        // Snap Navigation in Mobile // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if ($devicewidth > 767 && document.getElementById('ct-js-wrapper')) {
            snapper.disable();
        }

        $(".navbar-toggle").on("click",function () {
            if($bodyel.hasClass('snapjs-right')){
                snapper.close();
            } else{
                snapper.open('right');
            }
        });

        $('.ct-menuMobile .ct-menuMobile-navbar .dropdown > a').on("click",function(e) {
            return false; // iOS SUCKS
        })
        $('.ct-menuMobile .ct-menuMobile-navbar .dropdown > a, .ct-menuMobile .ct-menuMobile-navbar .dropdown-submenu > a').on("click",function(e){
            var $this = $(this);
            if($this.parent().hasClass('open')){
                $(this).parent().removeClass('open');
            } else{
                $(this).parent().addClass('open');
            }
            return false; // iOS SUCKS
        })

        $('.ct-menuMobile .ct-menuMobile-navbar .onepage > a').on("click",function(e) {
            snapper.close();
        })


        // Animations Init // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if ($().appear) {
            if (device.mobile() || device.tablet()) {
                $("body").removeClass("cssAnimate");
            } else {

                $('.cssAnimate .animated').appear(function () {
                    var $this = $(this);

                    $this.each(function () {
                        if ($this.data('time') != undefined) {
                            setTimeout(function () {
                                $this.addClass('activate');
                                $this.addClass($this.data('fx'));
                            }, $this.data('time'));
                        } else {
                            $this.addClass('activate');
                            $this.addClass($this.data('fx'));
                        }
                    });
                }, {accX: 50, accY: -350});
            }
        }
    })

    $(window).on('resize', function() {
        if ($(window).width() < 768) {
            snapper.enable();  //enable the snapper on mobile device
        } else{
            snapper.disable();  // disable the snapper when the window is bigger than 768px
        }
    })

    $(window).on("load",function() {

        // Bootstrap modal centering

        function centerModals(){
            $('.modal').each(function(i){
                var $clone = $(this).clone().css('display', 'block').appendTo('body');
                var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
                top = top > 0 ? top : 0;
                $clone.remove();
                $(this).find('.modal-content').css("margin-top", top);
            });
        }
        $('.modal').on('show.bs.modal', centerModals);
        $(window).on('resize', centerModals);

        /* ==================== */
        /* ==== PIE CHARTS ==== */
        $('.ct-js-pieChart').each(function () {
            var $this = $(this);
            var $color = validatedata($(this).attr('data-ct-firstColor'), "#2b8be9");
            var $color2 = validatedata($(this).attr('data-ct-secondColor'), "#eeeeee");
            var $cutout = validatedata($(this).attr('data-ct-middleSpace'), 90);
            var $stroke = validatedata($(this).attr('data-ct-showStroke'), false);
            var $margin = validatedata($(this).attr('data-ct-margin'), false);
            $(this).parent().css('margin-left',$margin + 'px');
            $(this).parent().css('margin-right',$margin + 'px');
            var options = {
                responsive: true, percentageInnerCutout: $cutout, segmentShowStroke: $stroke, showTooltips: false
            }
            var doughnutData = [{
                value: parseInt($this.attr('data-ct-percentage')), color: $color, label: false
            }, {
                value: parseInt(100 - $this.attr('data-ct-percentage')), color: $color2
            }];

            if (($().appear) && ($("body").hasClass("cssAnimate"))) {
                $('.ct-js-pieChart').appear(function () {
                    var ctx = $this[0].getContext("2d");
                    window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, options);
                });
            } else {
                var ctx = $this[0].getContext("2d");
                window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, options);
            }
        })


        // Loader //----------------------------------------------------------------
        var $preloader = $('.ct-preloader');
        var $content = $('.ct-preloader-content');


        var $timeout = setTimeout(function(){
            $($preloader).addClass('animated').addClass('fadeOut');
            $($content).addClass('animated').addClass('fadeOut');

        }, 0);
        var $timeout2 = setTimeout(function(){
            $($preloader).css('display', 'none').css('z-index', '-9999');
        }, 500);

    });
})(jQuery);