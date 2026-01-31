# Unified Campus Resource & Event Management System

A production-grade campus management platform built with Next.js, TypeScript, MongoDB, and Tailwind CSS. This system replaces traditional Google Forms, Excel sheets, and WhatsApp groups with a centralized, role-based platform for managing campus events, clubs, resources, and communications.

## Features

### 🔐 Role-Based Access Control (RBAC)
- **Admin**: Full system control, approvals, analytics, user management
- **Organizer**: Event creation, club management, resource booking
- **Participant**: Event registration, club membership, notifications

### 📅 Event Management
- Multi-day event support with start/end dates
- Draft → Pending → Approved → Rejected → Completed lifecycle
- Participant capacity management
- Budget tracking and collaboration features
- Event categories and tagging

### 🏛️ Club Management
- Club creation and membership system
- President/member roles within clubs
- Club-organized events tracking
- Social media integration (Instagram, LinkedIn, Website)

### 🏢 Resource Booking
- Venue and equipment booking system
- Time-slot conflict detection
- Approval workflow for bookings
- Resource availability tracking
- Amenities and capacity management

### 🔔 Notifications System
- Real-time notification bell with unread count
- Event approvals, rejections, updates
- Club membership confirmations
- Resource booking status

### 📊 Analytics Dashboard (Admin)
- Event participation trends
- Resource utilization metrics
- Club activity monitoring
- Export capabilities

### 💬 Communication
- Direct messaging
- Group chats for events
- Club discussion channels

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: bcryptjs for password hashing
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Charts**: Recharts

## Prerequisites

- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nextjs
```

2. **Install dependencies**
```bash
npm install
```

3. **Install additional required packages**
```bash
npm install mongoose bcryptjs
npm install --save-dev @types/bcryptjs tsx
```

4. **Environment Setup**

The `.env.local` file is already configured with your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://keshavssp04:keshavssp04@campus.lyddgyx.mongodb.net/?appName=Campus
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
```

5. **Seed the Database**

Run the seed script to populate your MongoDB database with initial data:
```bash
npm run seed
```

This will create:
- 3 test users (Admin, Organizer, Participant)
- 2 sample clubs
- 4 resources (venues and equipment)
- 2 sample events

## Test Credentials

After seeding, you can login with:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@campus.edu | admin123 |
| Organizer | organizer@campus.edu | org123 |
| Participant | student@campus.edu | student123 |

## Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nextjs/
├── app/
│   ├── api/                    # API Routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── events/            # Event CRUD operations
│   │   ├── clubs/             # Club management
│   │   ├── resources/         # Resource booking
│   │   ├── bookings/          # Booking management
│   │   ├── notifications/     # Notification system
│   │   └── user/              # User profile
│   ├── dashboard/             # Role-specific dashboards
│   ├── clubs/                 # Club pages
│   ├── events/                # Event pages
│   ├── resources/             # Resource pages
│   ├── approvals/             # Admin approval center
│   ├── analytics/             # Analytics dashboard
│   ├── notifications/         # Notification center
│   ├── messages/              # Communication
│   ├── login/                 # Login page
│   └── signup/                # Signup page
├── components/
│   ├── auth/                  # Auth guards
│   ├── layout/                # Layout components
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── models/                # Mongoose models
│   ├── mongodb.ts             # Database connection
│   ├── auth-context.tsx       # Auth context
│   └── utils.ts               # Utilities
├── scripts/
│   └── seed.ts                # Database seeding
├── types/
│   └── index.ts               # TypeScript definitions
└── .env.local                 # Environment variables
```

## API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Events
- `GET /api/events` - List events (with filters)
- `POST /api/events` - Create event
- `GET /api/events/[id]` - Get event details
- `PATCH /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event
- `POST /api/events/[id]/register` - Register for event

### Clubs
- `GET /api/clubs` - List clubs
- `POST /api/clubs` - Create club
- `GET /api/clubs/[id]` - Get club details
- `PATCH /api/clubs/[id]` - Update club
- `POST /api/clubs/[id]/join` - Join club

### Resources
- `GET /api/resources` - List resources
- `POST /api/resources` - Create resource
- `GET /api/resources/[id]/bookings` - Get resource bookings
- `POST /api/resources/[id]/bookings` - Create booking

### Bookings
- `GET /api/bookings` - List bookings (with filters)
- `PATCH /api/bookings` - Update booking status

### Notifications
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications` - Create notification
- `PATCH /api/notifications` - Mark as read/unread

### User
- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/profile` - Update profile

## Database Models

### User
- Authentication details (email, hashed password)
- Role (Admin, Organizer, Participant)
- Profile information (name, department, year, phone)
- Relationships (clubMemberships, registeredEvents)

### Event
- Event details (title, description, dates, location)
- Organizer and club references
- Status workflow (Draft → Pending → Approved → Rejected → Completed)
- Participants and collaborators
- Budget and resources

### Club
- Club information (name, description, category)
- President and members
- Social media links
- Active status

### Resource
- Resource details (name, type, description)
- Capacity and location
- Amenities and pricing
- Availability status

### Booking
- Resource and user references
- Time slots (startTime, endTime)
- Status (Pending, Approved, Rejected, Cancelled)
- Purpose and notes
- Conflict detection

### Notification
- User reference
- Type, title, message
- Read/unread status
- Optional link

## Development Notes

- All passwords are hashed using bcryptjs
- MongoDB connection uses connection pooling for performance
- API routes include proper error handling and validation
- Role-based access is enforced at both route and component levels
- TypeScript provides type safety across the application

## Next Steps

- [ ] Implement real-time notifications with WebSockets
- [ ] Add file upload for event images and club logos
- [ ] Email notifications for approvals and updates
- [ ] Calendar integration
- [ ] Mobile app development
- [ ] Advanced analytics with more metrics
- [ ] Payment integration for paid events

## License

MIT
