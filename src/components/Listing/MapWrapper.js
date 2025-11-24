'use client';

import dynamic from 'next/dynamic';

const GoogleMap = dynamic(() => import('./Map'), {
    ssr: false,
    loading: () => <div style={{ height: '400px', width: '100%', background: '#f0f0f0', borderRadius: '12px', marginTop: '24px' }}>Loading Map...</div>
});

const MapWrapper = ({ center }) => {
    return <GoogleMap center={center} />;
};

export default MapWrapper;
