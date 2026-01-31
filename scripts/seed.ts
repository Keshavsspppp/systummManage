import dbConnect from '../lib/mongodb'
import User from '../lib/models/User'
import Event from '../lib/models/Event'
import Club from '../lib/models/Club'
import Resource from '../lib/models/Resource'
import bcrypt from 'bcryptjs'

async function seed() {
  try {
    await dbConnect()
    console.log('Connected to MongoDB')

    // Clear existing data
    await User.deleteMany({})
    await Event.deleteMany({})
    await Club.deleteMany({})
    await Resource.deleteMany({})
    console.log('Cleared existing data')

    // Create users
    const adminPassword = await bcrypt.hash('admin123', 10)
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@campus.edu',
      password: adminPassword,
      role: 'admin',
      department: 'Administration',
      phone: '+91 9876543210'
    })

    const organizerPassword = await bcrypt.hash('org123', 10)
    const organizer = await User.create({
      name: 'John Organizer',
      email: 'organizer@campus.edu',
      password: organizerPassword,
      role: 'organizer',
      department: 'Computer Science',
      year: 3,
      phone: '+91 9876543211'
    })

    const participantPassword = await bcrypt.hash('student123', 10)
    const participant = await User.create({
      name: 'Jane Student',
      email: 'student@campus.edu',
      password: participantPassword,
      role: 'participant',
      department: 'Electronics',
      year: 2,
      phone: '+91 9876543212'
    })

    console.log('Created users')

    // Create clubs
    const techClub = await Club.create({
      name: 'Tech Club',
      description: 'A community for technology enthusiasts to learn, build, and innovate together.',
      category: 'Technical',
      president: organizer._id,
      members: [organizer._id, participant._id],
      memberCount: 2,
      email: 'tech@campus.edu',
      instagram: '@campus_tech',
      isActive: true
    })

    const culturalClub = await Club.create({
      name: 'Cultural Society',
      description: 'Celebrating diversity through arts, music, and cultural events.',
      category: 'Cultural',
      president: organizer._id,
      members: [organizer._id],
      memberCount: 1,
      email: 'cultural@campus.edu',
      isActive: true
    })

    console.log('Created clubs')

    // Create resources
    await Resource.create([
      {
        name: 'Main Auditorium',
        type: 'venue',
        description: 'Large auditorium with 500 seating capacity',
        capacity: 500,
        location: 'Academic Block A',
        amenities: ['Projector', 'Sound System', 'Air Conditioning', 'Stage'],
        available: true,
        pricePerHour: 5000
      },
      {
        name: 'Seminar Hall 1',
        type: 'venue',
        description: 'Seminar hall with 100 seating capacity',
        capacity: 100,
        location: 'Academic Block B',
        amenities: ['Projector', 'Whiteboard', 'Air Conditioning'],
        available: true,
        pricePerHour: 2000
      },
      {
        name: 'Projector - Sony VPL',
        type: 'equipment',
        description: 'High-quality projector for presentations',
        location: 'Equipment Room',
        amenities: ['HDMI', 'VGA', 'Remote Control'],
        available: true,
        pricePerHour: 500
      },
      {
        name: 'Sound System - Bose',
        type: 'equipment',
        description: 'Professional sound system with microphones',
        location: 'Equipment Room',
        amenities: ['2 Wireless Mics', 'Speakers', 'Mixer'],
        available: true,
        pricePerHour: 1000
      }
    ])

    console.log('Created resources')

    // Create events
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 7)
    const dayAfter = new Date(tomorrow)
    dayAfter.setDate(dayAfter.getDate() + 1)

    await Event.create([
      {
        title: 'Tech Fest 2026',
        description: 'Annual technical festival featuring workshops, competitions, and tech talks.',
        startDate: tomorrow,
        endDate: dayAfter,
        location: 'Main Auditorium',
        maxParticipants: 300,
        organizer: organizer._id,
        club: techClub._id,
        status: 'approved',
        category: 'Technical',
        tags: ['technology', 'workshop', 'competition'],
        budget: 50000,
        currentParticipants: 45,
        participants: [participant._id]
      },
      {
        title: 'Cultural Night',
        description: 'An evening of music, dance, and cultural performances.',
        startDate: new Date(tomorrow.getTime() + 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(dayAfter.getTime() + 7 * 24 * 60 * 60 * 1000),
        location: 'Open Air Theatre',
        maxParticipants: 500,
        organizer: organizer._id,
        club: culturalClub._id,
        status: 'pending',
        category: 'Cultural',
        tags: ['music', 'dance', 'culture'],
        budget: 30000,
        currentParticipants: 0
      }
    ])

    console.log('Created events')

    // Update user relationships
    await User.findByIdAndUpdate(participant._id, {
      clubMemberships: [techClub._id],
      registeredEvents: []
    })

    console.log('✅ Database seeded successfully!')
    console.log('\nTest Credentials:')
    console.log('Admin: admin@campus.edu / admin123')
    console.log('Organizer: organizer@campus.edu / org123')
    console.log('Student: student@campus.edu / student123')

    process.exit(0)
  } catch (error) {
    console.error('Seed error:', error)
    process.exit(1)
  }
}

seed()
