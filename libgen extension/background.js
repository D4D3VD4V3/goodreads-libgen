function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
		console.log(request);
        $.ajax({
            url: request,
            success: function(data, status, xhr) {
                var match = /(\d+) books found/.exec(data)[1];
                console.log(match);

                if (match == 0)
                    sendResponse("unavailable");
                else {
                    var dllink = "http://booksdl.org/get.php?"
                    //var match = $(data).filter("tr");
                    var datastring = JSON.stringify(data);
                    //console.log(datastring);
                    var md5s = datastring.match(/md5=[a-f0-9]{32}/gm).filter(onlyUnique);
                    //var exts = Array.from(datastring.matchAll(/<td\snowrap>(epub|mobi|azw|azw3)<\/td>/gm));
                    var exts = [];
                    //var rx = new RegExp(/<td\snowrap>(epub|mobi|azw|azw3)<\/td>/gm);
					//filtering extensions here discards the order of hashes resulting in mismatch of hash with selected ext. 2 sols: regex every ext on libgen or proper scraping.
                    var rx = new RegExp(/<td\snowrap>(epub|mobi)<\/td>/gm);
                    while ((match = rx.exec(datastring)) != null) {
                        exts.push(match[1]);
                    }
                    console.log(md5s);
                    console.log(exts);
                    mobiIndex = exts.indexOf("mobi");
                    if (mobiIndex != -1) {
                        console.log([
                            [md5s[mobiIndex], "mobi"]
                        ]);
                        sendResponse([
                            [md5s[mobiIndex], "mobi"]
                        ]);
                    }
					else
                        sendResponse("customunavailable");
                }
            }
        });
        var req = new XMLHttpRequest();
        req.open("GET", request);
        req.onload = function() {
            if (req.readyState === 4 && req.status === 200) {

                var match = /(\d+) books found/.exec(req.responseText)[1];
                console.log(match);

                if (match == 0)
                    sendResponse("");
                else {
                    var match = /(\d+) books found/.exec(req.responseText)[1];
                    sendResponse(true);
                }
            }
        };
        req.send(null);
        return true;
    }
);