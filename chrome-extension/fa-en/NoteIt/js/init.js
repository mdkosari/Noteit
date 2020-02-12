function swichPopup(){
	chrome.storage.local.get("sign", function(data) {
		
	  	if(data.sign!=null && data.sign['signin']!=null){
		    chrome.browserAction.setPopup({popup: "dashbord.html"});
		    if($("#NoteIt").length)
		    	window.close();
			chrome.storage.sync.set({ 'selectStatus': {"select": "optionOnly", "tab": "dontChangeTab", "input": "dontSelectText", "highlight": "dontHighlightText"} }, function() {
			});
		}
	});
}

function setSignin(sign){
	chrome.storage.local.set({'sign':sign});
}

function intial(){

	//set defualt enable show option
	// chrome.storage.sync.set({ 'selectStatus': {"select": "optionOnly", "tab": "dontChangeTab", "input": "dontSelectText", "highlight": "dontHighlightText"} }, function() {
    // });
    // setSignin({"signin": 'false','name':'NoteIt','access_token':'false' languege:'en'});
    // identity();
    swichPopup();
}

$(document).ready(intial());

