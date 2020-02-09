
'use strict';
  window.onload = function() {
    $("#g-login").click(function() {
      identity(false);
    });
  };



function identity(reload){
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    var sign={};
    let init = {
      method: 'GET',
      async: true,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      'contentType': 'json'
    };
    fetch('https://www.googleapis.com/oauth2/v3/userinfo',init)
    .then((response) => response.json())
    .then(function(data){
      
      if(data['name']){
        sign["signin"]= 'true';
        sign['name']=data['name'];
      }
      // chrom.identity.removeCacheAuthToken({token: ytoken},function(){
      //   console.log();
      // });
    });

    $.ajax({
      url:"http://noteit.pythonanywhere.com/auth/convert-token",
      type:"post",
      // headers: {  'Access-Control-Allow-Origin': '*' },
      async : "false",
      data:{
          "backend" : "google-oauth2",
          "token" : token,
          "grant_type" : "convert_token",
          "client_id" : "opEDYzpmSBFrxoKFMXPKmYWg5F1e2tbJUmATUFEP",
          "client_secret" : "7hbVtUaw5xyOM8vOoe8urQCSxTHocNvWXmizsWmPp2rpofzPRa0GAEXzKCRxAKC8oWdaH4e9CTelWg6nPTZxsMlNcXMifzzmrG6hj55RX4YSThJU02agzgNuF8PYxKkg"
      },
      success:function(data){
              sign['access_token']=data['access_token'];
              setSignin(sign);
              chrome.storage.local.set({ 'selectStatus': {"select": "optionOnly", "tab": "dontChangeTab", "input": "dontSelectText", "highlight": "dontHighlightText"} }, function() {
              });
              chrome.browserAction.setPopup({popup: "dashbord.html"});
              if(!reload)
                window.close();
              else{
                updatelist();
              }
      },
      error:function(data){
        sign['access_token']='false';
        setSignin(sign);
      }
    });

  });
}

function signout(){
  var sign={};
  chrome.identity.getAuthToken({interactive: true}, function(token) {
      chrome.identity.removeCachedAuthToken({token: token}, function (){
        sign["signin"]= 'false';
        sign['name']=null;
        sign['access_token']='false';
        setSignin(sign);
      });
  });
}

