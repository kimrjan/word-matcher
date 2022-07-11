const button = document.querySelector("#evaluateButton");
const copyToClipboard = document.querySelector('#copyToClipboard');

button.addEventListener('click', evaluate);
copyToClipboard.addEventListener('click', copyOutputToClipboard);

function evaluate() {
  const text = document.querySelector('#text').value;
  const searchString = document.querySelector('#searchString').value;
  const output = document.querySelector('#output');

  const matches = returnMatches(text, searchString);

  output.innerHTML = '';

  matches.forEach(item => {
    const element = document.createElement('div');
    element.innerHTML = item;

    output.appendChild(element);
  });
}

function returnMatches(text, searchString) {
  if (!text || !searchString) {
    return [];
  }

  const re = new RegExp(`\\w+(?= \\(${searchString}\\))`, 'g');
  return text.match(re) ?? [];
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

function copyOutputToClipboard() {
  const output = document.querySelector('#output');
  let str = '';
  output.childNodes.forEach((node) => {
    str += node.innerHTML + '\n';
  });

  copyTextToClipboard(str);
}
