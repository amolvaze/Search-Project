 // Code developed by Amol Vaze in 2016
// This particular file aims to acheive all the UI drop down functions.
// This is core js file which takes care of all the functionalities of this application.

 $(function() {

  //Code for datepicker added.
  $("#datepicker").datepicker({ 
    autoclose: true, 
    todayHighlight: true
  }).datepicker('update', new Date());


 //Resizing code
 $(window).resize(function() {
   //  $( "#data" ).autocomplete( "search" );
   $( "#data" ).resizable();
 });

// Cancel button to clear search results on clicking

$('#cancel').click(function(){

  $('#data').value = " ";
});

// Code added for fetching json data for populating array.
var data =[];

$.each(array, function(index, value) {
  $.each(value.spaces, function(index1, value1){
   data.push(value.name+" : "+value1.name);
  });    // End of inner loop

}); // End of outer loop

$( "#data" ).autocomplete({

  scroll: true,

// Code added to make data clickable

select: function( event, ui ) { 
//alert(ui.item.value);
$.each(array, function(indexOrg, valueOrg) {

 var org = ui.item.value.split(":");
 if(valueOrg.name === $.trim(org[0])){
  $.each(valueOrg.spaces, function(indexSpaces, valueSpaces){
    if (valueSpaces.name === $.trim(org[1])) {
      window.location.href = valueSpaces.url;
                //break;
                return false;
              }
      }); // End of inner loop

   } // End of if
   
 }); //End of outer loop

},

// Code for viewport height adjustments

open: function(event) {
  $('.ui-autocomplete').css('height', 'auto');
  var $input = $(event.target),
  inputTop = $input.offset().top,
  inputHeight = $input.height(),
  autocompleteHeight = $('.ui-autocomplete').height(),
  windowHeight = $(window).height();

  if ((inputHeight + inputTop+ autocompleteHeight) > windowHeight) {
    $('.ui-autocomplete').css('height', (windowHeight - inputHeight - inputTop - 20) + 'px');
  }
  
   // Code to increase width of open box
   $(this).autocomplete("widget").css({
    "width": 500
  });

 },

// Modified code which takes care of spaces.
source: function( request, response ) {
 var matcher = new RegExp($.trim(request.term).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i" );
 var matches = $.grep(data, function(value) {
  return matcher.test( value.label || value.value || value );
});
 response(matches.length ? matches : [{ label: 'No Search Results Found', value: '' }]);

}

}).focus(function () {
  $(this).autocomplete("search", " ");
     return false;
}); // End of on focus function.

// Code for highlight matched text in autocomplete

var $elem = $("#data").autocomplete({/* all your parameters*/}),
elemAutocomplete = $elem.data("ui-autocomplete") || $elem.data("autocomplete");
if (elemAutocomplete) {
  elemAutocomplete._renderItem = function (ul, item) {
   var newText = String(item.value).replace(
          // $.trim function added to term to take care of spaces
          new RegExp($.trim(this.term), "gi"),
          "<span class='highlight'>$&</span>");

   var imgLink;
   $.each(array, function(index, value) {
    var org = item.value.split(":");
    if (value.name === $.trim(org[0])){
      imgLink = value.image.link;
    }     
  });    

   var a = $.trim(imgLink);
   return $("<li></li>")
   .data("ui-autocomplete-item", item)
  .append("<a><img class= \"imageClass\" src='" + a + "'></a>" ) // line added
  .append("<a>" + newText + "</a>") 
  .appendTo(ul);
}
};


}); // End of document ready function.




