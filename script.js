class Journey {
  constructor(data) {
    this.places = data;
    this.index = -1;
    this.marker = L.marker([0,0]).addTo(map);
    this.displayNextPlace();
  }

  displayNextPlace() {
    this.index++;
    let p = this.places[this.index];
    map.flyTo([p.lat, p.lng], p.zoom);
    this.marker.setLatLng([p.lat, p.lng]);
  }
}

var map = L.map('mapid').setView([50, 14], 4);

var osmMapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var j = new Journey([{lat: 51, lng: -3, zoom: 8}]);

