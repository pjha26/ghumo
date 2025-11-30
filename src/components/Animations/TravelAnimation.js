'use client';

import React from 'react';
import Lottie from 'lottie-react';
import { X } from 'lucide-react';

// Sample Travel Animation URL (Replace with your preferred Lottie JSON URL or file)
// This is a placeholder URL for a travel-themed animation
const animationUrl = "https://lottie.host/5633f864-1033-4699-874e-03525c3e7d56/6XfC8s8qL1.json";

export default function TravelAnimation({ onClose }) {
    const [animationData, setAnimationData] = React.useState(null);

    React.useEffect(() => {
        fetch(animationUrl)
            .then(res => res.json())
            .then(data => setAnimationData(data))
            .catch(err => console.error("Failed to load Lottie animation:", err));
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#ffffff',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.5s ease-out'
        }}>
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    background: 'rgba(0,0,0,0.05)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10000,
                    transition: 'background 0.2s'
                }}
            >
                <X size={24} color="#333" />
            </button>

            <div style={{ width: '100%', maxWidth: '600px', padding: '20px' }}>
                {animationData ? (
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        autoplay={true}
                        style={{ width: '100%', height: 'auto' }}
                    />
                ) : (
                    <div style={{ textAlign: 'center', color: '#666' }}>Loading Animation...</div>
                )}

                <h2 style={{
                    textAlign: 'center',
                    marginTop: '40px',
                    fontFamily: 'var(--font-geist-sans)',
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#333',
                    opacity: 0,
                    animation: 'slideUp 0.8s ease-out 0.5s forwards'
                }}>
                    Let's go somewhere new
                </h2>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
