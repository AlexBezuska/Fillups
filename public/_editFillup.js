
// row Edit Function
//==========================================================================




btnEdit = function(ID){
id = ID.valueOf();
console.log("value of: " + id);

$('.row').each(function(){

  if($('.editFlag').val() == 'true' && $(this).find('.uniqueID').text() == id){
  $('.editFlag').val('false');
   var thisRow = $(this);
      $(this).find('.btnEdit').hide();
       thisRow.find('.btnRemove').hide();
    thisRow.find('.btnSave').show();
    thisRow.find('.btnCancel').show();
    console.log("start edit function");

    //if(canEdit == "true"){

    //var dateStore = Fillup.findOne(Session.get('session_fillup'), {Date: * });
  console.log(thisRow);
    dateStore    = thisRow.find('td.dateResult').text(); console.log("dateStore: " + dateStore);
    tripStore    = thisRow.find('.tripResult').text(); console.log("tripStore: " + tripStore);
    galStore     = thisRow.find('.galResult').text(); console.log("galStore: " + galStore);
    priceStore   = thisRow.find('.priceResult').text(); console.log("priceStore: "+priceStore);
    stationStore = thisRow.find('.stationResult').text(); console.log("stationStore: "+stationStore);



    //remove text from fields and replace with inputs

    thisRow.find('.dateResult   ').empty()
    .append('<input type="text" class="updateBox" value="' + dateStore + '"/>');

    thisRow.find('.tripResult   ').empty()
    .append('<input type="text" data-mask="decimal" class="updateBox" value="' + tripStore +'"/>');

    thisRow.find('.galResult    ').empty()
    .append('<input type="text" data-mask="decimal"  class="updateBox" value="' + galStore + '"/>');

    thisRow.find('.priceResult  ').empty()
    .append('<input type="text" data-mask="decimal"  class="updateBox" value="' + priceStore + '"/>');

    thisRow.find('.stationResult').empty()
    .append('<input type="text" class="updateBox" value="' + stationStore + '"/>');



$('.updateBox').keyup(function(){
  var PriceVal = thisRow.find('.priceResult .updateBox').val();
  var GalVal = thisRow.find('.galResult .updateBox').val();
  var TripVal = thisRow.find('.tripResult .updateBox').val();
                var PPGVal = precise_round(PriceVal / GalVal, 2);  thisRow.find('.ppg').text(PPGVal);
                var PPMVal = precise_round(PriceVal / TripVal, 2);  thisRow.find('.ppm').text(PPMVal);
                var MPGVal = precise_round(TripVal / GalVal, 2);  thisRow.find('.mpg').text(MPGVal);

});
        //cancel button
        thisRow.find('.btnCancel').click(function(){


          thisRow.find('.dateResult').empty().append(dateStore);
          thisRow.find('.tripResult').empty().append(tripStore);
          thisRow.find('.galResult').empty().append(galStore);
          thisRow.find('.priceResult').empty().append(priceStore);
          thisRow.find('.stationResult').empty().append(stationStore);

          thisRow.find('.btnEdit').show();
          thisRow.find('.btnRemove').show();
          thisRow.find('.btnSave').hide();
          $(this).hide();
          $('.editFlag').val('true');

        });// end btnCancel

    // save button
    thisRow.find('.btnSave').click(function(){








     }); // end send button click fn



  }//end if can edit and id match

});//end each row fn









};








