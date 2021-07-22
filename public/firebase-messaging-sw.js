importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');

const config = {
    apiKey: 'AAAALYMTgGk:APA91bFq3hK01JygmxXypoPVdTUTNmwjjI134BB2RU5aePYllnm2Gl-w7UAedEBk3iInH0srHjZOgmAt1xuWXkyQ1HvnN56qVmc1xAHYa81hu0orsZ9X2Je6HuwJT0faTU5h5l6JRMOf',
    messagingSenderId: "195472621673"
}

const initMessaging = firebase.messaging()