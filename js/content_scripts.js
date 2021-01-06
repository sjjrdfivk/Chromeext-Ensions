// if (location.origin.indexOf('baidu') !== -1) {
//   const $script = document.createElement('script')
//   $script.attributes
//   $script.src = chrome.extension.getURL("js/content_test.js")
//   document.body.appendChild($script)

//   // 写入css
//   const $link = document.createElement("link");
//   $link.href = chrome.extension.getURL("css/content-d.css");
//   $link.type = "text/css";
//   $link.rel = "stylesheet";
//   document.head.appendChild($link)
// }

// // 变动观察器
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

const app_content_script = {}

app_content_script.init = function () {
  if (!document.querySelector('#bookmarks-bs')) {
    app_content_script.bookmark()
    if (!document.onmousemove) {
      document.onmousemove = function (e) {
        const $bookmarks = document.querySelector('#bookmarks-bs')
        if (e.clientX <= 1 && $bookmarks) {
          $bookmarks.style.width = '300px'
        } else if (e.clientX >= 300 && $bookmarks) {
          $bookmarks.style.width = '0'
        }
      }
    } else {
      console.log('document.onmousemove事件被占用')
    }
  }
  if (location.origin.indexOf('segmentfault') !== -1) {
    document.querySelector('article.article.fmt.article-content').removeEventListener('copy', () => {})
  }
}

// 书签页
app_content_script.bookmark = function () {
  const $iframe = document.createElement('iframe')
  $iframe.id = 'bookmarks-bs'
  $iframe.src = chrome.extension.getURL('bookmarks.html')
  document.body.appendChild($iframe)
}


//系统通知
app_content_script.notification = function (title, content, img) {
  var notification = new Notification(title, { body: content, icon: img });
  notification.onclick = function () {
    notification.close();
  };
}

//content_scripts 发送消息给 background 
app_content_script.sendMessage = function () {
  chrome.runtime.sendMessage({ msg: 'send' }, function (response) {
    console.log('background返回', response)
  });
}

app_content_script.init()



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
  if (request.greeting === 'bg-copy') {
  }
  if (request.greeting == "hello")
    sendResponse({ farewell: "goodbye" });
});