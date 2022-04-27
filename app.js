var searchBox = document.querySelector(".search-bar");
const searchButton = document.getElementById("submit-btn");
const searchContainer = document.querySelector(".search-result");

var h1 = document.createElement("h1");
var paragRank = document.createElement("h3");
var p = document.createElement("p");
var image = document.createElement("img");
var span = document.createElement("span");

var currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,

});

// const coinName = document.getElementById('coin-name');
// const trendingContainer = document.querySelector('.trending-content')


window.addEventListener ('load', fetchTrending, false);

var coinContainerLabel = document.createElement("p");

async function fetchTrending() {
    const res = await fetch('https://api.coingecko.com/api/v3/search/trending')
    const data = await res.json();

    // console.log(data.coins[0].item.market_cap_rank)

    totalTrendingCoins = data.coins.length;



    for (var i = 0; i < totalTrendingCoins; i++ ){
        console.log(data.coins[i].item.id)

        const trendingCoinID = JSON.parse(JSON.stringify(data.coins[i].item.id))
        const trendingCoinRank = JSON.parse(JSON.stringify(data.coins[i].item.market_cap_rank))
        const trendingBtcPrice = JSON.parse(JSON.stringify(data.coins[i].item.price_btc))
        showTrendingCoin(trendingCoinID, trendingCoinRank, trendingBtcPrice)
        
    }

    
    // console.log(data.coins[0].item.price_btc)
    
}

/******DECLARATIONS FOR CREATING DIV ELEMENTS******/

function showTrendingCoin(coinID, rank, btcPrice) {

    const trendingParent = document.querySelector('.trending-container');
    const div = document.createElement('div');
    const heading = document.createElement('h3');
    const parag = document.createElement('p');
    const paragTwo = document.createElement('p');
    
    const paragMarketRank = document.createElement('p');

    paragMarketRank.textContent = "Market Rank"
    
    headingTextContent = heading.textContent;
    paragTextContent = parag.textContent;
    priceTextContent = paragTwo.textContent;

    function trendingContents(headingTextContent, paragTextContent, priceTextContent){
        this.headingTextContent = headingTextContent;
        this.paragTextContent = paragTextContent;
        this.priceTextContent = priceTextContent;

    }
    
    var contentOne = new trendingContents(coinID,rank,btcPrice);
    console.log(contentOne);

    trendingParent.appendChild(div);
    div.setAttribute('class','coin-container');
    div.setAttribute('id', 'coins')
    heading.textContent = contentOne.headingTextContent
    parag.textContent = contentOne.paragTextContent
    paragTwo.textContent = contentOne.priceTextContent

    paragMarketRank.classList.add("marketLabelColorGray");
    paragTwo.classList.add("marketLabelColorGreen");
    parag.classList.add("marketLabelColorGreen");

    div.append(heading,paragMarketRank,paragTwo,parag)

}


searchButton.addEventListener('click', submitSearch, false)

async function submitSearch () {

    searchBox.value = searchBox.value.toLowerCase();
    var search = searchBox.value;

    var response = await fetch('https://api.coingecko.com/api/v3/coins/'+search+'');
    var data = await response.json();

            if(response.ok){
            
                let dataImage = data.image.small;
                // let paragRank = document.createElement("h3");
                
          
                let dataResult = JSON.stringify(data.name)
                let dataResultSymbol = JSON.stringify(data.symbol)
                // let dataResultRank = JSON.stringify(data.market_cap_rank)
    
                let result = document.createTextNode(dataResult)
                let resultSymbol = document.createTextNode(dataResultSymbol)
                // let resultRank = document.createTextNode(dataResultRank)
    
                let convertTextResult = result.nodeValue;
                let convertTextResultSymbol = resultSymbol.nodeValue;
                let parsedResultSymbol = JSON.parse(convertTextResultSymbol);
                // let convertTextResultRank = resultRank.nodeValue;
                    searchContainer.append(h1, image);
                    // searchContainer.appendChild(paragRank);
                
                    span.textContent = parsedResultSymbol;
                
                    h1.textContent = JSON.parse(convertTextResult);
                    h1.style.fontSize = "20px";
                    // const image = document.querySelector('.image-container');
                    image.setAttribute("src", dataImage);

                    h1.append(span)

                    
                
                    // paragRank.textContent = JSON.parse(convertTextResultRank);
                    fetchRank();
                    fetchPrice();   
                    addLabel();
                   
            }
}

async function fetchRank() {

    let search = searchBox.value;

    var response = await fetch('https://api.coingecko.com/api/v3/coins/'+search+'');
    var data = await response.json();

    let dataResultRank = JSON.stringify(data.market_cap_rank)
    let resultRank = document.createTextNode(dataResultRank)
    let convertTextResultRank = resultRank.nodeValue;

    searchContainer.appendChild(paragRank);

    paragRank.textContent = convertTextResultRank;

    console.log(convertTextResultRank)
}
 
async function fetchPrice(){

    var search = searchBox.value
    var response = await fetch ('https://api.coingecko.com/api/v3/simple/price?ids='+search+'&vs_currencies=php');
    var data = await response.json();

    let coinID = search;
    let priceResult = document.createTextNode(data[coinID].php);
    let convertTextResult = priceResult.nodeValue;

    // console.log(convertTextResult)
    // console.log(priceResult)
    searchContainer.appendChild(p)
    // p.textContent = "₱" + " " + convertTextResult;
    p.textContent = currencyFormat.format(convertTextResult);


    let childElementsLength = searchContainer.childNodes.length;
    searchContainer.children = [];

    searchContainer.children[2].classList.add("child-two");
    searchContainer.children[3].classList.add("child-three");
    searchContainer.children[4].classList.add("child-four");
    searchContainer.children[5].classList.add("child-five");
    searchContainer.children[5].classList.toggle("price-placement");
    
    for (var i = 0; i < childElementsLength; i++){
        // console.log(searchContainer.children[i])
        let searchChildren = searchContainer.children[i];
        searchChildren.classList.toggle("center-div-items");
    }

    
}

var newLabel = document.createElement("p");
var newLabelTwo = document.createElement("p");

function addLabel () {


    newLabel.textContent = "Philippine Peso Price / BTC"
    newLabelTwo.textContent = "Market Rank"
    searchContainer.appendChild(newLabel);
    searchContainer.appendChild(newLabelTwo);

}


//MODAL TOGGLE SCRIPT

const aboutBtn = document.getElementById("aboutBtn");
const modal = document.getElementById("modal");
const homeBtn = document.getElementById("homeBtn");

homeBtn.addEventListener('click', () => {
    location.reload();
    searchBox.value = " ";
    // searchBox.setAttribute("placeholder", "What you're looking for?");
});

aboutBtn.addEventListener('click', () => {
    modal.showModal();

})

const hamburgerBtn = document.querySelector(".hamburger-menu")
const navMenu = document.getElementById("navigation");

hamburgerBtn.addEventListener('click', () => {
    navMenu.style.display = "block"
}, false)

