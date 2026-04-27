import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { apiService } from '../services/apiService';

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapViewPage = () => {
  const [crimes, setCrimes] = useState([]);
  const [highRiskAreas, setHighRiskAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrimesAndHighRiskAreas();
  }, []);

  const fetchCrimesAndHighRiskAreas = async () => {
    try {
      setLoading(true);
      const stats = await apiService.getStatistics();
      setCrimes(stats.recentCrimes || []);
      setHighRiskAreas(stats.highRiskLocations || []);
    } catch (error) {
      console.error('Failed to fetch crimes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMarkerColor = (crimeCount) => {
    if (crimeCount >= 10) return 'red';
    if (crimeCount >= 5) return 'orange';
    return 'green';
  };

  const createColoredMarkerIcon = (color) => {
    return L.icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  if (loading) return <div className="p-8 text-center">Loading map...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Crime Map View</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-100 rounded-lg p-4">
          <p className="text-red-800 font-bold">High-Risk Areas (≥10 crimes)</p>
          <p className="text-2xl font-bold text-red-600">{highRiskAreas.length}</p>
        </div>
        <div className="bg-orange-100 rounded-lg p-4">
          <p className="text-orange-800 font-bold">Moderate Areas (5-9 crimes)</p>
          <p className="text-2xl font-bold text-orange-600">0</p>
        </div>
        <div className="bg-green-100 rounded-lg p-4">
          <p className="text-green-800 font-bold">Safe Areas (&lt;5 crimes)</p>
          <p className="text-2xl font-bold text-green-600">{crimes.length}</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-4">
          <p className="text-blue-800 font-bold">Total Markers</p>
          <p className="text-2xl font-bold text-blue-600">{crimes.length + highRiskAreas.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden" style={{ height: '600px' }}>
        <MapContainer center={[14.5995, 120.9842]} zoom={12} style={{ height: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          
          {/* High-risk area markers */}
          {highRiskAreas.map((area, idx) => (
            <Marker
              key={`high-${idx}`}
              position={[area.latitude, area.longitude]}
              icon={createColoredMarkerIcon('red')}
            >
              <Popup>
                <div>
                  <p className="font-bold">HIGH-RISK AREA</p>
                  <p>Crimes: {area.crime_count}</p>
                  <p>Lat: {area.latitude.toFixed(4)}</p>
                  <p>Lng: {area.longitude.toFixed(4)}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Active crime markers */}
          {crimes.map((crime, idx) => (
            <Marker
              key={`crime-${idx}`}
              position={[crime.latitude, crime.longitude]}
              icon={createColoredMarkerIcon('green')}
            >
              <Popup>
                <div>
                  <p className="font-bold">{crime.crime_type}</p>
                  <p>{new Date(crime.timestamp).toLocaleString()}</p>
                  <p>Lat: {crime.latitude.toFixed(4)}</p>
                  <p>Lng: {crime.longitude.toFixed(4)}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Map Legend</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
            <p>High-Risk Areas (≥10 crimes)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
            <p>Moderate Areas (5-9 crimes)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            <p>Safe Areas (&lt;5 crimes)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapViewPage;
