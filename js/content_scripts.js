const app_content_script = {
  clientX: 0,
  mouseUp: false,
}

app_content_script.init = function () {
  chrome.storage.local.get(['bookmark'], function(result) {
    if (result.bookmark) {
      app_content_script.bookmark()
    }
  })
  this.rowRightMouse()
}

// 书签页
app_content_script.bookmark = function () {
  if (!document.querySelector('#bookmarks-bs')) {
    const $iframe = document.createElement('iframe')
    $iframe.id = 'bookmarks-bs'
    $iframe.src = chrome.extension.getURL('bookmarks.html')
    document.body.appendChild($iframe)
    document.body.addEventListener('mousemove', app_content_script.bookmarkElement, false)
  }
}

app_content_script.bookmarkElement = function (e) {
  console.log(e)
  const $bookmarks = document.querySelector('#bookmarks-bs')
  if (e.clientX <= 1 && e.clientY <= 50 && $bookmarks) {
    $bookmarks.style.width = '300px'
  } else if (e.clientX >= 300 && $bookmarks) {
    $bookmarks.style.width = '0'
  }
}

app_content_script.bookmarkRemove = function () {
  if (document.querySelector('#bookmarks-bs')) {
    document.querySelector('#bookmarks-bs').remove()
    document.body.removeEventListener('mousemove' , app_content_script.bookmarkElement, false)
  }
}

// 鼠标划动
app_content_script.rowRightMouse = function () {
  document.addEventListener('mousedown', e => {
    if (e.button === 2) {
      this.clientX = e.clientX
    }
  })
  document.addEventListener('mouseup', e => {
    if (e.button === 2) {
      const letsMath = e.clientX - this.clientX
      if (letsMath >= 100) {
        this.mouseUp = true
        history.back()
      } else if (letsMath <= -100) {
        this.mouseUp = true
        history.forward()
      }
    }
  })
  document.addEventListener('contextmenu', e => {
    if (this.mouseUp) {
      e.preventDefault()
      this.mouseUp = false
      return false
    }
  })
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
  if (request.greeting === 'bookmarkOpen') { // 书签
    app_content_script.bookmark()
  } else if (request.greeting === 'bookmarkClose') {
    app_content_script.bookmarkRemove()
  }
  sendResponse({ farewell: "goodbye" });
});


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