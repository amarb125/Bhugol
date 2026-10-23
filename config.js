/* Bhugol Quest settings. Edit this file, then commit it. */
window.BHUGOL_TILES = {
  // Satellite tile address with {z} {x} {y}. Examples:
  // MapTiler:  'https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=YOUR_MAPTILER_KEY'
  // Mapbox:    'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token=YOUR_MAPBOX_TOKEN'
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  attribution: 'Imagery © Esri, Maxar, Earthstar Geographics',
  maxZoom: 16
};
/* Shared question database (Supabase). The publishable key is safe to publish:
   database rules allow everyone to read questions and only the owner account to change them. */
window.BHUGOL_BACKEND = {
  url: 'https://jxgikzpfwihmpsdnunyf.supabase.co',
  key: 'sb_publishable__V7DhzGJXB1P-O2KeVEySQ_oHHWWnW-'
};
