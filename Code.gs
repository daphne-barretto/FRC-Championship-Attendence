var sheet = SpreadsheetApp.openById("1rDMYEUsMrNdyAQHNjUnhifsoRRlPFyH3EKE0M31ctm4").getSheetByName("CMPs Attendance");

function run(){
 
  var nextEmptyRow = sheet.getRange('G2:G').getValues().filter(String).length + 2;
  var numTeamsListed = sheet.getRange('A2:A').getValues().filter(String).length;
  
  for(var i = nextEmptyRow; i <= numTeamsListed + 1; i++){
    var currentTeamNum = sheet.getRange('A' + i).getValue();

    sheet.getRange('G' + i + ':AG' + i).setValues([getCMPsAttendance(currentTeamNum)]);
  }
    
}

function getCMPsAttendance(teamNumber) {
  
  var url = "https://www.thebluealliance.com/api/v3/team/frc" + teamNumber + "/events/keys";
  var options = {
    "method": "GET",
    "headers": {
      "X-TBA-Auth-Key": "ElyWdtB6HR7EiwdDXFmX2PDXQans0OMq83cdBcOhwri2TTXdMeYflYARvlbDxYe6"
    },
    "payload": {
    }
  };
  
  var eventsList = JSON.parse(UrlFetchApp.fetch(url, options));
  var arrayOfCMPsAttendance = [];
  
  Logger.log(eventsList);
  
  for(var i = 1992; i < 2019; i++){
  
    var attendance = 0;
    
    // There are still issues of pre 2001 champs with teams winning awards without being in attendance
    if(!(eventsList.indexOf(i + "cmp") == -1) && i <= 2000) // Must be in a CMP division (post 2000) to be counted
      attendance++;
    else if(!(eventsList.indexOf(i + "carv") == -1))
      attendance++;
    else if(!(eventsList.indexOf(i + "gal") == -1))
      attendance++;
    else if(!(eventsList.indexOf(i + "hop") == -1))
      attendance++;
    else if(!(eventsList.indexOf(i + "new") == -1))
      attendance++;
    else if(!(eventsList.indexOf(i + "roe") == -1))
      attendance++;
    else if(!(eventsList.indexOf(i + "tur") == -1))
      attendance++;
    else if(!(eventsList.indexOf(i + "arc") == -1))
      attendance++;
    else if(!(eventsList.indexOf(i + "cars") == -1))
      attendance++;
    else if(!(eventsList.indexOf(i + "cur") == -1))
      attendance++;
    else if(!(eventsList.indexOf(i + "dal") == -1))
      attendance++;
    else if(!(eventsList.indexOf(i + "dar") == -1))
      attendance++;
    else if(!(eventsList.indexOf(i + "tes") == -1))
      attendance++;
    else if(!(eventsList.indexOf(i + "ein") == -1))
      attendance++;
    
    arrayOfCMPsAttendance.push(attendance);
  }
    
  return arrayOfCMPsAttendance;

}

function listTeams(){
 
  var listOfTeams = [];
  
  for(var i = 0; i < 15; i++){
    var url = "https://www.thebluealliance.com/api/v3/teams/" + i;
    var options = {
      "method": "GET",
      "headers": {
        "X-TBA-Auth-Key": "ElyWdtB6HR7EiwdDXFmX2PDXQans0OMq83cdBcOhwri2TTXdMeYflYARvlbDxYe6"
      },
      "payload": {
      }
    };
    var response = JSON.parse(UrlFetchApp.fetch(url, options));
    
    for(var j = 0; j < response.length; j++){
      listOfTeams.push([response[j].team_number]);
    }
    
  }
    
  sheet.getRange('A2:A' + listOfTeams.length).setValues(listOfTeams);
  
}

function listSeasons(){
  
  var listOfNumSeasons = [];
  
  var nextEmptyRow = sheet.getRange('B2:B').getValues().filter(String).length + 2;
  var numTeamsListed = sheet.getRange('A2:A').getValues().filter(String).length;

  
  for(var i = nextEmptyRow; i <= numTeamsListed + 1; i++){
    var currentTeamNum = sheet.getRange('A' + i).getValue();
    
    var url = "https://www.thebluealliance.com/api/v3/team/frc" + currentTeamNum + "/years_participated";
    var options = {
      "method": "GET",
      "headers": {
        "X-TBA-Auth-Key": "ElyWdtB6HR7EiwdDXFmX2PDXQans0OMq83cdBcOhwri2TTXdMeYflYARvlbDxYe6"
      },
      "payload": {
      }
    };
    var currentNumSeasons = JSON.parse(UrlFetchApp.fetch(url, options)).length;
    var seasonsOfCurrentTeam = JSON.parse(UrlFetchApp.fetch(url, options));
    //Check if 2018 is in seasonsOfCurrentTeam
    //If 2018 not included, mark it somehow (add column for if current team?)
    
    Logger.log(currentNumSeasons);
    
    sheet.getRange('B' + i).setValue(currentNumSeasons);
  }
  
  sheet.getRange('B2:B' + listOfNumSeasons.length).setValues(listOfNumSeasons);
  
}