 (function() {
 	// TODO add service worker code here
	if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../service-worker.js').then(function (registration) {
            // Registration was successful 
            console.log('ServiceWorker registration successful with scope: ', registration.scope);

            registration.pushManager.subscribe({userVisibleOnly: true}).then(function (subscription) {
                console.log("subscription.subscriptionId: ", subscription.subscriptionId);
                console.log("subscription.endpoint: ", subscription.endpoint);

                // TODO: Send the subscription subscription.endpoint
                // to your server and save it to send a push message
                // at a later date
                var register = ChromePushManager.getRegistrationId(subscription);
                callback(null, register);
            });
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
        console.log("You are  offline");
        
    },false);
 })();
 