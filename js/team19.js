

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
                	console.log(cookies)
        			 cookies = removeDuplicates(cookies);
                    console.log(cookies);
                    makeTable(cookies, "firstPartyCookieTable");
                    makeTable(cookies, "thirdPartyCookieTable");

                }
            }); 
        }); 
    }); 
}); 

function makeTable(cookies, id){

	var numCookies = cookies.length;
	var table = document.getElementById(id);
	console.log(id)

	var newRow = table.insertRow(0);
	newRow.setAttribute("id", "0");
	newRow.insertCell(0).innerHTML= "Name".bold();
    newRow.insertCell(1).innerHTML= "Domain".bold();
    newRow.insertCell(2).innerHTML= "Secure".bold();
    newRow.insertCell(3).innerHTML= "Delete".bold();


	for(i = 1; i <= numCookies; ++i){
		var newRow = table.insertRow(i);
		newRow.setAttribute("id", i);
		newRow.insertCell(0).innerHTML= cookies[i-1].name;
	    newRow.insertCell(1).innerHTML= cookies[i-1].domain;
	    newRow.insertCell(2).innerHTML= cookies[i-1].secure;
	    newRow.insertCell(3).innerHTML= '<button value="Delete" id="button-'+i+'"><img src="trash.png" width="20"></button>';
	    newRow.cells[3].addEventListener('click', function(event){

	    	console.log("FUCK YOU MIKE")
	    	console.log(event.path[1].id)
	    	var temp = event.path[1].id;
	    	var rowNum = temp.substr(temp.length-1)
	    	
		    table.deleteRow(rowNum);

		    for(e = 1; e <= table.rows.length; ++e) {
		    	table.rows[e].setAttribute("id", e);
		    	table.rows[e].cells[3].setAttribute("id", "button-"+i)

		    }





	    });

	}

}




function removeDuplicates(cookies) {
	var check = {};
	var returnArr = []
	var length = cookies.length;
	for(i = 0; i < length; ++i){
		if(cookies[i].value in check){
			continue;
		}
		else {
			check[cookies[i].value] = cookies[i];
		}
	}
	for(item in check) {
		returnArr.push(check[item])
	}
	return returnArr;
}