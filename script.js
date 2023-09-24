const accessKey = "QKiwP9-tissX-r5j340KtMpH1xw8w_NFHoXNug8nNeU";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResult = document.querySelector(".search-result");
const showMoreButton = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

// function search image
async function searchImage() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const res = await fetch(url);
  const data = await res.json();
  const results = data.results;

  if (page === 1) {
    searchResult.innerHTML = "";
  }
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt.description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    imageWrapper.appendChild(imageWrapper);
  });
  page++;
  if (page > 1) {
    showMoreButton.style.display = "block";
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImage();
});
showMoreButton.addEventListener("click", () => {
  searchImage();
});
