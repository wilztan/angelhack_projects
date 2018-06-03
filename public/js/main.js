$('#button_show').click(function() {
  if($('#weather_table').is(":visible")){
      $('#weather_table').hide();
      $("#show_table").html("SHOW TABLE");
  }else{
    $('#weather_table').show();
    $("#show_table").html("HIDE TABLE");
  }
});

function doDate()
{
    var str = "";

    var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

    var now = new Date();

    str += "Today is: " + days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " " + now.getHours() +":" + now.getMinutes() + ":" + now.getSeconds();
    document.getElementById("todaysDate").innerHTML = str;
}

setInterval(doDate, 1000);

var data= [];

var tempCard =  $("#card_temperature");
var humdCard =  $("#card_humidity");
var lightCard =  $("#card_light");

var table_light = $('#table_light');
var table_humid = $('#table_humidity');
var table_temp =$('#table_temperature');

var total={
  humid:0,
  light:0,
  temperature:0,
}
var count={
  humid:0,
  light:0,
  temperature:0,
}

var high={
  humid:0,
  light:0,
  temperature:0,
}

var low={
  humid:0,
  light:0,
  temperature:0,
}
myCallback()
function myCallback() {
  // setEmpty();
  fetch("server/index.php")
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(response) {
    this.data = response;
    setData(response);
  })
}
//
// var Interval = window.setInterval(myCallback, 10000);
//
//
// function setEmpty() {
//   data =[];
//   tempCard.show(5000);
//   humdCard.show(5000);
//   lightCard.show(5000);
//   tempCard.fadeOut(4900, function(){ $(this).html("<br><br><br><br>")});
//   humdCard.fadeOut(4900, function(){ $(this).html("<br><br><br><br>")});
//   lightCard.fadeOut(4900, function(){ $(this).html("<br><br><br><br>")});
//
//   table_temp.show(8000);
//   table_humid.show(8000);
//   table_light.show(8000);
//   table_temp.fadeOut(1900, function(){ $(this).html("<br><br><br><br>")});
//   table_humid.fadeOut(1900, function(){ $(this).html("<br><br><br><br>")});
//   table_light.fadeOut(1900, function(){ $(this).html("<br><br><br><br>")});
// }

function setData(response) {
  for(var a = 0; a < response.humidity_data.length ; a++){
    var humid = response.humidity_data[a].humidity;
    if(a===0){
      high.humid=humid;
      low.humid=humid;
    }
    if(humid!==""){
      table_humid.append($('<tr>').append($("<td>").text(humid)));
      if(high.humid<humid){high.humid=humid;}
      if(low.humid>humid){low.humid=humid;}
      total.humid = total.humid+parseFloat(humid);
      count.humid = a;
    }
  }

  for(var a = 0; a < response.light_data.length ; a++){
    var light = response.light_data[a].light;
    if(a===0){
      high.light=light;
      low.light=light;
    }
    if(light!==""){
      table_light.append($('<tr>').append($("<td>").text(light)));
      if(high.light<light){high.light=light;}
      if(low.light>light){low.light=light;}
      total.light = total.light+parseFloat(light);
      count.light = a;
    }
  }

  for(var a = 0; a < response.temp_data.length ; a++){
    var temperature = response.temp_data[a].temperature;
    if(a===0){
      high.temperature=temperature;
      low.temperature=temperature;
    }
    if(temperature!==""){
      table_temp.append($('<tr>').append($("<td>").text(temperature)));
      total.temperature = total.temperature+parseFloat(temperature);
      if(high.temperature<temperature){high.temperature=temperature;}
      if(low.temperature>temperature){low.temperature=temperature;}
      count.temperature = a;
    }
  }
  tempCard.html("");
  humdCard.html("");
  lightCard.html("");

  tempCard.append($('<p>').text("Average : "+total.temperature/count.temperature));
  humdCard.append($('<p>').text("Average : "+total.humid/count.humid));
  lightCard.append($('<p>').text("Average : "+total.light/count.light));

  tempCard.append($('<p>').text("High : "+high.temperature));
  humdCard.append($('<p>').text("High : "+high.humid));
  lightCard.append($('<p>').text("High : "+high.light));

  tempCard.append($('<p>').text("Low : "+low.temperature));
  humdCard.append($('<p>').text("Low : "+low.humid));
  lightCard.append($('<p>').text("Low : "+low.light));


  tempCard.append($('<p>').text("Total Data : "+count.temperature));
  humdCard.append($('<p>').text("Total Data : "+count.humid));
  lightCard.append($('<p>').text("Total Data : "+count.light));


}
