const button = document.getElementById("button");
const p = document.getElementById("place");
const search = document.getElementById("search-button");
const del = document.getElementById("delete");
const locate_me = document.getElementById("locate_me");
const input = document.getElementById("search-box");
let map = L.map('map',{zoomControl: false,fullscreenControl: true,fullscreenControlOptions:{position: 'topright'}}).setView([18.90397,-90.44482], 3);
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl= 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let tiles = L.tileLayer(tileUrl,{attribution});
const api_url = 'https://lz4.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["name"="Annecy"]["place"="city"];);out skel;';
const api_url2 = 'https://lz4.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["place"="country"];);out body;';
const myMap = new Map();
tiles.addTo(map);
//Got my poor Javascripts skills up offproject, can't have no work shown on git for today;
const countries = [{name: "Philippines", lat: 12.7503486, lon: 122.7312101},{name: "Italy", lat: 42.6384261, lon: 12.674297},{name: "Afghanistan", lat: 33.7680065, lon: 66.2385139},{name: "Austria", lat: 47.59397, lon: 14.12456},{name: "Guernsey", lat: 49.4566233, lon: -2.5822348},{name: "Spain", lat: 39.3260685, lon: -4.8379791},{name: "Andorra", lat: 42.5407167, lon: 1.5732033},{name: "Slovenia", lat: 45.8133113, lon: 14.4808369},{name: "Dominican Republic", lat: 19.0974031, lon: -70.3028026},{name: "New Zealand", lat: -41.5000831, lon: 172.8344077},{name: "Armenia", lat: 40.7696272, lon: 44.6736646},{name: "Argentina", lat: -34.9964963, lon: -64.9672817},{name: "Barbados", lat: 13.1500331, lon: -59.5250305},{name: "Burkina Faso", lat: 12.0753083, lon: -1.6880314},{name: "Bahamas", lat: 24.7736546, lon: -78.0000547},{name: "Belarus", lat: 53.4250605, lon: 27.6971358},{name: "Cook Islands", lat: -16.0492781, lon: -160.355485},{name: "Cuba", lat: 23.0131338, lon: -80.8328748},{name: "South Georgia and South Sandwich Islands", lat: -54.8432857, lon: -35.8090698},{name: "Hungary", lat: 47.1817585, lon: 19.5060937},{name: "Comoros", lat: -12.2045176, lon: 44.2832964},{name: "North Korea", lat: 40.3736611, lon: 127.0870417},{name: "South Korea", lat: 36.638392, lon: 127.6961188},{name: "Cayman Islands", lat: 19.5417212, lon: -80.5667132},{name: "Malaysia", lat: 4.5693754, lon: 102.2656823},{name: "Nepal", lat: 28.1083929, lon: 84.0917139},{name: "Peru", lat: -6.8699697, lon: -75.0458515},{name: "Saudi Arabia", lat: 25.6242618, lon: 42.3528328},{name: "São Tomé and Príncipe", lat: 0.9713095, lon: 7.02255},{name: "Turkmenistan", lat: 39.3763807, lon: 59.3924609},{name: "Trinidad and Tobago", lat: 10.8677845, lon: -60.9821067},{name: "Yemen", lat: 16.3471243, lon: 47.8915271},{name: "Country of Sint Maarten", lat: 18.0423736, lon: -63.0549948},{name: "Belize", lat: 16.8259793, lon: -88.7600927},{name: "Serbia", lat: 44.1534121, lon: 20.55144},{name: "Norway", lat: 60.5000209, lon: 9.0999715},{name: "Bahrain", lat: 26.1551249, lon: 50.5344606},{name: "Netherlands", lat: 52.2434979, lon: 5.6343227},{name: "Haiti", lat: 19.1399952, lon: -72.3570972},{name: "Benin", lat: 9.5293472, lon: 2.2584408},{name: "Costa Rica", lat: 10.2735633, lon: -84.0739102},{name: "Dominica", lat: 15.4113138, lon: -61.3653618},{name: "The Gambia", lat: 13.470062, lon: -15.4900464},{name: "Guinea", lat: 10.7226226, lon: -10.7083587},{name: "Guinea-Bissau", lat: 12.100035, lon: -14.9000214},{name: "Honduras", lat: 15.2572432, lon: -86.0755145},{name: "Israel", lat: 31.5313113, lon: 34.8667654},{name: "Lebanon", lat: 33.8750629, lon: 35.843409},{name: "Lithuania", lat: 55.3500003, lon: 23.7499997},{name: "North Macedonia", lat: 41.6171214, lon: 21.7168387},{name: "Mali", lat: 16.3700359, lon: -2.2900239},{name: "Nauru", lat: -0.5252306, lon: 166.9324426},{name: "Papua New Guinea", lat: -5.6816069, lon: 144.2489081},{name: "Sudan", lat: 14.5844444, lon: 29.4917691},{name: "Luxembourg", lat: 49.8158683, lon: 6.1296751},{name: "Chad", lat: 15.6134137, lon: 19.0156172},{name: "Vietnam", lat: 13.2904027, lon: 108.4265113},{name: "South Africa", lat: -28.8166236, lon: 24.991639},{name: "Ecuador", lat: -1.3397668, lon: -79.3666965},{name: "Seychelles", lat: -4.6574977, lon: 55.4540146},{name: "Iran", lat: 32.6475314, lon: 54.5643516},{name: "Turkey", lat: 38.9597594, lon: 34.9249653},{name: "Albania", lat: 41.000028, lon: 19.9999619},{name: "Eswatini", lat: -26.5624806, lon: 31.3991317},{name: "United Arab Emirates", lat: 24.0002488, lon: 53.9994829},{name: "Saint Kitts and Nevis", lat: 17.250512, lon: -62.6725973},{name: "Angola", lat: -11.8775768, lon: 17.5691241},{name: "Burundi", lat: -3.426449, lon: 29.9324519},{name: "Bhutan", lat: 27.549511, lon: 90.5119273},{name: "Chile", lat: -31.7613365, lon: -71.3187697},{name: "Cabo Verde", lat: 16.0000552, lon: -24.0083947},{name: "Falkland Islands", lat: -51.9492937, lon: -59.5383657},{name: "Federated States of Micronesia", lat: 7.37375, lon: 150.4173309},{name: "Gabon", lat: -0.8999695, lon: 11.6899699},{name: "Guyana", lat: 4.8417097, lon: -58.6416891},{name: "Croatia", lat: 45.5643442, lon: 17.0118954},{name: "Kazakhstan", lat: 47.2286086, lon: 65.2093197},{name: "Liberia", lat: 5.7499721, lon: -9.3658524},{name: "Maldives", lat: 4.7064352, lon: 73.3287853},{name: "Malawi", lat: -13.2687204, lon: 33.9301963},{name: "Mozambique", lat: -19.302233, lon: 34.9144977},{name: "Namibia", lat: -23.2335499, lon: 17.3231107},{name: "Niger", lat: 17.7356214, lon: 9.3238432},{name: "Rwanda", lat: -1.9646631, lon: 30.0644358},{name: "El Salvador", lat: 13.8000382, lon: -88.9140683},{name: "Syria", lat: 34.6401861, lon: 39.0494106},{name: "Turks and Caicos Islands", lat: 21.7214683, lon: -71.6201783},{name: "Togo", lat: 8.7800265, lon: 1.0199765},{name: "Tonga", lat: -19.9160819, lon: -175.202642},{name: "Venezuela", lat: 8.0018709, lon: -66.1109318},{name: "British Virgin Islands", lat: 18.4024395, lon: -64.5661642},{name: "Marshall Islands", lat: 8.7630041, lon: 169.1110932},{name: "Greenland", lat: 77.6192349, lon: -42.8125967},{name: "Faroe Islands", lat: 62.0448724, lon: -7.0322972},{name: "Sweden", lat: 59.6749712, lon: 14.5208584},{name: "Cyprus", lat: 34.9823018, lon: 33.1451285},{name: "Singapore", lat: 1.357107, lon: 103.8194992},{name: "Japan", lat: 36.5748441, lon: 139.2394179},{name: "Vanuatu", lat: -16.5255069, lon: 168.1069154},{name: "China", lat: 35.000074, lon: 104.999927},{name: "Jamaica", lat: 18.1850507, lon: -77.3947693},{name: "Azerbaijan", lat: 40.3936294, lon: 47.7872508},{name: "Bolivia", lat: -17.0568696, lon: -64.9912286},{name: "Brazil", lat: -10.3333333, lon: -53.2},{name: "Botswana", lat: -23.1681782, lon: 24.5928742},{name: "Canada", lat: 61.0666922, lon: -107.991707},{name: "Czechia", lat: 49.8167003, lon: 15.4749544},{name: "Fiji", lat: -18.1239696, lon: 179.0122737},{name: "Estonia", lat: 58.7523778, lon: 25.3319078},{name: "Ghana", lat: 8.0300284, lon: -1.0800271},{name: "Equatorial Guinea", lat: 1.613172, lon: 10.5170357},{name: "British Indian Ocean Territory", lat: -6.4157192, lon: 72.1173961},{name: "Kenya", lat: 1.4419683, lon: 38.4313975},{name: "Kuwait", lat: 29.2733964, lon: 47.4979476},{name: "Montserrat", lat: 16.7417041, lon: -62.1916844},{name: "Pakistan", lat: 30.3308401, lon: 71.247499},{name: "Sierra Leone", lat: 8.6400349, lon: -11.8400269},{name: "India", lat: 22.3511148, lon: 78.6677428},{name: "Tajikistan", lat: 38.6281733, lon: 70.8156541},{name: "Tanzania", lat: -6.5247123, lon: 35.7878438},{name: "Colombia", lat: 4.099917, lon: -72.9088133},{name: "Ivory Coast", lat: 7.9897371, lon: -5.5679458},{name: "Iceland", lat: 64.9841821, lon: -18.1059013},{name: "Russia", lat: 64.6863136, lon: 97.7453061},{name: "Oman", lat: 21.0000287, lon: 57.0036901},{name: "Australia", lat: -24.7761086, lon: 134.755},{name: "Bulgaria", lat: 42.6073975, lon: 25.4856617},{name: "Cameroon", lat: 4.6125522, lon: 13.1535811},{name: "Egypt", lat: 26.2540493, lon: 29.2675469},{name: "Eritrea", lat: 15.9500319, lon: 37.9999668},{name: "Grenada", lat: 12.1360374, lon: -61.6904045},{name: "Iraq", lat: 33.0955793, lon: 44.1749775},{name: "Jordan", lat: 31.1667049, lon: 36.941628},{name: "Laos", lat: 20.0171109, lon: 103.378253},{name: "Saint Lucia", lat: 13.8250489, lon: -60.975036},{name: "Moldova", lat: 47.2879608, lon: 28.5670941},{name: "Myanmar", lat: 17.1750495, lon: 95.9999652},{name: "Mauritania", lat: 20.2540382, lon: -9.2399263},{name: "Nigeria", lat: 9.6000359, lon: 7.9999721},{name: "Nicaragua", lat: 12.6090157, lon: -85.2936911},{name: "Panama", lat: 8.559559, lon: -81.1308434},{name: "San Marino", lat: 43.9458623, lon: 12.458306},{name: "Somalia", lat: 8.3676771, lon: 49.083416},{name: "Tunisia", lat: 33.8439408, lon: 9.400138},{name: "Tuvalu", lat: -7.768959, lon: 178.1167698},{name: "Uganda", lat: 1.5333554, lon: 32.2166578},{name: "Uzbekistan", lat: 41.32373, lon: 63.9528098},{name: "United States", lat: 39.7837304, lon: -100.445882},{name: "Algeria", lat: 28.0000272, lon: 2.9999825},{name: "Antigua and Barbuda", lat: 17.2234721, lon: -61.9554608},{name: "Bangladesh", lat: 24.4769288, lon: 90.2934413},{name: "Cambodia", lat: 13.5066394, lon: 104.869423},{name: "Central African Republic", lat: 7.0323598, lon: 19.9981227},{name: "Denmark", lat: 55.670249, lon: 10.3333283},{name: "East Timor", lat: -8.5151979, lon: 125.8375756},{name: "Finland", lat: 63.2467777, lon: 25.9209164},{name: "Georgia", lat: 41.6809707, lon: 44.0287382},{name: "Greece", lat: 38.9953683, lon: 21.9877132},{name: "Kiribati", lat: 0.3448612, lon: 173.6641773},{name: "Latvia", lat: 56.8406494, lon: 24.7537645},{name: "Libya", lat: 26.8234472, lon: 18.1236723},{name: "Madagascar", lat: -18.9249604, lon: 46.4416422},{name: "Mongolia", lat: 46.8250388, lon: 103.8499736},{name: "Morocco", lat: 31.1728205, lon: -7.3362482},{name: "Poland", lat: 52.215933, lon: 19.134422},{name: "Qatar", lat: 25.3336984, lon: 51.2295295},{name: "Republic of the Congo", lat: -0.7264327, lon: 15.6419155},{name: "Romania", lat: 45.9852129, lon: 24.6859225},{name: "Saint Vincent and the Grenadines", lat: 12.90447, lon: -61.2765569},{name: "Senegal", lat: 14.4750607, lon: -14.4529612},{name: "Slovakia", lat: 48.7411522, lon: 19.4528646},{name: "Suriname", lat: 4.1413025, lon: -56.0771187},{name: "Taiwan", lat: 23.9739374, lon: 120.9820179},{name: "Uruguay", lat: -32.8755548, lon: -56.0201525},{name: "Zambia", lat: -14.5189121, lon: 27.5589884},{name: "Anguilla", lat: 18.1954947, lon: -63.0750234},{name: "Jersey", lat: 49.2214561, lon: -2.1358386},{name: "Niue", lat: -19.0536414, lon: -169.861341},{name: "Tokelau", lat: -9.1676396, lon: -171.819687},{name: "Democratic Republic of the Congo", lat: -2.9814344, lon: 23.8222636},{name: "Thailand", lat: 14.8971921, lon: 100.83273},{name: "Montenegro", lat: 42.9868853, lon: 19.5180992},{name: "Abkhazia", lat: 43.1500226, lon: 41.2299786},{name: "Solomon Islands", lat: -9.7354344, lon: 162.8288542},{name: "United Kingdom", lat: 54.7023545, lon: -3.2765753},{name: "South Sudan", lat: 7.8699431, lon: 29.6667897},{name: "France", lat: 46.603354, lon: 1.8883335},{name: "Pitcairn", lat: -25.0657719, lon: -130.101782},{name: "Ireland", lat: 52.865196, lon: -7.9794599},{name: "Switzerland", lat: 46.7985624, lon: 8.2319736},{name: "Palau", lat: 5.3783537, lon: 132.9102573},{name: "Sāmoa", lat: -13.7693895, lon: -172.12005},{name: "Isle of Man", lat: 54.1936805, lon: -4.5591148},{name: "Zimbabwe", lat: -18.4554963, lon: 29.7468414},{name: "Paraguay", lat: -23.3165935, lon: -58.1693445},{name: "Ukraine", lat: 49.4871968, lon: 31.2718321},{name: "Germany", lat: 51.0834196, lon: 10.4234469},{name: "Belgium", lat: 50.6402809, lon: 4.6667145},{name: "Brunei", lat: 4.4137155, lon: 114.5653908},{name: "South Ossetia", lat: 42.3476344, lon: 44.0979465},{name: "Turkish Republic Of Northern Cyprus", lat: 35.2245313, lon: 33.6252379},{name: "Kyrgyzstan", lat: 41.5089324, lon: 74.724091},{name: "Mauritius", lat: -20.2759451, lon: 57.5703566},{name: "Aruba", lat: 12.5013629, lon: -69.9618475},{name: "Bosnia and Herzegovina", lat: 44.3053476, lon: 17.5961467},{name: "Ethiopia", lat: 10.2116702, lon: 38.6521203},{name: "Portugal", lat: 40.0332629, lon: -7.8896263},{name: "Lesotho", lat: -29.6039267, lon: 28.3350193},{name: "Liechtenstein", lat: 47.1416307, lon: 9.5531527},{name: "Malta", lat: 35.8885993, lon: 14.4476911},{name: "Kosovo", lat: 42.5869578, lon: 20.9021231},{name: "Sri Lanka", lat: 7.5554942, lon: 80.7137847},{name: "Indonesia", lat: -2.4833826, lon: 117.8902853},{name: "Djibouti", lat: 11.8145966, lon: 42.8453061},{name: "Monaco", lat: 43.7323492, lon: 7.4276832},{name: "Nagorno-Karabakh", lat: 39.8079192, lon: 46.6977209},{name: "Curacao", lat: 12.1176488, lon: -68.9309263},{name: "Mexico", lat: 23.6585116, lon: -102.0077097},{name: "Guatemala", lat: 15.5855545, lon: -90.345759},{name: "Vatican City", lat: 41.903411, lon: 12.4528527}];

const wallet = {
  id:0,
  'amount donated':0.0069420,
  'amount left':0.0069240,
  'provider of the funds':'ian',
  'distributo of the funds':'Doug&Sunita',
  'PrimaryAddress':'44gtDkCkwZPZZoGVmLGXFU5E7yBAJU9eP72dJADZ2e1iALnb8xGKVgcbVHqxnJzSmK12mEB7om3ntZLMDqdGTJd8DcYwL96',
  'PrivateVieKey':'a974f992eff4366679ef0abe1b409569d365719aea6d7fcad998400d80d02a06',
  'General Area':'State',
  'lat':'18.220833',
  'lon':'-66.590149',
  'Timestamp':'52:01.4',
  'donated' :true
};


function getRndInteger(min,max){
  return Math.floor(Math.random()*(max-min))+min;
}
getData();
async function getData() {
const response = await fetch('donations.csv');
const data = await response.text();
const table = data.split(/\n/).slice(1);
for(let i=0;i<table.length-1;i++){
const columns = table[i].split(",");
const latlng = {lat :columns[9],lon:columns[10]};
console.log(latlng);
console.log(columns[12]);


if(myMap.has(latlng)&&columns[12]==="1"){
  myMap.get(latlng).number +=1;
  myMap.get(latlng).funds_donated += columns[1];
  myMap.get(latlng).funds_available += columns[2];
  myMap.get(latlng).funds_recycled += columns[3];

}else if(columns[12]==="1"){
const mark = {number:1,funds_donated:columns[1],funds_available:columns[2],funds_recycled:columns[3],biggest_donator:columns[4],biggest_distributor:columns[5],general_area:columns[8]};
myMap.set(latlng,mark);
}
console.log(myMap);
};
}

function getLocation(){
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
  map.setView([position.coords.latitude,position.coords.longitude],16);
}

function main(){
button.addEventListener('click', function(){
let r = getRndInteger(0,219);
map.setView([countries[r].lat, countries[r].lon], 7);
console.log(countries[r].name);
p.innerHTML = countries[r].name;
  });
  locate_me.addEventListener('click',function(){
    console.log("hello");
    getLocation();
    p.innerHTML = "";
  });
   // Either go fullscreen, or cancel the existing fullscreen.
  /*
  search.addEventListener('click',function(){
    console.log(input.value);
    getCity('https://z.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node[%22name%22=%22'+input.value.charAt(0).toUpperCase() + str.slice(1)+'%22][%22place%22=%22city%22];);out%20skel%20noids;');
  });
  del.addEventListener('click',function(){
    input.value = "";
  });
*/
}
main();

/*
async function getCity(api){
  const response = await  fetch(api);
  const data = await response.json();
  console.log(data);
  console.log(data.elements[0]);
map.setView([data.elements[0].lat, data.elements[0].lon], 16);
}
*/
