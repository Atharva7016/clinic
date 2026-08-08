/**
 * Treatments listing page.
 */
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Treatments from '../components/Treatments';
import AppointmentCTA from '../components/AppointmentCTA';
import { IMAGES } from '../data/clinic';
import { useLanguage } from '../context/LanguageContext';

function TreatmentsPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={t('pages.treatments.title')}
        description={t('pages.treatments.description')}
        path="/treatments"
      />
      <PageHero
        title={t('pages.treatments.heroTitle')}
        subtitle={t('pages.treatments.heroSubtitle')}
        image={IMAGES.herbs}
      />
      <Treatments showHeading={false} />
      <AppointmentCTA />
    </>
  );
}

export default TreatmentsPage;
