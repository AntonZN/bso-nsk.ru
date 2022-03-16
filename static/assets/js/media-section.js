;(function ( jQuery, window, document, undefined ) {

    "use strict";

  // For plugin you need: jQuery, device.js, browser.js, stellar.js, smoothScroll.js  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // smoothScroll.js and stellar.js need only for parallax


    var pluginName = "mediaSection",
    defaults = {

        parallax        : {
            backgroundRatio       : 0.3,
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
        },

        kenburns        : {
            speed : 7000
        },

        video           : {
            startAt   : 1,
            volume    : 0

        },

        height          : 1,
        background      : "",
        backgroundMobile: "",
        disableMobile   : true

    };

    // The actual plugin constructor
    function Plugin (__, options) {
        this.__ = jQuery(__);
        this.settings = jQuery.extend(true, {}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        if (!Function.prototype.bind) {
            Function.prototype.bind = function(oThis) {
                if (typeof this !== 'function') {
                    // closest thing possible to the ECMAScript 5
                    // internal IsCallable function
                    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
                }

                var aArgs   = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP    = function() {},
                    fBound  = function() {
                        return fToBind.apply(this instanceof fNOP && oThis
                                ? this
                                : oThis,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                    };

                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            };
        }

      this.init();
    }

    jQuery.extend(Plugin.prototype, {
        init: function() {
            var _           = this,
                ___         = _.__,
                mediaType   = ___.attr("data-type") || "",
                $htmlel     = jQuery("html");

          if (jQuery.browser.mozilla){$htmlel.addClass('browser-mozilla') }
          if (jQuery.browser.webkit){$htmlel.addClass('browser-webkit') }
          if (jQuery.browser.msie){$htmlel.addClass('browser-msie') }
          if (jQuery.browser.safari){$htmlel.addClass('browser-safari') }

            _.setBackground();
            _.setHeight();

            if(!(device.mobile() && ((___.attr('data-disable-mobile') == 'true') || (_.settings.disableMobile)))){
              if(mediaType === "parallax"){
                  if (!jQuery("html").hasClass("ie8"))
              _.createParallax();
              }else if(mediaType === "kenburns"){
                _.createKenBurns();
              }else if(mediaType === "video"){
                _.createVideo();
              }
            }

            if (((___.attr('data-disable-mobile') == 'true') || (_.settings.disableMobile)) && device.mobile()) {
              ___.find(".ct-mediaSection-video").css('display', 'none');
              ___.find(".ct-mediaSection-kenburns").css('display', 'none');
            }
        },

        setBackground: function(){
          var _                 = this,
              ___               = _.__,
              background        = "",
              backgroundMobile  = "";

          if(___.attr('data-background')){
            background = ___.attr('data-background');
          }else if(_.settings.background){
            background = _.settings.background;
          }

          if(___.attr('data-background-mobile')){
            backgroundMobile = ___.attr('data-background-mobile');
          }else if(_.settings.backgroundMobile){
            backgroundMobile = _.settings.backgroundMobile;
          }


          if(background.substr(0, 1) === '#'){
            ___.css('background-color', background);
          }else if(backgroundMobile && device.mobile()){
            ___.css('background-image', 'url(' + backgroundMobile + ')');
          }else{
            ___.css('background-image', 'url(' + background + ')');
          }
        },

        setHeight: function(){
            var _             = this,
                ___           = _.__,
                height        = "0",
                $deviceheight = (window.innerHeight > 0) ? window.innerHeight : screen.height,
                $htmlel       = jQuery("html");

            if(___.attr("data-height")){
              height = ___.attr('data-height');
            }else{
              height = _.settings.height;
            }

            if (height.indexOf("%") > -1) {
              var heightResult = $deviceheight * (parseInt(height, 10) / 100) + "px";
              if($htmlel.hasClass("browser-safari"))
                ___.css('height', heightResult);
              else{
                ___.css('min-height', heightResult);
              }
            } else {
              var heightResult = parseInt(height, 10) + "px";
              if($htmlel.hasClass("browser-safari")){
                ___.css('height', heightResult);
              }else{
                ___.css('min-height', heightResult);
              }
            }
        },

        makekenburns: function(el){
          var _ = this;

          el.find('img')[0].className = "fx";
          var images = el.find('img'),
              numberOfImages = images.length,
              i = 1,
              // data-attributes //
              interval = parseInt(_.settings.kenburns.speed ,10);

          if (numberOfImages === 1) {
            images[0].className = "singlefx";
          }
          window.setInterval(kenBurns, interval);

          function kenBurns() {
            if (numberOfImages !== 1) {
              if (i === numberOfImages) {
                i = 0;
              }
              images[i].className = "fx";
              if (i === 0) {
                images[numberOfImages - 2].className = "";
              }
              if (i === 1) {
                images[numberOfImages - 1].className = "";
              }
              if (i > 1) {
                images[i - 2].className = "";
              }
              i++;
            }
          }
        },

        createKenBurns: function(){
            var _         = this,
                ___       = _.__,
                kenburnEl = ___.find('.ct-mediaSection-kenburns'),
                images    =  kenburnEl.find('img');

            if (!(device.mobile() || device.ipad() || device.androidTablet())) {
              _.makekenburns(kenburnEl);
            } else {
              images.each(function () {
                  jQuery(this).remove();
              })
            }
        },

        createVideo: function(){
            var _             = this,
                ___           = _.__,
                time          = 1,
                $devicewidth  = (window.innerWidth > 0) ? window.innerWidth : screen.width;;

            if (!___.hasClass("html5")) {
                var videoframe = ___.find('iframe');
                if (videoframe.attr('data-startat')) {
                    time = videoframe.attr('data-startat');
                }else if(_.settings.video.startAt){
                    time = _.settings.video.startAt;
                }
                if (!($devicewidth < 992) && !device.mobile()) {
                    if (typeof $f != 'undefined') {
                        var video   = '#' + $videoframe.attr('id'),
                            iframe  = jQuery(video)[0],
                            player  = $f(iframe),
                            status = jQuery('.status');
                        player.addEvent('ready', function () {
                            player.api('setVolume', _.settings.video.volume);
                            player.api('seekTo', time);
                        })
                    }
                }
              } else {
                  //THIS IS WHERE YOU CALL THE VIDEO ID AND AUTO PLAY IT. CHROME HAS SOME KIND OF ISSUE AUTOPLAYING HTML5 VIDEOS, SO THIS IS NEEDED

                  document.getElementById('video1').play();
              }
        },

        createParallax: function(){
            var _         = this,
                ___       = _.__;


            if(!(___.attr("data-stellar-background-ratio"))){
              ___.attr("data-stellar-background-ratio", _.settings.parallax.backgroundRatio);
            }



              jQuery(window).on("load", function(){
                if(!(jQuery(window).stellar())){
                 jQuery(window).stellar({
                    horizontalScrolling   : _.settings.parallax.horizontalScrolling,
                    verticalScrolling     : _.settings.parallax.verticalScrolling,
                    responsive            : _.settings.parallax.responsive,
                    horizontalOffset      : _.settings.parallax.horizontalOffset,
                    verticalOffset        : _.settings.parallax.verticalOffset,
                    parallaxBackgrounds   : _.settings.parallax.parallaxBackgrounds,
                    parallaxElements      : _.settings.parallax.parallaxElements,
                    scrollProperty        : _.settings.parallax.scrollProperty,
                    positionProperty      : _.settings.parallax.positionProperty,
                    hideDistantElements   : _.settings.parallax.hideDistantElements
                });
                }
              });
        }

    });

    jQuery.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !jQuery.data( this, "plugin_" + pluginName ) ) {
                jQuery.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };

})( jQuery, window, document );
