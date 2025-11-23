const { PrismaClient } = require('@prisma/client');

const bengaluruHotels = [
    {
        name: "The Oberoi Bengaluru",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "MG Road",
        rating: 4.8,
        pricePerNight: 18000,
        address: "37-39 MG Road, Bengaluru",
        amenities: ["WiFi", "Pool", "Spa", "Garden View", "Restaurant", "Bar"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Taj MG Road Bengaluru",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Trinity Circle",
        rating: 4.7,
        pricePerNight: 14000,
        address: "41/3 MG Road, Bengaluru",
        amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Spa"],
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "ITC Gardenia",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Residency Road",
        rating: 4.6,
        pricePerNight: 13000,
        address: "1 Residency Road, Bengaluru",
        amenities: ["Pool", "Gym", "Spa", "Restaurant", "Eco-Friendly"],
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "The Ritz-Carlton Bengaluru",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Residency Road",
        rating: 4.8,
        pricePerNight: 24000,
        address: "99 Residency Road, Bengaluru",
        amenities: ["Luxury Spa", "Pool", "City View", "Fine Dining"],
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "JW Marriott Bengaluru",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "UB City",
        rating: 4.7,
        pricePerNight: 19000,
        address: "24/1 Vittal Mallya Road, Bengaluru",
        amenities: ["WiFi", "Pool", "Restaurant", "Luxury Spa"],
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Sheraton Grand Bengaluru at Brigade Gateway",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Brigade Gateway",
        rating: 4.6,
        pricePerNight: 12000,
        address: "26/1 Dr Rajkumar Road, Bengaluru",
        amenities: ["Pool", "Gym", "Spa", "Lake View", "Restaurant"],
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "The Leela Palace Bengaluru",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Old Airport Road",
        rating: 4.8,
        pricePerNight: 28000,
        address: "23 HAL Old Airport Road, Bengaluru",
        amenities: ["Luxury Spa", "Pool", "Garden", "Fine Dining"],
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Conrad Bengaluru",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Ulsoor Lake",
        rating: 4.7,
        pricePerNight: 16000,
        address: "25 Kensington Road, Bengaluru",
        amenities: ["Lake View", "Pool", "Spa", "Restaurant"],
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "St. Mark's Hotel",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "St. Mark's Road",
        rating: 4.5,
        pricePerNight: 6500,
        address: "4/1 St. Mark's Road, Bengaluru",
        amenities: ["WiFi", "Restaurant", "City Center"],
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Aloft Bengaluru Cessna Business Park",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Marathahalli",
        rating: 4.4,
        pricePerNight: 8500,
        address: "Cessna Business Park, Bengaluru",
        amenities: ["WiFi", "Gym", "Pool", "Restaurant"],
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "The Den Bengaluru",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Whitefield",
        rating: 4.6,
        pricePerNight: 10500,
        address: "ITPL Main Road, Whitefield",
        amenities: ["WiFi", "Pool", "Restaurant", "Work Lounge"],
        image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Vivanta Bengaluru Residency Road",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Residency Road",
        rating: 4.5,
        pricePerNight: 7500,
        address: "66 Residency Road, Bengaluru",
        amenities: ["WiFi", "Pool", "Bar", "Restaurant"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Four Seasons Hotel Bengaluru",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Bellary Road",
        rating: 4.8,
        pricePerNight: 21000,
        address: "8 Bellary Road, Bengaluru",
        amenities: ["Pool", "Spa", "Luxury Dining", "Bar"],
        image: "https://images.unsplash.com/photo-1571896349842-6e53ce41e86a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Radisson Blu Atria Bengaluru",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Palace Road",
        rating: 4.4,
        pricePerNight: 6000,
        address: "1 Palace Road, Bengaluru",
        amenities: ["Restaurant", "WiFi", "Gym"],
        image: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Courtyard by Marriott Hebbal",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Hebbal Lake",
        rating: 4.6,
        pricePerNight: 9500,
        address: "Manyata Tech Park, Hebbal",
        amenities: ["Lake View", "Pool", "Gym", "Restaurant"],
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Shangri-La Hotel Bengaluru",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Palace Road",
        rating: 4.7,
        pricePerNight: 20000,
        address: "56 Palace Road, Bengaluru",
        amenities: ["Spa", "Pool", "Fine Dining", "City View"],
        image: "https://images.unsplash.com/photo-1560200353-ce0a76b1d438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Holiday Inn Bengaluru Racecourse",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Racecourse Road",
        rating: 4.3,
        pricePerNight: 5500,
        address: "20 Racecourse Road, Bengaluru",
        amenities: ["WiFi", "Restaurant", "Gym"],
        image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Lemon Tree Premier Ulsoor Lake",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Ulsoor",
        rating: 4.2,
        pricePerNight: 5200,
        address: "23/1 Kensington Road, Bengaluru",
        amenities: ["WiFi", "Gym", "Restaurant"],
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Sterlings Mac Hotel Bengaluru",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Old Airport Road",
        rating: 4.1,
        pricePerNight: 5800,
        address: "134 HAL Airport Road, Bengaluru",
        amenities: ["WiFi", "Pool", "Restaurant"],
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "The Zuri Whitefield Bengaluru",
        city: "Bengaluru",
        state: "Karnataka",
        neighborhood: "Whitefield",
        rating: 4.3,
        pricePerNight: 6800,
        address: "Nallurhalli, Whitefield, Bengaluru",
        amenities: ["WiFi", "Pool", "Spa", "Restaurant"],
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
        const createdListing = await prisma.listing.create({
            data: {
                title: hotel.name,
                description: `Experience luxury and comfort at ${hotel.name}, located in the heart of ${hotel.neighborhood}, ${hotel.city}. Perfect for business and leisure travelers.`,
                price: hotel.pricePerNight,
                location: `${hotel.neighborhood}, ${hotel.city}`,
                rating: hotel.rating,
                type: 'Hotel',
                images: [hotel.image, hotel.image, hotel.image], // Repeat image for gallery
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
