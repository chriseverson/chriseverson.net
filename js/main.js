// ******************************************
// Initialization Helpers
// ******************************************

    var app = {
        navbar: {},
        keynav: {},
        figures: {},
        unpack: {},
        mobile: {},
        scroll: {}
    };

// ******************************************
// Navbar Subhead Display
// ******************************************

    app.navbar.target = this.target = $('header div>a');
    app.navbar.offset = app.navbar.target.width() + parseInt(app.navbar.target.css('marginRight'));

    app.navbar.init = function () {
        this.listen();
    };

    app.navbar.whichTransEvent = function () {

        var sType,
            eFakeElement = document.createElement('ghost'),
            oTransitions = {
                'transition':       'transitionend',
                'OTransition':      'oTransitionEnd',
                'MozTransition':    'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };

        for(sType in oTransitions) {
            if(eFakeElement.style[sType] !== undefined) {
                return oTransitions[sType];
            }
        }
    };

    app.navbar.slideOpen = function () {

        this.lock();
        $('header div>span').animate(
            { marginLeft: app.navbar.offset },
            500,
            function () {
                app.navbar.target.addClass('active');
                app.navbar.unlock();
            }
        );
    };

    app.navbar.slideClose = function () {

        var bar = this;

        this.lock();
        this.target.removeClass('active');

        bar.target.bind(bar.whichTransEvent(), function () {
            $('header div>span').animate(
                { marginLeft: 0 },
                400,
                function () {
                    bar.target.unbind(bar.whichTransEvent());
                    bar.unlock();
                }
            );
        });
    };

    app.navbar.toggle = function () {

        console.log('app : navbar : toggle');

        var iScrollCurrent = $(window).scrollTop(),
            iScrollHorizon = $('h3').offset().top + 10,
            bar = app.navbar;

        if($(window).width() > 640 && iScrollCurrent >= iScrollHorizon && !bar.target.hasClass('active')) {
            bar.slideOpen();
        } else if($(window).width() > 640 && iScrollCurrent < iScrollHorizon && bar.target.hasClass('active')) {
            bar.slideClose();
        }
    };

    app.navbar.listen = function () {
        $(window).bind('scroll', app.navbar.toggle);
    };

    app.navbar.lock = function () {
        $(window).unbind('scroll', app.navbar.toggle);
    };

    app.navbar.unlock = app.navbar.listen;

// ******************************************
// Keyboard Navigation
// ******************************************

    app.keynav.init = function () {
        $(document).keydown(this.bindKeys);
    };

    app.keynav.bindKeys = function(e) {

        var target = false;
        switch (e.which) {
            case 72 : target = 'home'; break; // H
            case 65 : target = 'about'; break; // A
            case 87 : target = 'work'; break; // W
            case 67 : target = 'contact'; break; // C
        }

        if(target) {
            $('header').find('a[href=#' + target + ']').click();
        }
    };

// ******************************************
// Facts & Figures
// ******************************************

    app.figures.now = Date.now();

    app.figures.init = function () {
        this.breathing();
        this.residing();
        this.collecting();
    };

    app.figures.breathing = function () {

        var iBase = new Date('1986-03-18 09:12:00-0500').getTime(),
            iDiff = Math.round((this.now - iBase) / 1000 / 60);

        $('#breathing span').text(this.formatNumber(iDiff));

        setInterval(function () {
            $('#breathing span').text(app.figures.formatNumber(iDiff++));
        }, 60000);
    };

    app.figures.residing = function () {

        var iBase = new Date('2013-11-01 16:30:00-0800').getTime(),
            iDiff = Math.round((this.now - iBase) / 1000 / 60 / 60 / 24);

        $('#residing span').text(this.formatNumber(iDiff));
    };

    app.figures.collecting = function () {

        var iBase = 130; // account for my data entry laziness
        $.getJSON('//api.discogs.com/users/chriseverson?callback=?', function(oResponse) {
            $('#collecting span').text(app.figures.formatNumber(oResponse.data.num_collection + iBase));
        });
    };

    app.figures.formatNumber = function(iNum) {
        return iNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // ******************************************
    // Scroll it Smoooooooth + Way point
    // ******************************************

    app.scroll.init = function () {
        this.horizons = [];
        this.smooth();
        this.point();

        $(window).bind('resize', app.throttle(app.scroll.getHorizons));

    };

    app.scroll.smooth = function () {

        $('a[href*=#]:not([href=#])').click(function () {
            if($('#navTrigger').is(':visible')) {
                $('nav').slideUp();
            }
            var eTarget = $(this.hash);
            if(eTarget.length) {
                $('html, body').animate({
                    scrollTop: eTarget.offset().top
                }, 1500);
            }
            return false;
        });
    };

    app.scroll.getHorizons = function () {
        for(var i = 0; i < $('section').length; i++) {
            app.scroll.horizons[i] = ($('section').eq(i).offset().top + $('section').eq(i).outerHeight());
        }
    };

    app.scroll.point = function () {
        this.getHorizons();
        $(window).bind('scroll', app.throttle(app.scroll.setPoint));
    };

    app.scroll.setPoint = function () {

        var iScrollPosition = window.pageYOffset,
            root = app.scroll,
            sItem;

        for(var i = root.horizons.length-2; i >= 0; i--) {
            if(iScrollPosition > root.horizons[i]) {
               sItem = $('section').eq(i+1).attr('id');
               break;
            }
        }

        if(!sItem) {
            $('nav .active').removeClass('active');
        } else if(!$('a[href=#' + sItem + ']').hasClass('active')) {
            $('nav .active').removeClass('active');
            $('a[href=#' + sItem + ']').addClass('active');
        }
    };

// ******************************************
// Unpack page
// ******************************************

    app.unpack.init = function () {
        this.stepOne();
        $(window).bind('resize', app.throttle(app.unpack.stepTwo));
    };

    app.unpack.stepOne = function () {

        var eTitle = $('#home>div'),
            iTitleHeight = $('#home>div').outerHeight(true);

        eTitle
            .css({
                marginTop: -(iTitleHeight),
                display: 'block'
            })
            .animate({
                marginTop: 0
            }, 1000, app.unpack.stepTwo);
    };

    app.unpack.stepTwo = function () {

        var iTopHeight    = $('header').outerHeight(true) + $('#home>div').outerHeight(true),
            iTotalHeight  = iTopHeight + $('#skills').outerHeight(true) +  $('#social').outerHeight(true),
            iRemainder    = $(window).height() - iTotalHeight,
            iSkillsMargin = parseInt($('#skills').css('marginTop')),
            iNewMargin    = iSkillsMargin + Math.floor(iRemainder / 2);

        if(iRemainder > 0) {
            $('#skills').css({
                marginTop: iNewMargin,
                marginBottom: iNewMargin
            });
        }

        $('#skills, #social').fadeIn();

    };

// ******************************************
// Mobile Menu
// ******************************************

    app.mobile.init = function() {
        $('#navTrigger').click(function() {
            $('nav').slideToggle();
        });
    }

// ******************************************
// Debouncing Utility
// ******************************************

    app.throttle = function(callback) {

        var sTimeout,
            iLastRun = 0,
            iDelay = 250;

        function fBundle() {

            var oBundle = this,
                iElapsed = +new Date() - iLastRun;

            function fRun() {
                iLastRun = +new Date();
                callback.apply(oBundle);
            }

            if(sTimeout) {
                clearTimeout(sTimeout);
            }

            if(iElapsed > iDelay) {
                fRun();
            } else {
                sTimeout = setTimeout(fRun, iDelay - iElapsed);
            }
        }
        return fBundle;
    };

// ******************************************
// Initialization
// ******************************************

    $(function () {

        for(var prop in app) {
            if(app[prop].hasOwnProperty('init')) {
                app[prop].init();
            }
        }

    });