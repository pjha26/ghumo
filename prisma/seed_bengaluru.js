const { PrismaClient } = require('@prisma/client');

const bengaluruHotels = [
    {
        name: "The Oberoi, Bengaluru",
        address: "37-39 MG Road, Bengaluru, Karnataka",
        neighborhood: "MG Road",
        rating: 4.8,
        pricePerNight: 18000,
        distanceFromMG_Road_km: 0.3,
        distanceFromAirport_km: 38,
        lat: 12.9718,
        lng: 77.5946,
        images: [
            "https://images.unsplash.com/photo-1613977257365-a65e67c4e52a?auto=format&fit=crop&w=1400&q=80"
        ],
        amenities: ["WiFi", "Pool", "Spa", "Garden View", "Restaurant", "Bar"]
    },
    {
        name: "Taj MG Road, Bengaluru",
        address: "41/3 Mahatma Gandhi Road, Bengaluru, Karnataka",
        neighborhood: "MG Road / Trinity Circle",
        rating: 4.7,
        pricePerNight: 14000,
        distanceFromMG_Road_km: 0.5,
        distanceFromAirport_km: 39,
        lat: 12.9712,
        lng: 77.6055,
        images: [
            "https://images.unsplash.com/photo-1501117716987-c8e1ecb2101f?auto=format&fit=crop&w=1400&q=80"
        ],
        amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Spa"]
    },
    {
        name: "ITC Gardenia, Bengaluru",
        address: "1 Residency Road, Bengaluru, Karnataka",
        neighborhood: "Residency Road / Richmond Town",
        rating: 4.6,
        pricePerNight: 13000,
        distanceFromMG_Road_km: 1.1,
        distanceFromAirport_km: 36,
        lat: 12.9717,
        lng: 77.5930,
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80"
        ],
        amenities: ["Pool", "Gym", "Spa", "Restaurant", "Eco-Friendly"]
    },
    {
        name: "The Ritz-Carlton, Bangalore",
        address: "99 Residency Road, Bengaluru, Karnataka",
        neighborhood: "Residency Road",
        rating: 4.8,
        pricePerNight: 24000,
        distanceFromMG_Road_km: 1.3,
        distanceFromAirport_km: 37,
        lat: 12.9725,
        lng: 77.5969,
        images: [
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80"
        ],
        amenities: ["Luxury Spa", "Pool", "City View", "Fine Dining"]
    },
    {
        name: "JW Marriott Bengaluru (UB City)",
        address: "24/1 Vittal Mallya Road, Bengaluru, Karnataka",
        neighborhood: "UB City / MG Road",
        rating: 4.7,
        pricePerNight: 19000,
        distanceFromMG_Road_km: 0.6,
        distanceFromAirport_km: 38,
        lat: 12.9719,
        lng: 77.6036,
        images: [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80"
        ],
        amenities: ["WiFi", "Pool", "Restaurant", "Luxury Spa"]
    },
    {
        name: "Sheraton Grand Bengaluru at Brigade Gateway",
        address: "26/1 Dr Rajkumar Road, Malleshwaram (Brigade Gateway), Bengaluru",
        neighborhood: "Brigade Gateway / Malleshwaram",
        rating: 4.6,
        pricePerNight: 12000,
        distanceFromMG_Road_km: 7.5,
        distanceFromAirport_km: 32,
        lat: 13.0009,
        lng: 77.5691,
        images: [
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80"
        ],
        amenities: ["Pool", "Gym", "Spa", "Lake View", "Restaurant"]
    },
    {
        name: "The Leela Palace Bengaluru",
        address: "23 HAL Old Airport Road, Bengaluru, Karnataka",
        neighborhood: "Old Airport Road",
        rating: 4.8,
        pricePerNight: 28000,
        distanceFromMG_Road_km: 6.5,
        distanceFromAirport_km: 9,
        lat: 12.9592,
        lng: 77.6433,
        images: [
            "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1400&q=80"
        ],
        amenities: ["Luxury Spa", "Pool", "Garden", "Fine Dining"]
    },
    {
        name: "Conrad Bengaluru",
        address: "25 Kensington Road, Bengaluru, Karnataka",
        neighborhood: "Ulsoor / Cunningham Road",
        rating: 4.7,
        pricePerNight: 16000,
        distanceFromMG_Road_km: 3.0,
        distanceFromAirport_km: 35,
        lat: 12.9738,
        lng: 77.6143,
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80"
        ],
        amenities: ["Lake View", "Pool", "Spa", "Restaurant"]
    },
    {
        name: "St. Mark's Hotel, Bengaluru",
        address: "4/1 St. Mark's Road, Bengaluru, Karnataka",
        neighborhood: "St. Mark's Road",
        rating: 4.5,
        pricePerNight: 6500,
        distanceFromMG_Road_km: 0.8,
        distanceFromAirport_km: 37,
        lat: 12.9751,
        lng: 77.6042,
        images: [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80"
        ],
        amenities: ["WiFi", "Restaurant", "City Center"]
    },
    {
        name: "Aloft Bengaluru Cessna Business Park",
        address: "Cessna Business Park, Manyata Tech Park area, Bengaluru",
        neighborhood: "Marathahalli / Outer Ring Road",
        rating: 4.4,
        pricePerNight: 8500,
        distanceFromMG_Road_km: 16,
        distanceFromAirport_km: 40,
        lat: 12.9539,
        lng: 77.7011,
        images: [
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1400&q=80"
        ],
        amenities: ["WiFi", "Gym", "Pool", "Restaurant"]
    },
    {
        name: "The Den Bengaluru (Whitefield)",
        address: "ITPL Main Road, Whitefield, Bengaluru, Karnataka",
        neighborhood: "Whitefield / ITPL",
        rating: 4.6,
        pricePerNight: 10500,
        distanceFromMG_Road_km: 22,
        distanceFromAirport_km: 29,
        lat: 12.9699,
        lng: 77.7521,
        images: [
            "https://images.unsplash.com/photo-1586611292717-3ce3ac1a50da?auto=format&fit=crop&w=1400&q=80"
        ],
        amenities: ["WiFi", "Pool", "Restaurant", "Work Lounge"]
    },
    {
        name: "Courtyard by Marriott Bengaluru Hebbal",
        address: "Manyata Tech Park / Nagawara - Hebbal area, Bengaluru",
        neighborhood: "Hebbal / Manyata Tech Park",
        rating: 4.6,
        pricePerNight: 9500,
        distanceFromMG_Road_km: 10,
        distanceFromAirport_km: 25,
        lat: 13.0358,
        lng: 77.6097,
        images: [
            "https://images.unsplash.com/photo-1618773928121-c32242e63f54?auto=format&fit=crop&w=1400&q=80"
        ],
        amenities: ["Lake View", "Pool", "Gym", "Restaurant"]
    }
];

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding Bengaluru hotels ...');

    // Clear existing listings
    console.log('Clearing existing listings...');
    await prisma.listing.deleteMany({});
    console.log('Existing listings cleared.');

    // Find the host user
    let host = await prisma.user.findUnique({
        where: { email: 'host@example.com' },
    });

    if (!host) {
        console.log('Host not found, creating default host...');
        host = await prisma.user.create({
            data: {
                email: 'host@example.com',
                name: 'Host User',
                password: 'password',
                image: 'https://i.pravatar.cc/150?u=host',
            },
        });
    }

    for (const hotel of bengaluruHotels) {
        // Construct a description that includes the new fields
        const description = `Experience luxury at ${hotel.name}. Located in ${hotel.neighborhood}. 
        Distance from MG Road: ${hotel.distanceFromMG_Road_km} km. 
        Distance from Airport: ${hotel.distanceFromAirport_km} km.
        Address: ${hotel.address}`;

        // Duplicate images to have a gallery
        const galleryImages = [...hotel.images, ...hotel.images, ...hotel.images].slice(0, 5);

        const createdListing = await prisma.listing.create({
            data: {
                title: hotel.name,
                description: description,
                price: hotel.pricePerNight,
                location: hotel.neighborhood, // Use neighborhood as short location
                rating: hotel.rating,
                type: 'Hotel',
                images: galleryImages,
                amenities: hotel.amenities,
                hostId: host.id,
            },
        });
        console.log(`Created listing: ${hotel.name}`);
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
