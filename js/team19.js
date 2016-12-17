// $(document).ready(function(){

// 	getCurrentTabUrl(showURL);

// });

// var showURL=function(url){
// 	var parser = document.createElement('a');
// 	parser.href = url;
// 	var domain=parser.hostname.replace(/^www\./,'');
// 	getCookies(domain);
// };

// function getCookies(filter){
// 	chrome.cookies.getAll({'domain':filter},function(cookies) {
// 		console.log(cookies);
// 	});
// }

chrome.tabs.query({
    currentWindow: true,
    active: true
}, function(tabs) {
    chrome.webNavigation.getAllFrames({
        tabId: tabs[0].id
    }, function(details) {
        // Get unique list of URLs
        var urls = details.reduce(function(urls, frame) {
            if (urls.indexOf(frame.url) === -1)
                urls.push(frame.url);
            return urls;
        }, []);
        // Get all cookies
        var index = 0;
        var cookies = [];
        urls.forEach(function(url) {
            chrome.cookies.getAll({
                url: url
            }, function(additionalCookies) {
                cookies = cookies.concat(additionalCookies);
                if (++index === urls.length) {
                    // Collected all cookies!
                    // TODO: Use cookies.
                    // Note: The array may contain duplicate cookies!
                    console.log(cookies);
                }
            }); // chrome.cookies.getAll
        }); // urls.forEach
    }); // chrome.webNavigation.getAllFrames
}); // chrome.tabs.query