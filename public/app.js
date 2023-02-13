const dropZone = document.querySelector(".drop-zone");
const browseBtn = document.querySelector(".browse-btn");
const fileInput = document.querySelector("#file-input");
const bgProgress = document.querySelector(".bg-progress");
const percentDiv = document.querySelector('#percent');
const progressContainer = document.querySelector(".progress-container")
const fileURLInput = document.querySelector(".fileURL");
const copyBtn = document.querySelector("#copy-btn");

const sharingContainer = document.querySelector(".sharing-container");

const host = "https://innshare.he rokuapp.com/";
const uploadURL = `${host}api/files`;
// const uploadURL = `${host}api/files`

// check if file is uploaded
dropZone.addEventListener("dragover", (e) => {
  console.log("dragged");
  e.preventDefault();
  if (!dropZone.classList.contains("dragged")) {
    dropZone.classList.add("dragged");
  }
});

dropZone.addEventListener("dragleave", (e) => {
  dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragged");
  //   console.log(e.dataTransfer.files.length)
  const files = e.dataTransfer.files;
  console.table(files);
  if (files.length) {
    fileInput.files = files;
    uploadFile();
  }
});

fileInput.addEventListener("change", () => {
  uploadFile();
});

browseBtn.addEventListener("click", () => {
  fileInput.click();
});
copyBtn.addEventListener("click", () => {
  fileURLInput.select()
  document.execCommand("copy");
})
const uploadFile = () => {
  progressContainer.style.display = "block";
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("myfile", file);

  const xhr = new XMLHttpRequest();

  // 
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log(xhr.readyState);
      showLink(JSON.parse(xhr.response))
    }
  };

  xhr.upload.onprogress = updateProgress;

  xhr.open("POST", uploadURL);
  xhr.send(formData);
};

const updateProgress = (e) => {
  const percent = (e.loaded / e.total) * 100;
  // console.log(e)
  bgProgress.style.width = `${percent}%`;
  percentDiv.innerText = percent;
}

const showLink = ({ file: url }) => {
  console.log(url);
  progressContainer.style.display = "none"
  sharingContainer.style.display = "block"

  fileURLInput.value = url;
}