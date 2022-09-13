import {generateData, exportData} from './fakeJSONGenerator.js'

document.addEventListener("DOMContentLoaded", (e) => {

  let generateButton = document.getElementById("genBtn");
  let fakeData = document.getElementById("fakeData");
  let amountData = document.getElementById("numberGenerated")
  let cpyBtn = document.getElementById("copy");
  let downloadBtn = document.getElementById("download");
  let dataSlot = document.getElementById("dataOut");

  let generatedData = []

  function copy() {
    var copyText = document.getElementById("dataOut");
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
    
    generatedData = generateData(amountData.value,fakeData.value)
    dataSlot.innerText = JSON.stringify(generatedData,null,2)

  })
})

