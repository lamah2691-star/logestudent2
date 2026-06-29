import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './StudentLanding.module.css';



const imagesCites = [
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1500",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1500",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1500",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1500"
];

const StudentLanding = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [featuredCites, setFeaturedCites] = useState([]);

  // Fetch featured cites
  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        // Fetch featured cites
        const citesRes = await axios.get(`${API_URL}/cites`);
        if (citesRes.data && citesRes.data.success && citesRes.data.data.cites) {
          setFeaturedCites(citesRes.data.data.cites.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching landing data:', error);
      }
    };
    fetchLandingData();
  }, []);

  // Duplication de la première image à la fin pour simuler la boucle infinie
  const carouselImages = [...imagesCites, imagesCites[0]];

  useEffect(() => {
    // Si on arrive sur l'image clonée, on désactive la transition et on revient instantanément à 0
    if (currentImageIndex === carouselImages.length - 1) {
      const resetTimer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentImageIndex(0);
      }, 500); // 500ms = durée de l'animation CSS
      return () => clearTimeout(resetTimer);
    }
  }, [currentImageIndex, carouselImages.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => {
        // Empêche l'index de dépasser (cause du fond noir quand on change d'onglet)
        if (prev >= carouselImages.length - 1) return prev;
        return prev + 1;
      });
    }, 3000); // On accélère le rythme (3s au lieu de 4s)
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <div className={styles.page}>
      {/* TopNavBar */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>LogeStudent</div>

          <div className={styles.navLinks}>
            <Link to="/" className={`${styles.navLink} ${styles.activeLink}`} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>home</span>
              Accueil
            </Link>
            <Link to="/cites" className={styles.navLink} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>apartment</span>
              Résidences
            </Link>
            <Link to="/login" className={styles.navLink} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>login</span>
              Connexion
            </Link>
          </div>

          <div className={styles.mobileMenu}>
            <span className="material-symbols-outlined">menu</span>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div
            style={{
              display: 'flex',
              width: `${carouselImages.length * 100}%`,
              height: '100%',
              transform: `translateX(-${(currentImageIndex * 100) / carouselImages.length}%)`,
              transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1
            }}
          >
            {carouselImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Résidence étudiante"
                style={{
                  width: `${100 / carouselImages.length}%`,
                  height: '100%',
                  objectFit: 'cover',
                  flexShrink: 0
                }}
              />
            ))}
          </div>
          <div className={styles.heroOverlay}></div>

          <div className={styles.heroContent}>
            <div className={styles.heroGlassCard}>
              <h1 className={styles.heroTitle}>
                Trouvez des chambres étudiantes de confiance à <span className={styles.textHighlight}>Labé</span> facilement
              </h1>
              <p className={styles.heroSubtitle}>
                Connectez-vous avec des logements vérifiés et sécurisés à proximité de l'Université de Labé.
                Votre base académique parfaite est à portée de clic.
              </p>
              <div className={styles.btnGroup}>
                <Link to="/cites" className={styles.primaryBtn}>
                  Trouver un logement
                </Link>
                <Link to="/register?role=owner" className={styles.secondaryGlassBtn}>
                  Publier mon annonce
                </Link>
              </div>
            </div>
          </div>
        </section>



        {/* Why Choose Section */}
        <section className={styles.whyChoose}>
          <div className={styles.whyChooseGrid}>
            <div className={styles.whyCard}>
              <div className={styles.iconWrapper}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
              <h3 className={styles.whyTitle}>Annonces vérifiées</h3>
              <p className={styles.whyDesc}>Chaque chambre est vérifiée manuellement par notre équipe locale.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.iconWrapper}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
              </div>
              <h3 className={styles.whyTitle}>Gagnez du temps</h3>
              <p className={styles.whyDesc}>Filtrez par distance et équipements en quelques secondes.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.iconWrapper}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              </div>
              <h3 className={styles.whyTitle}>Prix transparents</h3>
              <p className={styles.whyDesc}>Aucun frais caché. Ce que vous voyez est ce que vous payez.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.iconWrapper}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
              <h3 className={styles.whyTitle}>Plateforme locale</h3>
              <p className={styles.whyDesc}>Profondément ancrée dans la communauté de Labé et la vie universitaire.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.iconWrapper}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>event_available</span>
              </div>
              <h3 className={styles.whyTitle}>Réservation facile</h3>
              <p className={styles.whyDesc}>Sécurisez votre place en ligne en quelques clics.</p>
            </div>
          </div>
        </section>

        {/* Featured Listings Section */}
        <section className={styles.featuredListings}>
          <div className={styles.listingsHeader}>
            <div>
              <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Meilleures Résidences Étudiantes</h2>
              <p className={styles.sectionSubtitle} style={{ textAlign: 'left', margin: '0' }}>Des logements sélectionnés à proximité des facultés majeures.</p>
            </div>
            <Link to="/cites" className={styles.viewAllLink}>Voir toutes les annonces →</Link>
          </div>

          <div className={styles.listingGrid}>
            {featuredCites.map(cite => (
              <div className={styles.listingCard} key={cite.id}>
                <div className={styles.cardImageWrapper}>
                  <img src={cite.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1500"} className={styles.cardImage} alt={cite.name} />
                  <div className={styles.badge}>Vérifié</div>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{cite.name}</h3>
                    <div className={styles.price}>{cite.price || '450k'} GNF<span className={styles.priceUnit}>/mois</span></div>
                  </div>
                  <div className={styles.location}>
                    <span className="material-symbols-outlined">location_on</span>
                    {cite.location}
                  </div>
                  <div className={styles.amenities}>
                    <span className={styles.tagSmall}>WiFi</span>
                    <span className={styles.tagSmall}>Douche interne</span>
                    <span className={styles.tagSmall}>Solaire</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className={styles.features}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Conçu pour votre sérénité</h2>
            <p className={styles.sectionSubtitle}>Une expérience fluide pour les étudiants, une gestion simplifiée pour les propriétaires.</p>
          </div>

          <div className={styles.bentoGrid}>
            <div className={styles.mainFeature}>
              <div>
                <span className={styles.tag}>Étudiants</span>
                <h3 className={styles.featureTitle}>Le logement idéal sans le stress</h3>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', background: 'white', color: '#003f87', borderRadius: '50%', padding: '2px' }}>check</span>
                    <p style={{ fontSize: '14px' }}>Annonces 100% vérifiées par nos équipes sur place à Labé.</p>
                  </div>
                  <div className={styles.featureItem}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', background: 'white', color: '#003f87', borderRadius: '50%', padding: '2px' }}>check</span>
                    <p style={{ fontSize: '14px' }}>Paiement sécurisé et suivi des quittances en temps réel.</p>
                  </div>
                  <div className={styles.featureItem}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', background: 'white', color: '#003f87', borderRadius: '50%', padding: '2px' }}>check</span>
                    <p style={{ fontSize: '14px' }}>Filtres multicritères (Prix, Proximité Université, Équipements).</p>
                  </div>
                </div>
              </div>
              <img
                className={styles.featureImage}
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1500"
                alt="Intérieur chambre étudiante"
              />
            </div>

            <div className={styles.sideFeature}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#003f87', marginBottom: '1.5rem' }}>support_agent</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>Support & Conciergerie</h3>
              <p style={{ fontSize: '0.875rem', color: '#424752' }}>Bénéficiez d'une assistance réactive et communiquez avec l'administration en toute simplicité.</p>
            </div>

            <div className={styles.secondaryFeature}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#475a7f', marginBottom: '1.5rem' }}>verified_user</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>Étudiants vérifiés</h3>
              <p style={{ fontSize: '0.875rem', color: '#424752' }}>Accédez à des profils d'étudiants sérieux avec dossiers complets déjà validés par LogeStudent.</p>
            </div>

            <div className={styles.ownerSummary}>
              <div style={{ flex: 1 }}>
                <span className={styles.tag} style={{ color: '#003f87', backgroundColor: 'rgba(0, 63, 135, 0.1)' }}>Propriétaires</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '1rem 0' }}>Maximisez votre taux d'occupation</h3>
                <p style={{ fontSize: '0.875rem', color: '#424752', marginBottom: '1.5rem' }}>Gérez vos contrats, vos paiements et vos communications avec vos locataires en un seul endroit.</p>
                <Link to="/register?role=owner" className={styles.discoverLink}>
                  Découvrir le portail propriétaire <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className={styles.howItWorks}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Simple comme 1-2-3</h2>
          </div>
          <div className={styles.howItWorksGrid}>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h4 className={styles.stepTitle}>Parcourez et Filtrez</h4>
              <p className={styles.stepDesc}>Cherchez par prix, emplacement ou équipements spécifiques comme les douches privées.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h4 className={styles.stepTitle}>Réservez instantanément</h4>
              <p className={styles.stepDesc}>Payez un petit dépôt de réservation pour bloquer votre chambre pour le semestre.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h4 className={styles.stepTitle}>Emménagez</h4>
              <p className={styles.stepDesc}>Récupérez vos clés à l'arrivée et profitez de votre nouveau sanctuaire étudiant.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={styles.testimonials}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Ce que disent nos utilisateurs</h2>
          </div>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className={styles.testimonialQuote}>
                "Trouver une chambre depuis Conakry avant de déménager à Labé était si stressant jusqu'à ce que je trouve LogeStudent. J'ai réservé ma chambre en 5 minutes."
              </p>
              <div className={styles.userInfo}>
                <div className={styles.avatar} style={{ backgroundColor: '#dbe1ff', color: '#01174b' }}>MB</div>
                <div className={styles.userMeta}>
                  <h5>Mamadou B.</h5>
                  <p>Étudiant en Médecine</p>
                </div>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className={styles.testimonialQuote}>
                "Le tableau de bord facilite tellement la gestion de mes 12 chambres. Je n'ai plus à gérer des dizaines d'appels anonymes."
              </p>
              <div className={styles.userInfo}>
                <div className={styles.avatar} style={{ backgroundColor: '#ffdbcf', color: '#380d00' }}>SD</div>
                <div className={styles.userMeta}>
                  <h5>Saliou Diallo</h5>
                  <p>Propriétaire</p>
                </div>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className={styles.testimonialQuote}>
                "Les annonces vérifiées changent la donne. Je savais exactement ce que j'allais avoir, et la distance jusqu'au campus était exacte !"
              </p>
              <div className={styles.userInfo}>
                <div className={styles.avatar} style={{ backgroundColor: '#dbe1ff', color: '#01174b' }}>AK</div>
                <div className={styles.userMeta}>
                  <h5>Aminata K.</h5>
                  <p>Étudiante en Économie</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission CTA Section */}
        <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto', backgroundColor: '#003f87', borderRadius: '2rem', padding: '5rem 2rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
              Prêt à emménager dans votre nouveau chez-vous ?
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', position: 'relative', zIndex: 10 }}>
              <Link to="/cites" style={{ backgroundColor: 'white', color: '#003f87', padding: '1.25rem 2.5rem', borderRadius: '9999px', fontWeight: 700, fontSize: '1.25rem' }}>
                Explorer les résidences
              </Link>
              <button style={{ backgroundColor: '#0056b3', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '1.25rem 2.5rem', borderRadius: '9999px', fontWeight: 700, fontSize: '1.25rem' }}>
                Contacter un conseiller
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <h4 className={styles.footerTitle}>LogeStudent</h4>
            <p className={styles.footerDesc}>La solution digitale pour l'hébergement étudiant à Labé, facilitant la vie des jeunes académiques.</p>
          </div>
          <div>
            <h4 className={styles.footerColTitle}>EXPLORER</h4>
            <div className={styles.footerLinks}>
              <Link to="/" className={styles.footerLink}>Accueil</Link>
              <Link to="/cites" className={styles.footerLink}>Résidences</Link>
              <a href="#" className={styles.footerLink}>À propos</a>
              <a href="#" className={styles.footerLink}>Lister votre propriété</a>
            </div>
          </div>
          <div>
            <h4 className={styles.footerColTitle}>Quartiers populaires</h4>
            <div className={styles.footerLinks}>
              <a href="#" className={styles.footerLink}>Tata</a>
              <a href="#" className={styles.footerLink}>Dowsaré</a>
              <a href="#" className={styles.footerLink}>Koulidara</a>
              <a href="#" className={styles.footerLink}>Pounthioun</a>
            </div>
          </div>
          <div>
            <h4 className={styles.footerColTitle}>Contactez-nous</h4>
            <p className={styles.footerDesc}>BP 123, Labé, Guinée</p>
            <p className={styles.footerDesc}>+224 600 00 00 00</p>
            <p className={styles.footerDesc}>contact@logestudent.gn</p>
          </div>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} LogeStudent. Le Concierge Digital pour Labé.
        </div>
      </footer>
    </div>
  );
};

export default StudentLanding;
