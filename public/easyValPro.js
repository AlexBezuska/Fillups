/*   Easy Val Pro
     A jQuery/javascript library of useful math and money related functions!
     By: Alex Bezuska 2013

     Table of contents:
        1. form validator
        2. Add commas to normal (?)
        3. Precise decimal rounding (.00)
        4. Convert string to money ($0,000.00)
        5. Input percent equation
        6. Make label red if negative

*/


// Form Validator
valThis = function (idName, type) {


  idNameVal = $(idName).val();

  //question
    if (type === "question") {
      console.log('question validation...');
        //any characters including spaces in the box...
        if (idNameVal.length == 0) {

           $(idName).parents('.QuestionWrapper').addClass('warning');
           console.log(' no text present');
        }
        //nothing in the box...
        else{
           $(idName).parents('.QuestionWrapper').removeClass('warning');
            console.log(' there is text in the simple box!');

        }
    } //end if simple


    //fullName
    if (type === "fullName") {
      console.log('fullName validation...');
        //is name 3 or mor char? = true
        if (idNameVal.length == 0) {

           $(idName).parents('.callout').addClass('warning');
           console.log('bad name');
        }
        //is name 3 or mor char?  = false
        else{
           $(idName).parents('.callout').removeClass('warning');
            console.log('good name');

        }
    } //end if fullname

    //email
    if (type === "email") {

        emailFilter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

        if (emailFilter.test(idNameVal)) {
        $(idName).parents('.callout').removeClass('warning');
           console.log('good email');
        }
        else{
        //add email warning
        $(idName).parents('.callout').addClass('warning');
           console.log('bad email');
        }
    }//end if email

    //phone
    if (type === "phone") {

        var hasNumberInIt = /\d/g;
var phoneVal = idNameVal.replace(/[^0-9]/g, '');
      if(hasNumberInIt.test(phoneVal)){
        //remove all non-characters
        console.log(idNameVal);
        //phone number longer than 7?
        if (phoneVal.length == 7 || phoneVal.length == 10  || phoneVal.length == 11) {
        $(idName).parents('.callout').removeClass('warning');
           console.log('good phone');
 console.log(idNameVal);
        }
        else{
        //add phone warning
        $(idName).parents('.callout').addClass('warning');
           console.log('bad bad phone');
 console.log(idNameVal);
        }
      }
      else{

 console.log(idNameVal);
        //add phone warning
        $(idName).parents('.callout').addClass('warning');
           console.log('bad bad phone');

    }//end if phone




  }

};



//  Add commas to a normal
commas = function(str){


        str += '';
        x = str.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
          }
        return x1 + x2;
      },




//  Precise decimal rounding function feed it a number and an amount of decimal places (eg. 2 for .00)
precise_round = function(num,decimals){
  console.log("Before round: " + num);

  var rounded = Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);
console.log("After round: " + rounded);
  return  rounded;
},





// toMoney   pass it a string, it will end up looking like money
toMoney = function(value){
  console.log("-----------------------------------------------\nStarting 'toMoney' function on " + value + "..." );
  var value = value.replace(/[^0-9.-]/g, "");
    console.log("removed invalid characters: " + value);


  var valueLength = value.length - 1;


          if (value.indexOf(".") !== -1 ){
          console.log("length after decimal:" + value.substring(value.indexOf("."),valueLength).length);

            if (value.substring(value.indexOf("."),valueLength).length == 0 ){
              value =  "$" + value + "00";
              return commas(value);

              }
            if( value.substring(value.indexOf("."),valueLength).length == 1 ){
              value =  "$" + value + "0";
              return commas(value);

              }
            if(value.substring(value.indexOf("."),valueLength).length == 2 ){
              value = "$" + value;

              return commas(value);

              }

              else{// round decimals
                alert("mr sandwich");
                 var value = value.replace(/[^0-9.-]/g, "");

                      console.log("value after stripping: " + value);





                 value = precise_round(value);

                      console.log("round: " + value);




                value = "$" + value.toString() ;

                return commas(value);

                }//end else

          }
          else{//else 3

            value = "$" + value + ".00";
            return commas(value);

            }//end else 3



},/* end toMoney */




   //  5  // Percent Calculations
  //===========================================================/
getPercentOf = function (staticInput, userInput, answerLabel) {

      console.log("-----------------------------------------------\nStarting 'getPercentOf' function on " + $(staticInput).text() + " and " + $(userInput).val() + " with destination: " + answerLabel + "..." );

      var staticInputVal = stripMoney(staticInput);
      var userInputVal = stripMoney(userInput);

      var total = (staticInputVal * userInputVal) / '100';
    console.log("getPercentOf //  " + userInputVal + " % X " + staticInputVal + " = " + total);
        total = precise_round(total,2);

        total = total.toString();
        total = toMoney(total);


   var answerlabelType = $(answerLabel).get(0).tagName;

          if(answerlabelType == "INPUT"){
              console.log("getPercentOf // answerLabel type: " + answerlabelType + " loading " + total + " into it.");
              $(answerLabel).val(total);

          }
          else{
              console.log("getPercentOf // answerLabel type: " + answerlabelType + " loading " + total + " into it.");
              $(answerLabel).text(total);

          }



  };




  // Make the text content of a label red is the value is negative
      var redOnNegative = function(label){

          $(label).each(function(){

              console.log(  $(this).html() );

              if($(this).html().match("-")){

                  $(this).css("color","rgba(192,57,43,1)");

              }

          });

      };


// Strip Money characters ( $ , ) from input(txtBox) or span (label)
//   ALLOWS NEGATIVE NUMBERS ( - ) prevents NaNs
      stripMoney = function(money){
 console.log("-----------------------------------------------\nStarting 'stripMoney' function on " + money + "..." );
        elementType = $(money).get(0).tagName;

        if(elementType == "INPUT"){
          var result = $(money).val().replace(/[^0-9.-]/g, "");
            if(isNaN(result) || result == ""){ console.log("! Found NaN ! Fixing..."); result = "0.00"; }
          console.log("   Found "+ elementType + ", with value: " + $(money).val() + " \n   stripping result is: " + result);
        }

        else{
        var result = $(money).text().replace(/[^0-9.-]/g, "");
            if(isNaN(result) || result == ""){ console.log("! Found NaN ! Fixing..."); result = "0.00";}
          console.log("   Found "+ elementType + ", with text: " + $(money).text() + " \n   stripping result is: " + result);
        }
        return parseFloat(result);

      }/* end stripMoney */


 stripNumberString = function(money){
 console.log("-----------------------------------------------\nStarting 'stripNumberString' function on " + money + "..." );
   console.log("input: " + money);
   result = money.replace(/[^0-9.-]/g, "");
  console.log("replace characters: " + result);

      }/* end stripNumberString */






// Add the values of two labels together
      addStaticMoney = function(num1, num2, answerlabel){

          var sum = stripMoney(num1) + stripMoney(num2);
              sum = precise_round(sum, 2);
              sum = sum.toString();
              sum = toMoney(sum);



            var answerlabelType = $(answerlabel).get(0).tagName;

          if(answerlabelType == "INPUT"){

             $(answerlabel).val(sum);

          }
          else{

             $(answerlabel).text(sum);

          }

      }/* end addStaticMoney */


// Multiply user input by static value
      multiplyUserInputMoney = function( input1, staticInput, answerlabel){
 console.log("-----------------------------------------------\nStarting 'multiplyUserInputMoney' function..." );

input1Val = stripMoney(input1);
staticInputVal = stripMoney(staticInput);

            var total =  input1Val * staticInputVal;


  console.log("   Equation: "+ input1Val + " x " + staticInputVal + " = " + total);

                total = precise_round(total,2);
                                                    console.log("   Total Rounded: " + total);
                total = total.toString();
                total = toMoney(total);
                                                    console.log("   Total to Money: " + total);


            var answerlabelType = $(answerlabel).get(0).tagName;

            if(answerlabelType == "INPUT"){

               $(answerlabel).val(total);

            }
            else{

              $(answerlabel).text(total);

            }

      }/* end multiplyUserInputMoney */


  $(document).ready(function(){

        $('*[data-mask="money"]').each(function () {


            console.log('out');
            var value = $(this).val().replace("$","").replace(",","");
                console.log(value);
            if(isNaN(value) || value == ""){

                console.log("! Found NaN ! Fixing...");
                value = "0.00";
                console.log("   Found value: " + $(this).val() + " \n   stripping result is: " + value);

            }

            value = toMoney(value);
            $(this).val(value);

        }); /* *[data-mask="money"] */


        $("*[data-mask='money']").click(function() {
            $(this).select();
        });


        $('*[data-mask="money"]').focus(function () {
            console.log('in');
          }).blur(function() {
            console.log('out');
            var value = $(this).val().replace("$","").replace(",","");
            value = toMoney(value);
            $(this).val(value);
          }); /* *[data-mask="money"] */





          // PERCENT
         //=========================================================


           $('*[data-mask="percent"]').each(function () {


            console.log('start data mask percent');
            var value = $(this).val().replace("%","");
                console.log(value);
            if(isNaN(value) || value == ""){

                console.log("! Found NaN ! Fixing...");
                value = "0.00";
                console.log("   Found value: " + $(this).val() + " \n   stripping result is: " + value);

            }
                value = precise_round(value, 2);
            $(this).val(" " + value + ' %');

        }); /* *[data-mask="precent"] */



        $("*[data-mask='percent']").focus(function () {
            console.log('in');
          }).blur(function() {

            console.log('out');
            var value = $(this).val().replace("%","");

            if(isNaN(value) || value == ""){

                console.log("! Found NaN ! Fixing...");
                value = "0.00";
                console.log("   Found value: " + $(this).val() + " \n   stripping result is: " + value);

            }

             value = precise_round(value, 2);
           $(this).val(" " + value + ' %');

          }); /* *[data-mask="precent"] */

          //=========================================================
          // end precent


          // Number   just a regular number, no symbols or letters allowed
         //=========================================================
          $('*[data-mask="number"]').each(function () {
            console.log('start data mask number');
            var value = $(this).val().replace(/[^0-9]/g, "");
            console.log(value);

            $(this).val(value);
          }); /* *[data-mask="precent"] */


          $('*[data-mask="number"]').focus(function () {
            console.log('in');
            })
            .blur(function() {
            console.log('out');
            var value = $(this).val().replace(/[^0-9]/g, "");

            $(this).val(value);

          }); /* *[data-mask="number"] */

          //=========================================================
          // end Number


          // decimal   just a regular decimal
          //=========================================================
          $('*[data-mask="decimal"]').each(function () {
            console.log('start data mask number');
            var value = $(this).val().replace(/[^0-9.]/g, "");
            console.log(value);

            $(this).val(value);
          }); /* *[data-mask="precent"] */


          $('*[data-mask="decimal"]').focus(function () {
            console.log('in');
            })
            .blur(function() {
            console.log('out');
            var value = $(this).val().replace(/[^0-9.]/g, "");

            $(this).val(value);

          }); /* *[data-mask="decimal"] */

          //=========================================================
          // end decimal


 // Globals
//##########################################################

    // click to select all text in a textbox
    $('input[type="text"]').click(function(){
      $(this).select();
    });



// give it some things to average a place to output the value, if no 'output' is specified, just returns the value
  average = function(input){
        var result = 0, count = 0;
        $(input).each(function(){

             var strValue = $(this).text().replace("$","");
   console.log(strValue);
              //if(isNaN(strValue) || strValue == ""){ console.log('converted: ' + strValue + ' to 0.00'); strValue = 0.00; };
             result += parseInt(strValue);
             count++;
        });

        var average = result / count;
            average = precise_round(average, 2);

        if(isNaN(average) || average == ""){ average = "n/a"; };


          //if(r.length > -1){ average = precise_round(average, 2); }//if rounded
         // if(m.length > -1){ average = "$" + average; }// if money

          //if there was an 'output' label or txtBox specified
        return average;



   };

// give it somehting to count and a place to output the value, if no 'output' is specified, just returns the value - NaN proof
  countObjects = function(object){

          i = 0;
          $(object).each(function(){
             if(isNaN(object) || object == ""){ object = 0; }
              i = i + 1;
          });


          //if(r.length > -1){ i = precise_round(i, 2); }//if rounded
         // if(m.length > -1){ i = "$" + i; }// if money

          //if there was an 'output' label or txtBox specified
       return i;

      };


  addObjects = function(object){

            i = 0;
             var objecttype = $(object).get(0).tagName;
             //if 'object' is a label:
            if(objecttype == "INPUT"){

               $(object).each(function(){
                var number = parseFloat($(this).val().replace(/[^0-9.]/g, ""));
                if(isNaN(number) || number == ""){ number = "0"; }
                  i = i + number;
                  //console.log("Total cost: " + i);
               });

            }

            //if 'object' is a txtBox:
            else{

               $(object).each(function(){
                var number = parseFloat($(this).text().replace(/[^0-9.]/g, ""));
                if(isNaN(number) || number == ""){ number = "0"; }
                  i = i + number;
                  //console.log("Total cost: " + i);
               });

            }
          if(isNaN(i) || i == ""){ i = "0"; }

          //if(r.length > -1){ i = precise_round(i, 2); }//if rounded
         // if(m.length > -1){ i = "$" + i; }// if money

          //if there was an 'output' label or txtBox specified
return i;

   };//end addobjects


        // set form dates to start at today
  setToToday = function(field, format){
    console.log("gettingtodays date");
    if(format == "mm/dd/yyyy" || format == "MM/DD/YYYY"){
      var date = new Date();
      var today = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();




    }
    else{ console.log("EasyVal.js ERROR with function: setToToday()\nThe Bad News: EasyVal.js does not have support for this date format yet, or you have typed in an incorrect date format string(or no date format string). Bummer.\nThe Good News: EasyVal.js has defaulted all requested fields to 'mm/dd/yyyy'.\n\n");
    today = "mm/dd/yyyy";
        }

         var fieldtype = $(field).get(0).tagName;

        if(fieldtype == "INPUT"){ $(field).val(today);  }
                            else{ $(field).text(today); }
  };//end setToToday




 //##########################################################
// End Globals


  });
  //##########################################################
 // end document ready






