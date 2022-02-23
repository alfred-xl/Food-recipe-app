const searchForm= document.querySelector('form')
const searchResultDiv= document.querySelector('.search-result')
const container= document.querySelector('.container')
const APP_ID='73e7791e'
const APP_KEY='6ecf6c2a97fcc93e135450e365ce058c'


let searchQuery=''

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();// prevent the form from submitting
    searchQuery=e.target.querySelector('input').value// the input  
    fetchAPI()
})
async function fetchAPI(){
    const baseURL=`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
    const response=await fetch(baseURL);
    const data= await response.json() //returning a promise
    generateHTML(data.hits) // search result from the browser 
    // console.log(data)
}
function generateHTML(results){
    let generatedHTML=""; //All the items Html
    results.map(result =>{
      generatedHTML += //looping through the results
      `
    <div class="item">
      <img src="${result.recipe.image}" />
      <div class="flex-container">
        <h1 class="title">${result.recipe.label}</h1>
        <a class="view-button"  href="${result.recipe.url}" target='_blank'>View Recipe</a>
      </div>
      <p class="item-data">Calories:${result.recipe.calories.toFixed(2)}</p>
    <p class="item-data">Diet label:${result.recipe.dietLabels}</p>
    </div>
       `
    })
    searchResultDiv.innerHTML=generatedHTML

}