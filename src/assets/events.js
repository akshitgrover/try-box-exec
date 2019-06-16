var codeSection = document.getElementsByClassName('code-section');

codeSection[0].addEventListener('keydown', function (e) {
  if (e.which.toString() == '9') {
    e.preventDefault();
    var doc = this.ownerDocument.defaultView;
    var s = doc.getSelection();
    var range = s.getRangeAt(0);
    range.deleteContents();
    var tabNode = document.createTextNode('\u00a0\u00a0\u00a0\u00a0');
    range.insertNode(tabNode);
    range.setStartAfter(tabNode);
    range.setEndAfter(tabNode);
    s.removeAllRanges();
    s.addRange(range);
  }
});

var run = document.getElementsByClassName('run');

run[0].addEventListener('click', function (e) {
  var code = document.getElementById('code').innerText;
  var testCase = document.getElementById('testCase').innerText;
  var lang = document.getElementById('lang');
  var language = lang.options[lang.selectedIndex].value;
  var timeOut = document.getElementById('timeOut').innerText.trim();
  code = code.replace(/\u00a0/g, ' ');

  var body = {
    code: code,
    language: language,
    testCase: testCase,
    timeOut: timeOut,
    socketID: socketID.id,
  };
  var req = new XMLHttpRequest();
  req.open('POST', '/execute', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(body));
  req.onreadystatechange = function () {
    console.log(req.readyState);
  }
});
