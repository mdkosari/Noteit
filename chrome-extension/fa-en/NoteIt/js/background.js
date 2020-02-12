  

chrome.storage.local.get('selectStatus', function (obj) {
  if(obj==null || obj.selectStatus == null){
    chrome.storage.local.set({'selectStatus': {"select": "pause", "tab": "dontChangeTab", "input": "dontSelectText", "highlight": "dontHighlightText"} }, function() {
      console.log("NoteIt Setup done.");
    });
  }
});

chrome.runtime.onMessage.addListener(function(request) {
  console.log(request);
  var selectStatus = request.status["select"];
  var tabStatus = request.status["tab"]
  var highlightStatus = request.status["highlight"]
  var text = request.text;
  var range = request.range;
  var id = request.id;
if(selectStatus == "optionOnly"){
    showOptionBox(text);
}else if(selectStatus == "clipboardOnly"){
  copyText(text);
}

if (highlightStatus == "highlightText") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: highlightStatus});
    });
}
});




function copyText(text) {
  var input = document.createElement('textarea');
  document.body.appendChild(input);
  input.value = text;
  input.focus();
  input.select();
  document.execCommand('Copy');
  input.remove();
}

function showOptionBox(text) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "showOptionBox"}, function(response) {
      // Do something here?
    });
  });
}



//set context menu
var context = ["selection","image"];
   var lastItem = {
    "id": "saveToLast",
    "title": "Save to last updated article",
    "contexts": context
};

var otherItem = {
    "id": "saveToOther",
    "title": "Save to other",
    "contexts": context
};


chrome.contextMenus.create(lastItem);
chrome.contextMenus.create(otherItem);


chrome.contextMenus.onClicked.addListener(onClickHandler);

function onClickHandler(id,info,tab){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "contextClick","info":id,"tab":tab,"id":id}, {frameId: 0});
  });
}

 