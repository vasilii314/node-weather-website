const request = require("postman-request");
//37.8627,-122.4233
const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8b9ba5628696bd35ba1f0bfb59689a3f&query=${lat},${long}&units=m`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. Humidity: ${body.current.humidity}%`
      );
    }
  });
};

module.exports = forecast;
