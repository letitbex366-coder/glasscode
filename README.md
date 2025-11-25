# VaderAds

> **Conversation-first advertising platform** - Monetize chats without breaking the conversation.

![VaderAds](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

VaderAds is a contextual ad network built for the AI generation. We deliver relevant, clearly-marked, text-based advertising that enhances the conversational experience in chatbots and AI assistants.

## ✨ NewUI Branch Highlights

This branch features a **complete UI overhaul** with premium design improvements:

- **🎨 Translucent Glass Design** - Ultra-lightweight glass cards that let the animated gradient background shine through
- **🌈 Enhanced Theme System** - Improved light/dark mode with better contrast and readability
- **💬 Conversational Contact Form** - Beautiful 4-step flow with Google Sheets integration (no login required)
- **📊 Improved Statistics Section** - Fully transparent dark mode cards with extended spotlight
- **🎯 Prominent CTAs** - Elevated "Join Waitlist" buttons with glow effects
- **📱 Scroll-Adaptive Headers** - Headers brighten when scrolling for better visibility in light mode
- **💡 Educational Popups** - "Why this ad?" transparency feature in chat demos
- **♿ Better Accessibility** - Enhanced keyboard navigation and ARIA labels throughout

---

## 🎨 Design Philosophy

VaderAds is built with a **premium glassmorphic design system** that adapts seamlessly between light and dark modes, featuring:

- **🌊 Fluid 3D Backgrounds** - Dynamic particle systems and energy waves that respond to user interactions
- **💎 Glassmorphism UI** - Translucent cards with backdrop blur for a modern, depth-rich interface
- **⚡ Smooth Animations** - Framer Motion-powered transitions with 60fps performance
- **🎯 Responsive Design** - Mobile-first approach with elegant breakpoints
- **🌓 Theme Switching** - Seamless light/dark mode with smooth transitions
- **♿ Accessibility First** - ARIA labels, keyboard navigation, and screen reader support

---

## 🏗️ Architecture

### Component Structure

```
components/
├── effects/           # 3D backgrounds and visual effects
│   ├── Background3D.tsx         # Main 3D particle background
│   ├── ChatBackground3D.tsx     # Chat-specific 3D effects
│   ├── EnergyWave.tsx          # Animated wave patterns
│   └── BackgroundEffects.tsx    # Base effect utilities
├── marketing/         # Marketing and showcase components
│   ├── mock-chat-showcase.tsx  # Interactive chat demo with "Why?" popup
│   ├── quote-carousel.tsx      # Stats carousel with translucent cards
│   ├── contactus-flow.tsx      # 4-step conversational contact form
│   └── coming-soon-page.tsx    # Coming soon template
└── ui/               # Reusable UI components
    ├── laptop-mockup.tsx       # 3D laptop showcase frame
    ├── background-gradient-animation.tsx  # Animated gradients
    ├── glass-card.tsx          # Glassmorphic card component
    ├── glass-button.tsx        # Glassmorphic button
    ├── 3d-card.tsx            # Interactive 3D card
    └── input.tsx              # Styled form inputs
```

### Key Design Components

#### 🎭 Effects Layer
- **Background3D**: Three.js-inspired particle system with depth and parallax
- **EnergyWave**: Animated SVG wave patterns with gradient flows
- **ChatBackground3D**: Context-aware background that adapts to content

#### 🎪 Marketing Layer
- **MockChatShowcase**: Interactive demo with multiple personas (Shopping, Travel, Productivity) and "Why this ad?" educational popup
- **QuoteCarousel**: Swipeable carousel featuring market insights with ultra-translucent dark mode cards
- **ContactUsFlow**: 4-step conversational form with Google Sheets integration (no login required)
- **Coming Soon**: Beautifully designed placeholder pages with scroll-adaptive headers

#### 🧩 UI Layer
- **LaptopMockup**: 3D perspective laptop frame for demo presentations
- **Glass Components**: Unified glassmorphic design system with light/dark variants
- **Background Animations**: Procedural gradient animations using canvas

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- **Git** for version control

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mzc6101/VaderAds.git
   cd VaderAds
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication (if using)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   
   # Google Sheets Integration for Contact Us Form
   GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
   
   **Note**: For Contact Us form integration with Google Sheets, see `GOOGLE_SHEETS_SETUP.md` for detailed setup instructions.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production-ready application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

---

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & Animation
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animation library
- **Custom CSS** - Glassmorphism and advanced effects

### UI Components & Effects
- **[React Parallax Tilt](https://www.npmjs.com/package/react-parallax-tilt)** - 3D tilt effects (removed from feature cards)
- **Custom 3D Effects** - Hand-crafted particle systems and waves

### Authentication & Forms
- **[Clerk](https://clerk.com/)** - Complete user authentication
- **[React Hook Form](https://react-hook-form.com/)** - Performant form validation

---

## 🎯 Features

### ✨ Landing Page
- Hero section with animated typing effect and EnergyWave background
- Interactive feature cards with auto-rotation (3 cards cycle every 4 seconds)
- Live chat demo with multiple personas and "Why this ad?" educational popup
- Statistics carousel with ultra-translucent dark mode cards and swipe gestures
- Premium dark/light theme toggle with smooth transitions
- Scroll-adaptive header (brighter background when scrolling in light mode)
- Prominent "Join Waitlist" CTA buttons with elevated styling

### 💬 Contact Us Flow (No Login Required)
- 4-step conversational form experience:
  1. Name input with live text morphing
  2. Email validation with inline feedback
  3. User type selection (Advertiser/Developer/Curious)
  4. Success screen with confirmation
- Direct Google Sheets integration via Apps Script
- Full keyboard accessibility (Enter to advance)
- Beautiful animations and transitions
- Accessible via `/contactus` route

### 🔐 Authentication
- Sign-up flows for Advertisers and API Clients
- Secure sign-in with Clerk
- Protected routes with middleware
- Public routes: `/`, `/contactus`, `/api/waitlist` (no auth required)

### 📱 Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop enhancements
- Touch and mouse interactions

### ⚡ Performance
- Server-side rendering (SSR)
- Image optimization
- Code splitting
- Lazy loading components

---

## 📂 Project Structure

```
VaderAds/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── waitlist/      # Contact Us form submission (public endpoint)
│   ├── contactus/         # Contact Us page (no login required)
│   ├── sign-in/           # Authentication pages
│   ├── sign-up/           
│   ├── sign-up-pages/     # Role-specific signup
│   ├── onboarding/        # User onboarding flow
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # React components (see Architecture)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/               # Static assets
│   └── images/           # Images and logos
├── middleware.ts         # Auth & routing middleware (public routes configured)
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── GOOGLE_SHEETS_SETUP.md # Contact Us Google Sheets integration guide
```

---

## 🎨 Design System

### Color Palette

**Light Mode**
- Primary: Indigo gradient (#6366F1 → #8B5CF6)
- Background: White with subtle blue tint
- Text: Slate gray scale

**Dark Mode**
- Primary: Lighter indigo for contrast
- Background: Deep slate with purple undertones
- Text: Light slate with high contrast

### Typography
- **Headings**: System font stack with tight tracking
- **Body**: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'
- **Letter Spacing**: -0.02em for large headings

### Liquid Glass Effect Settings
Premium glassmorphic effects with fine-tuned parameters:
- **Displacement Scale**: 34 - Controls intensity of edge distortion
- **Blur Amount**: 0.0 - Controls backdrop blur intensity
- **Saturation**: 140% - Controls color saturation of the backdrop
- **Chromatic Aberration**: 7 - Controls RGB channel separation intensity
- **Elasticity**: 0.20 - Controls spring-like animation behavior

These settings can be customized via CSS custom properties:
```css
.liquid-glass {
  --lg-blur: 0px;
  --lg-saturation: 140%;
  --lg-chromatic-aberration: 7;
  --lg-elasticity: 0.20;
}
```

### Animations
- **Duration**: 300-600ms for interactions
- **Easing**: Cubic bezier (0.25, 0.46, 0.45, 0.94) with elastic bounce
- **Reduced Motion**: Respects user preferences

---

## 📝 Contact Us Form & Google Sheets Integration

The Contact Us page (`/contactus`) features a beautiful 4-step conversational form that submits directly to Google Sheets without requiring user authentication.

### Setup Instructions

1. **Follow the detailed guide** in `GOOGLE_SHEETS_SETUP.md`
2. **Deploy Google Apps Script** as a web app
3. **Add the deployment URL** to your `.env.local` file
4. **Restart your dev server**

### Features
- ✅ No login required - completely public form
- ✅ Real-time validation with helpful error messages
- ✅ Smooth step-by-step transitions
- ✅ Keyboard accessible (Enter to advance)
- ✅ Automatic data submission to Google Sheets
- ✅ Success screen with confirmation

### Form Fields Collected
- **Name** - User's full name
- **User_Email** - Email address with RFC validation
- **User_type** - One of: Advertiser, Developer, or N/A (curious)
- **Timestamp** - Automatically added by the script

---

## 🔧 Configuration

### Tailwind CSS
Custom utilities for glassmorphism, aurora backgrounds, and dot patterns are defined in `globals.css`.

### TypeScript
Strict mode enabled with path aliases:
- `@/components` → `./components`
- `@/lib` → `./lib`
- `@/hooks` → `./hooks`

### Next.js
- App Router with RSC (React Server Components)
- Image optimization enabled
- Automatic code splitting

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment
```bash
# Build the project
npm run build

# Start production server
npm start
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary software owned by **VaderAds, LLC**. All rights reserved.

---

## 👥 Team

**VaderAds Team**
- Website: [Coming Soon]
- Email: rajit@vaderlabs.co
- GitHub: [@mzc6101](https://github.com/mzc6101)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [Clerk](https://clerk.com/) for authentication infrastructure
- [Framer](https://www.framer.com/) for Motion library
- The open-source community

---

## 📞 Support

For questions or support:
- Email: rajit@vaderlabs.co
- GitHub Issues: [Create an issue](https://github.com/mzc6101/VaderAds/issues)

---

<div align="center">
  
**Built with ❤️ by VaderAds Team**

[Website](https://vaderads.com) • [Documentation](https://docs.vaderads.com) • [API](https://api.vaderads.com)

</div>

