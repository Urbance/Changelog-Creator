window.onload = function setChangelogTextAreaDefaultText(){
  changelogTextArea = document.getElementById("changelogTextArea");
  changelogTextArea.value = "» Changelog\n- ";
};

function getAndCopyPluginChangelog(source) {
  switch (source) {
    case "discord":
      changelogText = prepareDiscordChangelog();
      if (changelogText == null || changelogText == "") return;
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
  var spigotChangelog = document.getElementById("spigotChangelog").value;
  var modrinthChangelog =  document.getElementById("modrinthChangelog").value;

  if (validateValues(version, spigotChangelog, modrinthChangelog) == false) return;
  if (updateType == false) return;

  title = `@everyone :loudspeaker:  **${version} ${updateType} for Kudos is now released!**`;
  footerOne = `:paperclip:  Changelog on SpigotMC: ${spigotChangelog}`;
  footerTwo = `:paperclip:  Changelog on Modrinth: ${modrinthChangelog}`;
  finalChangelog = `${title} \n\n ${footerOne} \n ${footerTwo}`;
  return finalChangelog;
}

function prepareOthersChangelog() {
  var changelogText = document.getElementById("changelogTextArea");
  return changelogText;
}

function copyTextClipboard(copyText) {
  if (copyText == null || copyText == "") {
    alert("Es wurde kein Text zum kopieren gefunden!");
    return;
  }
  navigator.clipboard.writeText(copyText);

  // Alert the copied text
  alert("Copied the text: " + copyText);
}

function getUpdateType() {
  var updateType = null;
  try {
    updateType = document.querySelector('input[name="updateType"]:checked').value;
  }
  catch {
    alert("Bitte gebe die Art des Updates an!");
    return false;
  }
  // TODO Fehlerbehandlung
  // try {
  //   updateType = document.querySelector('input[name="updateType"]:checked').value == null
  // }
  // catch {
  //   alert("Bitte wähle die Art des Updates!");
  //   return false;
  // }

  if (updateType == "Major" || updateType == "Minor") return updateType += " Update";
  if (updateType == "Patch") return updateType;
  if (updateType == "PRE") return updateType + "-" + document.getElementById("preVersionNumberField").value;
  return "UNDEFINED";
} 

function showAndHidePreVersionNumberField() {
  if (document.getElementById("updateTypePRE").checked == true) {
    element = document.getElementById("preVersionNumberField");
    element.style.visibility = "visible";
  }
}

function validateValues(version, spigotChangelog, modrinthChangelog) {
  if (version != null || version != "") {
    return true;
  }
  else {
    alert("Bitte gebe eine Version an!");
  }
  if (spigotChangelog != null || spigotChangelog != "") {
    return true;
  } else {
    alert("Bitte gebe den SpigotMC Changelog an!");
  }
  if (modrinthChangelog != null || modrinthChangelog != "") {
    return true;
  } else {
    alert("Bitte gebe den Modrinth Changelog an!");
  }
  return false;
}