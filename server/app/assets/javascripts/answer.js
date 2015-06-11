$(document).on('page:change', function() {
  $('.answer-new-button').on('click', function(event) {
    event.preventDefault();
    $('.answer-form').toggle();
  });
});
