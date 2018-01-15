$(document).ready(function() {

  firebase.initializeApp(config);

  var selectLang = $("#select-lang");
  var selectRat = $("#select-rating");
  var selectUniv = $("#select-universe");
  var selectGenre = $("#select-genre");

  displayData(fanfics, "language", $(selectLang));
  displayData(fanfics, "rating", $(selectRat));
  displayData(fanfics, "universe", $(selectUniv));
  displayData(fanfics, "mainGenre", $(selectGenre));

  $(".selector").click(function() {
    $("#fics-container").empty();
  });

  showFics(fanfics, "language");
  showFics(fanfics, "rating");
  showFics(fanfics, "universe");
  showFics(fanfics, "mainGenre");
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
    $(where).append(`<p class="selector">` + arr[x] + `</p>`);
  }
});

var showFics = (function(data, key) {
  $(".selector").click(function() {
    var filterSelected = $(this).html();
    for (var i = 0; i < data.length; i++) {
      var item = data[i][key];
      if (typeof item === "string" && item === filterSelected) {
        $("#fics-container").append(`<div class="card"><div class="card-header">`
          + data[i].title + `</div><div class="card-body"><ul class="list-group list-group-flush">
          <li class="list-group-item">Author: <a href="` + data[i].authorsLink[0] + `">` + data[i].authorsName[0] 
          + `</a></li><li class="list-group-item">Platform: ` + data[i].platform + `</li><li class="list-group-item">Language: `
          + data[i].language + `</li>
          <li class="list-group-item">Summary:<blockquote class="blockquote mb-0">` + data[i].summary + `</blockquote></li>
          <li class="list-group-item">Genre: ` + data[i].mainGenre + `</li></ul></div></div>`);
        console.log(data[i].title);
      } else if (Array.isArray(item)) {
        for (var n = 0; n < item.length; n++) {
          if (item[n] === filterSelected) {
            $("#fics-container").append(`<div class="card"><div class="card-header">`
              + data[i].title + `</div></div>`);
          }
        }
      }
    }
  });
});

/* 
$("#fics-container").children().remove();
var showFics = (function(selector, data, key) {
  $(selector).click(function() {
    var selected = $(this).html();
    for (var i = 0; i < data.length; i++) {
      var item = data[i][key];
      if (typeof item === "string" && item === selected) {
        $("#fics-container").append(`<div class="card"><div class="card-header">`
          + data[i].title + `</div></div>`);
        console.log(data[i].title);
      } else if (Array.isArray(item) && item[0] === selected) {
        for (var n = 0; n < item.length; n++) {
          if (item[n] === selected) {
            $("#fics-container").append(`<div class="card"><div class="card-header">`
              + data[i].title + `</div></div>`);
            console.log(data[i].title);
          }
        }
      }
    }
  });
});



*/

//$("#fics-container").children().remove();
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

