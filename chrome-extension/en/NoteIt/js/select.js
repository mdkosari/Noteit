


if(!window.NoteIt){
  NoteIt = {};
}

NoteIt.Selector = {};



NoteIt.Selector.getSelected = function(){
  // Grab Selection
  var selection = window.getSelection();
  //creat null structur
  var structer='<p>null</p>';

  //check not selected null
  if(selection.rangeCount>0) {
    var range=selection.getRangeAt(0);
    //get structur selected page
    structer=range['commonAncestorContainer'];
  }else
    return['',-1,null,null];

  // get text selection
  var text = selection.toString();

  //get info start element selection
  var befor=range['startContainer']['wholeText'];//get all text first element  selected
  var beforl=range['startOffset'];//get lenght text unselected

  //get info end text selection
  var last=range['endContainer']['data'];//get all text last element selected endOffset
  var lastl=range['endOffset'];//get lenght text selected
  if(last!=null && last!='' && last!=""){//check not null last style
    last=last.trim();
  }
  else{
    last="";
  }

  //short last text to can search support
  last=last.substring(0,20);


  //find text or html tag convert selected
  if(structer.innerHTML != undefined)
    structer=structer.innerHTML.trim();
  else if(structer.textContent != undefined)
    structer=structer.textContent.trim();


  //remove last text not selected
  if(lastl!=0){
    last=last.replace('/','');
    last=last.replace('.','');
    last=last.replace(')','');
    last=last.replace('(','');
    var inend=structer.search(last);
    remove=structer.substring(inend+lastl);
    structer=structer.replace(remove,'');
  }

  //remove befor text not selected
  if(befor!=undefined&&beforl!=0){
    befor=befor.replace('/','');
    befor=befor.replace('.','');
    befor=befor.replace(')','');
    befor=befor.replace('(','');
    var instart=structer.search(befor);
    var tag=structer.search(">");
    var start=0;
    if(tag<10)
      start=tag+1;
    var remove=structer.substring(start,instart+beforl);
    structer=structer.replace(remove,'');
  }


  //creat uniq id
  var id = Math.random().toString(36).substring(7); // Creating random unique id
  return [text, id, selection,structer];
}

NoteIt.Selector.mouseup = function(e){

  //save data retern selected method
  var sel = NoteIt.Selector.getSelected();
  var text = sel[0];
  var id = sel[1];
  var selection = sel[2];
  var style = sel[3];


  // Check is not empty and not filled with whitespaces only
  if(text !='' && text.length > 1 && $.trim(text).length != 0){

    // Get current user defined status set in the storage
    chrome.storage.local.get('selectStatus', function (obj) {
      // Return false if the status is to not select text from input/text boxes.
      if (obj.selectStatus["input"] == "dontSelectText") {
        if ($(e.target).is('input') || $(e.target).is('textarea')) {
          return 0;
        }
      }

      // Then send the status and text to background
      chrome.runtime.sendMessage({
        status: obj.selectStatus,
        text: text,
        id: id
      });

      // Listen for calls from background. Specifically for option box
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          if(request.type == "showOptionBox") {
            // Check if in range and then add node for popover
            if (selection && selection.rangeCount > 0){ // Add new node only if something is actually selected
              var range =  selection.getRangeAt(0);
              // console.log(range);
              var newNode = document.createElement("a");
              newNode.setAttribute('id', id);
              //Insert node for the pop up
              range.insertNode(newNode);
              // Create unique content for each popover
              var content = '<img id="save'+id+'" src="'+chrome.extension.getURL('img/save.png')+'" style="width:30px;height:30px;margin:0px;padding:0px;"/>';
              $('#'+id).webuiPopover({placement:'auto',content: content ,padding:false ,margin:false ,width:'30' ,height:'50' ,closeable:false, trigger: "click"});
            }

            // Fire up the popover
            $("#"+id).click();
            // Trigger copy action
            $("#save"+id).click(function() {
              chrome.runtime.sendMessage({
                status: {"select": "searchOnly", "tab": obj.selectStatus["tab"]},
                text: text
              });
              disablePopup(id);
              getArticles(range,id,selection,style,text);
              
            });
          } else if (request.type == "highlightText") {
            //set mark selection
            // $("body").unmark();
            var options = {
              "element": "mark",
              "className": "",
              "exclude": [],
              "separateWordSearch": false,
              "accuracy": "partially",
              "diacritics": true,
              "synonyms": {},
              "iframes": false,
              "acrossElements": false,
              "caseSensitive": false,
              "ignoreJoiners": false,
              "debug": false,
              "log": window.console
            };
            $("<style>.mark,mark{color: rgba(13,27,62,0.7);padding:.1em}</style>").appendTo("head");
            $("body").mark(text, options);
          }
        });

      });
    }
  }

  //  Things to do with a document ready function
  $(document).ready(function(){
    
    // Run the text selector on mouseup
    $(document).on("mouseup", NoteIt.Selector.mouseup);
  });


  function disablePopup(id){
    window.getSelection().empty();
    $('#'+id).webuiPopover("destroy");
  }


  function getArticles(range,id,selection,style,text){
    // selection.addRange(range);
    var add='<div id="addarticle'+id+'" style=" margin: auto;display: grid;padding-left: 15px;padding-right: 15px;padding-bottom: 15px;align-items: center;text-align: center;background: #fff;border-radius: 10px;"> <h3 style="text-align: center;font-size: 24px;color: #777777;line-height: 1.2;width: 100%;display: block;padding-bottom: 20px;">Add article</h3>  <div class="input" style="position: relative;width: 100%;z-index: 1;margin-bottom: 10px;display: block;"> <input type="text" id="name'+id+'" placeholder="name" style=" line-height: 1.5;color: #666666;width: 90%;background: #e6e6e6;height: 45px;border-radius: 25px;padding: 0 30px 0 -10px;padding-left: 30px;outline: none;border: none;overflow: visible;font-size: 15px;"> <span class="focus-input"></span>  <span class="symbol-input"> <i class="fa"></i>  </div><div class="input" style=" position: relative;width: 100%;z-index: 1;margin-bottom: 10px;display: block;"> <input type="text" id="subject'+id+'" placeholder="subject" style="  line-height: 1.5;color: #666666;width: 90%;background: #e6e6e6;height: 45px;border-radius: 25px;padding: 0 30px 0 -10px;padding-left: 30px;outline: none;border: none;overflow: visible;font-size: 15px;"><span class="focus-input" > </span> <span class="symbol-input"> <i class="fa">  </i>  </span> </div>  <div class="button" id="add-article'+id+'" style=" width: 100%;display: flex;flex-wrap: wrap;justify-content: center;padding-top: 20px;"><button style="background: #57b846;font-size: 15px;line-height: 1.5;color: #fff;text-transform: uppercase;width: 100%;height: 45px;border-radius: 25px;display: flex;justify-content: center;padding: 0 25px 0 25px;align-items: center;outline: none;border: none;overflow: visible;cursor:pointer" >add</button></div></div>'
    var content = '<div id="show_add'+id+'"><img id="#showadd'+id+'" style="margin-left:130px" src="'+chrome.extension.getURL('img/icons/add_art_pop_disabled.png')+'"/></div><div id="body'+id+'"><div id="article'+id+'" width="300px" height="300px" class="articles" style="background:#f3f3f3;padding:5px" id="login"><ul id="items'+id+'" width="300px" height="200px" style="counter-reset: li;list-style: none;font-size: 15px;padding: 0;">';
    content=content+'<li>checking data...</li></ul></div></div>';
    var newNode = document.createElement("a");
    newNode.setAttribute('id', id);
    range.insertNode(newNode);
    $('#'+id).webuiPopover({placement:'auto',content: content ,padding:false ,margin:false ,width:'300' ,height:'300' ,closeable:false, trigger: "click",animation:"pop",cache:false});
    $("#"+id).click();

    updateArticle(id,add,style,text);
  }

  function updateArticle(id,add,style,text){
    chrome.storage.local.get("sign", function(data) {
      if(data !=null && data.sign!=null){
        $.ajax({
          url:"https://noteit.pythonanywhere.com/note/api/articles/",
          type:"get",
          async:"true",
          headers: {  "Authorization": "Bearer "+data.sign['access_token']},
          data:{
          },
          success:function(data){

            //set enable img in img add
            $("#show_add"+id+" img").attr("src",chrome.extension.getURL("img/icons/add_art_pop_enabled.png"));
            //img buton show and hide add article form
            $("img").click(function(){
              //set hide or show add article window
              if($("#addarticle"+id).length){
                $("#addarticle"+id).remove();
                $("#show_add"+id+" img").attr("src",chrome.extension.getURL("img/icons/add_art_pop_enabled.png"));

              }
              else{
                $(add).insertBefore("#body"+id);
                $("#show_add"+id+" img").attr("src",chrome.extension.getURL("img/icons/close.png"));

              }


              //set add article listener for creat article
              $("#add-article"+id+" button").click(function(){

                var name=$("#name"+id).val();
                var subject=$("#subject"+id).val();
                if(name!=null && name.length>2){
                  addArticle(name,subject,id);
                }else{//set erro if name not enter
                  $("#name"+id).attr("placeholder","very short name article");
                }
              });
            });

            if(data['length']>0){

              $("#items"+id+" li").remove();//remove all list items
              var items=data['length'];//get result from json api
              for(i=0;i<items;i++){//track all item list from api and add this
                $("#items"+id).append('<li style="cursor: pointer;position: relative;display: block;padding: .4em .4em .4em 2em;*padding: .4em;margin: .5em 0;background: #93C775;color: #000;text-decoration: none;-moz-border-radius: .3em;-webkit-border-radius: .3em;transition: all .2s ease-in-out;" id="'+data[i].id+'">'+data[i].name+'</li>');
              }
            }else{
              $("#items"+id+" li").remove();//remove all list items
              $("#items"+id).append('<li style="cursor: pointer;position: relative;display: block;padding: .4em .4em .4em 2em;*padding: .4em;margin: .5em 0;background: #93C775;color: #000;text-decoration: none;-moz-border-radius: .3em;-webkit-border-radius: .3em;transition: all .2s ease-in-out;" id="nothing">nothing article for show you</li>');
            }

            $("#items"+id).click(function(e){
                console.log();
                saveNote(id,e.target.id,style,text);
            });


          },
          error:function(data){
            if(data.status){
              $("#items"+id+" li").remove();//remove all list items
              $("#items"+id).append('<li style="cursor: pointer;position: relative;display: block;padding: .4em .4em .4em 2em;*padding: .4em;margin: .5em 0;background: #93C775;color: #000;text-decoration: none;-moz-border-radius: .3em;-webkit-border-radius: .3em;transition: all .2s ease-in-out;" id="nothing">please refresh token in dashboard icon</li>');
            }
          }

        });
      }else {
        $("#items"+id+" li").remove();//remove all list items
        $("#items"+id).append('<li style="cursor: pointer;position: relative;display: block;padding: .4em .4em .4em 2em;*padding: .4em;margin: .5em 0;background: #93C775;color: #000;text-decoration: none;-moz-border-radius: .3em;-webkit-border-radius: .3em;transition: all .2s ease-in-out;" id="nothing">please login first</li>');
      }
    });

    $("#add"+id).click(function(){
      console.log("click add");
    });
  }


function addArticle(name,subject,id){
  chrome.storage.local.get("sign", function(data) {
      $.ajax({
        url:"https://noteit.pythonanywhere.com/note/api/articles/create/",
        type:"post",
        async:"false",
        headers: {  "Authorization": "Bearer "+data.sign['access_token']},
        data:{
          'name':name,
          'subject':subject 
        },
        success:function(data){
          if(data.code==0){
            if(id!=-1){
              updateArticle(id);
              $("#addarticle"+id).remove();
            }else{
              updatelist();
            }
          }
        },
        error:function(data){
          console.log(data);
        }
    });
  });
}

function saveNote(id,idArt,style,text){
  var val={};
  if(idArt!=-1)
    val.article_id=idArt;

  if(style=="img"){
    val.url=text;
  }else{
    if(style=='txt')
      style=text;
    else 
      val.style=style;

    val.text=text;
  }
  chrome.storage.local.get("sign",function(data){
    if(data.sign!=null && data.sign['signin']!=null){

      $.ajax({
        url:"https://noteit.pythonanywhere.com/note/api/notes/create/",
        type:"post",
        async:"false",
        headers: {  "Authorization": "Bearer "+data.sign['access_token']},
        data:val,
        success:function(data){
          if(data.code==0){
            disablePopup(id);
          }
          console.log(data);
        },
        error:function(data){
          if(data.status=401)
            alert("NoteIt : Authorization\n"+"please reload token from dashboard");
          else
            alert("NoteIt : Authorization\n"+"please check conection");
        }
      });
    }else{
      alert("NoteIt : Authorization\n"+"please ;login first");
    }
  });
}

function saveImg(idArt,src){
  alert("save img = "+src);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.type=='contextClick'){
      if(request.id['menuItemId']=="saveToLast"){
          if(request.info.selectionText){
            addNoteToLastUpdateArticle(request.info,request.tab,false);
          }else if(request.info.srcUrl){
            addNoteToLastUpdateArticle(request.info,request.tab,true);
          }
      }else if(request.id['menuItemId']=="saveToOther"){
         if(request.info.selectionText)
          addNoteToOther(request.info,request.tab,false);
        else if(request.info.srcUrl){
          addNoteToOther(request.info,request.tab,true);
        }
      }
    }
});

function addNoteToLastUpdateArticle(info,tab,img){
    chrome.storage.local.get("sign", function(data) {
      if(data !=null && data.sign!=null){
        $.ajax({
          url:"https://noteit.pythonanywhere.com/note/api/articles/",
          type:"get",
          async:"true",
          headers: {  "Authorization": "Bearer "+data.sign['access_token']},
          data:{
          },
          success:function(data){
            if(data['length']>0){
              var idArt=data[0].id;
              console.log(idArt);
              if(!img){
                saveNote(0,idArt,"txt",info.selectionText);
              }else{
                  saveNote(0,idArt,"img",info.srcUrl);
              }
            }else{
                alert("NoteIt : not found article\n"+"please add article from dashboard or popup option");
            }

          },
          error:function(data){
              alert("NoteIt : Authorization\n"+"please reload token from dashboard or login");
          }
        });
      }
    });
}

function addNoteToOther(info,tab,img){
  if(!img){
    saveNote(0,-1,"txt",info.selectionText);
  }else{
      saveNote(0,-1,"img",info.srcUrl);
  }
}



function updateToken(id,reload){
  chrome.runtime.sendMessage({
    status: {"select": "updateToken", "tab": "refresh"},
    text: "user"
  });
}
