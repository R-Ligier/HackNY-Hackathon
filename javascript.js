function myMap() {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.2),
        zoom: 10
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
}

function myFunction(arr) {
		var npi [arr.results.length];
		for (var i = 0; i < arr.results.length; i++) {
		   npi[i] = arr.results[i].number;
		 }
		 return npi;
}


function getLocation(){
	var xmlhttp = new XMLHttpRequest();
	var npiregistryUrl = "https://npiregistry.cms.hhs.gov/api?city=";
	var tail = "pretty=true";
	var npiList;
	var city = document.getElementById('autocomplete'); // picked from search box;
	var cityName = city.split(',');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myArr = jQuery.parseJSON(JSON.stringify(this.responseText));
			npiList = myFunction(myArr);
			return npiList;
		}
	};
	xmlhttp.open("GET", npiregistryUrl +cityName[1]+ tail, true);
	xmlhttp.send();
}

function generateTable(doctorData){
	 var body = document.getElementsByTagName('body')[0];
	  var tbl = document.createElement("table");
	  var tblBody = document.createElement("tbody");
	 
	  // creating all cells
	  for (var i = 0; i < doctorData.length; i++) {
		// creates a table row
		var row = document.createElement("tr");
	 
		for (var j = 0; j < 6; j++) {
		  // Create a <td> element and a text node, make the text
		  // node the contents of the <td>, and put the <td> at
		  // the end of the table row
		  var cell = document.createElement("td");
		  var cellText = document.createTextNode(doctor[i][j]);
		  cell.appendChild(cellText);
		  row.appendChild(cell);
		}
	 
		// add the row to the end of the table body
		tblBody.appendChild(row);
	  }
	 
	  // put the <tbody> in the <table>
	  tbl.appendChild(tblBody);
	  // appends <table> into <body>
	  body.appendChild(tbl);
	  // sets the border attribute of tbl to 2;
	  tbl.setAttribute("border", "2");

}
function getDoctorDetails(){
	var npiList = getLocation();
	//call to get Doctor Data
	var doctorData;
	var jasonObj;
	var doctor;
	for (var i =0;i<npiList.length;i++){
	
		$.ajax({ 
		   type : "GET", 
		   url : "https://api.propublica.org/doctors/"+npiList[i], 
		   beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'P5hMshbs131RBxA2BfpXa4B3h2HhEGuN2PCQXSed');},
		   success : function(result) { 
			   alert("success",result) ;
			   jsonObj = result;
		   }, 
		   error : function(result) { 
			 //handle the error 
			 alert("error", result);
		   } 
		 }); 
		alert();		
		doctor=jQuery.parseJSON(JSON.stringify(result));
		doctorData[i][0]=doctor.provider_first_name;
		doctorData[i][1]=doctor.provider_last_name_legal_name;
		doctorData[i][2]=doctor.provider_business_practice_location_address_telephone_number;
		doctorData[i][3]=doctor.provider_first_line_business_practice_location_address;
		doctorData[i][4]=doctor.provider_business_practice_location_address_postal_code;
		doctorData[i][5]=doctor.average_number_of_services;
		
	}
	createTable(doctorData);
}