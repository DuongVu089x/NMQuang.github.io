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

     const applicationServerPublicKey = 'BJPMaDrbRiUzH8IeMvRMn7CcxFMIQzTEB1j62Kn' +
         'gB5irgMhB9TPgcmMjwB7t1aRkUKDwzz9MMH3ASEKLKX_mqjk';

     const pushButton = document.querySelector('.js-push-btn');

     let isSubscribed = false;
     let swRegistration = null;

     function urlB64ToUint8Array(base64String) {
         const padding = '='.repeat((4 - base64String.length % 4) % 4);
         const base64 = (base64String + padding)
             .replace(/\-/g, '+')
             .replace(/_/g, '/');

         const rawData = window.atob(base64);
         const outputArray = new Uint8Array(rawData.length);

         for (let i = 0; i < rawData.length; ++i) {
             outputArray[i] = rawData.charCodeAt(i);
         }
         return outputArray;
     }

     function updateBtn() {
         if (Notification.permission === 'denied') {
             pushButton.textContent = 'Push Messaging Blocked.';
             pushButton.disabled = true;
             updateSubscriptionOnServer(null);
             return;
         }

         if (isSubscribed) {
             pushButton.textContent = 'Disable Push Messaging';
         } else {
             pushButton.textContent = 'Enable Push Messaging';
         }

         pushButton.disabled = false;
     }

     function updateSubscriptionOnServer(subscription) {
         // TODO: Send subscription to application server

         const subscriptionJson = document.querySelector('.js-subscription-json');
         const subscriptionDetails =
             document.querySelector('.js-subscription-details');

         if (subscription) {
             subscriptionJson.textContent = JSON.stringify(subscription);
             subscriptionDetails.classList.remove('is-invisible');
         } else {
             subscriptionDetails.classList.add('is-invisible');
         }
     }

     function subscribeUser() {
         const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
         swRegistration.pushManager.subscribe({
                 userVisibleOnly: true,
                 applicationServerKey: applicationServerKey
             })
             .then(function(subscription) {
                 console.log('User is subscribed.');

                 updateSubscriptionOnServer(subscription);

                 isSubscribed = true;

                 updateBtn();
             })
             .catch(function(err) {
                 console.log('Failed to subscribe the user: ', err);
                 updateBtn();
             });
     }

     function unsubscribeUser() {
         swRegistration.pushManager.getSubscription()
             .then(function(subscription) {
                 if (subscription) {
                     return subscription.unsubscribe();
                 }
             })
             .catch(function(error) {
                 console.log('Error unsubscribing', error);
             })
             .then(function() {
                 updateSubscriptionOnServer(null);

                 console.log('User is unsubscribed.');
                 isSubscribed = false;

                 updateBtn();
             });
     }

     function initialiseUI() {
         pushButton.addEventListener('click', function() {
             pushButton.disabled = true;
             if (isSubscribed) {
                 unsubscribeUser();
             } else {
                 subscribeUser();
             }
         });

         // Set the initial subscription value
         swRegistration.pushManager.getSubscription()
             .then(function(subscription) {
                 isSubscribed = !(subscription === null);

                 updateSubscriptionOnServer(subscription);

                 if (isSubscribed) {
                     console.log('User IS subscribed.');
                 } else {
                     console.log('User is NOT subscribed.');
                 }

                 updateBtn();
             });
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