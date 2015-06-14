$(document).on('page:change', function() {


  var request = $.ajax({
    url: 'http://192.168.0.128:3000/erd',
    type: 'get'
  });
  // Ajax Success
  request.done(function(data){
    console.log(data);

    genTables(data);
    genAssociations(data);
  });
  // Ajax Failure
  request.fail(function(){
  });
});




// Generate Tables
var genTables = function(data) {
  for (var i = 0; i < data.tables.length; i++)  {
    $.each(data.tables[i], function(tableName, tableColumns) {
      var tableNameSelector = "." + tableName
      // clone a div for each database table
      $( ".template .table").clone().addClass(tableName).appendTo(".content");
      // append table name
      $(tableNameSelector).children("h2").append(tableName);

      for (var x = 0; x < tableColumns.length; x++) {
        // append column name
        if (tableColumns[x].name == "id") {
          $(tableNameSelector).children("ul").append(
            "<li class='" + tableName.singularize() +"_id'>" + tableColumns[x].name + "</li>"
          )
        }
        else {
        $(tableNameSelector).children("ul").append(
          "<li class='" + tableColumns[x].name + "'>" + tableColumns[x].name + "</li>"
          )
        }
      };

    });
  };
};

// Generate Associations
var genAssociations = function(data) {
  for (var i = 0; i < data.associations.length; i++)  {
    $.each(data.associations[i], function(k, v) {
      console.log( "*************" );
      console.log( k );
      console.log( "*************" );

      $.each(v, function(kTwo, vTwo) {
        // console.log('.' + k)
        // console.log(vTwo.first_table)
        // console.log(vTwo.second_table)
        // if (k == "belongs_to") {

        // }
        if (k == "belongs_to" || k == "belongs_to_join") {

        }
        else {

          var concatenateAssociation = vTwo.first_table + "_" + k + "_" + vTwo.second_table
          $('.' + vTwo.first_table).addClass(concatenateAssociation);

          console.log(concatenateAssociation)
          var start = associationSource(vTwo.first_table, vTwo.second_table, vTwo.primary_key, k, concatenateAssociation);

          var end = associationEnd(vTwo.first_table, vTwo.second_table, vTwo.foreign_key, k, concatenateAssociation);
        }
      });
    });
  };
};




var associationSource = function(firstTable, secondTable, primaryKey, associationType, concatenateAssociation) {
  var source = $('.' + firstTable + ' .' + primaryKey);
  color = randomColor()
  relId = genRelId()
  $(source).append("<span class='badge rel-start " + concatenateAssociation + " " + relId + "' style='background: " + color + ";' >" + associationType + "</span>")
  console.log(source);
};

var associationEnd = function(firstTable, secondTable, foreignKey, associationType) {
  var end = $('.' + secondTable + ' ' + '.' + foreignKey);
  $(end).append("<span class='badge rel-end " + relId + "' style='background: " + color + ";' >" + "X" + "</span>")
  console.log(end);
};

var removePlurals = function(word) {
  return word.slice(0,-1)
}

var genRelId = function() {
  return Math.floor(Math.random() * 1000001)
}

$( document ).ready(function() {
  $(".content").on('mouseenter', 'span.badge', function () {
    highlightRelationships(this);
  });
  $(".content").on('mouseleave', 'span.badge', function () {
    disableRelationships(this);
  });


// Creates canvas 320 × 200 at 10, 50
  var paper = Raphael(0, 0, 1000, 1000);

  // Creates circle at x = 50, y = 40, with radius 10
  // var circle = paper.circle(50, 40, 10);
  // var line = paper.path( "M100,0 L30,100" );
  // // Sets the fill attribute of the circle to red (#f00)
  // circle.attr("fill", "#f00");

  // // Sets the stroke attribute of the circle to white
  // circle.attr("stroke", "#fff");



var highlightRelationships = function(selector) {
  var rel = $(selector).attr('class').split(" ")
  var relIdDebug = rel.slice(-1)[0]
  var relRelationshipDebug = rel.slice(-2)[0]
  console.log(relIdDebug)
  console.log(relRelationshipDebug)

  var target = $('.' + relIdDebug)
  var targetStart = $(target[0]).position()
  var targetEnd = $(target[1]).position()
  var targetRaphael = ("M" + (targetStart.left + 10)  + "," + (targetStart.top + 10) + " L" + (targetEnd.left + 10)  + "," + (targetEnd.top + 10)  + "")
  console.log(targetRaphael)
  var line = paper.path(targetRaphael)
  console.log(line)
  $('.' + relIdDebug).addClass("active")
};

var disableRelationships = function(selector) {
  var rel = $(selector).attr('class').split(" ")
  rel = rel[rel.length-1]
  $('.' + rel).removeClass("active")
  paper.clear()
};

var getPosition = function(selector) {
}
relId = 1
color = "CCC"

});
