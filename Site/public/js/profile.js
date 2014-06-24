/**
 * profile.js
 *   Scripts for the profile page
 */

function hideAllForms() {
    $('#bio-form').hide();
    $('#edit-bio').show();
}

$(document).ready(function() {
    hideAllForms();
    $('#edit-bio').click(function(evt) {
	hideAllForms();
	$('#bio-form').show();
    });
});
