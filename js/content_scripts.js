// chrome.runtime.sendMessage({
//   requestUrl: 'http://172.16.100.117:3000/api' // 需要请求的url
//   },response => JSON.parse(response.text())
// );

// 

if (location.origin.indexOf('baidu') !== -1) {
  const $script = document.createElement('script')
  $script.src = chrome.extension.getURL("js/content_test.js")
  document.body.appendChild($script)

  // 写入css
  const $link = document.createElement("link"); 
  $link.href = chrome.extension.getURL("css/content-d.css"); 
  $link.type ="text/css"; 
  $link.rel ="stylesheet";
  document.head.appendChild($link)
}

// var notification = new Notification("信息"
//     , {
//       body:"你好",
//     // icon:图片地址,
    
//         }
// );
// notification.onclick = function() {
//     notification.close();    
// };