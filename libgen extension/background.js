chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
		
		var req = new XMLHttpRequest(); 
		req.open("GET", request);
		req.onload = function() { 
		if (req.readyState === 4 && req.status === 200) {
		
			var match = /(\d+) books found/.exec(req.responseText)[1];
			console.log(match);
			
			if (match == 0)
				sendResponse(false);
			else
				sendResponse(true);
		}
		};
		req.send(null);
        return true;
    }
);