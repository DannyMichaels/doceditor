const newBtn = document.querySelector('#new-btn');
const saveTextButtons = document.querySelectorAll('#txt-btn');
const savePdfBtn = document.querySelector('#pdf-btn');

const content = document.querySelector('#content');
const filename = document.querySelector('#filename-input');

const controlButtons = document.getElementsByClassName('control-btn');

for (const btn of controlButtons) {
  btn.addEventListener('click', () => {
    let cmd = btn.dataset['command'];
    switch (cmd) {
      case 'forecolor':
        document.execCommand('forecolor', false, btn.value);
        break;
      case 'createlink':
        let url = prompt('Enter the link here: ', 'http://');
        document.execCommand(cmd, false, url);
        break;
      default:
        document.execCommand(cmd, false, null);
    }
  });
}

newBtn.addEventListener('click', () => {
  content.innerHTML = '';
});

const saveText = (fileExtension) => {
  const a = document.createElement('a');
  const blob = new Blob([content.innerText]);
  const dataUrl = URL.createObjectURL(blob);
  a.href = dataUrl;
  a.download = filename.value + fileExtension;
  a.click();
};

for (const btn of saveTextButtons) {
  btn.addEventListener('click', () => {
    const fileExtension = btn.dataset['extension'];
    saveText(fileExtension);
  });
}

savePdfBtn.addEventListener('click', () => {
  // saves to pdf, check htmltopdf.js, pretty neat!
  html2pdf().from(content).save(filename.value);
});
