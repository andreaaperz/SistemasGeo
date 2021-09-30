var mymap = L.map("mapid").setView(
  [21.152364203854884, -101.71115227036523],
  16
);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 9,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

var geojson = [
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-101.6824940171719, 21.12574244951028],
    },
    properties: {
      name: "León",
      title: "León, Guanajuato",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-101.1748887669979, 21.486437422597927],
    },
    properties: {
      name: "SFTM",
      title: "SFTM, GTO",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-100.92287185016805, 21.159840284922293],
    },
    properties: {
      name: "DH",
      title: "DH, GTO",
    },
  },
];

coords = [];

var puntos = L.geoJSON(geojson, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng);
  },
  onEachFeature: function (feature, layer) {
    coords.push(feature.geometry.coordinates);
  },
});

mymap.addLayer(puntos);

var pt1 = turf.point(coords[0]);
var pt2 = turf.point(coords[1]);
var pt3 = turf.point(coords[2]);

var options = { units: "kilometers" };
var distance = turf.distance(pt1, pt3, options);

distance = Math.round(distance);

document.write(
  "La distancia entre los dos puntos es " + distance + " kilómetros"
);

//Líneas
// var linea = turf.lineString([coords[0], coords[1]]);
// L.geoJSON(linea, { color: "blue" }).addTo(mymap);

// var linea = turf.lineString([coords[1], coords[2]]);
// L.geoJSON(linea, { color: "yellow" }).addTo(mymap);

// var linea = turf.lineString([coords[0], coords[2]]);
// L.geoJSON(linea, { color: "green" }).addTo(mymap);

var features = turf.points(coords);

/* var center = turf.center(features);
console.log(center);
L.geoJSON(center).addTo(mymap); */

statesData.features.forEach((state) => {
  var coordsStates = state.geometry.coordinates;
  if (coordsStates.length < 2) {
    var polygon = turf.polygon([...coordsStates, coordsStates[0]]);
    L.geoJSON(polygon, { color: "blue" }).addTo(mymap);
  } else {
    
  }
});

/* statesData.features.forEach((state) => {
  const polygon = turf.polygon([[...coords, coords[0]]]);
  var centroid = turf.centroid(polygon);
  L.geoJSON(polygon, { color: "blue" }).addTo(mymap);
}); */

console.log(coords);
