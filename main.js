const countries = ["Burundi","Suriname","Irak","Iran","Nigeria","Sierra Leone","France","Usa"];
const button = document.getElementById("button");
const p = document.getElementById("country");
let map = L.map('map').setView([39.03961934308089, 125.7586628039601], 7);
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl= 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl,{attribution});
tiles.addTo(map);



function getRndInteger(min,max){
  return Math.floor(Math.random()*(max-min))+min;
}

function main(){
  button.addEventListener('click', function(){
  console.log(countries[getRndInteger(0,countries.length)]);
  p.innerHTML = countries[getRndInteger(0,countries.length)];

  });
}

main();
