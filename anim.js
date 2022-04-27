const body = document.getElementsByTagName("BODY")[0];
const trendingContainer = document.querySelector(".trending-container");
// const coinContainer = document.getElementById("coin");

gsap.from(body, {duration: 0.4, opacity: '0'})
gsap.from(trendingContainer, {duration: 0.5, opacity: 0,ease: "circ.out",y: -50,stagger: 0.5 })
