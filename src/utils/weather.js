// const url =
//   "https://api.darksky.net/forecast/6079d1dccf14e3b36fd0120d5554c766/13.082680,80.270721?units=si";

// request({ url: url, json: true }, (error, response) => {
//   console.log("Error", error);
//   console.log(
//     "Its currently",
//     response.body.currently.temperature,
//     "degrees out. There is a",
//     response.body.currently.precipProbability,
//     "chance of rain."
//   );
// });

const request = require("request");

const weatherReport = (long, lat, callback) => {
  const url =
    "https://api.darksky.net/forecast/6079d1dccf14e3b36fd0120d5554c766/" +
    long +
    "," +
    lat +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Network error", undefined);
    } else if (body.error) {
      callback("Unnable to find location", undefined);
    } else {
      callback(undefined, body.currently, body.daily.data[0]);
    }
  });
};

module.exports = weatherReport;
