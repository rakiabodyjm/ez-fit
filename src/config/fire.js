import firebase from "firebase"
import "firebase/firestore"
import "firebase/storage"
// var firebaseConfig = {
//   apiKey: "AIzaSyCrlx7OMxTwe9gglFAheuDq6uOqTJ5DCfU",
//   authDomain: "ezfit-5e2bd.firebaseapp.com",
//   databaseURL: "https://ezfit-5e2bd.firebaseio.com",
//   projectId: "ezfit-5e2bd",
//   storageBucket: "ezfit-5e2bd.appspot.com",
//   messagingSenderId: "418371576929",
//   appId: "1:418371576929:web:bd4a52635d84d6543cf620",
//   measurementId: "G-8W07BH9M7Z",
// }

var firebaseConfig = {
  apiKey: "AIzaSyCRJUQ74LkXf-IRgRv8exkz4hzQyh87gWI",
  authDomain: "ezfit-93736.firebaseapp.com",
  databaseURL: "https://ezfit-93736.firebaseio.com",
  projectId: "ezfit-93736",
  storageBucket: "ezfit-93736.appspot.com",
  messagingSenderId: "496732483096",
  appId: "1:496732483096:web:4e5a1dad5702db0509dd6d",
  measurementId: "G-F372WGRDT5",
}

const app = firebase.initializeApp(firebaseConfig)
// const database = app.database().ref("/Contents/0252VL1TQmNiQv1ghssD")
const database = app.firestore()

const contentsRef = database.collection("Contents")
const aboutusRef = contentsRef.doc("0252VL1TQmNiQv1ghssD")
const faqsRef = contentsRef.doc("faqs")
const actsRef = contentsRef.doc("activities")

const storage = firebase.storage()
export { actsRef, database, aboutusRef, faqsRef, app as default }
