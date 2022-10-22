// dom ready
document.addEventListener("DOMContentLoaded", function () {
  // form submit

  document.querySelector(".participants").innerHTML = "";

  let participants = [];
  chrome.storage.sync.get("participants", function (data) {
    participants = data.participants;

    for (const participant of participants) {
      const li = document.createElement("li");
      li.innerText = participant;
      document.querySelector(".participants").appendChild(li);
    }
  });

  document
    .getElementById("synchronize")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      // get form data
      var formData = new FormData(this);
      // send form data to background script
      chrome.runtime.sendMessage({ formData: formData }, function (response) {
        console.log(response);
      });
    });
});
