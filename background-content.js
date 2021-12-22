chrome.storage.local.get(['title', 'players'], function(result) {
  updatePage(result.title, result.players);
});

function updatePage(title, players) {
  document.getElementById('page_title').innerText = title;

  let keys = ['id', 'alias', 'url', 'team_id', 'team_name', 'team_url', 'team_position', 'team_points',];
  let csvStr = keys.join(',') + "\n";
  for (let player of players) {
    let values = [];
    for (let key of keys) {
      values.push(JSON.stringify(player[key]))
    }
    csvStr += (values.join(',') + "\n");
  }

  document.getElementById('players_data').innerText = csvStr
}