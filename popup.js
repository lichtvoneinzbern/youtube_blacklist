document.getElementById('save').addEventListener('click', () => {
	const textarea = document.getElementById('blacklist');
	const blacklist = textarea.value.split('\n').map(line => line.trim()).filter(line => line.length > 0);

	chrome.storage.sync.set({ blacklist: blacklist }, () => {
    alert('Saved Black List.');
	});
});

chrome.storage.sync.get('blacklist', (data) => {
	if (data.blacklist) {
    document.getElementById('blacklist').value = data.blacklist.join('\n');
	}
});
