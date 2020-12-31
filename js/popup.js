const bg = chrome.extension.getBackgroundPage(); // 调用background
const popupSendMessage = document.querySelector(".popupSendMessage");

popupSendMessage.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
      console.log('内容脚本');
    });
  });
});

function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      console.log(response)
      if (callback) callback(response);
    });
  });
}