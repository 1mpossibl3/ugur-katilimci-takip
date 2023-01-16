// dom ready
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".participants").innerHTML = "";

  let participants = [];
  chrome.storage.sync.get("participants", function (data) {
    participants = data.participants;
    const universalBOM = "\uFEFF";
    const csvContent =
      "data:text/csv;charset=utf-8," +
      encodeURIComponent(universalBOM + participants.join("\n"));

    const btn = document.getElementById("download");

    btn.setAttribute("href", csvContent);
    btn.setAttribute("download", "participants.csv");

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
      const formData = new FormData(e.target);

      axios
        .post("http://localhost/ugurokullari-api/team/mindex_web.php", {
          tag: "update_participants",
          api_key:
            "AdZmoRr5vWaZvS0ToDcVBneN5jmOfqmZekbfA_s_yohhp901g-SOEnrMKZdGiZw2YEy4g0tR5PLfp1nt",
          meeting_code: formData.get("meeting_code"),
          participants,
        })
        .then((response) => {
          console.log(response);
        });
    });
});
