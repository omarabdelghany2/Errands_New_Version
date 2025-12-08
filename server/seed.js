import db from './db.js';

// Clear existing data
console.log('Clearing existing data...');
db.prepare('DELETE FROM projects').run();
db.prepare('DELETE FROM videos').run();
db.prepare('DELETE FROM contacts').run();
db.prepare('DELETE FROM contact_info').run();

// Seed Projects
console.log('Seeding projects...');
const projectsData = [
  {
    title: 'E-Commerce Platform Modernization',
    description: 'Complete overhaul of legacy e-commerce system with modern React frontend and microservices architecture. Increased performance by 300% and reduced cart abandonment by 45%.',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
    category: 'Web Development'
  },
  {
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication, real-time transactions, and seamless UX. Serving 500K+ active users with 99.9% uptime.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    category: 'Mobile Development'
  },
  {
    title: 'AI-Powered Analytics Dashboard',
    description: 'Enterprise analytics platform with machine learning insights, predictive analytics, and customizable reports. Processes 10M+ data points daily.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    category: 'Data Analytics'
  },
  {
    title: 'Healthcare Management System',
    description: 'Comprehensive healthcare platform connecting patients, doctors, and hospitals. Features telemedicine, appointment scheduling, and electronic health records.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    category: 'Healthcare Tech'
  },
  {
    title: 'Supply Chain Optimization Tool',
    description: 'Real-time supply chain tracking and optimization system. Reduced delivery times by 35% and costs by 20% for logistics companies.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    category: 'Enterprise Software'
  },
  {
    title: 'Social Media Marketing Platform',
    description: 'All-in-one social media management tool with AI-powered content suggestions, scheduling, and analytics across multiple platforms.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    category: 'Marketing Tech'
  }
];

const insertProject = db.prepare(
  'INSERT INTO projects (title, description, image, category) VALUES (?, ?, ?, ?)'
);

for (const project of projectsData) {
  insertProject.run(
    project.title,
    project.description,
    project.image,
    project.category
  );
}
console.log(`✓ Added ${projectsData.length} projects`);

// Seed Videos
console.log('Seeding videos...');
const videosData = [
  // YouTube Videos
  {
    title: 'Company Overview 2024',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Discover Errands: our journey, values, and vision for transforming businesses through technology innovation.'
  },
  {
    title: 'Client Success Stories',
    url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    description: 'Hear from our satisfied clients about their experience working with Errands and the results we delivered.'
  },
  {
    title: 'Product Demo: Analytics Platform',
    url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    description: 'Complete walkthrough of our AI-powered analytics dashboard and its powerful features.'
  },
  // TikTok Videos - REPLACE THESE WITH YOUR OWN REAL TIKTOK URLS
  // To get real TikTok video URLs:
  // 1. Open TikTok app or website
  // 2. Find a video you like
  // 3. Click Share > Copy Link
  // 4. Add it through the Dashboard > Videos tab
  {
    title: 'Software Development Tips',
    url: 'https://www.tiktok.com/@mattupham/video/7300000000000000000',
    description: 'Quick tips for software developers and coding best practices.'
  },
  {
    title: 'Tech Career Advice',
    url: 'https://www.tiktok.com/@misodope/video/7310000000000000000',
    description: 'Career guidance for software engineers and tech professionals.'
  },
  {
    title: 'AI & Business Automation',
    url: 'https://www.tiktok.com/@brandnat/video/7320000000000000000',
    description: 'Leveraging AI for business automation and productivity.'
  }
];

const insertVideo = db.prepare(
  'INSERT INTO videos (title, url, description) VALUES (?, ?, ?)'
);

for (const video of videosData) {
  insertVideo.run(video.title, video.url, video.description);
}
console.log(`✓ Added ${videosData.length} videos`);

// Seed Contacts
console.log('Seeding contacts...');
const contactsData = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    message: 'Hi! I\'m interested in discussing a potential web development project for our company. We need to modernize our customer portal. Could we schedule a call this week?'
  },
  {
    name: 'Michael Chen',
    email: 'mchen@startupventures.io',
    message: 'We\'re a startup looking for a development partner to build our MVP. Your portfolio looks impressive! What\'s your availability for a new project starting next month?'
  },
  {
    name: 'Emma Williams',
    email: 'emma.w@healthcare-solutions.com',
    message: 'I saw your healthcare management system project. We need something similar for our hospital network. Can you provide more details about your healthcare expertise?'
  },
  {
    name: 'David Rodriguez',
    email: 'david.r@ecommerce-plus.com',
    message: 'Interested in your e-commerce platform modernization services. Our current system is 10 years old and needs a complete overhaul. What\'s the typical timeline for such projects?'
  },
  {
    name: 'Lisa Anderson',
    email: 'l.anderson@marketing-agency.net',
    message: 'We need a custom analytics dashboard for our clients. Your AI-powered analytics project looks exactly like what we need. Let\'s discuss customization options!'
  }
];

const insertContact = db.prepare(
  'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)'
);

for (const contact of contactsData) {
  insertContact.run(contact.name, contact.email, contact.message);
}
console.log(`✓ Added ${contactsData.length} contacts`);

// Seed Contact Info
console.log('Seeding contact info...');
const contactInfoData = [
  // Phone Numbers
  {
    type: 'phone',
    value: '01559828884',
    label: 'Main Office',
    display_order: 1
  },
  {
    type: 'phone',
    value: '01557554433',
    label: 'Sales Department',
    display_order: 2
  },
  // Email Addresses
  {
    type: 'email',
    value: 'info@errands-sys.com',
    label: 'General Inquiries',
    display_order: 1
  },
  {
    type: 'email',
    value: 'sales@errands-sys.com',
    label: 'Sales Team',
    display_order: 2
  }
];

const insertContactInfo = db.prepare(
  'INSERT INTO contact_info (type, value, label, display_order) VALUES (?, ?, ?, ?)'
);

for (const info of contactInfoData) {
  insertContactInfo.run(info.type, info.value, info.label, info.display_order);
}
console.log(`✓ Added ${contactInfoData.length} contact info items`);

console.log('\n✅ Database seeded successfully!\n');
console.log('Summary:');
console.log(`  - ${projectsData.length} projects`);
console.log(`  - ${videosData.length} videos (YouTube + TikTok)`);
console.log(`  - ${contactsData.length} contact submissions`);
console.log(`  - ${contactInfoData.length} contact info (phones + emails)`);
console.log('\nYou can now view the data on your site! 🎉');
console.log('Videos include both YouTube and TikTok links with thumbnails!');
console.log('Contact information is now manageable from the dashboard!\n');

process.exit(0);
