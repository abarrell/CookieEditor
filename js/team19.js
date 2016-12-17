

chrome.tabs.query({
    currentWindow: true,
    active: true
}, function(tabs) {
    chrome.webNavigation.getAllFrames({
        tabId: tabs[0].id
    }, function(details) {
        
        var urls = details.reduce(function(urls, frame) {
            if (urls.indexOf(frame.url) === -1)
                urls.push(frame.url);
            return urls;
        }, []);
        
        var index = 0;
        var cookies = [];
        urls.forEach(function(url) {
            chrome.cookies.getAll({
                url: url
            }, function(additionalCookies) {
                cookies = cookies.concat(additionalCookies);
                if (++index === urls.length) {
                    
                    console.log(cookies);
                }
            }); 
        }); 
    }); 
}); 