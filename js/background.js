const app = {};

app.webRequest = {
	"listener": function () {
		chrome.webRequest.onHeadersReceived.removeListener();
	}
}

chrome.contextMenus.create({
	title: '使用百度搜索：%s', // %s表示选中的文字
  contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	onclick: function(params)
	{
		// 注意不能使用location.href，因为location是属于background的window对象
		chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
	}
});

// 跨域
// chrome.webRequest.onHeadersReceived.addListener(function (info) {
// 	// const responseHeaders = info.responseHeaders.filter(e => e.name.toLowerCase() !== "access-control-allow-origin" && e.name.toLowerCase() !== "access-control-allow-methods");
// 	const responseHeaders = [...info.responseHeaders];
// 	responseHeaders.push({"name": "Access-Control-Allow-Origin", "value": '*'})
// 	return {"responseHeaders": responseHeaders};
// }, {"urls": ["http://*/*", "https://*/*"]}, ["blocking", "responseHeaders", "extraHeaders"]);

chrome.contextMenus.create({
	title: 'JSON解析：%s', // %s表示选中的文字
  contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	onclick: function(params)
	{
		// const $iframe = document.createElement('iframe')
		// $iframe.src = chrome.extension.getURL('demo_json.html');
		// document.body.appendChild($iframe);
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		console.log(tabs)
		chrome.windows.create({url:chrome.extension.getURL('demo_json.html'),tabId: tabs.id, type:['popup']},)
	});
	}
});



// chrome.tabs.onCreated.addListener(function (tabId,changeInfo) {
// 	console.log(1,tabId,changeInfo)
// 	var tabUrl = tab.url;
//   if (tabUrl.indexOf("baidu") != -1) {
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