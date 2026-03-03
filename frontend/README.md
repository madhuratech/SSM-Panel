# SocialBoost - Social Media Growth Platform

A clean, professional, and modular React frontend for social media growth services.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── assets/              # Images and icons (empty, ready for use)
├── components/
│   ├── layout/         # Layout components
│   │   ├── Navbar.jsx  # Navigation bar with routing
│   │   └── Footer.jsx  # Footer with links
│   ├── home/           # Home page sections
│   │   ├── Hero.jsx    # Hero section with CTA
│   │   ├── Services.jsx # Platform cards
│   │   ├── Features.jsx # Feature highlights
│   │   └── Testimonials.jsx # Customer reviews
│   ├── service/        # Service page components
│   │   ├── ServiceCard.jsx # Service selection card
│   │   ├── QuantitySelector.jsx # Quantity input
│   │   └── PriceCalculator.jsx # Real-time pricing
│   └── common/         # Reusable components
│       ├── Button.jsx  # Button component
│       └── SectionWrapper.jsx # Section container
├── pages/              # Page components
│   ├── Home.jsx        # Homepage
│   ├── TikTok.jsx      # TikTok services
│   ├── Instagram.jsx   # Instagram services
│   ├── Facebook.jsx    # Facebook services
│   ├── YouTube.jsx     # YouTube services
│   └── Checkout.jsx    # Checkout page
├── routes/
│   └── AppRoutes.jsx   # Centralized routing
├── utils/
│   └── pricing.js      # Pricing logic
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🛣 Routing

Routes are defined in `src/routes/AppRoutes.jsx`:

- `/` - Home page
- `/tiktok` - TikTok services
- `/instagram` - Instagram services
- `/facebook` - Facebook services
- `/youtube` - YouTube services
- `/checkout` - Checkout page

## 💰 Pricing Logic

Pricing is handled in `src/utils/pricing.js`:

### Configuration
```javascript
PRICING = {
  tiktok: {
    views: { base: 50, per1000: 50 },
    followers: { base: 100, per1000: 100 },
    // ...
  }
}
```

### Functions
- `calculatePrice(platform, service, quantity)` - Calculates total price
- `formatPrice(price)` - Formats price for display (₹X,XXX)

### How it works
1. User selects platform (TikTok, Instagram, etc.)
2. User selects service (Views, Followers, etc.)
3. User enters quantity
4. Price updates automatically in real-time
5. Calculation: `(quantity / 1000) * pricePerThousand`

## 🎨 Design System

### Colors
- **Primary**: Blue (#0284c7) - Main brand color
- **Accent**: Purple (#c026d3) - Secondary highlights
- **Background**: White/Gray-50 - Clean, professional look

### Components
All components are modular and reusable:

#### Button
```jsx
<Button variant="primary|secondary|outline" size="sm|md|lg">
  Click Me
</Button>
```

#### SectionWrapper
```jsx
<SectionWrapper background="white|gray|gradient">
  {children}
</SectionWrapper>
```

## 🔌 Backend Integration

The frontend is ready for backend integration:

### 1. API Service
Create `src/services/api.js`:
```javascript
const API_URL = 'https://your-api.com'

export async function createOrder(orderData) {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
  return response.json()
}
```

### 2. Update Checkout
In `src/pages/Checkout.jsx`:
```javascript
import { createOrder } from '../services/api'

const handlePayment = async () => {
  const order = await createOrder({
    platform, service, quantity, price
  })
  // Handle response
}
```

### 3. Update Pricing
Fetch pricing from backend in `src/utils/pricing.js`:
```javascript
export async function fetchPricing() {
  const response = await fetch(`${API_URL}/pricing`)
  return response.json()
}
```

## 🧩 Component Usage

### Service Pages
All service pages (TikTok, Instagram, etc.) follow the same pattern:

1. **Service Selection** - User picks service type
2. **Quantity Input** - User enters desired quantity
3. **Price Display** - Real-time price calculation
4. **Checkout** - Navigate to checkout with order data

### Adding New Platform
1. Create new page in `src/pages/NewPlatform.jsx`
2. Copy structure from existing platform page
3. Update services array with platform-specific services
4. Add route in `src/routes/AppRoutes.jsx`
5. Add pricing in `src/utils/pricing.js`

## 🎯 Key Features

- ✅ Clean, professional design
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Modular component architecture
- ✅ Real-time price calculation
- ✅ Smooth animations and transitions
- ✅ React Router for navigation
- ✅ Tailwind CSS for styling
- ✅ Ready for backend integration
- ✅ No unnecessary dependencies
- ✅ Production-ready code

## 🛠 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **JavaScript** - No TypeScript

## 📝 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { ... },
  accent: { ... }
}
```

### Update Pricing
Edit `src/utils/pricing.js`:
```javascript
PRICING = {
  platform: {
    service: { per1000: newPrice }
  }
}
```

### Add New Service
1. Add to services array in platform page
2. Add pricing in `pricing.js`
3. Service automatically appears in UI

## 🚢 Deployment

```bash
# Build for production
npm run build

# Output in dist/ folder
# Deploy dist/ to any static hosting:
# - Vercel
# - Netlify
# - AWS S3
# - GitHub Pages
```

## 📦 Dependencies

Minimal dependencies for production:
- react
- react-dom
- react-router-dom
- tailwindcss

## 🔒 Security Notes

- No sensitive data stored in frontend
- All payments handled by backend
- Input validation on all forms
- Secure routing with React Router

## 💡 Best Practices

- Components are small and focused
- Reusable components in `common/`
- Centralized routing in `routes/`
- Utility functions in `utils/`
- Clean, readable code
- Proper naming conventions
- No console spam
- No unused imports

## 🎓 Learning Resources

- React: https://react.dev
- Tailwind: https://tailwindcss.com
- React Router: https://reactrouter.com
- Vite: https://vitejs.dev

## 📄 License

MIT

---

Built with ❤️ for clean, professional web development
