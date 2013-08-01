

Fillup = new Meteor.Collection("Fillup");


if (Meteor.isClient) {

currentUser = Meteor.user();
currentUserId = Meteor.userId();
currentUserEmail = Meteor.user().emails[0].address;

console.log('You are logged in as: ', currentUserEmail, ', with the ID:', currentUserId, 'bro.');




// Template.Fillup.FillupArr  fn
//displays the records from this collection on the page
//###########################################################################
  Template.Fillup.FillupArr = function(){
      return Fillup.find({ userID: {$gt: 0} }, {sort: {_id: -1}});
  };// end Template.Fillup.FillupArr
//###########################################################################
// end display collection


// Template.Fillup.events
//###########################################################################
  Template.Fillup.events = {


   //delete record
  //===================================================
    'click .btnRemove': function () {
      var r=confirm("Are you sure you want to delete this Fillup?      Caution: There is no way to restore it once it has been removed.");
        if (r==true){
         //console.log("You pressed OK!");
          Fillup.remove(this._id);
        }
        else{
         //console.log("You pressed Cancel!");
        }

    },
   //===================================================
  // end click remove


   //Click to get the session id of the current object  (woot!)
  //===================================================
    'click': function () {

      Session.set('session_fillup', this._id);
      console.log(this._id.toString());
    },
   //===================================================


'click .btnEdit': function () {
var ID = this._id.toString();
      btnEdit(ID);
    },

    'click .btnSave': function () {
var id = this._id;

                //get values
                var TripVal    = precise_round($('.tripResult  .updateBox').val(), 2);
                var GalVal     = precise_round($('.galResult   .updateBox').val(), 2);
                var PriceVal   = precise_round($('.priceResult .updateBox').val(), 2);
                var DateVal    = $('.dateResult    .updateBox').val();
                var StationVal = $('.stationResult .updateBox').val();
                var PPGVal     = precise_round(PriceVal / GalVal, 2);
                var PPMVal     = precise_round(PriceVal / TripVal, 2);
                var MPGVal     = precise_round(TripVal / GalVal, 2);
                //clear form fields

var r=confirm("Are you sure you want to commit these changes?\nCaution: There is no way to restore the old version once it has been changed.");
        if (r==true){
         //console.log("You pressed OK!");

console.log("clicked save for row id: " + id);
          Fillup.update({ "_id": id},
                               {
                                $set: { "Date"    : DateVal,     //user
                                        "MPG"     : MPGVal,      //dynamic
                                        "Trip"    : TripVal,     //user
                                        "PPG"     : PPGVal,      //dynamic
                                        "PPM"     : PPMVal,      //dynamic
                                        "Gal"     : GalVal,      //user
                                        "Price"   : PriceVal,    //user
                                        "Station" : StationVal   //user
                                      }
                               });


        }
        else{
         //console.log("You pressed Cancel!");
        }
                $('.editFlag').val('true'); //  MongoDB update statement


    },


}
//###########################################################################
// end Template.Fillup.events




//Meteor Startup fn
//###########################################################################
 Meteor.startup(function () {




 //$('.topBar').append('You are logged in as: ', currentUserEmail, ', with the ID:', currentUserId, 'bro.');




 });
//###########################################################################
// end Meteor startup fn



// Template.Fillup.rendered fn // this seems to loop constantly
//###########################################################################
 Template.Fillup.rendered = function() {


createMPGGraph();

$(".avgGalCost .log").text("$" + average(".fillup .ppg"));

$(".avgMpg .log").text(average(".fillup .mpg"));

$('.fillcount .log').text(countObjects('.fillup'));

$('.totalCost .log').text("$" + precise_round(addObjects('.fillup .priceResult'), 2));

$('.galPurchased .log').text(precise_round(addObjects('.fillup .galResult'), 2));



 }; // end Template.Fillup.rendered fn
//###########################################################################
// end Do when template is done being rendered



}// end if

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}






