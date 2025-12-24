# 🏡 Ghumo- Premium Accommodation Booking Platform

A feature-rich, production-ready Airbnb clone built with Next.js 16, featuring advanced booking capabilities, dynamic pricing, admin dashboard, payment integration, and intelligent travel mode recommendations.

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=flat-square&logo=mongodb)
![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?style=flat-square&logo=prisma)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe)

## ✨ Features

### 🎯 Core Functionality
- **Advanced Search & Filters**: Multi-criteria filtering including location, price range, amenities, property type, and guest capacity
- **Smart Travel Modes**: Personalized recommendations based on travel style
  - 💑 Romantic getaways
  - 👨‍👩‍👧‍👦 Family-friendly stays
  - 🏔️ Adventure destinations
  - 💼 Work-from-travel optimized spaces
  - 🐾 Pet-friendly accommodations
- **Interactive Maps**: Google Maps integration with location markers and heatmaps
- **Real-time Availability**: Dynamic calendar with date range selection
- **Favorites System**: Save and manage favorite listings
- **User Profiles**: Complete profile management with image uploads via Cloudinary

### 💳 Payments & Bookings
- **Stripe Integration**: Secure payment processing
- **Dynamic Pricing**: Intelligent pricing based on:
  - Weekend multipliers
  - Seasonal adjustments
  - Demand-based pricing
- **PDF Receipts**: Downloadable booking receipts with jsPDF
- **Booking Management**: View and manage all reservations

### 🎨 UI/UX Excellence
- **Dark Mode**: Seamless theme switching with Lottie animations
- **Responsive Design**: Mobile-first approach with Tailwind CSS 4.0
- **Smooth Animations**: GSAP and Framer Motion for premium interactions
- **Parallax Effects**: Engaging visual effects throughout
- **Image Carousels**: Swiper.js for beautiful property galleries
- **Glassmorphism**: Modern UI design patterns

### 🔐 Authentication & Security
- **Clerk Authentication**: Secure user authentication and session management
- **Role-based Access**: Admin and user roles
- **Protected Routes**: Middleware-based route protection

### 📊 Admin Dashboard
- **User Management**: View, block/unblock users
- **Listing Management**: CRUD operations for properties
- **Reservation Analytics**: Track bookings and revenue
- **Statistics Dashboard**: Visual analytics with Recharts

### 🌍 Internationalization
- **Multi-language Support**: Built with next-intl
- **Localized Content**: Support for multiple languages

### 🗺️ Advanced Features
- **Leaflet Maps**: Interactive property location maps
- **Heat Maps**: Visualize popular areas
- **Coordinate-based Search**: Latitude/longitude filtering
- **Nearby Amenities**: Display proximity to attractions

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0.3 (App Router)
- **UI Library**: React 19.2.0
- **Styling**: Tailwind CSS 4.0
- **Animations**: 
  - Framer Motion 12.23.24
  - GSAP 3.13.0
  - Lottie React 2.4.1
- **Components**: 
  - Swiper 12.0.3 (Carousels)
  - React Date Range 2.0.1
  - Lucide React (Icons)
- **Maps**: 
  - React Leaflet 5.0.0
  - Google Maps API

### Backend
- **Database**: MongoDB
- **ORM**: Prisma 5.22.0
- **Authentication**: Clerk 6.35.4
- **Payments**: Stripe 20.0.0
- **File Upload**: Cloudinary
- **PDF Generation**: jsPDF 3.0.4

### State Management
- **Zustand**: 5.0.8 (Lightweight state management)

### Developer Tools
- **Linting**: ESLint 9
- **Compiler**: React Compiler (Babel Plugin)
- **PostCSS**: Autoprefixer

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn/pnpm)
- **MongoDB**: Atlas account or local MongoDB instance
- **Git**: For version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd airbnb-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database with sample data (optional)
node prisma/seed.js
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
airbnb-clone/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin dashboard routes
│   │   ├── api/               # API routes
│   │   ├── favorites/         # Favorites page
│   │   ├── map/               # Map view page
│   │   ├── payment/           # Payment pages
│   │   ├── profile/           # User profile
│   │   ├── rooms/             # Listing details
│   │   ├── sign-in/           # Authentication
│   │   ├── sign-up/           # Registration
│   │   └── trips/             # User bookings
│   ├── components/            # React components
│   │   ├── Admin/            # Admin components
│   │   ├── Animations/       # Animation components
│   │   ├── Filters/          # Search filters
│   │   ├── Footer/           # Footer component
│   │   ├── Header/           # Header/Navigation
│   │   ├── Home/             # Homepage components
│   │   ├── Inputs/           # Form inputs
│   │   ├── Listing/          # Listing components
│   │   ├── Map/              # Map components
│   │   ├── Toast/            # Notifications
│   │   └── ui/               # Reusable UI components
│   ├── data/                  # Static data
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   ├── store/                 # Zustand stores
│   └── utils/                 # Helper functions
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.js               # Database seeding
├── public/                    # Static assets
├── messages/                  # i18n translations
└── package.json              # Dependencies
```

## 🎮 Usage

### For Users

1. **Browse Listings**: Explore available properties on the homepage
2. **Filter & Search**: Use advanced filters to find perfect accommodations
3. **View Details**: Click on any listing to see full details, amenities, and location
4. **Book Property**: Select dates, number of guests, and proceed to payment
5. **Manage Bookings**: View all your trips in the "My Trips" section
6. **Download Receipts**: Get PDF receipts for completed bookings
7. **Save Favorites**: Heart icon to save properties for later
8. **Update Profile**: Manage your profile and upload profile picture

### For Admins

1. **Access Dashboard**: Navigate to `/admin` (requires admin role)
2. **Manage Users**: View all users, block/unblock accounts
3. **Manage Listings**: Create, edit, or delete property listings
4. **View Analytics**: Track reservations and revenue statistics
5. **Monitor Bookings**: Oversee all platform reservations

## 🔑 Key Features Explained

### Dynamic Pricing Algorithm

The platform uses a sophisticated pricing model:
- **Base Price**: Starting price for the property
- **Weekend Multiplier**: 1.25x increase for Friday-Sunday
- **Seasonal Multiplier**: Adjusts for peak/off-peak seasons
- **Demand Multiplier**: Real-time pricing based on booking demand

### Travel Mode Scoring

Each listing is scored across multiple dimensions:
- **Romantic Score**: Privacy, ambiance, special amenities
- **Family Score**: Space, safety, kid-friendly features
- **Adventure Score**: Proximity to activities, outdoor access
- **Work-from-Travel**: WiFi strength, workspace quality, noise level
- **Pet-Friendly**: Pet amenities, nearby parks, size allowances

### Smart Filters

Advanced filtering system includes:
- Price range slider
- Property type (apartment, house, villa, etc.)
- Amenities checklist
- Guest capacity
- Location-based search
- Travel mode preferences
- Pet-friendly options
- Work-friendly spaces

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production (test build)
npm run build

# Start production server
npm start
```

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The application can be deployed to any platform supporting Next.js:
- AWS Amplify
- Netlify
- Railway
- DigitalOcean App Platform

## 🔧 Configuration

### Tailwind CSS

Configuration in `tailwind.config.js` includes custom colors, animations, and utilities.

### Next.js

Configuration in `next.config.mjs` handles:
- Image optimization domains
- React compiler settings
- Remote patterns for external images

### Prisma

Schema in `prisma/schema.prisma` defines:
- User model with authentication
- Listing model with advanced features
- Reservation model with payment tracking
- Favorite model for saved listings

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Vercel**: For hosting and deployment platform
- **Clerk**: For authentication solution
- **Stripe**: For payment processing
- **Prisma**: For database ORM
- **Tailwind CSS**: For utility-first CSS framework

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

## 🚀 Future Enhancements

- [ ] Real-time chat between hosts and guests
- [ ] Review and rating system
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Social media integration
- [ ] Multi-currency support
- [ ] Advanced search with AI recommendations
- [ ] Virtual tours (360° images)
- [ ] Host calendar management

---

**Built with ❤️ using Next.js and modern web technologies**
