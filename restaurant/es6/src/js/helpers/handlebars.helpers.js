import Handlebars from "handlebars/runtime"

/**
 * Returns a shorter class name string for resto element to color restaurant's background
 *
 * Examples:
 *  'open' > 'open',
 *  'order ahead' > 'ahead',
 *  'closed' > 'closed'
 *
 * @param {String} text
 */
Handlebars.registerHelper('getStatusClassName', function (text) {
    let cssClass;
    switch (text) {
        case 'order ahead':
            cssClass = 'ahead';
            break;
        default:
            cssClass = text;
            break;
    }
    return new Handlebars.SafeString(cssClass);
});

/**
 * Returns a <span> element with 'stars' class to show restaurant's rating
 *
 * @param {Number} val
 */
Handlebars.registerHelper('stars', function (val) {
    val = parseFloat(val);
    return new Handlebars.SafeString(`<span class="stars stars--${val*20}">★★★★★</span>`);
});

/**
 * Conditionally render a block if the condition is true.
 *
 * @param a
 * @param b
 */
Handlebars.registerHelper('is', function(a, b, opts) {
    return (a === b) ?
        opts.fn(this) :
        opts.inverse(this);
});

/**
 * Capitalizes the first word in a string
 *
 * @param {String} text
 */
Handlebars.registerHelper('capitalizeFirst', function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
});
