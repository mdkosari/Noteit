
'use strict';

//var for check listed items
var trash=false;

window.onload = function() {

	$("#versionNum").append("V"+chrome.runtime.getManifest().version);

  	init();


    $("#signout").click(function() {
      signout();
    });

    $("#refresh").click(function() {
      reaload();
    });

    //swich betwen temp and articles
    $("#recycle").click(function() {
    	if(trash)
    		updatelist();
    	else
      		updateTrash();
    });
};




function reaload(){
	$("#title").text('...reloading access token');
	$("#item-list li").remove();
	identity(true);
}


function init(){
	chrome.storage.local.get("sign", function(data) {
	  	if(data.sign!=null && data.sign['signin']!=null){
	  		$("#user-name").text(data.sign['name']);
		}
	});

	updatelist();
}



function updatelist(){
	$("#title").text('...loading Articles');
 	var val={};
 	var title='latest updated articles';
 	
    chrome.storage.local.get("sign", function(data) {
      if(data !=null && data.sign!=null){
        $.ajax({
          url:"https://noteit.pythonanywhere.com/note/api/articles/",
          type:"get",
          async:"true",
          headers: {  "Authorization": "Bearer "+data.sign['access_token']},
          data:val,
          success:function(data){
          	trash=false;
          	$("#title").text(title);
          	$("#img_header").attr("src",chrome.extension.getURL("img/icons/add_art_pop_enabled.png"));
          	$("#img_recycle").attr("src",chrome.extension.getURL("img/icons/recycle.png"));
          	$("#img_header").click(function(){showPopAddArticle()});
            if(data['length']>0){
              $("#item-list li").remove();//remove all list items
              var items=data['length'];//get result from json api
              for(var i=0;i<items&&i<5;i++){//track all item list from api and add this
                $("#item-list").append('<li><div><h4 id="'+data[i].id+'">'+data[i].name+'</h4></div></li>');
              }
            }
            $("#item-list").click(function(e){
                // $("#title").text(''+e.target.id);
            });


          },
          error:function(data){
            if(data.status){
              $("#item-list li").remove();//remove all list items
              $("#item-list").append('<li id=""><div><h4>please reaload access token</h4></div></li>');
            }
          }

        });
      }
    });
}


function updateTrash(){
	$("#title").text('...loading Trashs');
	var title="latest templates";
	var val={};
	val['temp']=1;
	chrome.storage.local.get("sign", function(data) {
      if(data !=null && data.sign!=null){
        $.ajax({
          url:"https://noteit.pythonanywhere.com/note/api/notes/",
          type:"get",
          async:"true",
          headers: {  "Authorization": "Bearer "+data.sign['access_token']},
          data:val,
          success:function(data){
          	trash=true;
          	$("#img_header").attr("src",chrome.extension.getURL("img/icons/recycle.png"));
          	$("#img_recycle").attr("src",chrome.extension.getURL("img/icons/article.png"));
          	$("#title").text(title);
            if(data['length']>0){
              $("#item-list li").remove();//remove all list items
              var items=data['length'];//get result from json api
              for(var i=0;i<items&&i<5;i++){//track all item list from api and add this
                $("#item-list").append('<li><div><h4 id="'+data[i].id+'">'+data[i].text.substring(0,45)+'...</h4></div></li>');
              }
            }
            $("#item-list").click(function(e){
                // $("#title").text(''+e.target.id);
            });


          },
          error:function(data){
            if(data.status){
              $("#item-list li").remove();//remove all list items
              $("#item-list").append('<li id=""><div><h4>please reaload access token</h4></div></li>');
            }
          }

        });
      }
    });
}


function showPopAddArticle(){
	$('.webui-popover').remove();
	if(trash)
		return;

	var id="";
	var content='<div id="addarticle'+id+'" style=" margin: auto;display: grid;padding-left: 15px;padding-right: 15px;padding-bottom: 15px;align-items: center;text-align: center;background: #fff;border-radius: 10px;"> <h3 style="cursor:default ;text-align: center;font-size: 24px;color: #777777;line-height: 1.2;width: 100%;display: block;padding-bottom: 1px;">Add article</h3>  <div class="input" style="position: relative;width: 100%;z-index: 1;margin-bottom: 10px;display: block;"> <input type="text" id="name'+id+'" placeholder="name" style=" line-height: 1.5;color: #666666;width: 90%;background: #e6e6e6;height: 40px;border-radius: 25px;padding: 0 30px 0 -10px;padding-left: 30px;outline: none;border: none;overflow: visible;font-size: 15px;"> <span class="focus-input"></span>  <span class="symbol-input"> <i class="fa"></i>  </div><div class="input" style=" position: relative;width: 100%;z-index: 1;margin-bottom: 10px;display: block;"> <input type="text" id="subject'+id+'" placeholder="subject" style="  line-height: 1.5;color: #666666;width: 90%;background: #e6e6e6;height: 40px;border-radius: 25px;padding: 0 30px 0 -10px;padding-left: 30px;outline: none;border: none;overflow: visible;font-size: 15px;"><span class="focus-input" > </span> <span class="symbol-input"> <i class="fa">  </i>  </span> </div>  <div class="button" style=" width: 100%;display: flex;flex-wrap: wrap;justify-content: center;padding-top: 5px;">	<button id="add-article'+id+'" style="background: #57b846;font-size: 15px;line-height: 1.5;color: #fff;text-transform: uppercase;width: 100%;height: 40px;border-radius: 25px;display: flex;justify-content: center;padding: 0 25px 0 25px;align-items: center;outline: none;border: none;overflow: visible;cursor:pointer" >add</button></div></div>'
	$('#img_header').webuiPopover({placement:'auto',content: content ,padding:false ,margin:false ,width:'300' ,height:'250' ,closeable:false, trigger: "click",animation:"pop",cache:false});
    $("#img_header").click(function(){
    	showPopAddArticleListener(id);
    });
   
}

function showPopAddArticleListener(id){
	 $("#add-article"+id).click(function(){
	    var name=$("#name"+id).val();
	    var subject=$("#subject"+id).val();
	    if(name!=null && name.length>2){
	      addArticle(name,subject,-1);
	      disablePopup("img_header");
	    }else{//set error if name not enter
	      $("#name"+id).attr("placeholder","very short name article");
	    }
	});
}


  function disablePopup(id){
    window.getSelection().empty();
    $('#'+id).webuiPopover("destroy");
  }