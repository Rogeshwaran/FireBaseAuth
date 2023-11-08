const fetch = require('node-fetch');

module.exports = async (url, data) => {
	try {
        console.log(data);
		const resp = await fetch(url, data);
        console.log(resp.status);
		if (resp.status === 200) {
			const payload = await resp.json();
			return {
				resp: payload,
				err: null
			};
		} else {
			console.log(resp);
			const payload = await resp.text();
			console.log(payload);
			return {
				resp: null,
				err: JSON.parse(payload)
			};
		}
	} catch (err) {
		console.log('failed : ', err);
		return {
			resp: null,
			err: err
		};
	}
};

// const https = require("https");

// https.post(url, function (response) {
//     console.log(response.statusCode);

//     response.on("data", function (data) { //when we receive some data in the respose we are going to contain that data in a function
//       const weatherData = JSON.parse(data); //changing the data form hexadecimal code to javaScipt object
//       console.log(weatherData);

//       const temprature = weatherData.main.temp;
//       console.log(temprature);

//       const weatherDescription = weatherData.weather[0].description; // weather was the first object in the data block that way [0]
//       console.log(weatherDescription);

//       const icon = weatherData.weather[0].icon;
//       const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

//       res.write("<p>The temprature in " + query + " is " + temprature + "</p>");
//       res.write("<h1>The wether is " + weatherDescription + "</h1>");
//       res.write("<image src = " + imageUrl + ">");
//       res.send();

//     })
//   })
