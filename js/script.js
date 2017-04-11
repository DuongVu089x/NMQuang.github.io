 (function() {
 	// TODO add service worker code here
	if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./../sw.js').then(function (registration) {
            // Registration was successful 
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
           
        }).catch(function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    } else {
        callback('Service workers aren\'t supported in this browser.', null);
    }

    window.addEventListener('online',function() {
       
        console.log("You are  online");
    },false);

    window.addEventListener('offline',function() {
        alert("You cut internet to your app.");
        console.log("You are  offline");
        
    },false);
 })();
 