
$('.login-link-text').click(function(){
  currentUser = Meteor.user();
  currentUserId = Meteor.userId();
  currentUserEmail = Meteor.user().emails[0].address;
  console.log(currentUser + 'You are logged in as: ', currentUserEmail, ', with the ID:', currentUserId, 'bro.');


});