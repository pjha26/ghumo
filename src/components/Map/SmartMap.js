'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Layers, MapPin, Cloud, Shield, Navigation, Eye } from 'lucide-react';
import styles from './SmartMap.module.css';

// Dynamic import to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('./MapView'), { ssr: false });

export default function SmartMap({ listings = [] }) {
    const [activeLayers, setActiveLayers] = useState({
        heatmap: true,
        safety: false,
        weather: false,
        transport: false
    });

    const [selectedListing, setSelectedListing] = useState(null);
    const [showVR, setShowVR] = useState(false);

    const toggleLayer = (layer) => {
        setActiveLayers(prev => ({
            ...prev,
            [layer]: !prev[layer]
        }));
    };

    const handleMarkerClick = (listing) => {
        setSelectedListing(listing);
    };

    const openVRPreview = (listing) => {
        setSelectedListing(listing);
        setShowVR(true);
    };

    return (
        <div className={styles.container}>
            {/* Layer Control Panel */}
            <div className={styles.layerControl}>
                <h3 className={styles.controlTitle}>
                    <Layers size={18} />
                    Map Layers
                </h3>

                <div className={styles.layerButtons}>
                    <button
                        className={`${styles.layerBtn} ${activeLayers.heatmap ? styles.active : ''}`}
                        onClick={() => toggleLayer('heatmap')}
                    >
                        <MapPin size={16} />
                        Tourist Density
                    </button>

                    <button
                        className={`${styles.layerBtn} ${activeLayers.safety ? styles.active : ''}`}
                        onClick={() => toggleLayer('safety')}
                    >
                        <Shield size={16} />
                        Safety Zones
                    </button>

                    <button
                        className={`${styles.layerBtn} ${activeLayers.weather ? styles.active : ''}`}
                        onClick={() => toggleLayer('weather')}
                    >
                        <Cloud size={16} />
                        Weather
                    </button>

                    <button
                        className={`${styles.layerBtn} ${activeLayers.transport ? styles.active : ''}`}
                        onClick={() => toggleLayer('transport')}
                    >
                        <Navigation size={16} />
                        Transportation
                    </button>
                </div>
            </div>

            {/* Map View */}
            <MapView
                listings={listings}
                activeLayers={activeLayers}
                onMarkerClick={handleMarkerClick}
                onVRClick={openVRPreview}
            />

            {/* VR Preview Modal */}
            {showVR && selectedListing && (
                <div className={styles.vrModal} onClick={() => setShowVR(false)}>
                    <div className={styles.vrContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setShowVR(false)}>
                            ✕
                        </button>
                        <div className={styles.vrViewer}>
                            <Eye size={48} className={styles.vrIcon} />
                            <h3>360° Virtual Preview</h3>
                            <p>{selectedListing.title}</p>
                            <div className={styles.vrPlaceholder}>
                                <img
                                    src={selectedListing.images?.[0] || '/placeholder.jpg'}
                                    alt="VR Preview"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div className={styles.vrOverlay}>
                                    <p>🔄 Drag to look around</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
