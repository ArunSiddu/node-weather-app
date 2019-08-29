const request = require("request");

const geocode = (address, callback) => {
  if (!address) {
    return callback("Try search again", undefined);
  }
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYXJ1bnNpZGR1IiwiYSI6ImNqenV2bTN6czAwanUzY253MWs3OW1hd3YifQ.aT0j4ClNX6_0qFNahsE0_w&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Network error", undefined);
    } else if (body.features.length == 0) {
      callback("Try search again", undefined);
    } else {
      callback(undefined, body.features[0]);
    }
  });
};

module.exports = geocode;
