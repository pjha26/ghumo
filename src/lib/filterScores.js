// Filter Score Calculation Utilities

/**
 * Calculate Work-from-Travel Score
 * Formula: (wifiStrength * 0.4) + ((10 - noiseLevel) * 0.3) + (workspaceRating * 0.3)
 * @param {number} wifiStrength - WiFi strength rating (1-10)
 * @param {number} noiseLevel - Noise level (1-10, lower is better)
 * @param {number} workspaceRating - Workspace quality rating (1-10)
 * @returns {number} Work-from-Travel score (0-10)
 */
export function calculateWorkTravelScore(wifiStrength, noiseLevel, workspaceRating) {
    const wifiScore = wifiStrength * 0.4;
    const quietScore = (10 - noiseLevel) * 0.3;
    const workspaceScore = workspaceRating * 0.3;

    return Math.round((wifiScore + quietScore + workspaceScore) * 10) / 10;
}

/**
 * Calculate Pet-Friendly Score
 * @param {boolean} petAllowed - Whether pets are allowed
 * @param {string} petSize - Allowed pet size ("small", "medium", "large", "any")
 * @param {string[]} petAmenities - Available pet amenities
 * @param {boolean} nearbyParks - Whether there are nearby parks
 * @returns {number} Pet-Friendly score (0-10)
 */
export function calculatePetFriendlyScore(petAllowed, petSize, petAmenities = [], nearbyParks) {
    if (!petAllowed) return 0;

    let score = 3; // Base score for allowing pets

    // Pet size flexibility
    if (petSize === 'any') score += 2;
    else if (petSize === 'large') score += 1.5;
    else if (petSize === 'medium') score += 1;
    else score += 0.5;

    // Pet amenities (max 3 points)
    const amenityScore = Math.min(petAmenities.length * 0.75, 3);
    score += amenityScore;

    // Nearby parks
    if (nearbyParks) score += 2;

    return Math.min(Math.round(score * 10) / 10, 10);
}

/**
 * Calculate Comfort Score
 * @param {number} amenitiesCount - Total number of amenities
 * @param {number} rating - Listing rating
 * @param {number} spaceSize - Space size in sq ft
 * @param {string[]} luxuryAmenities - Luxury amenities
 * @returns {number} Comfort score (0-10)
 */
export function calculateComfortScore(amenitiesCount, rating, spaceSize, luxuryAmenities = []) {
    const amenityScore = Math.min(amenitiesCount / 10, 1) * 3; // Max 3 points
    const ratingScore = (rating / 5) * 3; // Max 3 points
    const spaceScore = spaceSize ? Math.min(spaceSize / 1000, 1) * 2 : 1; // Max 2 points
    const luxuryScore = Math.min(luxuryAmenities.length * 0.5, 2); // Max 2 points

    return Math.round((amenityScore + ratingScore + spaceScore + luxuryScore) * 10) / 10;
}

/**
 * Calculate Budget vs Comfort weighted score
 * @param {number} listingPrice - Listing price
 * @param {number} maxPrice - Maximum price in filter
 * @param {number} comfortScore - Comfort score (0-10)
 * @param {number} budgetWeight - Budget weight (0-1, where 0 is all comfort, 1 is all budget)
 * @returns {number} Weighted score
 */
export function calculateBudgetComfortScore(listingPrice, maxPrice, comfortScore, budgetWeight = 0.5) {
    const budgetScore = maxPrice > 0 ? ((maxPrice - listingPrice) / maxPrice) * 10 : 5;
    const comfortWeight = 1 - budgetWeight;

    return Math.round((budgetScore * budgetWeight + comfortScore * comfortWeight) * 10) / 10;
}

/**
 * Calculate Romantic Mode Score
 * @param {string[]} amenities - Listing amenities
 * @param {string[]} luxuryAmenities - Luxury amenities
 * @param {string} type - Listing type
 * @returns {number} Romantic score (0-10)
 */
export function calculateRomanticScore(amenities = [], luxuryAmenities = [], type) {
    let score = 0;

    // Romantic amenities
    const romanticAmenities = ['hot_tub', 'fireplace', 'balcony', 'scenic_view', 'jacuzzi', 'wine_glasses'];
    const hasRomanticAmenities = romanticAmenities.filter(a =>
        amenities.includes(a) || luxuryAmenities.includes(a)
    ).length;
    score += hasRomanticAmenities * 1.5;

    // Privacy (villas, cottages score higher)
    if (['Villa', 'Cottage', 'Cabin'].includes(type)) score += 2;
    else if (type === 'Apartment') score += 0.5;

    // Luxury amenities boost
    score += Math.min(luxuryAmenities.length * 0.5, 2);

    return Math.min(Math.round(score * 10) / 10, 10);
}

/**
 * Calculate Family Mode Score
 * @param {number} maxGuests - Maximum guests
 * @param {string[]} amenities - Listing amenities
 * @param {string} type - Listing type
 * @returns {number} Family score (0-10)
 */
export function calculateFamilyScore(maxGuests, amenities = [], type) {
    let score = 0;

    // Space for family
    if (maxGuests >= 6) score += 3;
    else if (maxGuests >= 4) score += 2;
    else if (maxGuests >= 2) score += 1;

    // Family-friendly amenities
    const familyAmenities = ['kitchen', 'washer', 'tv', 'wifi', 'parking', 'crib', 'high_chair', 'games'];
    const hasFamilyAmenities = familyAmenities.filter(a => amenities.includes(a)).length;
    score += hasFamilyAmenities * 0.7;

    // Family-friendly types
    if (['House', 'Villa', 'Apartment'].includes(type)) score += 2;

    return Math.min(Math.round(score * 10) / 10, 10);
}

/**
 * Calculate Adventure Mode Score
 * @param {string[]} amenities - Listing amenities
 * @param {string[]} luxuryAmenities - Luxury amenities
 * @param {string} type - Listing type
 * @param {string} location - Listing location
 * @returns {number} Adventure score (0-10)
 */
export function calculateAdventureScore(amenities = [], luxuryAmenities = [], type, location) {
    let score = 0;

    // Adventure amenities
    const adventureAmenities = ['bike', 'kayak', 'hiking_gear', 'ski_equipment', 'beach_access', 'mountain_view'];
    const hasAdventureAmenities = adventureAmenities.filter(a =>
        amenities.includes(a) || luxuryAmenities.includes(a)
    ).length;
    score += hasAdventureAmenities * 1.5;

    // Adventure-friendly types
    if (['Cabin', 'Cottage', 'Treehouse', 'Tent'].includes(type)) score += 3;
    else if (['Villa', 'House'].includes(type)) score += 1;

    // Location keywords (mountains, beach, forest, etc.)
    const adventureLocations = ['mountain', 'beach', 'forest', 'lake', 'river', 'hill'];
    const hasAdventureLocation = adventureLocations.some(loc =>
        location.toLowerCase().includes(loc)
    );
    if (hasAdventureLocation) score += 2;

    return Math.min(Math.round(score * 10) / 10, 10);
}

/**
 * Apply all score calculations to a listing
 * @param {Object} listing - Listing object
 * @returns {Object} Listing with calculated scores
 */
export function calculateAllScores(listing) {
    return {
        ...listing,
        workTravelScore: calculateWorkTravelScore(
            listing.wifiStrength,
            listing.noiseLevel,
            listing.workspaceRating
        ),
        petFriendlyScore: calculatePetFriendlyScore(
            listing.petAllowed,
            listing.petSize,
            listing.petAmenities,
            listing.nearbyParks
        ),
        comfortScore: calculateComfortScore(
            listing.amenities?.length || 0,
            listing.rating,
            listing.spaceSize,
            listing.luxuryAmenities
        ),
        romanticScore: listing.romanticScore || calculateRomanticScore(
            listing.amenities,
            listing.luxuryAmenities,
            listing.type
        ),
        familyScore: listing.familyScore || calculateFamilyScore(
            listing.maxGuests,
            listing.amenities,
            listing.type
        ),
        adventureScore: listing.adventureScore || calculateAdventureScore(
            listing.amenities,
            listing.luxuryAmenities,
            listing.type,
            listing.location
        )
    };
}
