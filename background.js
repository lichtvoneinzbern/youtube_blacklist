chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ blacklist: [] }, () => {
    console.log("Init Black List");
	});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "getBlacklist") {
    chrome.storage.sync.get("blacklist", (data) => {
		sendResponse(data.blacklist);
    });
    return true;
	} else if (request.action === "updateBlacklist") {
    chrome.storage.sync.set({ blacklist: request.blacklist }, () => {
		sendResponse({ status: "updated" });
    });
    return true;
	}
});
