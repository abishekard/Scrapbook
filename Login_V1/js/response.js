var uidpass = sessionStorage.getItem("uidpass");
id=uidpass
setTimeout(readData, 2000);
var keyList = [];

function readData() {
  //  console.log("response of id= " + id);
  var database = firebase.database();
  database.ref("user/" + id + "/Message").once("value", function (snapshot) {
    if (snapshot.exists()) {
      var content = "";
      //  console.log("start read data.");
      //  console.log(snapshot.uid);
      snapshot.forEach(function (data) {
        var val = data.val();
        content += "<tr>";
        content += "<td>" + val.SenderName + "</td>";
        content += "<td>" + val.Nick + "</td>";
        content += "<td>" + val.Message + "</td>";
        // console.log(val.image);
        content +=
          "<td>" +
          '<div id="someHtml"> <img  src=' +
          val.image +
          ' width="45%" height="20%"> </img>' +
          "</div> </td>";
        content += '<td><button onclick="count()">delete</button></td>';
        content += "</tr>";
        keyList.push(data.key);
      });
      $("#table").append(content);
    }
  });

  // console.log(keyList);
}

function back() {
  window.location.href = "home.html";
}

var id;
var currentuser;
function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      alert("Wish you a best of luck!");
      window.location.href = "index.html";
    })
    .catch(function (error) {
      // An error happened.
      alert(error);
    });
}



var doc = new jsPDF("landscape");
function showTableData() {
  //  document.getElementById('info').innerHTML = "";
  var myTab = document.getElementById("table");
  var ar = [];
  var len = myTab.rows.length;

  var i = 0;

  setTimeout(asdf, 5000);
  function asdf() {
    ++i;
    console.log(i);
    // GET THE CELLS COLLECTION OF THE CURRENT ROW.
    var objCells = myTab.rows.item(i).cells;
    var formname, message, nickname, image;
    // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
    for (var j = 0; j < objCells.length; j++) {
      if (j == 0) {
        fromname = objCells.item(j).innerHTML;
        // console.log(fromname);
      } else if (j == 1) {
        nickname = objCells.item(j).innerHTML;
        //console.log(nickname);
      } else if (j == 2) {
        //info.innerHTML = info.innerHTML + ' name = ' + objCells.item(j).innerHTML;
        message = objCells.item(j).innerHTML;
        //console.log(message);
      } else if (j == 3) {
        image = objCells.item(j).innerHTML;
      }
    }
    pdf(fromname, nickname, message, image);
    if (i < len - 1) setTimeout(asdf, 6000);
  }

  //  pdf(fromname, nickname, message,image);

  setTimeout(lastpage, len * 6000);
  function lastpage() {
    //doc.addPage();
    doc.setTextColor(120, 30, 40);
    doc.setFontSize(26);
    doc.text(110, 90, "THANK YOU");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.text(
      60,
      180,
      "Copyright © 2020 All rights reserved | Powered by : CHIRANJEEB NAYAK"
    );
    doc.save("ScrapBook.pdf");
  }
}

function pdf(fromname, nickname, message, image) {
  function pic() {
    var imgData;
    html2canvas($("#someHtml").attr("id", 1), {
      useCORS: true,
      onrendered: function (canvas) {
        imgData = canvas.toDataURL("image/png");
        // console.log("3 image setting")
        doc.addImage(imgData, "PNG", 168, 36, 150, 35);
      },
    });
  }
  var imgData1 =
  doc.addImage(imgData1, "JPEG", 15, 15, 270, 170);
  var size;
  nicknamefun();
  messagefun();
  //  setTimeout(pic,1000)
  pic();
  setTimeout(fromamefun, 5000);
  // fromamefun();

  function nicknamefun() {
    //  console.log("1 before table")
    doc.setFontSize(26);
    doc.setFontType("italic");
    size = 20;
    doc.setTextColor(0, 0, 128);
    doc.text(60, 60, "Dear " + nickname + ",");
  }

  function messagefun() {
    //console.log(message)

    doc.setTextColor(0, 100, 0);

    lines = doc.setFontSize(20).splitTextToSize(message, 175);

    doc.text(60, 100, lines);
    // console.log("2 medium table before pic")
  }
  function fromamefun() {
    //   console.log("4 medium table after pic")
    doc.setTextColor(255, 0, 0);
    doc.text(200, 160, fromname);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.text(
      70,
      180,
      "Copyright © 2020 All rights reserved | Powered by : CHIRANJEEB NAYAK"
    );
    // console.log("5 after table done one row")
    doc.addPage();
  }
}