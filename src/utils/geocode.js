const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidmFzaWxpaTMxNCIsImEiOiJja2NuZ3NlZ3owYjBrMnZycTZ6c3UxNGk5In0.Mijdrrh3tcCPsdjnWy-Dvw&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.message === "Not Found" || body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
