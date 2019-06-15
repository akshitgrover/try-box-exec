var codeSection = document.getElementsByClassName('code-section');

console.log(codeSection[0].innerHTML);

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
