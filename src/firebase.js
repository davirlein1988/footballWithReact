import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


const config = {
    apiKey: "AIzaSyB8w69OIsd45Du1xWjjkaQQliJEEYTmrIo",
    authDomain: "football-react-1e49a.firebaseapp.com",
    databaseURL: "https://football-react-1e49a.firebaseio.com",
    projectId: "football-react-1e49a",
    storageBucket: "football-react-1e49a.appspot.com",
    messagingSenderId: "967949070607"
  };

  firebase.initializeApp(config);

  const firebaseDB = firebase.database();
  const firebaseMatches = firebaseDB.ref('matches');
  const firebasePlayers = firebaseDB.ref('players');
  const firebasePromotions =  firebaseDB.ref('promotions');
  const firebaseTeams = firebaseDB.ref('teams');


//   firebaseDB.ref('matches').once('value').then((snapshot) =>{
//       console.log(snapshot.val());
//   })

export {
    firebase,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebaseDB,
    firebasePlayers
}