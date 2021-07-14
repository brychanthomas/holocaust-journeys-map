class Journey {
  constructor(data) {
    this.places = data;
    this.index = -1;
    this.marker = L.marker([0,0]).addTo(map);
    this.setDropdownVisibility(false);
    this.displayNextPlace();
  }

  displayNextPlace() {
    this.index++;
    if (this.index < this.places.length) {
      let p = this.places[this.index];
      map.flyTo([p.lat, p.lng], p.zoom);
      this.marker.setLatLng([p.lat, p.lng]);
      this.marker.bindPopup(p.desc).openPopup();
    } else {
      this.endJourney();
    }
  }

  setDropdownVisibility(vis) {
    document.getElementById("peopleDropdownDiv").style.display = vis ? "block" : "none";
  }

  endJourney() {
    map.removeLayer(this.marker);
    map.flyTo([50, 14], 4);
    this.setDropdownVisbility(vis);
  }
}

var activeJourney;
var journeys;

function loadJourney() {
  let name = document.getElementById("peopleSelect").value;
  activeJourney = new Journey(journeysList[name]);
}

var map = L.map('mapid').setView([50, 14], 4);

var osmMapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetch("journeys.json")
  .then(response => response.json())
  .then(json => journeysList = json);

