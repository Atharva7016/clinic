import { IMAGES } from './clinic';
import migraineImg from '../assets/images/treatments/migraine.png';
import jointPainImg from '../assets/images/treatments/joint-pain.png';
import backPainImg from '../assets/images/treatments/back-pain.png';
import sciaticaImg from '../assets/images/treatments/sciatica.png';
import pcodImg from '../assets/images/treatments/pcod.png';
import obesityImg from '../assets/images/treatments/obesity.png';
import hairLossImg from '../assets/images/treatments/hair-loss.jpg';
import thyroidImg from '../assets/images/treatments/thyroid.png';
import hypertensionImg from '../assets/images/treatments/hypertension.png';
import diabetesImg from '../assets/images/treatments/diabetes.png';
import stressImg from '../assets/images/treatments/stress.png';
import skinDiseasesImg from '../assets/images/treatments/skin-diseases.png';
import abhyangaImg from '../assets/images/panchakarma/abhyanga.png';
import shirodharaImg from '../assets/images/panchakarma/shirodhara.png';
import nasyaImg from '../assets/images/panchakarma/nasya.png';
import bastiImg from '../assets/images/panchakarma/basti.png';
import vamanaImg from '../assets/images/panchakarma/vamana.png';
import virechanaImg from '../assets/images/panchakarma/virechana.png';
import raktamokshanaImg from '../assets/images/panchakarma/raktamokshana.png';

/** Treatment catalogue for cards & treatments page */
export const TREATMENTS = [
  {
    id: 'migraine',
    title: 'Migraine',
    description:
      'Holistic therapies to ease chronic headaches and restore nervous system balance.',
    image: migraineImg,
  },
  {
    id: 'joint-pain',
    title: 'Joint Pain',
    description:
      'Herbal oils, fomentation, and therapies that reduce stiffness and improve mobility.',
    image: jointPainImg,
  },
  {
    id: 'back-pain',
    title: 'Back Pain',
    description:
      'Targeted Abhyanga and Kati Basti protocols for lasting spinal comfort.',
    image: backPainImg,
  },
  {
    id: 'sciatica',
    title: 'Sciatica',
    description:
      'Nerve-calming treatments that relieve radiating leg pain and inflammation.',
    image: sciaticaImg,
  },
  {
    id: 'pcod',
    title: 'PCOD',
    description:
      'Hormonal balance through customized Ayurvedic medicines and lifestyle guidance.',
    image: pcodImg,
  },
  {
    id: 'thyroid',
    title: 'Thyroid',
    description:
      'Metabolic support with classical formulations and dietary corrections.',
    image: thyroidImg,
  },
  {
    id: 'diabetes',
    title: 'Diabetes',
    description:
      'Blood sugar management with pathya-apathya counseling and herbal support.',
    image: diabetesImg,
  },
  {
    id: 'obesity',
    title: 'Obesity',
    description:
      'Sustainable weight balance via detox, diet, and metabolic rejuvenation.',
    image: obesityImg,
  },
  {
    id: 'hair-loss',
    title: 'Hair Loss',
    description:
      'Scalp therapies and rasayana protocols that strengthen hair from the root.',
    image: hairLossImg,
  },
  {
    id: 'skin-diseases',
    title: 'Skin Diseases',
    description:
      'Gentle detox and herbal care for eczema, psoriasis, and chronic skin issues.',
    image: skinDiseasesImg,
  },
  {
    id: 'stress',
    title: 'Stress',
    description:
      'Shirodhara and mind-calming therapies for anxiety, burnout, and insomnia.',
    image: stressImg,
  },
  {
    id: 'hypertension',
    title: 'Hypertension',
    description:
      'Natural Ayurvedic care focused on supporting healthy blood pressure, stress balance, diet, and overall cardiovascular wellness.',
    image: hypertensionImg,
  },
];

/** Classic Panchakarma therapies */
export const PANCHAKARMA = [
  {
    id: 'abhyanga',
    title: 'Abhyanga',
    description:
      'Full-body warm oil massage that nourishes tissues and improves circulation.',
    image: abhyangaImg,
  },
  {
    id: 'shirodhara',
    title: 'Shirodhara',
    description:
      'Continuous stream of warm oil on the forehead to calm the mind and nerves.',
    image: shirodharaImg,
  },
  {
    id: 'nasya',
    title: 'Nasya',
    description:
      'Nasal administration of medicated oils for sinus, migraine, and head disorders.',
    image: nasyaImg,
  },
  {
    id: 'basti',
    title: 'Basti',
    description:
      'Medicated enema therapy considered the queen of Panchakarma for Vata disorders.',
    image: bastiImg,
  },
  {
    id: 'vamana',
    title: 'Vamana',
    description:
      'Therapeutic emesis to clear excess Kapha from the respiratory and digestive tracts.',
    image: vamanaImg,
  },
  {
    id: 'virechana',
    title: 'Virechana',
    description:
      'Controlled purgation that detoxifies the liver and clears Pitta accumulation.',
    image: virechanaImg,
  },
  {
    id: 'raktamokshana',
    title: 'Raktamokshana',
    description:
      'Blood purification therapy for chronic skin and inflammatory conditions.',
    image: raktamokshanaImg,
  },
];

export const STATISTICS = [
  { id: 'exp', value: 7, suffix: '+', label: 'Years Experience' },
  { id: 'patients', value: 1100, suffix: '+', label: 'Happy Patients' },
  { id: 'consults', value: 1200, suffix: '+', label: 'Consultations' },
  { id: 'reviews', value: 46, suffix: '+', label: 'Five Star Reviews' },
];

export const WHY_CHOOSE = [
  {
    id: 1,
    title: 'Experienced Doctor',
    description: '7+ years of authentic Ayurvedic clinical practice.',
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
      'Dr. Gauri Patil, BAMS (Ayurvedacharya), leads the clinic with 7+ years of experience in Ayurveda and Panchakarma.',
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
    year: '2018',
    title: 'BAMS Graduation',
    description: 'Completed Ayurvedacharya with distinction and clinical training.',
  },
  {
    year: '2019',
    title: 'Clinical Practice Begins',
    description: 'Started dedicated outpatient care focused on chronic lifestyle disorders.',
  },
  {
    year: '2024',
    title: 'MD Post Graduation',
    description: 'Completed Post Graduation in Ayurvedacharya with clinical training.',
  },
  {
    year: '2026',
    title: '1000+ Patients',
    description: 'Reached a milestone of trusted care across Maharashtra families.',
  },
  {
    year: 'Present',
    title: 'Shree Vishwa Prabha Ayurved & Panchakarma Clinic',
    description: 'Leading a modern Ayurvedic clinic rooted in authentic healing.',
  },
];
