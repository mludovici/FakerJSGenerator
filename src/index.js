import {generateData, exportData} from './fakeJSONGenerator.js'

document.addEventListener("DOMContentLoaded", (e) => {
  let consentTrue = window.localStorage.getItem('gh_fjs_consent')
  if (!consentTrue) {
    let conf = window.confirm(`This site uses third party tools like Google Analytics and Google Tag Manager to gather site statistics and limited user statistics. By clicking OK, you agree to the usage of above mentioned.`)
    if (!conf) {
      window.location.href = "http://www.google.com"
    } else {
      localStorage.setItem('gh_fjs_consent', true)
    }
  }

  let generateButton = document.getElementById("genBtn");
  let fakeData = document.getElementById("fakeData");
  let amountData = document.getElementById("numberGenerated")
  let cpyBtn = document.getElementById("copy");
  let downloadBtn = document.getElementById("download");
  let dataSlot = document.getElementById("dataOut");

  let generatedData = []

  function copy() {
    var copyText = document.getElementById("dataOut");
    gtag('event', 'copy_json', {
      type:fakeData.value,
      amount: amountData.value,
    });
    if (copyText.innerText == "" || copyText.innerText == null) {
      return
    } else {
      navigator.clipboard.writeText(copyText.innerText);
    }
  }

  
  downloadBtn.addEventListener("click", () => {

    if (generatedData.length == 0) {
      return
    }
    gtag('event', 'download_json', {
      type:fakeData.value,
      amount: amountData.value,
    });

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(generatedData));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", `${fakeData.value}.json`);
    dlAnchorElem.click();
  })

  cpyBtn.addEventListener("click", copy)

  fakeData.addEventListener("change", () => {
    console.log(fakeData.value)
  })
  amountData.addEventListener("change", () => {
    console.log(amountData.value);
  })
  generateButton.addEventListener("click", () => {
    gtag('event', 'generate_json', {
      type:fakeData.value,
      amount: amountData.value,
    });
    generatedData = generateData(amountData.value,fakeData.value)
    dataSlot.innerText = JSON.stringify(generatedData,null,2)

  })
})

