/**
 * Clinic-wide constants — Shree VishwaPrabha Ayurved And Panchakarma Clinic
 */
import logoImg from '../assets/images/logo.png';

export const CLINIC = {
  name: 'Shree VishwaPrabha Ayurved And Panchakarma Clinic',
  shortName: 'Shree VishwaPrabha',
  tagline: 'Heal Naturally with Ayurveda',
  logo: logoImg,
  doctor: {
    name: 'Dr. Gauri Patil',
    qualification: 'BAMS, MD(Ayu)',
    experienceYears: 13,
    specialty: 'Ayurveda & Panchakarma',
  },
  contact: {
    phone: '+91 98338 29133',
    phoneHref: 'tel:+919833829133',
    whatsapp: '+919833829133',
    whatsappHref: 'https://wa.me/919833829133',
    email: 'shreevishwaprabha1@gmail.com',
    emailHref:
      'https://mail.google.com/mail/?view=cm&fs=1&to=shreevishwaprabha1%40gmail.com',
    address:
      '3, Ground floor, Aniket Tower, behind Stick Bowl, Uthalsar Naka, Thane West, Thane, India 400601',
    mapLink: 'https://maps.app.goo.gl/NdB17aKpb6nfRcek7',
    /** Precise pin for iframe embeds (from Google Maps place listing) */
    mapLat: 19.2029283,
    mapLng: 72.977728,
    hours: {
      weekdays: 'Mon – Sat',
      morning: 'Morning: 10:00 AM – 1:00 PM',
      evening: 'Evening: 5:00 PM – 8:00 PM',
      sunday: 'Sunday: Closed',
    },
  },
  social: {
    facebook: 'https://www.facebook.com/share/19HLxT2jEp/',
    instagram:
      'https://www.instagram.com/shree_vishwaprabha_ayurveda?igsh=MTdwYzJwNmo2NWUydg==',
    youtube: 'https://youtube.com',
  },
};

/** Navigation links for Navbar & Footer */
export const NAV_LINKS = [
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.about', path: '/about' },
  { labelKey: 'nav.treatments', path: '/treatments' },
  { labelKey: 'nav.panchakarma', path: '/panchakarma' },
  { labelKey: 'nav.gallery', path: '/gallery' },
  { labelKey: 'nav.testimonials', path: '/testimonials' },
  { labelKey: 'nav.contact', path: '/contact' },
];

/** High-quality Unsplash placeholders (ayurveda / wellness / clinic) */
export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80',
  doctor:
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
  clinic:
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  herbs:
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=80',
  massage:
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80',
  oils:
    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
  reception:
    'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1000&q=80',
  treatmentRoom:
    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1000&q=80',
  yoga: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
  patient:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
};
