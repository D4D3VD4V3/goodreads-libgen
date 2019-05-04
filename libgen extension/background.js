chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
		
		$.ajax({url: request, success: function (data, status, xhr) {
			var match = /(\d+) books found/.exec(data)[1];
			console.log(match);
			
			if (match == 0)
				sendResponse("");
			else
			{
				var dllink = "http://booksdl.org/get.php?"
				//var match = $(data).filter("tr");
				var datastring = JSON.stringify(data);
				//console.log(datastring);
				var md5s = datastring.match(/md5=[a-f0-9]{32}/gm);
				//var exts = Array.from(datastring.matchAll(/<td\snowrap>(epub|mobi|azw|azw3)<\/td>/gm));
				var exts = [];
				var rx = new RegExp(/<td\snowrap>(epub|mobi|azw|azw3)<\/td>/gm);
				while((match = rx.exec(datastring)) != null) {
						exts.push(match[1]);
				}
				console.log(exts);
				//console.log("matching");
				//console.log(Object.entries(match));
				sendResponse(true);
			}
	}});
		var req = new XMLHttpRequest(); 
		req.open("GET", request);
		req.onload = function() { 
		if (req.readyState === 4 && req.status === 200) {
		
			var match = /(\d+) books found/.exec(req.responseText)[1];
			console.log(match);
			
			if (match == 0)
				sendResponse("");
			else
			{
				var match = /(\d+) books found/.exec(req.responseText)[1];
				sendResponse(true);
			}
		}
		};
		req.send(null);
        return true;
    }
);
