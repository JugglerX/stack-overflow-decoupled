$(document).on('page:change', function() {
  // make an ajax request to the server



  var request = $.ajax({
    url: 'http://192.168.0.128:3000/erd',
    type: 'get'
  });

  // Ajax Success
  request.done(function(data){

    // Log JSON Structure
    console.log(data);
    console.log(data.tables[0])
    console.log(data.tables[0].keys)

    // Tables
    for (var i = 0; i < data.tables.length; i++)  {
      $.each(data.tables[i], function(k, v) {
        // Create a div in the markup for each database table
        $( ".template .table" ).clone().addClass(k).appendTo(".content");
        // Append table name
        $("." + k + " h2").append(k);
        // console.log(k)
        // console.log(v)
        for (var i = 0; i < v.length; i++)  {
          // console.log(v[i])
          // Append columns
          $('.' + k + ' ul').append("<li>" + v[i].name + "</li>")
        }
      });
    };

    // Associations
    // Log JSON Structure
    console.log("Associations")

    for (var i = 0; i < data.associations.length; i++)  {
      $.each(data.associations[i], function(k, v) {
        // Loop through 1st level
        // Association Type: eg "belongs_to", "has_many"
        console.log( "*************" );
        console.log( k );
        console.log( "*************" );

        // Loop through 2nd level
        // eg: bids: "items" - bids belongs_to items
        $.each(v, function(kTwo, vTwo) {
          // console.log('.' + k)
          console.log(vTwo.first_table)
          // console.log(vTwo.second_table)
          var concatenateAssociation = vTwo.first_table + "_" + k + "_" + vTwo.second_table
          console.log(concatenateAssociation);
          $('.' + vTwo.first_table).addClass(concatenateAssociation);
          //

        });
      });
    };



    // bids belongs_to item
    var belongs_to = data.associations[1]
    console.log( Object.keys( belongs_to ) );

    var start_belongs_to = data.associations[1].belongs_to
    console.log( Object.keys( start_belongs_to ) );
  });

  request.fail(function(){

  });
})


// http://packery.metafizzy.co/packery.pkgd.js and
// http://draggabilly.desandro.com/draggabilly.pkgd.js added as external resource

$( function() {
  var $container = $('.packery');

  $container.packery({
    columnWidth: 80,
    rowHeight: 80
  });

  // bind draggabilly events to item elements
  $container.find('.item').each( makeEachDraggable );

  function makeEachDraggable( i, itemElem ) {
    // make element draggable with Draggabilly
    var draggie = new Draggabilly( itemElem );
    // bind Draggabilly events to Packery
    $container.packery( 'bindDraggabillyEvents', draggie );
  }

  // add more items
  $('#add-items').click( function() {
    var items = '<div class="item w2 h2"></div>' +
      '<div class="item w2 h2"></div>' +
      '<div class="item w4 h2"></div>' +
      '<div class="item h4 w4"></div>' +
      '<div class="item w2 h2"></div>' +
      '<div class="item w2 h4"></div>' +
      '<div class="item w2 h2"></div>';
    var $items = $(items);
    // add to packery layout
    $container.append( $items )
      .packery( 'appended', $items )
    // make item elements draggable
    $items.each( makeEachDraggable );
  });

});

// var question = data[i]
//       var source = $('#sample-template').html();
//       var template = Handlebars.compile(source);
//       $('body').append(template(question))
