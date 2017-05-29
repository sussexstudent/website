(function() {
var index;
try {
  var lsResult = localStorage.getItem('su_cc');
  var index;
  if (lsResult === null) {
    index = 0;
  } else {
    index = parseInt(lsResult, 10);

    if (index > 8 || index < 0) {
      index = 0;
    }
  }
  localStorage.setItem('su_cc', index + 1);
} catch (e) {
  index = 0;
}

var pallet = ['ee534f', '1db8a4', '27428c'];
document.querySelector('.HeaderLogo__svg-group').style.fill = '#' + pallet[[2, 1, 2, 0, 1, 0, 2, 1, 0][index]];
})();
