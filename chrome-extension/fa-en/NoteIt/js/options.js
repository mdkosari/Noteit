chrome.storage.local.get('selectStatus', function (obj) {
  var selectStatus = obj.selectStatus["select"];
  var tabStatus = obj.selectStatus["tab"];
  var inputBoxStatus = obj.selectStatus["input"];
  var highlightStatus = obj.selectStatus["highlight"];

  $("#"+selectStatus).prop( "checked", true );
  $("#"+tabStatus).prop( "checked", true );
  $("#"+inputBoxStatus).prop( "checked", true );
  $("#"+highlightStatus).prop( "checked", true );
});

$(document).ready(function(){
  // Version number for the footer
  $("#versionNum").append("v"+chrome.runtime.getManifest().version);

  // Trigger action on option select settings change
  $("#generalOptionSave").click(function() {
    generalOptionChanges();
  });
});

function addAlert() {
  // alert("change setting")
}

// Update select status to local storage API
function generalOptionChanges() {
  var selectStatus = $("input[name='generalOptionVal']:checked").val();
  var tabStatus = $("input[name='addOptionVal']:checked").val();
  var inputStatus = $("input[name='inputBoxSelect']:checked").val();
  var highlightStatus = $("input[name='highlightVal']:checked").val();
  console.log(selectStatus);

  chrome.storage.local.set({'selectStatus': {"select": selectStatus, "tab": tabStatus, "input": inputStatus, "highlight": highlightStatus}}, function() {
    addAlert();
  });
}
