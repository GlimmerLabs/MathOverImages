/**
 * profile.js
 *   Scripts for the profile page
 */

function hideForm() {
    $('#bio-form').hide();
    $('#edit-bio').show();
}

$(document).ready(function() {
    hideForm();
    $('#edit-bio').click(function(evt) {
	hideForm();
	$('#bio-form').show();
    });
});
