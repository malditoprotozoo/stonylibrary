$(document).ready(function() {
  firebase.initializeApp(config);
  displayData(fanfics, "language", $("#select-lang"));
  displayData(fanfics, "rating", $("#select-rating"));
  displayData(fanfics, "universe", $("#select-universe"));
});

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC5l37r5snlmi3rr1Qeqd9FjLkY1hnJBZU",
  authDomain: "team-stony.firebaseapp.com",
  databaseURL: "https://team-stony.firebaseio.com",
  projectId: "team-stony",
  storageBucket: "team-stony.appspot.com",
  messagingSenderId: "341435881879"
};

var displayData = (function(data, key, where) {
  var arr = [];
  for (var i = 0; i < data.length; i++) {
    var item = data[i][key];
    if (typeof item === "string") {
      if (arr.indexOf(item) === -1) {
        arr.push(item);
      }
    } else if (Array.isArray(item)) {
      for (var n = 0; n < item.length; n++) {
        if (arr.indexOf(item[n]) === -1) {
          arr.push(item[n]);
        }
      }
    }
  }
  for (var x = 0; x < arr.length; x++) {
    $(where).append(`<p>` + arr[x] + `</p>`);
  }
});
// var addFic = (function() {
//   var btnSend = $("#send-data");
//   $(btnSend).click(function() {
//     var db = firebase.firestore();
//     var title = $("#fic-title").val();
//     var author = $("#fic-author").val();
//     var link = $("#fic-link").val();
//     var translation = $("#fic-translation").val();
//     var docRef = db.collection("fanfics");
//     docRef.add({
//     title: title,
//     author: author,
//     link: link,
//     translation: translation
//     }).then(function(docRef) {
//       console.log("Saved");
//     }).catch(function(error) {
//       console.error("Error adding document: ", error);
//     })
//   });
// });

// var publishFics = (function() {
//   var db = firebase.firestore();
//   var fanficsRef = db.collection("fanfics");
//   fanficsRef.get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//       $("#fics").append(`<p>`+ doc.data().author + `</p>`);
//     });
//   });
// });

// var getRealTimeUpdates = (function() {
//   var db = firebase.firestore();
//   var fanficsRef = db.collection("fanfics");
//   fanficsRef.onSnapshot(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//       var myData = doc.data();
//       $("#fics").append(`<p>`+ doc.data().author+`</p>`);
//     })
//   })
// })