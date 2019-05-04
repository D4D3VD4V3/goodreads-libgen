title = $("#bookTitle").toArray()[0].innerText;
author = $("a.authorName > span").toArray()[0].innerText;
searchstring = "http://libgen.io/search.php?req=" + title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace("/\s+/g"," ").split(' ').join('+') + '+' + author.split(' ').join('+');

chrome.runtime.sendMessage(
    searchstring,
    function (response) {
		console.log(response);
		if (response!="")
			$(`<button style="color: white; padding: 10px;border-radius: 4px;text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);background: rgb(28, 184, 65);"><a href=${searchstring} style="color: white;" target="_blank">Get it on libgen.io</a></button>`).insertAfter(".wtrButtonContainer");
		else
			$(`<button style="color: white; padding: 10px;border-radius: 4px;text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);background: rgb(184, 28, 65);"><a href=${searchstring} style="color: white;" target="_blank">Not available on libgen.io</a></button>`).insertAfter(".wtrButtonContainer");
    }
);
