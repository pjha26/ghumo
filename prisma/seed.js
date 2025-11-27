const { PrismaClient } = require('@prisma/client');
const mockListings = [
    {
        title: 'Luxury Villa with Ocean View',
        location: 'Malibu, California',
        price: 350,
        rating: 4.9,
        type: 'Amazing pools',
        lat: 34.0259,
        lng: -118.7798,
        images: [
            'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['Pool', 'Ocean View', 'WiFi', 'Kitchen', 'Hot Tub', 'BBQ Grill'],
        description: 'Experience the ultimate luxury in this stunning villa overlooking the ocean. Featuring a private infinity pool, spacious living areas, and breathtaking views.',
        wifiStrength: 9.5,
        noiseLevel: 2.0,
        workspaceRating: 8.0,
        petAllowed: true,
        petSize: 'any',
        petAmenities: ['Fenced yard', 'Pet bowls'],
        nearbyParks: true,
        spaceSize: 3500,
        luxuryAmenities: ['Infinity Pool', 'Chef Kitchen', 'Wine Cellar'],
        romanticScore: 9.8,
        familyScore: 8.5,
        adventureScore: 6.0
    },
    {
        title: 'Cozy Mountain Cabin',
        location: 'Aspen, Colorado',
        price: 220,
        rating: 4.8,
        type: 'Cabins',
        lat: 39.1911,
        lng: -106.8175,
        images: [
            'https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['Mountain View', 'Fireplace', 'WiFi', 'Hiking Trails'],
        description: 'Escape to the mountains in this cozy cabin. Perfect for a romantic getaway or a family vacation.',
        wifiStrength: 7.0,
        noiseLevel: 1.0,
        workspaceRating: 6.0,
        petAllowed: true,
        petSize: 'large',
        petAmenities: ['Dog bed', 'Treats'],
        nearbyParks: true,
        spaceSize: 1200,
        luxuryAmenities: ['Hot Tub', 'Fireplace'],
        romanticScore: 9.5,
        familyScore: 7.0,
        adventureScore: 9.5
    },
    {
        title: 'Modern Apartment in City Center',
        location: 'New York, New York',
        price: 180,
        rating: 4.7,
        type: 'Iconic cities',
        lat: 40.7128,
        lng: -74.0060,
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['City View', 'WiFi', 'Kitchen', 'Elevator', 'Gym'],
        description: 'Stay in the heart of the city in this modern apartment. Close to all major attractions and public transport.',
        wifiStrength: 9.8,
        noiseLevel: 7.5,
        workspaceRating: 9.5,
        petAllowed: false,
        petSize: null,
        petAmenities: [],
        nearbyParks: true,
        spaceSize: 850,
        luxuryAmenities: ['Smart Home', 'Concierge'],
        romanticScore: 6.0,
        familyScore: 5.0,
        adventureScore: 4.0
    },
    {
        title: 'Secluded Treehouse',
        location: 'Bali, Indonesia',
        price: 120,
        rating: 4.95,
        type: 'Tropical',
        lat: -8.4095,
        lng: 115.1889,
        images: [
            'https://images.unsplash.com/photo-1488415032361-b7e238421f1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['Nature', 'WiFi', 'Breakfast', 'Hammock'],
        description: 'Experience nature like never before in this secluded treehouse. Surrounded by lush greenery and wildlife.',
        wifiStrength: 6.5,
        noiseLevel: 1.5,
        workspaceRating: 7.0,
        petAllowed: false,
        petSize: null,
        petAmenities: [],
        nearbyParks: false,
        spaceSize: 600,
        luxuryAmenities: ['Outdoor Shower'],
        romanticScore: 9.0,
        familyScore: 4.0,
        adventureScore: 9.8
    },
    {
        title: 'Beachfront Bungalow',
        location: 'Maui, Hawaii',
        price: 450,
        rating: 4.85,
        type: 'Amazing pools',
        lat: 20.7984,
        lng: -156.3319,
        images: [
            'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['Beach Access', 'Pool', 'WiFi', 'Kitchen', 'Kayaks'],
        description: 'Wake up to the sound of waves in this beachfront bungalow. Direct access to the beach and stunning sunsets.',
        wifiStrength: 8.0,
        noiseLevel: 3.0,
        workspaceRating: 5.0,
        petAllowed: true,
        petSize: 'medium',
        petAmenities: ['Beach towel for dogs'],
        nearbyParks: true,
        spaceSize: 1500,
        luxuryAmenities: ['Private Beach', 'Jacuzzi'],
        romanticScore: 8.5,
        familyScore: 9.0,
        adventureScore: 9.0
    },
    {
        title: 'Historic Castle Stay',
        location: 'Edinburgh, Scotland',
        price: 600,
        rating: 5.0,
        type: 'Castles',
        lat: 55.9533,
        lng: -3.1883,
        images: [
            'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['History', 'Garden', 'WiFi', 'Library', 'Grand Hall'],
        description: 'Live like royalty in this historic castle. Explore the grounds and enjoy the rich history of the area.',
        wifiStrength: 7.5,
        noiseLevel: 2.0,
        workspaceRating: 6.0,
        petAllowed: true,
        petSize: 'any',
        petAmenities: ['Large grounds'],
        nearbyParks: true,
        spaceSize: 8000,
        luxuryAmenities: ['Butler Service', 'Antique Furniture'],
        romanticScore: 9.2,
        familyScore: 8.0,
        adventureScore: 7.0
    },
    {
        title: 'Residency Hotel',
        location: 'Mumbai, India',
        price: 150,
        rating: 4.6,
        type: 'Iconic cities',
        lat: 19.0760,
        lng: 72.8777,
        images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['City View', 'WiFi', 'Restaurant', 'Gym', 'Conference Room'],
        description: 'Enjoy a luxurious stay at the Residency Hotel in the heart of Mumbai. Close to business districts and tourist attractions.',
        wifiStrength: 9.0,
        noiseLevel: 6.0,
        workspaceRating: 9.0,
        petAllowed: false,
        petSize: null,
        petAmenities: [],
        nearbyParks: false,
        spaceSize: 400,
        luxuryAmenities: ['Room Service', 'Spa'],
        romanticScore: 5.0,
        familyScore: 6.0,
        adventureScore: 3.0
    },
];

const prisma = new PrismaClient();

console.log('Prisma keys:', Object.keys(prisma));

async function main() {
    console.log('Start seeding ...');

    // Create a default host user
    const host = await prisma.user.upsert({
        where: { email: 'host@example.com' },
        update: {},
        create: {
            email: 'host@example.com',
            name: 'Host User',
            password: 'password', // In a real app, hash this!
            image: 'https://i.pravatar.cc/150?u=host',
        },
    });

    console.log(`Created user with id: ${host.id}`);

    // Clear existing listings
    await prisma.listing.deleteMany({});
    console.log('Cleared existing listings');

    for (const listing of mockListings) {
        const createdListing = await prisma.listing.create({
            data: {
                title: listing.title,
                description: listing.description,
                price: listing.price,
                location: listing.location,
                rating: listing.rating,
                type: listing.type || 'Entire home', // Default if missing
                lat: listing.lat,
                lng: listing.lng,
                images: listing.images,
                amenities: listing.amenities,
                hostId: host.id,
                // New Advanced Filter Fields
                wifiStrength: listing.wifiStrength,
                noiseLevel: listing.noiseLevel,
                workspaceRating: listing.workspaceRating,
                petAllowed: listing.petAllowed,
                petSize: listing.petSize,
                petAmenities: listing.petAmenities,
                nearbyParks: listing.nearbyParks,
                spaceSize: listing.spaceSize,
                luxuryAmenities: listing.luxuryAmenities,
                romanticScore: listing.romanticScore,
                familyScore: listing.familyScore,
                adventureScore: listing.adventureScore,
            },
        });
        console.log(`Created listing with id: ${createdListing.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
