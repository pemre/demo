/** ==================
 *   HELPER FUNCTIONS
 *  ================== */

/**
 * Capitalizes the first letter of a given string
 *
 * @param {string} string
 * @returns {string}
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Trims given string (optionally with an end string)
 *
 * @param {string} string
 * @param {number} length
 * @param {string} end
 * @returns {string}
 */
function trimString(string, length, end) {
    end = end || '';
    return string.length > length ? string.substring(0, length) + end : string;
}

/**
 * Formats given string into German time format
 *
 * @param {string} string
 * @returns {string}
 */
function formatDate(string) {
    var d = new Date(string);
    return ("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth()+1)).slice(-2) + "." + d.getFullYear();
}

/**
 * Generates a string of 5 stars, filling with empty stars if necessary
 *
 * @param {number} stars
 * @returns {string}
 */
function formatStars(stars) {
    var string = '', i;
    for (i = 0; i < stars; i++)
        string += '★';
    for (i = 0; i < 5 - stars; i++)
        string += '☆';
    return string;
}
