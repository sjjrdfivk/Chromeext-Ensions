const load = function () {
  const app_bg = chrome.extension.getBackgroundPage().app_background
  const webrequestOpen = document.querySelector('#webrequestOpen');
  const webrequestclose = document.querySelector('#webrequestclose');
  const bookmarkOpen = document.querySelector('#bookmarkOpen');
  const bookmarkClose = document.querySelector('#bookmarkClose');

  const webrequestShow = function () {
    if (app_bg.webrequest.hasListener()) {
      webrequestOpen.style.display = 'none'
      webrequestclose.style.display = 'block'
    } else if (!app_bg.webrequest.hasListener()) {
      webrequestOpen.style.display = 'block'
      webrequestclose.style.display = 'none'
    }
  }
  const bookmarkShow = function () {
    chrome.storage.local.get(['bookmark'], function (result) {
      if (result.bookmark) {
        bookmarkOpen.style.display = 'none'
        bookmarkClose.style.display = 'block'
      } else {
        bookmarkOpen.style.display = 'block'
        bookmarkClose.style.display = 'none'
      }
    });
  }
  const show = function () {
    webrequestShow()
    bookmarkShow()
  }

  show()

  //跨域开启
  webrequestOpen.addEventListener('click', function () {
    const webrequestValue = document.querySelector('#webrequestValue').value;
    chrome.runtime.sendMessage({ "greeting": 'webrequestOpen', url: webrequestValue }, function () {
      webrequestShow()
    })
  })
  //跨域关闭
  webrequestclose.addEventListener('click', function () {
    chrome.runtime.sendMessage({ "greeting": 'webrequestclose' }, function () {
      webrequestShow()
    })
  })

  // 书签开启
  bookmarkOpen.addEventListener('click', function () {
    chrome.storage.local.set({ bookmark: true }, function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "bookmarkOpen" }, function (response) {
          bookmarkShow()
        });
      });
    });
  })
  // 书签关闭
  bookmarkClose.addEventListener('click', function () {
    chrome.storage.local.set({ bookmark: false }, function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "bookmarkClose" }, function (response) {
          bookmarkShow()
        });
      });
    });
  })
}

window.addEventListener("load", load, false);