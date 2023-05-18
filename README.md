App Setup Instructions:

1. Create a .env.local file in the root directory of the project to store your API and project keys.
2. Go to https://rapidapi.com/apidojo/api/travel-advisor and sign up for a free account. 
3. Subscribe to the API to obtain the X-RapidAPI-Key.
4. Add the following to your .env.local file: REACT_APP_TRAVEL_ADVISOR_API_KEY="{your X-RapidAPI-Key}"
5. Go to https://www.mapbox.com/ and create an account. 
6. Go to access tokens to find your MapBox access token.
7. Add the following to your .env.local file: REACT_APP_MAPBOX_TOKEN="{your MapBox access token}"
8. Go to https://firebase.google.com/ and sign in.
9. Create a new project to obtain your config details. 
10. Add the following to your .env.local file: 
    REACT_APP_FIREBASE_API_KEY="{your api key}"
    REACT_APP_FIREBASE_AUTH_DOMAIN="{your auth domain}"
    REACT_APP_FIREBASE_PROJECT_ID="{your project ID}"
    REACT_APP_FIREBASE_STORAGE_BUCKET="{your storage bucket}"
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID="{your messaging sender ID}"
    REACT_APP_FIREBASE_APP_ID="{your app ID}"
11. Go to the authentication tab in the Firebase console and setup email and password and Google sign ins.
12. Go to authentication settings and makes sure to register the domain you will testing under.
13. Go to the Cloud Firestore section of the console and create your database.
14. Go to the Storage section of the console and create your storage bucket.
15. Return to your code editor with the project directory open and type npm run start.
16. The app should now be up and running.
