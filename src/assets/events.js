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

function deleteChild(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

var run = document.getElementsByClassName('run');

run[0].addEventListener('click', function (e) {
  var code = document.getElementById('code').innerText;
  var testCase = document.getElementById('testCase').innerText;
  var lang = document.getElementById('lang');
  var language = lang.options[lang.selectedIndex].value;
  var timeOut = document.getElementById('timeOut').innerText.trim();

  var output = document.getElementById('output');
  var status = document.getElementById('status');
  deleteChild(output);
  document.getElementById('output-h').style.backgroundColor = "#009999";
  output.style.color = "black";
  deleteChild(status);
  if (code == "") {
    var textNode = document.createTextNode("Error: Code block is empty");
    document.getElementById('output-h').style.backgroundColor = "#CB4335";
    output.style.color = "#CB4335"
    output.appendChild(textNode);
    return;
  }

  if (timeOut == "") {
    var textNode = document.createTextNode("Error: TimeOut is required");
    document.getElementById('output-h').style.backgroundColor = "#CB4335";
    output.style.color = "#CB4335"
    output.appendChild(textNode);
    return;
  }

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
    if (req.readyState == 4 && req.status != 200) {
      var textNode = document.createTextNode(req.responseText);
      output.style.color = "red";
      output.appendChild(textNode);
    }
  }
});
