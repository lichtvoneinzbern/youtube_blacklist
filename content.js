function hideBlacklistedVideos(blacklist) {
  const videos = document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer');
  videos.forEach(video => {
    const channelNameElement = video.querySelector('#channel-name yt-formatted-string a');
    if (channelNameElement) {
      const channelName = channelNameElement.href.split('/').pop();
      if (blacklist.includes(channelName)) {
        video.style.display = 'none';
      }
    }
  });
}

function requestBlacklistAndHideVideos() {
  chrome.storage.sync.get('blacklist', (data) => {
    if (chrome.runtime.lastError) {
      console.error("Failed to get blacklist:", chrome.runtime.lastError);
      setTimeout(requestBlacklistAndHideVideos, 1000);
    } else {
      const blacklist = data.blacklist || [];
      hideBlacklistedVideos(blacklist);
    }
  });
}

requestBlacklistAndHideVideos();

const observer = new MutationObserver(() => {
  requestBlacklistAndHideVideos();
});

observer.observe(document.body, { childList: true, subtree: true });
