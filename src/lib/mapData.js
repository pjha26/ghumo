// Mock data for map features (no paid APIs)

// Tourist density data (simulated based on listing concentration)
export const touristDensityData = [
    [28.6139, 77.2090, 0.8], // Delhi - High density
    [19.0760, 72.8777, 0.9], // Mumbai - Very high
    [12.9716, 77.5946, 0.7], // Bangalore - Medium-high
    [13.0827, 80.2707, 0.6], // Chennai - Medium
    [22.5726, 88.3639, 0.7], // Kolkata - Medium-high
    [23.0225, 72.5714, 0.5], // Ahmedabad - Medium
    [17.3850, 78.4867, 0.6], // Hyderabad - Medium
    [18.5204, 73.8567, 0.5], // Pune - Medium
];

// Safety/Crime data (simulated - green zones are safer)
export const safetyZones = [
    {
        name: 'South Delhi',
        coordinates: [28.5355, 77.2500],
        safetyScore: 8.5,
        color: '#22c55e', // Green
        radius: 5000
    },
    {
        name: 'Bandra, Mumbai',
        coordinates: [19.0596, 72.8295],
        safetyScore: 8.0,
        color: '#22c55e',
        radius: 4000
    },
    {
        name: 'Koramangala, Bangalore',
        coordinates: [12.9352, 77.6245],
        safetyScore: 7.5,
        color: '#84cc16', // Light green
        radius: 3500
    },
    {
        name: 'T Nagar, Chennai',
        coordinates: [13.0418, 80.2341],
        safetyScore: 7.0,
        color: '#eab308', // Yellow
        radius: 3000
    },
];

// Weather data (mock - can be replaced with free OpenWeatherMap API)
export const mockWeatherData = {
    Delhi: {
        temp: 28,
        condition: 'Clear',
        icon: '01d',
        humidity: 45,
        windSpeed: 12
    },
    Mumbai: {
        temp: 32,
        condition: 'Partly Cloudy',
        icon: '02d',
        humidity: 75,
        windSpeed: 18
    },
    Bangalore: {
        temp: 26,
        condition: 'Cloudy',
        icon: '03d',
        humidity: 60,
        windSpeed: 8
    },
    Chennai: {
        temp: 34,
        condition: 'Hot',
        icon: '01d',
        humidity: 70,
        windSpeed: 15
    }
};

// Transportation data (metro/bus stations)
export const transportationData = [
    {
        type: 'metro',
        name: 'Rajiv Chowk Metro',
        coordinates: [28.6328, 77.2197],
        line: 'Blue Line',
        icon: '🚇'
    },
    {
        type: 'metro',
        name: 'Andheri Metro',
        coordinates: [19.1136, 72.8697],
        line: 'Western Line',
        icon: '🚇'
    },
    {
        type: 'bus',
        name: 'MG Road Bus Stop',
        coordinates: [12.9716, 77.6412],
        routes: ['335E', '500C'],
        icon: '🚌'
    },
    {
        type: 'metro',
        name: 'Namma Metro - Indiranagar',
        coordinates: [12.9784, 77.6408],
        line: 'Purple Line',
        icon: '🚇'
    },
];

// VR/Street View data (mock panorama URLs)
export const vrPreviewData = {
    'listing-1': {
        panoramaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
        heading: 0,
        pitch: 0
    },
    'listing-2': {
        panoramaUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
        heading: 90,
        pitch: 0
    },
    'listing-3': {
        panoramaUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
        heading: 180,
        pitch: 0
    }
};

// Helper function to get weather icon
export function getWeatherIcon(condition) {
    const icons = {
        'Clear': '☀️',
        'Partly Cloudy': '⛅',
        'Cloudy': '☁️',
        'Rainy': '🌧️',
        'Hot': '🌡️',
        'Thunderstorm': '⛈️'
    };
    return icons[condition] || '🌤️';
}

// Helper function to calculate distance between two coordinates
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Find nearest transportation
export function findNearestTransport(lat, lng) {
    let nearest = null;
    let minDistance = Infinity;

    transportationData.forEach(station => {
        const distance = calculateDistance(lat, lng, station.coordinates[0], station.coordinates[1]);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = { ...station, distance };
        }
    });

    return nearest;
}
