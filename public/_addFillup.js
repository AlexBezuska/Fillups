

$(document).ready(function() {



// add tablesorter function, set defaults [rownum-1, 1=desc 0=asc]
   // $(".fakeTable").tablesorter( ); // sort by date desc by default








// buttons to switch between stats and form
  //==========================================================================
      $('.statsOpener').click(function(){

        //alert('clicked statsOpener btn');
        $('.formOpener').show();
        $('.statsOpener').hide();
        $('.form').hide();
        $('.stats').show();
      });

      $('.formOpener').click(function(){
         setToToday('.txtDate', 'mm/dd/yyyy');
          //alert('clicked formOpener btn');
          $('.formOpener').hide();
          $('.statsOpener').show();
          $('.form').show();
          $('.stats').hide();
      });
   //==========================================================================
  // end stats and form



  // add a new record via 'Add a new Fillup' form
 //==========================================================================
            $('.send').click(function(){

              mpgCalc();
              ppmCalc();
              ppgCalc();

                //get values
                var DateVal    = $('.txtDate').val();
                var MPGVal     = precise_round($('.txtMPG').val(),2);
                var TripVal    = precise_round($('.txtTrip').val(),2);
                var PPGVal     = $('.txtPPG').val();
                var PPMVal     = $('.txtPPM').val();
                var GalVal     = precise_round($('.txtGal').val(), 2);
                var PriceVal   = precise_round($('.txtPrice').val(), 2);
                var StationVal = $('.txtStation').val();
                //clear form fields
                setToToday(".txtDate", "mm/dd/yyyy");
                $('.txtMPG')     .val('');
                $('.txtTrip')    .val('');
                $('.txtPPG')     .val('');
                $('.txtPPM')     .val('');
                $('.txtGal')     .val('');
                $('.txtPrice')   .val('');
                $('.txtStation') .val('');

                // MongoDB insert statement
                /*  Fillup.insert({
                    Date    : DateVal,     //user
                    MPG     : MPGVal,      //dynamic
                    Trip    : TripVal,     //user
                    PPG     : PPGVal,      //dynamic
                    PPM     : PPMVal,      //dynamic
                    Gal     : GalVal,      //user
                    Price   : PriceVal,    //user
                    Station : StationVal   //user
                  });*/

                  Fillup.insert({
                                "userID": Meteor.userId(),
                                "userEmail": currentUserEmail,

                                "fillups": {
                                    Date    : DateVal,     //user
                                    MPG     : MPGVal,      //dynamic
                                    Trip    : TripVal,     //user
                                    PPG     : PPGVal,      //dynamic
                                    PPM     : PPMVal,      //dynamic
                                    Gal     : GalVal,      //user
                                    Price   : PriceVal,    //user
                                    Station : StationVal   //user
                                    }
                    });//end insert fn

              }); // end send button click fn



  // Functions that calculate and fill the automatic form fields ( mpg, ppg, and ppm )
           mpgCalc = function(){
            var galEntry =  $('.txtGal').val();
            var tripEntry = $('.txtTrip').val();
            var mpgCalc = tripEntry / galEntry;
            $('.txtMPG').val( precise_round(mpgCalc, 2) );
          };

          ppmCalc = function(){
            var priceEntry = $('.txtPrice').val();
            var tripEntry = $('.txtTrip').val();
            var ppmCalc = priceEntry / tripEntry;
            $('.txtPPM').val( precise_round(ppmCalc, 2));
          };

          ppgCalc =  function(){
            var priceEntry = $('.txtPrice').val();
            var galEntry = $('.txtGal').val();
            var ppgCalc = priceEntry / galEntry;
            $('.txtPPG').val( precise_round(ppgCalc, 2));
          };

 //==========================================================================
 //  end add a new record via 'Add a new Fillup' form



 // Hide add button unless all fields are filled
  $('.send').hide();
  $('.txtDate, .txtTrip, .txtGal, .txtPrice, .txtStation').keyup(function(){
         //get values
         var DateVal    = $('.txtDate')   .val();
         var TripVal    = $('.txtTrip')   .val();
         var GalVal     = $('.txtGal')    .val();
         var PriceVal   = $('.txtPrice')  .val();
         var StationVal = $('.txtStation').val();

      if(    DateVal   .length > 0
          && TripVal   .length > 0
          && GalVal    .length > 0
          && PriceVal  .length > 0
          && StationVal.length > 0
          ){ $('.send').show(); }
      else { $('.send').hide(); }

     });// End Hide add button unless all fields are filled













  });//end document ready