var searchBox = document.querySelector(".search-bar");
const searchButton = document.getElementById("submit-btn");
const searchContainer = document.querySelector(".search-result");

searchButton.addEventListener('click', submitSearch, false)

var h1 = document.createElement("h1");
var p = document.createElement("p");

// function refreshResultContainer (parent) {
//     while (parent.firstChild) {
//         parent.removeChild(parent.firstChild);
//     }
// }



async function submitSearch () {

//   refreshResultContainer(searchContainer);
var search = searchBox.value
    

    var response = await fetch('https://api.coingecko.com/api/v3/coins/'+search+'');
    var data = await response.json();

            
            let dataResult = JSON.stringify(data.name)
            let result = document.createTextNode(dataResult)
            let convertTextResult = JSON.parse(result.nodeValue);

            searchContainer.appendChild(h1);
            h1.innerText = convertTextResult;

            console.log(data);

            fetchPrice();

}

async function fetchPrice(){

    var search = searchBox.value
    var response = await fetch ('https://api.coingecko.com/api/v3/simple/price?ids='+search+'&vs_currencies=php');
    var data = await response.json();

    let coinID = search;
    let priceResult = document.createTextNode(data[coinID].php);
    let convertTextResult = priceResult.nodeValue;


    console.log(convertTextResult)
    console.log(priceResult)
    searchContainer.appendChild(p)
    p.textContent = convertTextResult;

}




