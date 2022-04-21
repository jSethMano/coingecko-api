var searchBox = document.querySelector(".search-bar");
const searchButton = document.getElementById("submit-btn");
const searchContainer = document.querySelector(".search-result");

var h1 = document.createElement("h1");
var p = document.createElement("p");

// const coinName = document.getElementById('coin-name');
// const trendingContainer = document.querySelector('.trending-content')


window.addEventListener ('load', fetchTrending, false);

async function fetchTrending() {
    const res = await fetch('https://api.coingecko.com/api/v3/search/trending')
    const data = await res.json();

    // console.log(data.coins[0].item.market_cap_rank)

    totalTrendingCoins = data.coins.length;
    
    for (var i = 0; i < totalTrendingCoins; i++ ){
        console.log(data.coins[i].item.id)

        const trendingCoinID = JSON.parse(JSON.stringify(data.coins[i].item.id))
        const trendingCoinRank = JSON.parse(JSON.stringify(data.coins[i].item.market_cap_rank))
        showTrendingCoin(trendingCoinID, trendingCoinRank)
    }
    
}

/******DECLARATIONS FOR CREATING DIV ELEMENTS******/

function showTrendingCoin(coinID, rank) {

    const trendingParent = document.querySelector('.trending-container');
    const div = document.createElement('div');
    const heading = document.createElement('h3');
    const parag = document.createElement('p');
    
    headingTextContent = heading.textContent;
    paragTextContent = parag.textContent;
    
    function trendingContents(headingTextContent, paragTextContent){
        this.headingTextContent = headingTextContent;
        this.paragTextContent = paragTextContent;
    }
    
    var contentOne = new trendingContents(coinID,rank);
    console.log(contentOne);

    trendingParent.appendChild(div);
    div.setAttribute('class','first-coin');
    heading.textContent = contentOne.headingTextContent
    parag.textContent = contentOne.paragTextContent
    div.append(heading,parag);

}




searchButton.addEventListener('click', submitSearch, false)

async function submitSearch () {

var search = searchBox.value
    
    var response = await fetch('https://api.coingecko.com/api/v3/coins/'+search+'');
    var data = await response.json();

            let dataResult = JSON.stringify(data.name)
            let result = document.createTextNode(dataResult)
            let convertTextResult = result.nodeValue;

            searchContainer.appendChild(h1);
            h1.innerText = JSON.parse(convertTextResult);

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




