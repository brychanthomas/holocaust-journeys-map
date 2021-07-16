class Journey {
  constructor(data) {
    this.places = data;
    this.index = -1;
    this.marker = L.marker([0,0]).addTo(map);
    this.polyline = L.polyline([], {color: 'red'}).addTo(map);
    this.setDropdownVisibility(false);
    this.setNextButtonVisibility(true);
    this.displayNextPlace();
  }

  displayNextPlace() {
    this.index++;
    if (this.index < this.places.length-1) {
      let p = this.places[this.index];
      this.polyline.addLatLng([p.lat, p.lng]);
      this.marker.setLatLng([p.lat, p.lng]);
      this.marker.bindPopup(p.desc, {closeButton: false}).openPopup();
      map.flyTo([p.lat, p.lng], p.zoom, {duration: 1});
    } else if (this.index == this.places.length-1) {
      this.marker.closePopup();
      map.flyToBounds(this.polyline.getBounds(), {duration: 2});
      this.polyline.bindPopup(this.places[this.index].desc).openPopup();
    }
    else {
      this.endJourney();
    }
  }

  setDropdownVisibility(vis) {
    document.getElementById("peopleDropdownDiv").style.display = vis ? "block" : "none";
  }

  setNextButtonVisibility(vis) {
    document.getElementById("nextButton").style.display = vis ? "block" : "none";
  }

  endJourney() {
    map.removeLayer(this.marker);
    map.removeLayer(this.polyline);
    map.flyTo([50, 14], 4, {duration: 1});
    this.setDropdownVisibility(true);
    this.setNextButtonVisibility(false);
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
  .then(json => {
    journeysList = json;
    var select = document.getElementById('peopleSelect');
    for (name in journeysList) {
      var opt = document.createElement('option');
      opt.value = name;
      opt.innerHTML = name;
      select.appendChild(opt);
    }
  });

