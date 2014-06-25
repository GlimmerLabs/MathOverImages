/**
 * accountSettings.js
 *   Scripts for the account settings page.
 */

function hideAllForms() {
  $('#password-form').hide();
  $('#username-form').hide();
  $('#email-form').hide();
  $('#edit-password').show();
  $('#edit-username').show();
  $('#edit-email').show();
}

$(document).ready(function() {
   hideAllForms();
   $('#edit-username').click(function(evt) {
       hideAllForms();
       $('#username-form').toggle();
   });
   $('#edit-password').click(function(evt) {
       hideAllForms();
       $('#password-form').toggle();
   });
   $('#edit-email').click(function(evt) {
       hideAllForms();
       $('#email-form').toggle();
   });
});
