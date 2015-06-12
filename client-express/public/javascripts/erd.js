$( document ).ready(function() {
    console.log( "ready!" );

    $('.questions a').on('click', function() {
      console.log("test")
      var request = $.ajax({
        url: 'http://localhost:2600/questions',
        type: 'get'
      });

      request.done(function(data){
        console.log(data);
        // Iterate over objects in array and append each object to the dom
        for (var i = 0; i < data.length; i++)  {
          var question = data[i]
          var source = $('#sample-template').html();
          var template = Handlebars.compile(source);
          $('.questions').append(template(question))
        }
      });

      request.fail(function(){

      });

      $('.questions').on('click','.vote-button', function(event){
        event.preventDefault();
        var button = $(this)
        console.log(button)
        var questionId = $(this).parent().parent().attr('id').slice(9)

        var score = function() {
          console.log(button)
          if ($(button).hasClass('vote-up')) {
            return 1
          } else {
            return -1
          }
        }

        var submission = $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/votes',
          data: {
            vote_value: score(),
            votable_type: "Question",
            votable_id: questionId,
            user_id: 1
          },
          dataType: 'JSON'
        })
        submission.done(function(data) {
          console.log(data)
          console.log(data.score)
          $('#question-' + questionId + ' .vote-count').html(data.score)

           var source = $('#sample-template').html();
          var template = Handlebars.compile(source);
          $('.questions').append(template(question))

        });

        submission.fail(function(data) {
          var error_messages = data.responseJSON;
        });
      })
    });




})
