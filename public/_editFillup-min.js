// row Edit Function
//==========================================================================
btnEdit=function(e){id=e.valueOf();console.log("value of: "+id);$(".row").each(function(){if($(".editFlag").val()=="true"&&$(this).find(".uniqueID").text()==id){$(".editFlag").val("false");var e=$(this);$(this).find(".btnEdit").hide();e.find(".btnRemove").hide();e.find(".btnSave").show();e.find(".btnCancel").show();console.log("start edit function");console.log(e);dateStore=e.find("td.dateResult").text();console.log("dateStore: "+dateStore);tripStore=e.find(".tripResult").text();console.log("tripStore: "+tripStore);galStore=e.find(".galResult").text();console.log("galStore: "+galStore);priceStore=e.find(".priceResult").text();console.log("priceStore: "+priceStore);stationStore=e.find(".stationResult").text();console.log("stationStore: "+stationStore);e.find(".dateResult   ").empty().append('<input type="text" class="updateBox" value="'+dateStore+'"/>');e.find(".tripResult   ").empty().append('<input type="text" data-mask="decimal" class="updateBox" value="'+tripStore+'"/>');e.find(".galResult    ").empty().append('<input type="text" data-mask="decimal"  class="updateBox" value="'+galStore+'"/>');e.find(".priceResult  ").empty().append('<input type="text" data-mask="decimal"  class="updateBox" value="'+priceStore+'"/>');e.find(".stationResult").empty().append('<input type="text" class="updateBox" value="'+stationStore+'"/>');$(".updateBox").keyup(function(){var t=e.find(".priceResult .updateBox").val(),n=e.find(".galResult .updateBox").val(),r=e.find(".tripResult .updateBox").val(),i=precise_round(t/n,2);e.find(".ppg").text(i);var s=precise_round(t/r,2);e.find(".ppm").text(s);var o=precise_round(r/n,2);e.find(".mpg").text(o)});e.find(".btnCancel").click(function(){e.find(".dateResult").empty().append(dateStore);e.find(".tripResult").empty().append(tripStore);e.find(".galResult").empty().append(galStore);e.find(".priceResult").empty().append(priceStore);e.find(".stationResult").empty().append(stationStore);e.find(".btnEdit").show();e.find(".btnRemove").show();e.find(".btnSave").hide();$(this).hide();$(".editFlag").val("true")});e.find(".btnSave").click(function(){})}})};