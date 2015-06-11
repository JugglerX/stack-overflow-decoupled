$(document).on('page:change', function() {
  console.log( "ready!" );

  $('.post-wrapper').on('click','.vote-button', function(event) {
    event.preventDefault();
    console.log(this)
    var post = $(this).closest('.post')
    var form = $(this).closest('form')
    var url = $(this).closest('form').attr('action')
    console.log(post)
    console.log(form)
    console.log(url)

    var submission = $.ajax({
      type: 'POST',
      url: url,
      data: form.serialize(),
      dataType: 'JSON'
    });

    submission.done(function(data) {
      console.log(data)
      $(post).find(".vote-count").html(data.score);
    });

    submission.fail(function(data) {
      var error_messages = data.responseJSON;
    });
  });

});
