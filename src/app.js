const express = require("express");
const app = express();
const geocode = require("./utils/geocode");
const weatherReport = require("./utils/weather");
const path = require("path");

const publicViewPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");

app.use(express.static(publicViewPath));

app.get("", (req, res) => {
  // console.log("testing");
  // res.send("Hello World!");

  res.render("index", {
    title: "Weather Application",
    author: "Arun"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Please enter the address!!!");
  }

  geocode(req.query.address, (error, { place_name, center } = {}) => {
    if (error) {
      console.log("Error : ", error);
      res.send({ error });
    } else {
      weatherReport(
        center[1],
        center[0],
        (error, { temperature, precipProbability } = {}) => {
          if (error) {
            return console.log("Error : ", error);
            res.send({ error });
          }
          res.send({
            location: place_name,
            temperature,
            precipProbability
          });
        }
      );
    }
  });
});

app.listen(3000, () => {
  console.log("Server up !!!");
});
