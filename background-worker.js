chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  chrome.storage.local.set({
    title: request.title,
    players: request.players
  });

  // send ok before switching tabs (prevents: 'The message port closed before a response was received')
  sendResponse(true);

  await chrome.tabs.create({
    'url': chrome.runtime.getURL("background.html")
  });
});
