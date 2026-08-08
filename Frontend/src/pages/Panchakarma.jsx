/**
 * Panchakarma therapies page.
 */
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Panchakarma from '../components/Panchakarma';
import AppointmentCTA from '../components/AppointmentCTA';
import { IMAGES } from '../data/clinic';
import { useLanguage } from '../context/LanguageContext';

function PanchakarmaPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={t('pages.panchakarma.title')}
        description={t('pages.panchakarma.description')}
        path="/panchakarma"
      />
      <PageHero
        title={t('pages.panchakarma.heroTitle')}
        subtitle={t('pages.panchakarma.heroSubtitle')}
        image={IMAGES.massage}
      />
      <Panchakarma showHeading={false} showCta={false} />
      <AppointmentCTA />
    </>
  );
}

export default PanchakarmaPage;
