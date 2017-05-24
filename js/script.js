 (function() {
     var isPushEnabled = false;

     window.addEventListener('load', function() {
         var pushButton = document.querySelector('.on_push');
         pushButton.addEventListener('click', function() {
             if (isPushEnabled) {
                 unsubscribe();
                 console.log('button is disabled');
             } else {
                 subscribe();
                 console.log('button is enabled');
             }
         });
     });

     if ('serviceWorker' in navigator) {
         navigator.serviceWorker.register('../sw.js').then(initialiseState);
     } else {
         console.log('Service Workers are not supported in this browser.');
     }

     function initialiseState(registration) {
         console.log('ServiceWorker registration successful with scope: ', registration.scope);
         if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
             console.warn('Notification are not supported.');
             return;
         }
         if (Notification.permission === 'denied') {
             console.warn('The user is blocked notification.');
             return;
         }
         if (!('PushManager' in window)) {
             console.warn('Push messaging is not supported.');
             return;
         }

         registration.pushManager.getSubscription().then(function(subscription) {
             var pushButton = document.querySelector('.on_push');
             pushButton.disabled = false;

             if (!subscription) {
                 return;
             }

             sendSubscriptionToServer(subscription);

             pushButton.textContent = 'Disable push messages';
             isPushEnabled = true;
         }).catch(function(err) {
             console.warn('Error during getSubscription.', err);
         });

     }

     function subscribe() {
         var pushButton = document.querySelector('.on_push');
         pushButton.disabled = false;
         navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
             serviceWorkerRegistration.pushManager.subscribe().then(function(subscription) {
                 isPushEnabled = true;
                 pushButton.textContent = 'Disable push message';
                 pushButton.disabled = false;
                 return sendSubscriptionToServer(subscription);
             }).catch(function(e) {
                 if (Notification.permission === 'denied') {
                     console.warn('Permission Notification was denied');
                     pushButton.disabled = true;
                 } else {
                     console.error('Unable to subscibe to push', e);
                     pushButton.disabled = false;
                     pushButton.textContent = 'Enable push message';
                 }
             });

         });
     }

     window.addEventListener('online', function() {
         var wifi_on = document.getElementsByClassName('wifi_on')[0].style.display = "block";
         var wifi_off = document.getElementsByClassName('wifi_off')[0].style.display = "none";

     }, false);

     window.addEventListener('offline', function() {

         var wifi_on = document.getElementsByClassName('wifi_on')[0].style.display = "none";
         var wifi_off = document.getElementsByClassName('wifi_off')[0].style.display = "block";

     }, false);

 })();