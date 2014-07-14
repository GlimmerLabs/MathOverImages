/**
 * profile.js
 *   Scripts for the profile page
 */

/**
 * formVisible
 *   Indicate whether or not the form is visible.
 */
var formVisible = true;

function hideForm() {
  $('#bio-form').hide();
  formVisible = false;
} // hideForm

function showForm() {
  $('#bio-form').show();
  formVisible = true;
} // showForm

$(document).ready(function() {
  hideForm();
  $('#edit-bio').click(function(evt) {
    if (formVisible) {
      hideForm();
    }
    else {
      showForm();
    }
  });
});
