var views = chrome.extension.getViews({type:'popup'});

chrome.contextMenus.create({
	title: '使用百度搜索：%s', // %s表示选中的文字
	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单 可选：["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"]，默认page
	onclick: function (params) {
		// 注意不能使用location.href，因为location是属于background的window对象
		chrome.tabs.create({ url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText) });
	}
});

chrome.contextMenus.create({
	title: 'JSON解析：%s', // %s表示选中的文字
	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	onclick: function (params) {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			localStorage.jsonData = params.selectionText
			chrome.windows.create({ url: chrome.extension.getURL('demo_json.html') })
		});
	}
});

// 右键复制
chrome.contextMenus.create({
	title: '复制：%s', // %s表示选中的文字
	contexts: ['selection'],
	onclick: function (params) {
		document.oncopy = function(event) {
			event.clipboardData.setData("text", params.selectionText);
			event.preventDefault();
		};
		document.execCommand("copy", false, null);
	}
});

//background 接受来自 contentscript 的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(sender, "来自内容脚本：" + sender.tab.url + "来自应用");
	sendResponse({ status: 200 }); //回复
});


// 跨域
// chrome.webRequest.onHeadersReceived.addListener(function (info) {
// 	// const responseHeaders = info.responseHeaders.filter(e => e.name.toLowerCase() !== "access-control-allow-origin" && e.name.toLowerCase() !== "access-control-allow-methods");
// 	const responseHeaders = [...info.responseHeaders];
// 	responseHeaders.push({"name": "Access-Control-Allow-Origin", "value": '*'})
// 	return {"responseHeaders": responseHeaders};
// }, {"urls": ["http://*/*", "https://*/*"]}, ["blocking", "responseHeaders", "extraHeaders"]);

// chrome.storage.onChanged.addListener(details => {
// });

// chrome.tabs.onCreated.addListener(function (tabId,changeInfo) {
// 	console.log(1,tabId,changeInfo)
// 	var tabUrl = tab.url;
//   if (tabUrl.indexOf("baidu") != -1) {
	// chrome.tabs.executeScript(tabId, {file: 'res/js/content.js'});
//     chrome.tabs.insertCSS(null, { file: "css/content-d.css" });
//   }
// })
// chrome.tabs.onUpdated.addListener(function (tabId,changeInfo) {
// 	console.log(2,tabId,changeInfo)
// 	var tabUrl = tab.url;
//   if (tabUrl.indexOf("baidu") != -1) {
//     chrome.tabs.insertCSS(null, { file: "css/content-d.css" });
//   }
// })