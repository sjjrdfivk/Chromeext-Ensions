if (location.origin.indexOf('baidu') !== -1) {
  const $script = document.createElement('script')
  $script.attributes
  $script.src = chrome.extension.getURL("js/content_test.js")
  document.body.appendChild($script)

  // 写入css
  const $link = document.createElement("link");
  $link.href = chrome.extension.getURL("css/content-d.css");
  $link.type = "text/css";
  $link.rel = "stylesheet";
  document.head.appendChild($link)
}

//变动观察器
// var observer = new MutationObserver(function (mutations, observer) {
//   const $link = document.createElement("link");
//   $link.href = chrome.extension.getURL("css/content-d.css");
//   $link.type = "text/css";
//   $link.rel = "stylesheet";
//   document.head.appendChild($link)
// });
// var el = document.querySelector('#wrapper_wrapper');
// var options = {
//   'childList': true,
//   'attributes': true
// };
// observer.observe(el, options);


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
  if (request.greeting == "hello")
    sendResponse({ farewell: "goodbye" });
});

//content_scripts 发送消息给 background 
chrome.runtime.sendMessage({ msg: 'send' }, function (response) {
  console.log('background返回', response)
});

// var notification = new Notification("信息"
//     , {
//       body:"你好",
//     // icon:图片地址,

//         }
// );
// notification.onclick = function() {
//     notification.close();    
// };