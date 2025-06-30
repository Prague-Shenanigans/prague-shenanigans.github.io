function initMap(target) {
  const mapContainer = target.querySelector('#map');
  if (!mapContainer || mapContainer.dataset.mapLoaded) return;

  mapContainer.dataset.mapLoaded = "true";

  mapboxgl.accessToken = 'pk.eyJ1IjoicGF2ZWxpb3MiLCJhIjoiY205OGV4N3dvMDJmMjJtczV3OWZzdGo2ayJ9.db4ZZm27fe5TKq-IS6e-QQ';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pavelios/cm98f1xwb00gn01pga6fd3plv',
    center: [14.4208, 50.088],
    zoom: 12
  });

  map.addControl(new mapboxgl.NavigationControl());

  fetch('https://she-be.nonode.dev/api/pois/')
    .then(response => response.json())
    .then(pois => {
      pois.forEach(poi => {
        const el = document.createElement('div');
        el.className = 'poi-marker';
        el.style.backgroundImage = `url(${poi.icon_url})`;
        el.style.width = '44px';
        el.style.height = '44px';
        el.style.backgroundSize = 'cover';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3 class="font-bold">${poi.title}</h3><p>${poi.description}</p>`);

        new mapboxgl.Marker(el)
          .setLngLat([poi.longitude, poi.latitude])
          .setPopup(popup)
          .addTo(map);
      });
    });
}
