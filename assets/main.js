$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '50px' });
 
  var wind_speed, weather_risk;

 
  client.get('ticket.customField:custom_field_114100712171').then(
	function(data) {
		weather_risk = data['ticket.customField:custom_field_114100712171'];
        console.log(weather_risk)
	}
  );

  client.get('ticket.customField:custom_field_114100596852').then(
	function(data) {
		wind_speed = data['ticket.customField:custom_field_114100596852'];
        console.log(wind_speed)
        risk_score = weather_risk.substring(0,weather_risk.indexOf(':'));
        risk_desc = weather_risk.substring(weather_risk.indexOf(':')+1)
        showInfo(wind_speed, risk_score,risk_desc);
	}
  );

});


function showInfo(wind_speed, risk_score,risk_desc) {
	console.log('show info called '+wind_speed)
  var requester_data = {
    'wind_speed' : wind_speed,
    'risk_score' : risk_score,
    'risk_desc' : risk_desc,
  };
  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
}

// function showError(response) {
//   var error_data = {
//     'status': response.status,
//     'statusText': response.statusText
//   };
//   var source = $("#error-template").html();
//   var template = Handlebars.compile(source);
//   var html = template(error_data);
//   $("#content").html(html);
// }

// function formatDate(date) {
//   var cdate = new Date(date);
//   var options = {
//     year: "numeric",
//     month: "short",
//     day: "numeric"
//   };
//   date = cdate.toLocaleDateString("en-us", options);
//   return date;
// }
