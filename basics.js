const accessKey = "wY_pBIqf7bJcpdylqDfh78StqM9V3OZ1JWjU69sCijI";

const formElement = document.querySelector("form");
const inputElement = document.querySelector(".input-box");
const searchResults = document.querySelector(".search-results");
const showMore = document.querySelector(".show-more");

let input_data = "";
let page = 1;

async function search_images() {
  input_data = inputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input_data}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  const results = data.results;
  
  results.map((result) => {
    const image_wrapper = document.createElement("div");
    image_wrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    image_wrapper.appendChild(image);
    image_wrapper.appendChild(imageLink);
    searchResults.appendChild(image_wrapper);
  });

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  search_images();
});

showMore.addEventListener("click", () => {
  search_images();
});

var icon = document.getElementById("icon"); 
icon.onclick = function(){
    document.body.classList.toggle("dark-theme"); 
    if(document.body.classList.contains("dark-theme")){
        icon.src ="sun.png"; 
    }
    else{
    icon.src ="moon.png"; 
    }
}