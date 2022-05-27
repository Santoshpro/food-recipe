function validate()
{
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    if(username=="user1" && password=="123456789")
   {
       alert("login sucessfully");
   }
   else{
       alert("Invalid username or Password");
       window.location.href="index.html";
   }
}
$(document).ready(function(){
    var arrow =$("arrow-up");
    var form =$ (".login-form");
    var status = false;
    $("#login").click(function(event){
        event.preventDefault();
    if (status== false){
        arrow.fadeIn();
        form.fadeIn();
        status = true;
    }else{
        arrow.fadeOut();
        form.fadeOut();
        status = false;
    }
    })

})

const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = '';
const APP_ID="267c55cc";
const APP_Key="fc5444ddf97ea2ec01f32b8f014c454f";

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    fetchAPI();
  });

  async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
  }
  function generateHTML(results) {
    container.classList.remove("initial");
    let generatedHTML = "";
    results.map((result) => {
      generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-btn" target="_blank" href="${
              result.recipe.url
            }">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p class="item-data">Diet label: ${
            result.recipe.dietLabels.length > 0
              ? result.recipe.dietLabels
              : "No Data Found"
          }</p>
          <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
        </div>
      `;
    });
    searchResultDiv.innerHTML = generatedHTML;
  }
