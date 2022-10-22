chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case "openPopup":
      chrome.tabs.create({ url: "popup.html" }, function (tab) {
        sendResponse({ message: "success" });
      });
      break;
    case "setParticipants":
      chrome.storage.sync.set({ participants: request.data }, function () {
        sendResponse({ message: "success" });
      });
      break;
  }
});
