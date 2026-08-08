/**
 * Gallery page with full masonry + lightbox.
 */
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Gallery from '../components/Gallery';
import { IMAGES } from '../data/clinic';
import { useLanguage } from '../context/LanguageContext';

function GalleryPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={t('pages.gallery.title')}
        description={t('pages.gallery.description')}
        path="/gallery"
      />
      <PageHero
        title={t('pages.gallery.heroTitle')}
        subtitle={t('pages.gallery.heroSubtitle')}
        image={IMAGES.reception}
      />
      <Gallery showHeading={false} />
    </>
  );
}

export default GalleryPage;
