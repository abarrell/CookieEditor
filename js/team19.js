$(document).ready(function(){

	getCurrentTabUrl(showURL);

});

var showURL=function(url){
	var parser = document.createElement('a');
	parser.href = url;
	getCookies(parser.hostname);
};

function getCookies(filter){
	chrome.cookies.getAll({'domain':filter},function(cookies) {
		console.log(cookies);
	});
}