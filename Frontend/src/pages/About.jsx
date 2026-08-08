/**
 * About page — doctor profile, mission, vision, timeline.
 */
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import AboutDoctor from '../components/AboutDoctor';
import WhyChooseUs from '../components/WhyChooseUs';
import AppointmentCTA from '../components/AppointmentCTA';
import { IMAGES } from '../data/clinic';
import { useLanguage } from '../context/LanguageContext';

function About() {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={t('pages.about.title')}
        description={t('pages.about.description')}
        path="/about"
      />
      <PageHero
        title={t('pages.about.heroTitle')}
        subtitle={t('pages.about.heroSubtitle')}
        image={IMAGES.clinic}
      />
      <AboutDoctor />
      <WhyChooseUs />
      <AppointmentCTA />
    </>
  );
}

export default About;
