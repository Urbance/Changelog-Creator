window.onload = function setChangelogTextAreaDefaultText(){
  changelogTextArea = document.getElementById("changelogTextArea");
  changelogTextArea.value = "» Changelog\n*~* ";
};

function getAndCopyPluginChangelog(source) {
  switch (source) {
    case "discord":
      changelogText = prepareDiscordChangelog();
      break;
    case "others":
      changelogText = prepareOthersChangelog();
     break;
    default:
      alert("Es ist ein Fehler aufgetreten. Es wurde keine Quelle gefunden!");
  }

  copyTextClipboard(changelogText);
}

function prepareDiscordChangelog() {
  var updateType = getUpdateType();
  var version = document.getElementById("pluginVersion").value;
  changelogText = "Version: " + version + " Type: " + updateType;
  alert(changelogText);
  return changelogText;
}

function prepareOthersChangelog() {
  var changelogText = document.getElementById("changelogTextArea");
  return changelogText;
}


function copyTextClipboard(copyText) {
  if (copyText.value == null || copyText.value == "") {
    alert("Es wurde kein Text zum kopieren gefunden!");
    return;
  }

  // Select the text
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
  return copyText;
}


function getUpdateType() {
  var updateType = document.getElementsByName("updateType").value;
  if (updateType == "Major" || updateType == "Minor") return updateType += " Update";
  if (updateType == "Patch") return updateType;
  if (updateType == "PRE") return updateType + "-" + document.getElementById("preVersionNumberField").value;
  return "UNDEFINED";
} 

function foo() {
  if (document.getElementById("updateTypePRE").checked == true) {
    element = document.getElementById("preVersionNumberField");
    element.style.visibility = "";
  }
}

/*
  PLACEHOLDERS FOR GITHUB, SPIGOTMC AND MODRINTH
  '*~*' == - 
*/