/** ===============
 *   CONFIG
 *  =============== */

var apiUrl = "https://rencs.com/demo/hotel/api/", // API url
    getHotels = "hotels",   // API endpoint for hotels
    getReviews = "reviews", // API endpoint for reviews
    HotelCount = "5",       // Number of hotels to retrieve per Ajax call
    HotelNameLimit = 19,    // Very long names break the view, so we limit the string
    HotelDescLimit = 160;   // Very long descriptions break the view, so we limit the string


/** ===============
 *   MAIN
 *  =============== */

$(document).ready(function () {

    /** =====================
     *   BUTTON: Load Hotels
     *  ===================== */

    $("#btn-load").click(function() {
        // Hide error box if shown
        $("#box-error").hide();
        // Empty hotel list
        $('#hotels').html('');
        // Show loading spinner
        $("#loading").fadeIn();
        // Make the Ajax call
        $.ajax({
            url: apiUrl + getHotels,
            data: { count: HotelCount },
            success: function(data) {
                // Hide loading spinner
                $("#loading").slideUp();
                // Format hotel data based on the instructions
                data.forEach(function(hotel) {
                    // Very long names break the view
                    hotel.name = trimString(capitalizeFirstLetter(hotel.name), HotelNameLimit, '…');
                    // Very long descriptions break the view
                    hotel.description = trimString(hotel.description, HotelDescLimit, '…');
                    hotel.date_start = formatDate(hotel.date_start);
                    hotel.date_end = formatDate(hotel.date_end);
                    hotel.stars = formatStars(hotel.stars);
                });

                $.get('tpl/hotel.html', function(templates) {
                    var template = $(templates).filter('#tpl-hotel').html();
                    // Append review data into the review box and show it
                    $('#hotels').html(
                        Mustache.to_html(template, { arr: data, multiply: function() { return this.images.length * 16 } })
                    );
                    $('.slider').thumbnailSlider();
                });
            },
            error: function(e) {
                // Hide loading spinner
                $("#loading").slideUp();
                // Show error box
                $("#box-error").fadeIn();
            },
            cache: false
        });
    });


    /** ======================
     *   BUTTON: Show reviews
     *  ====================== */

    $("#hotels").on("click", ".btn-review", function() {
        // Define variables
        var hotelId = $(this).data("id"),
            button = $(this),
            reviewBox = $('#' + hotelId);
        // Simple toggle solution for the button
        if (button.text() === 'Hide reviews') {
            button.text('Show reviews');
            // Hide the reviews
            reviewBox.slideUp();
            return;
        }

        var showReviewTemplate = function(data) {
            // Create a comment type from "positive" property
            data.forEach(function(el) {
                switch(el.positive) {
                    case 'info': el.type = 'info'; break;
                    case true:   el.type = 'plus'; break;
                    case false:  el.type = 'minus'; break;
                    default:     el.type = 'info';
                }
            });

            $.get('tpl/review.html', function(templates) {
                var template = $(templates).filter('#tpl-review').html();
                // Append review data into the review box and show it
                reviewBox.html(
                    Mustache.to_html(template, { arr: data })
                ).slideDown();
                // Simple toggle solution for the button
                button.text('Hide reviews');
            });
        };
        // Make the Ajax call
        $.ajax({
            url: apiUrl + getReviews,
            data: { hotel_id: hotelId },
            success: function(data) {
                // If array is empty, show a notification
                if (data.length === 0)
                    data = [{
                        positive: 'info',
                        name: "There are no reviews yet.",
                        comment: "Write the first one!"
                    }];
                showReviewTemplate(data);
            },
            error: function(e) {
                showReviewTemplate([{
                    positive: 'info',
                    name: "ERROR: " + e.statusText,
                    comment: "Please try again"
                }]);
            },
            cache: false
        });
    });
});
