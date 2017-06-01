/* source: https://tympanus.net/Tutorials/ThumbnailsPreviewSlider/ */
(function($) {
    $.fn.thumbnailSlider = function(options) {
        var opts = $.extend({}, $.fn.thumbnailSlider.defaults, options);
        return this.each(function() {
            var $this 				= $(this),
                o 					= $.meta ? $.extend({}, opts, $pxs_container.data()) : opts;

            var $ts_container		= $this.children('.ts_container'),
                $ts_thumbnails		= $ts_container.children('.ts_thumbnails'),
                $nav_elems			= $ts_container.children('li').not($ts_thumbnails),
                total_elems			= $nav_elems.length,
                $ts_preview_wrapper	= $ts_thumbnails.children('.ts_preview_wrapper'),
                $arrow				= $ts_thumbnails.children('span'),
                $ts_preview			= $ts_preview_wrapper.children('.ts_preview');

            /*
             calculate sizes for $ts_thumbnails:
             width 	-> width thumbnail + border (2*5)
             height 	-> height thumbnail + border + triangle height(6)
             top		-> -(height plus margin of 5)
             left	-> leftDot - 0.5*width + 0.5*widthNavDot
             this will be set when hovering the nav,
             and the default value will correspond to the first nav dot
             */
            var w_ts_thumbnails	= o.thumb_width + 2*5,
                //h_ts_thumbnails	= o.thumb_height + 2*5 + 6,
                h_ts_thumbnails	= o.thumb_height + 6,
                t_ts_thumbnails	= -(h_ts_thumbnails + 5),
                $first_nav		= $nav_elems.eq(0),
                l_ts_thumbnails	= $first_nav.position().left - 0.5*w_ts_thumbnails + 0.5*$first_nav.width();

            $ts_thumbnails.css({
                width	: w_ts_thumbnails + 'px',
                height	: h_ts_thumbnails + 'px',
                top		: t_ts_thumbnails + 'px',
                left	: l_ts_thumbnails + 'px'
            });

            /*
             calculate the top and left for the arrow of the tooltip
             top		-> thumb height + border(2*5)
             left	-> (thumb width + border)/2 -width/2
             */
            //var t_arrow	= o.thumb_height + 2*5,
            var t_arrow	= o.thumb_height,
                l_arrow	= (o.thumb_width + 2*5) / 2 - $arrow.width() / 2;
            $arrow.css({
                left	: l_arrow + 'px',
                top		: t_arrow + 'px'
            });

            /*
             calculate the $ts_preview width -> thumb width times number of thumbs
             */
            $ts_preview.css('width' , total_elems*o.thumb_width + 'px');

            /*
             set the $ts_preview_wrapper width and height -> thumb width / thumb height
             */
            $ts_preview_wrapper.css({
                width	: o.thumb_width + 'px',
                height	: o.thumb_height + 'px'
            });

            //hover the nav elems
            $nav_elems.bind('mouseenter',function(){
                var $nav_elem	= $(this),
                    idx			= $nav_elem.index();

                /*
                 calculate the new left
                 for $ts_thumbnails
                 */
                var new_left	= $nav_elem.position().left - 0.5*w_ts_thumbnails + 0.5*$nav_elem.width();

                $ts_thumbnails.stop(true)
                    .show()
                    .animate({
                        left	: new_left + 'px'
                    },o.speed,o.easing);

                /*
                 animate the left of the $ts_preview to show the right thumb
                 */
                $ts_preview.stop(true)
                    .animate({
                        left	: -idx*o.thumb_width + 'px'
                    },o.speed,o.easing);

                //zoom in the thumb image if zoom is true
                if(o.zoom && o.zoomratio > 1){
                    var new_width	= o.zoomratio * o.thumb_width,
                        new_height	= o.zoomratio * o.thumb_height;

                    //increase the $ts_preview width in order to fit the zoomed image
                    var ts_preview_w	= $ts_preview.width();
                    $ts_preview.css('width' , (ts_preview_w - o.thumb_width + new_width)  + 'px');

                    $ts_preview.children().eq(idx).find('img').stop().animate({
                        width		: new_width + 'px',
                        height		: new_height + 'px'
                    },o.zoomspeed);
                }

            }).bind('mouseleave',function(){
                //if zoom set the width and height to defaults
                if(o.zoom && o.zoomratio > 1){
                    var $nav_elem	= $(this),
                        idx			= $nav_elem.index();
                    $ts_preview.children().eq(idx).find('img').stop().css({
                        width	: o.thumb_width + 'px',
                        height	: o.thumb_height + 'px'
                    });
                }

                $ts_thumbnails.stop(true)
                    .hide();

            }).bind('click',function(){
                var $nav_elem	= $(this),
                    idx			= $nav_elem.index();

                o.onClick(idx);
            });

        });
    };
    $.fn.thumbnailSlider.defaults = {
        speed		: 100,//speed of each slide animation
        easing		: 'jswing',//easing effect for the slide animation
        thumb_width	: 320,//your photos width
        thumb_height: 240,//your photos height
        zoom		: false,//zoom animation for the thumbs
        zoomratio	: 1.3,//multiplicator for zoom (must be > 1)
        zoomspeed	: 15000,//speed of zoom animation
        onClick		: function(){return false;}//click callback
    };
})(jQuery);