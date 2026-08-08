/**
 * Home page — assembles all primary marketing sections.
 */
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Statistics from '../components/Statistics';
import AboutDoctor from '../components/AboutDoctor';
import WhyChooseUs from '../components/WhyChooseUs';
import Treatments from '../components/Treatments';
import Panchakarma from '../components/Panchakarma';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import AppointmentCTA from '../components/AppointmentCTA';
import ContactCTA from '../components/ContactCTA';
import { useLanguage } from '../context/LanguageContext';

function Home() {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={t('pages.home.title')}
        description={t('pages.home.description')}
        path="/"
      />
      <Hero />
      <Statistics />
      <AboutDoctor compact />
      <WhyChooseUs />
      <Treatments limit={6} />
      <Panchakarma limit={4} />
      <Testimonials />
      <Gallery limit={6} />
      <FAQ />
      <AppointmentCTA />
      <ContactCTA />
    </>
  );
}

export default Home;
