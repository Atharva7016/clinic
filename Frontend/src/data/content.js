import { IMAGES } from './clinic';

/** Treatment catalogue for cards & treatments page */
export const TREATMENTS = [
  {
    id: 'migraine',
    title: 'Migraine',
    description:
      'Holistic therapies to ease chronic headaches and restore nervous system balance.',
    image: IMAGES.herbs,
  },
  {
    id: 'joint-pain',
    title: 'Joint Pain',
    description:
      'Herbal oils, fomentation, and therapies that reduce stiffness and improve mobility.',
    image: IMAGES.oils,
  },
  {
    id: 'back-pain',
    title: 'Back Pain',
    description:
      'Targeted Abhyanga and Kati Basti protocols for lasting spinal comfort.',
    image: IMAGES.massage,
  },
  {
    id: 'sciatica',
    title: 'Sciatica',
    description:
      'Nerve-calming treatments that relieve radiating leg pain and inflammation.',
    image: IMAGES.treatmentRoom,
  },
  {
    id: 'pcod',
    title: 'PCOD',
    description:
      'Hormonal balance through customized Ayurvedic medicines and lifestyle guidance.',
    image: IMAGES.herbs,
  },
  {
    id: 'thyroid',
    title: 'Thyroid',
    description:
      'Metabolic support with classical formulations and dietary corrections.',
    image: IMAGES.oils,
  },
  {
    id: 'diabetes',
    title: 'Diabetes',
    description:
      'Blood sugar management with pathya-apathya counseling and herbal support.',
    image: IMAGES.clinic,
  },
  {
    id: 'obesity',
    title: 'Obesity',
    description:
      'Sustainable weight balance via detox, diet, and metabolic rejuvenation.',
    image: IMAGES.yoga,
  },
  {
    id: 'hair-loss',
    title: 'Hair Loss',
    description:
      'Scalp therapies and rasayana protocols that strengthen hair from the root.',
    image: IMAGES.oils,
  },
  {
    id: 'skin-diseases',
    title: 'Skin Diseases',
    description:
      'Gentle detox and herbal care for eczema, psoriasis, and chronic skin issues.',
    image: IMAGES.herbs,
  },
  {
    id: 'stress',
    title: 'Stress',
    description:
      'Shirodhara and mind-calming therapies for anxiety, burnout, and insomnia.',
    image: IMAGES.massage,
  },
  {
    id: 'asthma',
    title: 'Asthma',
    description:
      'Respiratory strengthening with herbal steam, medicines, and breathing care.',
    image: IMAGES.treatmentRoom,
  },
];

/** Classic Panchakarma therapies */
export const PANCHAKARMA = [
  {
    id: 'abhyanga',
    title: 'Abhyanga',
    description:
      'Full-body warm oil massage that nourishes tissues and improves circulation.',
    image: IMAGES.massage,
  },
  {
    id: 'shirodhara',
    title: 'Shirodhara',
    description:
      'Continuous stream of warm oil on the forehead to calm the mind and nerves.',
    image: IMAGES.oils,
  },
  {
    id: 'nasya',
    title: 'Nasya',
    description:
      'Nasal administration of medicated oils for sinus, migraine, and head disorders.',
    image: IMAGES.herbs,
  },
  {
    id: 'basti',
    title: 'Basti',
    description:
      'Medicated enema therapy considered the queen of Panchakarma for Vata disorders.',
    image: IMAGES.treatmentRoom,
  },
  {
    id: 'vamana',
    title: 'Vamana',
    description:
      'Therapeutic emesis to clear excess Kapha from the respiratory and digestive tracts.',
    image: IMAGES.clinic,
  },
  {
    id: 'virechana',
    title: 'Virechana',
    description:
      'Controlled purgation that detoxifies the liver and clears Pitta accumulation.',
    image: IMAGES.herbs,
  },
  {
    id: 'raktamokshana',
    title: 'Raktamokshana',
    description:
      'Blood purification therapy for chronic skin and inflammatory conditions.',
    image: IMAGES.oils,
  },
];

export const STATISTICS = [
  { id: 'exp', value: 5, suffix: '+', label: 'Years Experience' },
  { id: 'patients', value: 7500, suffix: '+', label: 'Happy Patients' },
  { id: 'consults', value: 10000, suffix: '+', label: 'Consultations' },
  { id: 'reviews', value: 46, suffix: '+', label: 'Five Star Reviews' },
];

export const WHY_CHOOSE = [
  {
    id: 1,
    title: 'Experienced Doctor',
    description: '5+ years of authentic Ayurvedic clinical practice.',
  },
  {
    id: 2,
    title: 'Natural Medicines',
    description: 'Classical herbal formulations prepared with care.',
  },
  {
    id: 3,
    title: 'Personalized Treatment',
    description: 'Plans tailored to your prakriti and health goals.',
  },
  {
    id: 4,
    title: 'Panchakarma',
    description: 'Traditional detox therapies in a serene setting.',
  },
  {
    id: 5,
    title: 'Affordable Consultation',
    description: 'Quality care that remains accessible to families.',
  },
  {
    id: 6,
    title: 'Modern Facilities',
    description: 'Clean treatment rooms with contemporary comfort.',
  },
  {
    id: 7,
    title: 'Follow-up Care',
    description: 'Continuous guidance until lasting results appear.',
  },
  {
    id: 8,
    title: 'Emergency Support',
    description: 'Prompt assistance when you need urgent advice.',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Reshma More',
    // photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'One of the best Ayurveda doctors in the Thane area. I got complete relief from my acidity issue after treatment. She genuinely cares for her patients and always checks on health improvements during every visit. Her caring nature and dedication make the overall experience very comforting. Highly recommended!',
  },
  {
    id: 2,
    name: 'Chaitali Patil',
    // photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'I had a great experience with the Dr.Gauri  for my dandruff concern. She understood my problem very well and suggested the best hair pack for my scalp. After using it (within 1 use) , I noticed a good improvement in my dandruff and my hair feels much healthier and cleaner. She was very polite, professional, and explained everything clearly. I am really happy with the treatment and would highly recommend her to anyone facing hair and scalp issues.',
  },
  {
    id: 3,
    name: 'Anurag Patil',
    // photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'I visited Shree VishwaPrabha Ayurved & Panchakarma Clinic for migraine. Dr. Gauri Patil took the time to understand my history in detail and explained the root cause of my migraine according to Ayurveda in a very simple way. Now, my episodes are much more manageable, and I feel more in control of my health',
  },
  {
    id: 4,
    name: 'Vrushali Jamdare',
    // photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'It was a very satisfying experience with Dr.Gauri as she had solved my baby girl problems with regards to her eating habits.As  suvarna prashan is really working for my both the kids and their immunity and eating habits are improving, Thank you Dr.Gauri',
  },
  {
    id: 5,
    name: 'Meera Shah',
    // photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'It was a very satisfying experience with Dr. Gauri. I consulted her for my PCOD concerns, and her personalized Ayurvedic treatment and guidance brought a noticeable improvement in my health. My menstrual cycle has become more regular, and I feel much better overall. Dr. Gauri patiently explained every step of the treatment and was always supportive throughout the journey. Thank you, Dr. Gauri, for your care and dedication. I highly recommend her to anyone looking for natural and effective treatment for PCOD.',
  },
  {
    id: 6,
    name: 'Pratibha Patil',
    // photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'It was a very satisfying experience with Dr. Gauri. I consulted her for my thyroid problem, and the Ayurvedic treatment she recommended has made a significant difference in my overall health. I have experienced improved energy levels, better metabolism, and feel much healthier than before. Dr. Gauri took the time to understand my condition, explained the treatment plan clearly, and guided me throughout the process. Thank you, Dr. Gauri, for your excellent care and support.',
  }
];

export const GALLERY = [
  { id: 1, title: 'Clinic Exterior', category: 'Clinic', image: IMAGES.clinic, tall: false },
  { id: 2, title: 'Consultation', category: 'Doctor', image: IMAGES.doctor, tall: true },
  { id: 3, title: 'Herbal Medicines', category: 'Medicines', image: IMAGES.herbs, tall: false },
  { id: 4, title: 'Abhyanga Therapy', category: 'Panchakarma', image: IMAGES.massage, tall: true },
  { id: 5, title: 'Reception Area', category: 'Reception', image: IMAGES.reception, tall: false },
  { id: 6, title: 'Treatment Room', category: 'Treatment Rooms', image: IMAGES.treatmentRoom, tall: false },
  { id: 7, title: 'Medicated Oils', category: 'Medicines', image: IMAGES.oils, tall: true },
  { id: 8, title: 'Wellness Space', category: 'Clinic', image: IMAGES.yoga, tall: false },
  { id: 9, title: 'Shirodhara Setup', category: 'Panchakarma', image: IMAGES.oils, tall: false },
];

export const FAQS = [
  {
    id: 1,
    question: 'What is Ayurveda and how can it help me?',
    answer:
      'Ayurveda is a traditional Indian system of medicine that balances body, mind, and spirit using herbs, diet, lifestyle, and therapies tailored to your constitution (prakriti).',
  },
  {
    id: 2,
    question: 'Who is the consulting doctor?',
    answer:
      'Dr. Gauri Patil, BAMS (Ayurvedacharya), leads the clinic with 5+ years of experience in Ayurveda and Panchakarma.',
  },
  {
    id: 3,
    question: 'Do I need an appointment before visiting?',
    answer:
      'Yes. Booking ahead helps us allocate sufficient consultation time and prepare personalized care. Walk-ins are accommodated when slots are free.',
  },
  {
    id: 4,
    question: 'What should I bring for the first consultation?',
    answer:
      'Please bring previous medical reports, a list of current medicines, and details of your daily routine and diet.',
  },
  {
    id: 5,
    question: 'Are Panchakarma therapies safe?',
    answer:
      'When performed by qualified Ayurvedic physicians after proper assessment, Panchakarma is safe and highly beneficial. Each therapy is customized to your condition.',
  },
  {
    id: 6,
    question: 'How long does a typical treatment course last?',
    answer:
      'It varies by condition. Acute issues may improve in weeks, while chronic disorders often need a structured plan of 1–3 months with follow-ups.',
  },
  {
    id: 7,
    question: 'Do you provide medicines from the clinic?',
    answer:
      'Yes. We prescribe classical and proprietary Ayurvedic medicines and guide you on dosage, diet, and lifestyle.',
  },
  {
    id: 8,
    question: 'Is Ayurvedic treatment suitable for children and elders?',
    answer:
      'Absolutely. Dosages and therapies are carefully adjusted for pediatric and geriatric patients after clinical evaluation.',
  },
  {
    id: 9,
    question: 'Can Ayurveda be taken along with allopathic medicines?',
    answer:
      'In many cases yes, but always inform the doctor about ongoing medications so interactions and timing can be managed safely.',
  },
  {
    id: 10,
    question: 'How can I book a WhatsApp consultation?',
    answer:
      'Tap the WhatsApp Consultation button on the website or message our clinic number. Share your concern and preferred time slot.',
  },
  {
    id: 11,
    question: 'What are your clinic timings?',
    answer:
      'Monday to Saturday — Morning 10:00 AM – 1:00 PM and Evening 5:00 PM – 8:00 PM. Sunday closed. Emergency guidance is available via phone when needed.',
  },
];

export const TIMELINE = [
  {
    year: '2012',
    title: 'BAMS Graduation',
    description: 'Completed Ayurvedacharya with distinction and clinical training.',
  },
  {
    year: '2014',
    title: 'Clinical Practice Begins',
    description: 'Started dedicated outpatient care focused on chronic lifestyle disorders.',
  },
  {
    year: '2018',
    title: 'Panchakarma Expansion',
    description: 'Introduced full Panchakarma suites with classical detox protocols.',
  },
  {
    year: '2022',
    title: '7500+ Patients',
    description: 'Reached a milestone of trusted care across Maharashtra families.',
  },
  {
    year: 'Present',
    title: 'Shree Vishwa Prabha',
    description: 'Leading a modern Ayurvedic clinic rooted in authentic healing.',
  },
];
