import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      tagline: 'Timeless Clothing. Refined Presence.',
      shop_now: 'Shop Now',
      collection: 'Collection',
      philosophy: 'Philosophy',
      contact: 'Contact',
      about: 'About',
      admin_login: 'Admin Login',
      admin_logout: 'Logout',
      categories: {
        all: 'All',
        tshirts: 'T-Shirts',
        hoodies: 'Hoodies',
        pants: 'Pants',
        jackets: 'Jackets',
        boots: 'Boots',
        accessories: 'Accessories'
      },
      philosophy_text: 'At MEN 31, we believe that true elegance lies in the details. Our garments are crafted for the modern man who values quality over quantity and timeless style over fleeting trends.',
      showroom: 'Showroom Info',
      brand_info: 'Brand Info',
      quick_links: 'Quick Links',
      location: 'Store Location: Casablanca, Morocco',
      add_product: 'Add Product',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel'
    }
  },
  fr: {
    translation: {
      tagline: 'Vêtements Intemporels. Présence Raffinée.',
      shop_now: 'Acheter',
      collection: 'Collection',
      philosophy: 'Philosophie',
      contact: 'Contact',
      about: 'À Propos',
      admin_login: 'Connexion Admin',
      admin_logout: 'Déconnexion',
      categories: {
        all: 'Tout',
        tshirts: 'T-Shirts',
        hoodies: 'Hoodies',
        pants: 'Pantalons',
        jackets: 'Vestes',
        boots: 'Bottes',
        accessories: 'Accessoires'
      },
      philosophy_text: 'Chez MEN 31, nous croyons que la véritable élégance réside dans les détails. Nos vêtements sont conçus pour l\'homme moderne qui privilégie la qualité à la quantité et le style intemporel aux tendances éphémères.',
      showroom: 'Infos Showroom',
      brand_info: 'Infos Marque',
      quick_links: 'Liens Rapides',
      location: 'Boutique: Casablanca, Maroc',
      add_product: 'Ajouter un Produit',
      edit: 'Modifier',
      delete: 'Supprimer',
      save: 'Enregistrer',
      cancel: 'Annuler'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
