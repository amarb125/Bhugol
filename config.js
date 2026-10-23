/* Bhugol Quest map imagery settings. Edit this file, then re-upload it.
   Leave as is to use Esri World Imagery (fine for testing; see README for licence notes). */
window.BHUGOL_TILES = {
  // Tile address with {z} {x} {y}. Examples:
  // MapTiler:  'https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=YOUR_MAPTILER_KEY'
  // Mapbox:    'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token=YOUR_MAPBOX_TOKEN'
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  attribution: 'Imagery © Esri, Maxar, Earthstar Geographics',
  maxZoom: 16
};
