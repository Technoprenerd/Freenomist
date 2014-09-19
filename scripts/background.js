// config
var bkg = chrome.extension.getBackgroundPage();
var ID;
var eco_domain = "http://www.economist.com";
var eco_name 	= "ec_limit";
// if cookie exists
//Check if Economist cookie ec_limit is set
function getCookie(domain, name) 
	{
        chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        	if (cookie) {
	            ID = cookie.value; // should be = notallow
	            //bkg.console.log(domain, name, ID);
	            delCookie(domain, name);
	        } /*
	        else {
	        	bkg.console.log("No cookie");
	        } */
        });
}

// Then delete cookie. Check every time economist.com is viewed

function delCookie(domain, name)
	{
		if (eco_domain == domain && name == eco_name) {
			//bkg.console.log("Deleting cookie...");
			chrome.cookies.remove({"url": domain, "name": name});
		} /* else { 
			bkg.console.log("No cookie to delete...")
		} */
}

function listener() {
  //bkg.console.log("Listening");
  getCookie(eco_domain, eco_name);
}

function startListening() {
  chrome.cookies.onChanged.addListener(listener);
}

startListening();

// Magic :p 