/**
 * SEO helper — title, description, canonical, Open Graph, Twitter, JSON-LD.
 */
import { Helmet } from 'react-helmet-async';
import { CLINIC, IMAGES } from '../../data/clinic';

const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://shreevishwaprabha.com'
).replace(/\/$/, '');

const DEFAULT_KEYWORDS = [
  'Ayurvedic clinic Thane',
  'Panchakarma Thane',
  'Dr Gauri Patil',
  'Ayurveda doctor Thane West',
  'Shree VishwaPrabha',
  'herbal treatment',
  'Ayurvedic consultation',
].join(', ');

function buildClinicSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness', 'Physician'],
    '@id': `${SITE_URL}/#clinic`,
    name: CLINIC.name,
    alternateName: CLINIC.shortName,
    description: `${CLINIC.name} — authentic Ayurvedic healing with ${CLINIC.doctor.name}, ${CLINIC.doctor.qualification}.`,
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    telephone: CLINIC.contact.phone,
    email: CLINIC.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        '3, Ground floor, Aniket Tower, behind Stick Bowl, Uthalsar Naka',
      addressLocality: 'Thane West',
      addressRegion: 'Maharashtra',
      postalCode: '400601',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.2183,
      longitude: 72.9781,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '10:00',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '17:00',
        closes: '20:00',
      },
    ],
    priceRange: '₹₹',
    medicalSpecialty: 'Ayurvedic',
    sameAs: [CLINIC.social.facebook, CLINIC.social.instagram].filter(Boolean),
    employee: {
      '@type': 'Physician',
      name: CLINIC.doctor.name,
      medicalSpecialty: CLINIC.doctor.specialty,
      honorificPrefix: 'Dr.',
      jobTitle: CLINIC.doctor.qualification,
    },
  };
}

function SEO({
  title,
  description = `${CLINIC.name} — authentic Ayurvedic healing with ${CLINIC.doctor.name}, ${CLINIC.doctor.qualification}.`,
  path = '/',
  keywords = DEFAULT_KEYWORDS,
  image = IMAGES.hero,
  noIndex = false,
  schema,
}) {
  const fullTitle = title ? `${title} | ${CLINIC.shortName}` : CLINIC.name;
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const ogImage = image?.startsWith('http') ? image : `${SITE_URL}${image}`;
  const jsonLd = schema || buildClinicSchema();

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={CLINIC.doctor.name} />
      <meta
        name="robots"
        content={noIndex ? 'noindex, nofollow' : 'index, follow'}
      />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={CLINIC.name} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

export { SITE_URL, buildClinicSchema };
export default SEO;
