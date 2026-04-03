import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      hero_title: 'TIMELESS MENSWEAR',
      hero_button: 'Discover the Collection',
      new_collection_title: 'New Collection',
      new_collection_subtitle: 'Luxury essentials for the modern gentleman',
      new_collection_button: 'View Collection',
      philosophy_title: 'Our Philosophy',
      philosophy_text: 'At MEN31, we believe in the art of timeless dressing. Our collections are crafted to embody the elegance and sophistication of the modern gentleman, combining classic design with luxurious materials.',
      philosophy_subtext: 'Each garment is meticulously crafted from the finest materials, blending traditional techniques with contemporary design to create a wardrobe that transcends fleeting trends.',
      feature_grid_title: 'Crafted for the Modern Gentleman',
      feature_1: 'The Perfect Suit',
      feature_2: 'Timeless Timepieces',
      feature_3: 'Leather Essentials',
      tagline: 'Vêtements Intemporels',
      collection: 'Collection',
      about: 'About',
      contact: 'Contact',
      admin_login: 'Admin Login',
      admin_logout: 'Logout',
      quick_links: 'Quick Links',
      location: 'Store Location: Casablanca, Morocco',
      category_all: 'All Products',
      'category_T-Shirts': 'T-Shirts',
      'category_Hoodies': 'Hoodies',
      'category_Pants': 'Pants',
      'category_Jackets': 'Jackets',
      'category_Boots': 'Boots',
      'category_Accessories': 'Accessories',
    }
  },
  fr: {
    translation: {
      hero_title: 'Mode Masculine Intemporelle. Présence Raffinée.',
      hero_button: 'Découvrir la Collection',
      new_collection_title: 'Nouvelle Collection',
      new_collection_subtitle: "L'essentiel du luxe pour l'homme moderne",
      new_collection_button: 'Voir la Collection',
      philosophy_title: 'Notre Philosophie',
      philosophy_text: "Chez MEN31, nous croyons que le vrai luxe ne réside pas seulement dans ce que vous portez, mais dans la façon dont vous vous présentez. Notre engagement envers l'élégance intemporelle et un savoir-faire inégalé garantit que chaque pièce de notre collection témoigne de la présence raffinée de l'homme moderne.",
      philosophy_subtext: 'Chaque vêtement est méticuleusement confectionné à partir des matériaux les plus fins, alliant techniques traditionnelles et design contemporain pour créer une garde-robe qui transcende les tendances éphémères.',
      feature_grid_title: "Conçu pour l'Homme Moderne",
      feature_1: 'Le Costume Parfait',
      feature_2: 'Horlogerie Intemporelle',
      feature_3: 'Essentiels en Cuir',
      tagline: 'Vêtements Intemporels',
      collection: 'Collection',
      about: 'À Propos',
      contact: 'Contact',
      admin_login: 'Connexion Admin',
      admin_logout: 'Déconnexion',
      quick_links: 'Liens Rapides',
      location: 'Boutique: Casablanca, Maroc',
      category_all: 'Tous les Produits',
      'category_T-Shirts': 'T-Shirts',
      'category_Hoodies': 'Sweats à Capuche',
      'category_Pants': 'Pantalons',
      'category_Jackets': 'Vestes',
      'category_Boots': 'Bottes',
      'category_Accessories': 'Accessoires',
    }
  },
  ar: {
    translation: {
      hero_title: 'ملابس رجالية خالدة. حضور راقٍ.',
      hero_button: 'اكتشف المجموعة',
      new_collection_title: 'مجموعة جديدة',
      new_collection_subtitle: 'أساسيات فاخرة للرجل العصري',
      new_collection_button: 'عرض المجموعة',
      philosophy_title: 'فلسفتنا',
      philosophy_text: "في MEN31، نؤمن بأن الفخامة الحقيقية لا تتعلق فقط بما ترتديه، بل بكيفية تقديم نفسك. التزامنا بالأناقة الخالدة والحرفية التي لا تضاهى يضمن أن كل قطعة في مجموعتنا هي شهادة على الحضور الراقي للرجل العصري.",
      philosophy_subtext: 'يتم تصنيع كل قطعة ملابس بدقة من أجود المواد، مع مزج التقنيات التقليدية مع التصميم المعاصر لإنشاء خزانة ملابس تتجاوز الاتجاهات العابرة.',
      feature_grid_title: 'صُممت للرجل العصري',
      feature_1: 'البدلة المثالية',
      feature_2: 'ساعات خالدة',
      feature_3: 'أساسيات جلدية',
      tagline: 'ملابس خالدة',
      collection: 'المجموعة',
      about: 'حول',
      contact: 'اتصال',
      admin_login: 'دخول المسؤول',
      admin_logout: 'تسجيل الخروج',
      quick_links: 'روابط سريعة',
      location: 'موقع المتجر: الدار البيضاء، المغرب',
      category_all: 'جميع المنتجات',
      'category_T-Shirts': 'تي شيرت',
      'category_Hoodies': 'هوديس',
      'category_Pants': 'سراويل',
      'category_Jackets': 'سترات',
      'category_Boots': 'أحذية',
      'category_Accessories': 'إكسسوارات',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
