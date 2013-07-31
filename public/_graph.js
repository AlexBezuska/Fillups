// create graph
    //===========================================================================
    createMPGGraph = function(){

          $('.graph-area').empty();

          $('.graph-area').append('<div class="graph"></div><div class="graphNum"></div>');

          $('td.mpg').each(function(){

            var heightVar = 0;
                var mpg = parseFloat($(this).text());
                console.log("building graph, adding: " + mpg);
            //console.log(mpg);

            heightVar = mpg + "px";
            //console.log(heightVar);

            $('.graph').prepend(
               '<div class="graphBar" data-mpg="'+ mpg + '" style=" height:'
              + heightVar + ';"></div>');
          });

          $('.graphBar').mouseover(function(){

              var mpgVal = $(this).data("mpg");
            $('.graphNum').empty().append(mpgVal + '<br>mpg');


          });

           $('.graphBar').mouseleave(function(){

           $('.graphNum').empty()


          });



      }; // end createbarGraph fn
    //===========================================================================
    // end  graph