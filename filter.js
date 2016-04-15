/*
  // Code developed by Amol Vaze

   $( document ).ready(function() {
     
                              $( "#data" ).autocomplete({     
                            
                            source: function (request, response) {
             
              // Suggest URL
             var suggestURL = "http://suggestqueries.google.com/complete/search?client=chrome&q=%QUERY";
             //var suggestURL = "https://gist.github.com/RSpace/bba1b5067f79c6778cff";
               suggestURL = suggestURL.replace('%QUERY', request.term);
              
              // JSONP Request
              $.ajax({
                  method: 'GET',
                  dataType: 'jsonp',
                  jsonpCallback: 'jsonCallback',
                  url: suggestURL
              })
              .success(function(data){

                  response(data[1]);
                  
              });
          }
   



         source: function (request, response) {

                var searchBy = $('#data').val();

                $.ajax({

                    url: "C:\\Users\\Amol\\Desktop\\Component\\data.json", type: "GET", dataType: "jsonp",

                    data: { searchText: request.term, searchBy: searchBy, maxResults: 10 },
                    success: function (data) {
                        response($.map(data, function (item) {

                            return { key: item.id + " , "+ item.name , value: item.org_id }

                              


                        }));
                    }
                })
            }
      


          });

                         
   

    });

                               
     
        
         */