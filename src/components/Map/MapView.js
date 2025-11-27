'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
    touristDensityData,
    safetyZones,
    mockWeatherData,
    transportationData,
    getWeatherIcon,
    findNearestTransport
} from '@/lib/mapData';
import styles from './MapView.module.css';

// Fix for default marker icon
if (typeof window !== 'undefined') {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
}

// Custom marker icons
const createCustomIcon = (color) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
};

// Heatmap Layer Component
function HeatmapLayer({ show }) {
    const map = useMap();
    const heatLayerRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (!show) {
            if (heatLayerRef.current) {
                map.removeLayer(heatLayerRef.current);
                heatLayerRef.current = null;
            }
            return;
        }

        // Dynamically import leaflet.heat on client side
        if (!heatLayerRef.current) {
            import('leaflet.heat').then(() => {
                if (window.L && window.L.heatLayer && !heatLayerRef.current) {
                    heatLayerRef.current = window.L.heatLayer(touristDensityData, {
                        radius: 50,
                        blur: 40,
                        maxZoom: 13,
                        max: 1.0,
                        gradient: {
                            0.0: 'blue',
                            0.5: 'yellow',
                            1.0: 'red'
                        }
                    }).addTo(map);
                }
            });
        }

        return () => {
            if (heatLayerRef.current) {
                map.removeLayer(heatLayerRef.current);
                heatLayerRef.current = null;
            }
        };
    }, [show, map]);

    return null;
}

export default function MapView({ listings, activeLayers, onMarkerClick, onVRClick }) {
    const center = [20.5937, 78.9629]; // Center of India
    const zoom = 5;

    return (
        <div className={styles.mapContainer}>
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Heatmap Layer */}
                <HeatmapLayer show={activeLayers.heatmap} />

                {/* Safety Zones */}
                {activeLayers.safety && safetyZones.map((zone, idx) => (
                    <Circle
                        key={`safety-${idx}`}
                        center={zone.coordinates}
                        radius={zone.radius}
                        pathOptions={{
                            color: zone.color,
                            fillColor: zone.color,
                            fillOpacity: 0.2,
                            weight: 2
                        }}
                    >
                        <Popup>
                            <div className={styles.popup}>
                                <h4>🛡️ {zone.name}</h4>
                                <p>Safety Score: <strong>{zone.safetyScore}/10</strong></p>
                                <div className={styles.safetyBar}>
                                    <div
                                        className={styles.safetyFill}
                                        style={{ width: `${zone.safetyScore * 10}%`, backgroundColor: zone.color }}
                                    />
                                </div>
                            </div>
                        </Popup>
                    </Circle>
                ))}

                {/* Weather Markers */}
                {activeLayers.weather && Object.entries(mockWeatherData).map(([city, data], idx) => {
                    const coords = touristDensityData[idx];
                    if (!coords) return null;

                    return (
                        <Marker
                            key={`weather-${city}`}
                            position={[coords[0], coords[1]]}
                            icon={createCustomIcon('#3b82f6')}
                        >
                            <Popup>
                                <div className={styles.popup}>
                                    <h4>{getWeatherIcon(data.condition)} {city}</h4>
                                    <p className={styles.temp}>{data.temp}°C</p>
                                    <p>{data.condition}</p>
                                    <div className={styles.weatherDetails}>
                                        <span>💧 {data.humidity}%</span>
                                        <span>💨 {data.windSpeed} km/h</span>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                {/* Transportation Markers */}
                {activeLayers.transport && transportationData.map((station, idx) => (
                    <Marker
                        key={`transport-${idx}`}
                        position={station.coordinates}
                        icon={createCustomIcon(station.type === 'metro' ? '#8b5cf6' : '#f59e0b')}
                    >
                        <Popup>
                            <div className={styles.popup}>
                                <h4>{station.icon} {station.name}</h4>
                                <p><strong>{station.type === 'metro' ? 'Metro' : 'Bus'} Station</strong></p>
                                {station.line && <p>Line: {station.line}</p>}
                                {station.routes && <p>Routes: {station.routes.join(', ')}</p>}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Listing Markers */}
                {listings.map((listing) => {
                    if (!listing.lat || !listing.lng) return null;

                    const nearestTransport = findNearestTransport(listing.lat, listing.lng);

                    return (
                        <Marker
                            key={listing.id}
                            position={[listing.lat, listing.lng]}
                            icon={createCustomIcon('#FF385C')}
                            eventHandlers={{
                                click: () => onMarkerClick(listing)
                            }}
                        >
                            <Popup>
                                <div className={styles.listingPopup}>
                                    <img
                                        src={listing.images?.[0] || '/placeholder.jpg'}
                                        alt={listing.title}
                                        className={styles.popupImage}
                                    />
                                    <h4>{listing.title}</h4>
                                    <p className={styles.price}>₹{listing.price.toLocaleString('en-IN')}/night</p>
                                    <p className={styles.rating}>⭐ {listing.rating}</p>

                                    {nearestTransport && (
                                        <p className={styles.transport}>
                                            {nearestTransport.icon} {nearestTransport.distance.toFixed(1)} km away
                                        </p>
                                    )}

                                    <button
                                        className={styles.vrBtn}
                                        onClick={() => onVRClick(listing)}
                                    >
                                        👁️ VR Preview
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}
