console.log("Test");

const weatherForm = document.querySelector("form");

const msgOne = document.querySelector("#msg1");

const msgTwo = document.querySelector("#msg2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";
  const searchText = document.querySelector("input");
  const address = searchText.value;
  fetch("/weather?address=" + address).then(response => {
    response.json().then(data => {
      console.log("response", data);
      if (data.error) {
        msgOne.textContent = data.error;
      } else {
        msgOne.textContent = "Result Location :   " + data.location;
        msgTwo.textContent =
          "Its currently " +
          data.temperature +
          " degrees out. There is a " +
          data.precipProbability +
          "% chance of rain.";
      }
    });
  });
});
