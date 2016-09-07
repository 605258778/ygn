/*! Hammer.JS - v1.0.5 - 2013-04-07
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(t,e){"use strict";function n(){if(!i.READY){i.event.determineEventTypes();for(var t in i.gestures)i.gestures.hasOwnProperty(t)&&i.detection.register(i.gestures[t]);i.event.onTouch(i.DOCUMENT,i.EVENT_MOVE,i.detection.detect),i.event.onTouch(i.DOCUMENT,i.EVENT_END,i.detection.detect),i.READY=!0}}var i=function(t,e){return new i.Instance(t,e||{})};i.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},i.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,i.HAS_TOUCHEVENTS="ontouchstart"in t,i.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android/i,i.NO_MOUSEEVENTS=i.HAS_TOUCHEVENTS&&navigator.userAgent.match(i.MOBILE_REGEX),i.EVENT_TYPES={},i.DIRECTION_DOWN="down",i.DIRECTION_LEFT="left",i.DIRECTION_UP="up",i.DIRECTION_RIGHT="right",i.POINTER_MOUSE="mouse",i.POINTER_TOUCH="touch",i.POINTER_PEN="pen",i.EVENT_START="start",i.EVENT_MOVE="move",i.EVENT_END="end",i.DOCUMENT=document,i.plugins={},i.READY=!1,i.Instance=function(t,e){var r=this;return n(),this.element=t,this.enabled=!0,this.options=i.utils.extend(i.utils.extend({},i.defaults),e||{}),this.options.stop_browser_behavior&&i.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),i.event.onTouch(t,i.EVENT_START,function(t){r.enabled&&i.detection.startDetect(r,t)}),this},i.Instance.prototype={on:function(t,e){for(var n=t.split(" "),i=0;n.length>i;i++)this.element.addEventListener(n[i],e,!1);return this},off:function(t,e){for(var n=t.split(" "),i=0;n.length>i;i++)this.element.removeEventListener(n[i],e,!1);return this},trigger:function(t,e){var n=i.DOCUMENT.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e;var r=this.element;return i.utils.hasParent(e.target,r)&&(r=e.target),r.dispatchEvent(n),this},enable:function(t){return this.enabled=t,this}};var r=null,o=!1,s=!1;i.event={bindDom:function(t,e,n){for(var i=e.split(" "),r=0;i.length>r;r++)t.addEventListener(i[r],n,!1)},onTouch:function(t,e,n){var a=this;this.bindDom(t,i.EVENT_TYPES[e],function(c){var u=c.type.toLowerCase();if(!u.match(/mouse/)||!s){(u.match(/touch/)||u.match(/pointerdown/)||u.match(/mouse/)&&1===c.which)&&(o=!0),u.match(/touch|pointer/)&&(s=!0);var h=0;o&&(i.HAS_POINTEREVENTS&&e!=i.EVENT_END?h=i.PointerEvent.updatePointer(e,c):u.match(/touch/)?h=c.touches.length:s||(h=u.match(/up/)?0:1),h>0&&e==i.EVENT_END?e=i.EVENT_MOVE:h||(e=i.EVENT_END),h||null===r?r=c:c=r,n.call(i.detection,a.collectEventData(t,e,c)),i.HAS_POINTEREVENTS&&e==i.EVENT_END&&(h=i.PointerEvent.updatePointer(e,c))),h||(r=null,o=!1,s=!1,i.PointerEvent.reset())}})},determineEventTypes:function(){var t;t=i.HAS_POINTEREVENTS?i.PointerEvent.getEvents():i.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],i.EVENT_TYPES[i.EVENT_START]=t[0],i.EVENT_TYPES[i.EVENT_MOVE]=t[1],i.EVENT_TYPES[i.EVENT_END]=t[2]},getTouchList:function(t){return i.HAS_POINTEREVENTS?i.PointerEvent.getTouchList():t.touches?t.touches:[{identifier:1,pageX:t.pageX,pageY:t.pageY,target:t.target}]},collectEventData:function(t,e,n){var r=this.getTouchList(n,e),o=i.POINTER_TOUCH;return(n.type.match(/mouse/)||i.PointerEvent.matchType(i.POINTER_MOUSE,n))&&(o=i.POINTER_MOUSE),{center:i.utils.getCenter(r),timeStamp:(new Date).getTime(),target:n.target,touches:r,eventType:e,pointerType:o,srcEvent:n,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return i.detection.stopDetect()}}}},i.PointerEvent={pointers:{},getTouchList:function(){var t=this,e=[];return Object.keys(t.pointers).sort().forEach(function(n){e.push(t.pointers[n])}),e},updatePointer:function(t,e){return t==i.EVENT_END?this.pointers={}:(e.identifier=e.pointerId,this.pointers[e.pointerId]=e),Object.keys(this.pointers).length},matchType:function(t,e){if(!e.pointerType)return!1;var n={};return n[i.POINTER_MOUSE]=e.pointerType==e.MSPOINTER_TYPE_MOUSE||e.pointerType==i.POINTER_MOUSE,n[i.POINTER_TOUCH]=e.pointerType==e.MSPOINTER_TYPE_TOUCH||e.pointerType==i.POINTER_TOUCH,n[i.POINTER_PEN]=e.pointerType==e.MSPOINTER_TYPE_PEN||e.pointerType==i.POINTER_PEN,n[t]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},i.utils={extend:function(t,n,i){for(var r in n)t[r]!==e&&i||(t[r]=n[r]);return t},hasParent:function(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1},getCenter:function(t){for(var e=[],n=[],i=0,r=t.length;r>i;i++)e.push(t[i].pageX),n.push(t[i].pageY);return{pageX:(Math.min.apply(Math,e)+Math.max.apply(Math,e))/2,pageY:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2}},getVelocity:function(t,e,n){return{x:Math.abs(e/t)||0,y:Math.abs(n/t)||0}},getAngle:function(t,e){var n=e.pageY-t.pageY,i=e.pageX-t.pageX;return 180*Math.atan2(n,i)/Math.PI},getDirection:function(t,e){var n=Math.abs(t.pageX-e.pageX),r=Math.abs(t.pageY-e.pageY);return n>=r?t.pageX-e.pageX>0?i.DIRECTION_LEFT:i.DIRECTION_RIGHT:t.pageY-e.pageY>0?i.DIRECTION_UP:i.DIRECTION_DOWN},getDistance:function(t,e){var n=e.pageX-t.pageX,i=e.pageY-t.pageY;return Math.sqrt(n*n+i*i)},getScale:function(t,e){return t.length>=2&&e.length>=2?this.getDistance(e[0],e[1])/this.getDistance(t[0],t[1]):1},getRotation:function(t,e){return t.length>=2&&e.length>=2?this.getAngle(e[1],e[0])-this.getAngle(t[1],t[0]):0},isVertical:function(t){return t==i.DIRECTION_UP||t==i.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(t,e){var n,i=["webkit","khtml","moz","ms","o",""];if(e&&t.style){for(var r=0;i.length>r;r++)for(var o in e)e.hasOwnProperty(o)&&(n=o,i[r]&&(n=i[r]+n.substring(0,1).toUpperCase()+n.substring(1)),t.style[n]=e[o]);"none"==e.userSelect&&(t.onselectstart=function(){return!1})}}},i.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(t,e){this.current||(this.stopped=!1,this.current={inst:t,startEvent:i.utils.extend({},e),lastEvent:!1,name:""},this.detect(e))},detect:function(t){if(this.current&&!this.stopped){t=this.extendEventData(t);for(var e=this.current.inst.options,n=0,r=this.gestures.length;r>n;n++){var o=this.gestures[n];if(!this.stopped&&e[o.name]!==!1&&o.handler.call(o,t,this.current.inst)===!1){this.stopDetect();break}}return this.current&&(this.current.lastEvent=t),t.eventType==i.EVENT_END&&!t.touches.length-1&&this.stopDetect(),t}},stopDetect:function(){this.previous=i.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(t){var e=this.current.startEvent;if(e&&(t.touches.length!=e.touches.length||t.touches===e.touches)){e.touches=[];for(var n=0,r=t.touches.length;r>n;n++)e.touches.push(i.utils.extend({},t.touches[n]))}var o=t.timeStamp-e.timeStamp,s=t.center.pageX-e.center.pageX,a=t.center.pageY-e.center.pageY,c=i.utils.getVelocity(o,s,a);return i.utils.extend(t,{deltaTime:o,deltaX:s,deltaY:a,velocityX:c.x,velocityY:c.y,distance:i.utils.getDistance(e.center,t.center),angle:i.utils.getAngle(e.center,t.center),direction:i.utils.getDirection(e.center,t.center),scale:i.utils.getScale(e.touches,t.touches),rotation:i.utils.getRotation(e.touches,t.touches),startEvent:e}),t},register:function(t){var n=t.defaults||{};return n[t.name]===e&&(n[t.name]=!0),i.utils.extend(i.defaults,n,!0),t.index=t.index||1e3,this.gestures.push(t),this.gestures.sort(function(t,e){return t.index<e.index?-1:t.index>e.index?1:0}),this.gestures}},i.gestures=i.gestures||{},i.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(t,e){switch(t.eventType){case i.EVENT_START:clearTimeout(this.timer),i.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==i.detection.current.name&&e.trigger("hold",t)},e.options.hold_timeout);break;case i.EVENT_MOVE:t.distance>e.options.hold_threshold&&clearTimeout(this.timer);break;case i.EVENT_END:clearTimeout(this.timer)}}},i.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},handler:function(t,e){if(t.eventType==i.EVENT_END){var n=i.detection.previous,r=!1;if(t.deltaTime>e.options.tap_max_touchtime||t.distance>e.options.tap_max_distance)return;n&&"tap"==n.name&&t.timeStamp-n.lastEvent.timeStamp<e.options.doubletap_interval&&t.distance<e.options.doubletap_distance&&(e.trigger("doubletap",t),r=!0),(!r||e.options.tap_always)&&(i.detection.current.name="tap",e.trigger(i.detection.current.name,t))}}},i.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_max_touches:1,swipe_velocity:.7},handler:function(t,e){if(t.eventType==i.EVENT_END){if(e.options.swipe_max_touches>0&&t.touches.length>e.options.swipe_max_touches)return;(t.velocityX>e.options.swipe_velocity||t.velocityY>e.options.swipe_velocity)&&(e.trigger(this.name,t),e.trigger(this.name+t.direction,t))}}},i.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(t,n){if(i.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",t),this.triggered=!1,e;if(!(n.options.drag_max_touches>0&&t.touches.length>n.options.drag_max_touches))switch(t.eventType){case i.EVENT_START:this.triggered=!1;break;case i.EVENT_MOVE:if(t.distance<n.options.drag_min_distance&&i.detection.current.name!=this.name)return;i.detection.current.name=this.name,(i.detection.current.lastEvent.drag_locked_to_axis||n.options.drag_lock_to_axis&&n.options.drag_lock_min_distance<=t.distance)&&(t.drag_locked_to_axis=!0);var r=i.detection.current.lastEvent.direction;t.drag_locked_to_axis&&r!==t.direction&&(t.direction=i.utils.isVertical(r)?0>t.deltaY?i.DIRECTION_UP:i.DIRECTION_DOWN:0>t.deltaX?i.DIRECTION_LEFT:i.DIRECTION_RIGHT),this.triggered||(n.trigger(this.name+"start",t),this.triggered=!0),n.trigger(this.name,t),n.trigger(this.name+t.direction,t),(n.options.drag_block_vertical&&i.utils.isVertical(t.direction)||n.options.drag_block_horizontal&&!i.utils.isVertical(t.direction))&&t.preventDefault();break;case i.EVENT_END:this.triggered&&n.trigger(this.name+"end",t),this.triggered=!1}}},i.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(t,n){if(i.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",t),this.triggered=!1,e;if(!(2>t.touches.length))switch(n.options.transform_always_block&&t.preventDefault(),t.eventType){case i.EVENT_START:this.triggered=!1;break;case i.EVENT_MOVE:var r=Math.abs(1-t.scale),o=Math.abs(t.rotation);if(n.options.transform_min_scale>r&&n.options.transform_min_rotation>o)return;i.detection.current.name=this.name,this.triggered||(n.trigger(this.name+"start",t),this.triggered=!0),n.trigger(this.name,t),o>n.options.transform_min_rotation&&n.trigger("rotate",t),r>n.options.transform_min_scale&&(n.trigger("pinch",t),n.trigger("pinch"+(1>t.scale?"in":"out"),t));break;case i.EVENT_END:this.triggered&&n.trigger(this.name+"end",t),this.triggered=!1}}},i.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(t,n){return n.options.prevent_mouseevents&&t.pointerType==i.POINTER_MOUSE?(t.stopDetect(),e):(n.options.prevent_default&&t.preventDefault(),t.eventType==i.EVENT_START&&n.trigger(this.name,t),e)}},i.gestures.Release={name:"release",index:1/0,handler:function(t,e){t.eventType==i.EVENT_END&&e.trigger(this.name,t)}},"object"==typeof module&&"object"==typeof module.exports?module.exports=i:(t.Hammer=i,"function"==typeof t.define&&t.define.amd&&t.define("hammer",[],function(){return i}))})(this);


/*!
* screenfull
* v1.0.4 - 2013-05-26
* https://github.com/sindresorhus/screenfull.js
* (c) Sindre Sorhus; MIT License
*/
(function(a,b){"use strict";var c="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,d=function(){for(var a,c,d=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"]],e=0,f=d.length,g={};f>e;e++)if(a=d[e],a&&a[1]in b){for(e=0,c=a.length;c>e;e++)g[d[0][e]]=a[e];return g}return!1}(),e={request:function(a){var e=d.requestFullscreen;a=a||b.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?a[e]():a[e](c&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){b[d.exitFullscreen]()},toggle:function(a){this.isFullscreen?this.exit():this.request(a)},onchange:function(){},onerror:function(){},raw:d};return d?(Object.defineProperties(e,{isFullscreen:{get:function(){return!!b[d.fullscreenElement]}},element:{enumerable:!0,get:function(){return b[d.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return!!b[d.fullscreenEnabled]}}}),b.addEventListener(d.fullscreenchange,function(a){e.onchange.call(e,a)}),b.addEventListener(d.fullscreenerror,function(a){e.onerror.call(e,a)}),a.screenfull=e,void 0):a.screenfull=!1})(window,document);

/*
 *  Project: S Gallery 
 *  Description: Responsive jQuery Gallery Plugin with CSS3 Animations inspired by http://store.sony.com/webapp/wcs/stores/servlet/ProductDisplay?catalogId=10551&storeId=10151&langId=-1&productId=8198552921666556433#gallery
 *  Author: Sara Soueidan
 *  License: Creative-Commons Attribution Non-Commercial

 Customized: added number of image, for added captions in the HTML, these are hidden while image resizes
 */

;(function ( $, window, document, undefined ) {

    var pluginName = "sGallery",
        defaults = {
            fullScreenEnabled: false
        };

    function Plugin( element, options ) {
        this.element = element;
        this.galleryContainer = $(this.element);
        this.bigItemsList = this.galleryContainer.children('ul:eq(1)');
        this.bigItem = this.bigItemsList.children('li');
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.current = "";
        this.slideshow = false;
        this.count = this.bigItem.length;
        this.initialHeight = 'auto';
        this.isFullScreen = false;
        this.$controls = $('.controls');
        this.$control = $('.control');
        this.$grid = $('.grid');
        this.$fsButton = $('.fs-toggle');
        this.$document = $(document);
        this.$window = $(window);
        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var that = this,
                smallItems = this.galleryContainer.find('ul:eq(0)'),
                smallItem = smallItems.children('li'),
                options = this.options;
                

            this.setDelays(smallItems);
            this.bindListHandler(smallItems);
            this.handleQuit();
            this.controlSlideShow(this.count);
            if(options.fullScreenEnabled){
                this.controlFullScreen();
            }
            this.changeHeight();
            this.handleTouch();
        },

        handleTouch: function(){
            var that = this;
            //prevent image from being dragged without affecting its pointer events huhu!
            this.bigItem.on('dragstart', function(event) { event.preventDefault(); });

            var scrollLeftOnSwipe = Hammer(this.element).on("swipeleft", function(event) {
                if(that.slideshow){
                    that.controlLeftRight('next');
                }
            });
            var scrollRightOnSwipe = Hammer(this.element).on("swiperight", function(event) {
                if(that.slideshow){
                    that.controlLeftRight('previous');
                }
            });
            
        },

        changeHeight: function(speed){
            var that = this,
                speed = speed || 0 ,
                currentImg = this.bigItemsList.children('li:eq(' + that.current + ')');

            this.initialHeight = this.galleryContainer.outerHeight(),
            this.minHeight = currentImg.height()
                                +  parseInt(this.bigItem.css('top'))
                                + this.$controls.height() * 2;
            this.adaptHeight(speed);

            //update above values and adapt height again on window resize
            this.$window.load(function(){

                that.$window.resize(function(){

                    that.initialHeight = that.galleryContainer.outerHeight();

                    that.minHeight = that.bigItem.height()
                                    +  parseInt(that.bigItem.css('top'))
                                    + that.$controls.height() * 2;
                    that.adaptHeight(speed);
                   
                });
                that.$window.trigger('resize');
            });
           
            
        },

        adaptHeight: function(speed){

            var that = this,
                height = this.bigItem.outerHeight();
            if(that.slideshow && that.initialHeight < that.minHeight){
                $(that.element).animate({'height': that.minHeight + 'px'}, speed);
            }
            else if(that.slideshow && that.initialHeight > that.minHeight){
                $(this.element).animate({'height': that.minHeight + 'px'}, speed);
            }
        },

        setDelays: function(smallItems){
            smallItems.children('li').each(function(index){
                $(this).css('animation-delay', 0.075 * index + 's');
            });
        },

        bindListHandler: function(smallItems){
            var that = this;

            smallItems.on('click', 'li', function(e){
                e.preventDefault();
                var $this = $(this);
                that.current = $this.index();
                that.fadeAllOut();
                that.showControls();
                that.slideshow = true;
                startImg = that.bigItemsList.children('li:eq(' + that.current + ')');
                //to show index of img in list
                var index = that.current + 1;
                // startImg.find('.img-index').html(index + ' sur ' + that.count);

                $this.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
                    startImg.addClass('fadeInScaleUp').removeClass('fadeOut');
                    that.bigItemsList.css('pointer-events', 'auto');
                    that.changeHeight(600);
                });   
            });
        },

        fadeAllOut: function(){
            this.galleryContainer.children('ul:eq(0)')
                     .children('li')
                     .removeClass('scaleUpFadeIn')
                     .removeClass('showLastSecond')
                     .addClass('scaleDownFadeOut');
        },

        fadeAllIn: function(){
            var that = this;
            var dropZone = this.galleryContainer.children('ul:eq(0)').children('li:eq(' + that.current + ')');
            this.galleryContainer.children('ul:eq(0)')
                     .children('li')
                     .not(dropZone)
                     .removeClass('scaleDownFadeOut')
                     .addClass('scaleUpFadeIn');

            dropZone.removeClass('scaleDownFadeOut').addClass('showLastSecond');
        },

        showControls:function(){
            this.$controls.addClass('showControls')
                          .removeClass('hideControls');
        },

        hideControls: function(){
            this.$controls.addClass('hideControls')
                          .removeClass('showControls');
        },

        controlSlideShow: function(count){

            var that = this, key;

            this.$document.on('keydown', function(e){

                var e = e || window.event;
                key = e.keyCode;

                if(key == 37 && that.slideshow){
                    that.current--;
                    if(that.current < 0) { 
                        that.current = count - 1; 
                    }
                    that.moveToNextImage();
                }
                else if(key == 39 && that.slideshow){
                    that.current++;
                    if(that.current == count) { 
                        that.current = 0; 
                    }
                    that.moveToNextImage();
                }
                
            });


            this.$control.on('click', function(){
                var direction = $(this).data('direction');
                that.controlLeftRight(direction);
            });

            
        },

        controlLeftRight: function(direction){
                var direction = direction;

                (direction == 'next') ? this.current++ : this.current--;

                if(this.current < 0) { 
                        this.current = this.count - 1; 
                }
                else if(this.current == this.count) { 
                        this.current = 0; 
                }

                this.moveToNextImage();
        },

        moveToNextImage: function(){
            var that = this;

            var currentImg = this.bigItemsList.children('li:eq(' + that.current + ')');
            //add this to show index of img in list
            var index = this.current + 1;
            // currentImg.find('.img-index').html(index + ' sur ' + that.count);
                              currentImg.addClass('fadeInScaleUp')
                                        .siblings('li')
                                        .filter('.fadeInScaleUp')
                                        .removeClass('fadeInScaleUp')
                                        .addClass('fadeOut')
                                        .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
                                            $(this).removeClass('fadeOut');
                                        });

            
            this.changeHeight(600);
        },

        handleQuit: function(){

            var that = this;

            this.$document.on('keydown', function(e){
                var e = e || window.event;
                    key = e.keyCode;

                if(key == 16 && that.slideshow){
                    that.quitSlideShow();
                }
            });
            
            this.$grid.on('click', function(){
                that.quitSlideShow();
            });
        },

        controlFullScreen: function(){
            var that = this, gallery = this.element;

            this.$fsButton.css('display', 'inline-block').on('click', function(){
               if (screenfull.enabled) {
                    screenfull.toggle(gallery);
                    if(!that.isFullScreen){
                        $(this).removeClass('icon-fullscreen').addClass('icon-fullscreen-exit');
                        that.isFullScreenfull = true;
                    }
                    else{
                        $(this).removeClass('icon-fullscreen-exit').addClass('icon-fullscreen');
                        that.isFullScreen=false;
                    }
                } 
                else {
                    return false;
                }      
            });
        },

        quitSlideShow: function(test) {
            
            this.hideControls();
            this.fadeAllIn();
            this.slideshow = false;

            var that = this;

            if(!this.isFullScreen){
                this.galleryContainer.animate({'height' : that.initialHeight}, 0, function(){
                    $(this).css('height', 'auto');
                });
            }

            this.bigItemsList.css('pointer-events', 'none');
            var currentImg = this.galleryContainer.children('ul:eq(1)').children('li:eq(' + that.current + ')'),
                  dropZone = this.galleryContainer.children('ul:eq(0)').children('li:eq(' + that.current + ')'),
                    height = dropZone.height() - dropZone.find('.item-price').height(),
                     width = dropZone.width(),
                      left = dropZone.position().left,
                       top = dropZone.position().top,
                     delay = parseFloat(dropZone.css('animation-delay')),
                  duration = parseFloat(dropZone.css('animation-duration')),
                      wait = delay + duration;

            //hide image description while it is resizing
            currentImg.find('.img-caption').css('opacity', '0');
            currentImg.children('img').andSelf().animate({
                'height'     : height,
                'width'      : width ,
                'left'       : left  + 'px',
                'top'        : top  + 'px',
            }, wait * 1000, function(){
                    $(this).removeClass('fadeInScaleUp').removeAttr('style');
                    currentImg.find('.img-caption').css('opacity', '1');
            });
        }
    };

    
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );

