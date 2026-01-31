// User & Authentication Types
export enum UserRole {
  ADMIN = "admin",
  ORGANIZER = "organizer",
  PARTICIPANT = "participant"
}

export interface User {
  id: string;
  _id?: string; // MongoDB ID
  name: string;
  email: string;
  password?: string; // Only for DB, never sent to client
  role: UserRole;
  department?: string;
  year?: number;
  rollNumber?: string;
  profileImage?: string;
  phone?: string;
  avatar?: string;
  clubMemberships?: string[]; // Club IDs
  registeredEvents?: string[]; // Event IDs
  createdAt: Date;
  updatedAt: Date;
}

// Event Types
export enum EventStatus {
  DRAFT = "draft",
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export type EventType = "workshop" | "seminar" | "competition" | "cultural" | "sports" | "technical" | "social";

export interface Event {
  id: string;
  title: string;
  description: string;
  type?: EventType;
  category?: string;
  status: EventStatus;
  organizer: {
    id: string;
    name: string;
    clubId?: string;
  };
  club?: string; // Club ID
  clubId?: string;
  startDate: Date;
  endDate: Date;
  location: string; // Added for Mongoose schema
  venue?: string;
  maxParticipants?: number; // Added for Mongoose schema
  currentParticipants?: number; // Added for Mongoose schema
  capacity?: number;
  registeredCount?: number;
  participants?: string[]; // Added for Mongoose schema
  registrations?: string[]; // User IDs
  collaborators?: string[]; // Added for Mongoose schema
  resources?: string[]; // Resource booking IDs
  image?: string; // Added for Mongoose schema
  bannerImage?: string;
  budget?: number; // Added for Mongoose schema
  tags?: string[];
  createdAt: Date;
  updatedAt?: Date;
  approvedBy?: string; // Admin ID
  approvedAt?: Date;
  rejectionReason?: string;
}

// Club Types
export type ClubStatus = "active" | "inactive" | "pending";
export type ClubCategory = "technical" | "cultural" | "sports" | "social" | "academic";

export interface Club {
  id: string;
  name: string;
  description: string;
  category: ClubCategory | string;
  status?: ClubStatus;
  president?: string; // User ID
  logo?: string;
  coverImage?: string;
  email?: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
  isActive?: boolean;
  memberCount?: number;
  leads?: string[]; // User IDs with organizer role
  members?: string[]; // User IDs
  events?: string[]; // Event IDs
  socials?: {
    website?: string;
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
}

// Resource Types
export type ResourceType = "auditorium" | "classroom" | "lab" | "sports-facility" | "equipment" | "other";

export enum BookingStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType | string;
  description?: string;
  capacity?: number;
  location?: string;
  amenities?: string[];
  facilities?: string[];
  available?: boolean;
  pricePerHour?: number;
  image?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ResourceBooking {
  id: string;
  resource?: string; // Resource ID
  resourceId?: string;
  user?: string; // User ID
  event?: string; // Event ID
  eventId?: string;
  requestedBy?: string; // User ID
  status: BookingStatus;
  startTime: Date;
  endTime: Date;
  purpose?: string;
  notes?: string;
  approvedBy?: string; // Admin ID
  approvedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Alias for Mongoose compatibility
export type Booking = ResourceBooking;

// Analytics Types
export interface DashboardStats {
  totalEvents: number;
  upcomingEvents: number;
  totalClubs: number;
  totalUsers: number;
  pendingApprovals: number;
  resourceUtilization: number;
}

export interface EventAnalytics {
  eventId: string;
  registrations: number;
  attendance?: number;
  feedback?: number;
  engagementRate: number;
}

// Form Types
export interface CreateEventForm {
  title: string;
  description: string;
  type: EventType;
  clubId?: string;
  startDate: string;
  endDate: string;
  venue: string;
  capacity: number;
  bannerImage?: string;
  tags: string[];
  resourceBookings?: {
    resourceId: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface CreateClubForm {
  name: string;
  description: string;
  category: ClubCategory;
  logo?: string;
  coverImage?: string;
  socials?: {
    website?: string;
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface ResourceBookingForm {
  resourceId: string;
  eventId?: string;
  startTime: string;
  endTime: string;
  purpose: string;
  notes?: string;
}

// Notification Types
export type NotificationType = "event" | "club" | "resource" | "approval" | "system";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  link?: string; // Changed from actionUrl for compatibility
  actionUrl?: string;
  createdAt: Date;
}
