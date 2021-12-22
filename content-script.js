let exportButton = document.createElement("button");
exportButton.style.cssText = 'float: right; line-height: initial;';
exportButton.innerHTML = 'Export';
exportButton.onclick = function() {
  let rankedTeams = document.getElementsByClassName('ranked-team standard-box')
  exportPlayerInfo(rankedTeams);
}

let titleDiv = document.getElementsByClassName('regional-ranking-header')[0] ?? new Element();
let titleText = titleDiv.innerText;
titleDiv.appendChild(exportButton);

function exportPlayerInfo(rankedTeams) {
  let players = [];

  for (let rankedTeam of rankedTeams) {
    let teamId = 0;
    let teamUrl = "";
    let teamName = "";
    let teamPoints = 0;
    let teamPosition = 0;

    teamPosition = parseInt(
      rankedTeam.getElementsByClassName('position')[0]
        .innerText
        .replace('#', ''),
      10
    );

    let teamLine = rankedTeam.getElementsByClassName('teamLine')[0];
    teamName = teamLine.getElementsByClassName('name')[0].innerText;
    teamPoints = parseInt(
      teamLine.getElementsByClassName('points')[0]
        .innerText
        .replace('(', '')
        .replace(')', '')
        .replace('points', '')
        .trim(),
      10
    );
    teamUrl = rankedTeam.getElementsByClassName('moreLink')[0].href;
    teamId = parseInt(teamUrl.substring(teamUrl.indexOf('team/') + ('team/'.length)).split("/")[0], 10);

    let playerContainer = rankedTeam.getElementsByClassName('lineup')[0];
    let teamPlayers = playerContainer.getElementsByClassName('player-holder');
    for (let teamPlayer of teamPlayers) {
      let playerId = 0;
      let playerUrl = "";
      let playerName = "";

      playerUrl = teamPlayer.getElementsByTagName('a')[0].href;
      playerId = parseInt(playerUrl.substring(playerUrl.indexOf('player/') + ('player/'.length)).split("/")[0], 10);
      playerName = teamPlayer.getElementsByClassName('nick')[0].innerText;

      players.push({
        'id': playerId,
        'alias': playerName,
        'url': playerUrl,
        'team_id': teamId,
        'team_name': teamName,
        'team_url': teamUrl,
        'team_position': teamPosition,
        'team_points': teamPoints,
      });
    }
  }

  chrome.runtime.sendMessage({
      'title': titleText,
      'players': players,
    },
    function(response) {}
  );
}
