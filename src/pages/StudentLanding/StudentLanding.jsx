import React from 'react';
import { Link } from 'react-router-dom';
import styles from './StudentLanding.module.css';

const StudentLanding = () => {
  return (
    <div className={styles.page}>
      {/* TopNavBar */}
      <nav className={styles.nav}>
        <div className={styles.logo}>LogeStudent</div>
        
        <div className={styles.navLinks}>
          <Link to="/" className={`${styles.navLink} ${styles.activeLink}`}>Accueil</Link>
          <Link to="/cites" className={styles.navLink}>Résidences</Link>
          <Link to="/login" className={styles.navLink}>Connexion</Link>
          <Link to="/register" className={styles.registerBtn}>S'inscrire</Link>
        </div>

        <div className={styles.mobileMenu}>
          <span className="material-symbols-outlined">menu</span>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Trouvez votre logement étudiant idéal à <span className={styles.textGradient}>Labé</span> en quelques clics.
              </h1>
              <p className={styles.heroSubtitle}>
                Accédez à une sélection exclusive de cités universitaires sécurisées et modernes. 
                LogeStudent vous accompagne de la recherche à l'emménagement.
              </p>
              <div className={styles.btnGroup}>
                <Link to="/cites" className={styles.primaryBtn}>
                  Trouver une chambre
                </Link>
                <button className={styles.secondaryBtn}>
                  Inscrire ma Cité
                </button>
              </div>
            </div>

            <div className={styles.heroImageArea}>
              <div className={styles.imageWrapper}>
                <img 
                  className={styles.image}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeUo6zWuQWGlf-n0I1T_ZWtc2wTapWfTqIUk1NygO2OnqiTs__y80j9GPByJrssSEIAvQK49TvfBJ58QUuxAe4VA85oY1w6ppPQr2u2ecq4mWvfHHGuZQuH12mKRDHUGY5St9I5aX20YrhIM95DaanDejTnYK3zR95na1M9uXpHm41jbCRu9q9cuI62aUkxCZ1ccu8YtMniDMgNwlfr5uL_zsvgJ5lQf76YBGxbPkxP1PTo6RnXYGM_i4kZKhjDeZjLCTIPlkk-OE" 
                  alt="Résidence étudiante moderne à Labé"
                />
                <div className={styles.availabilityBadge}>
                  <div>
                    <p className={styles.availLabel}>Disponible maintenant</p>
                    <p className={styles.availTitle}>Cité du Savoir, Quartier Tata</p>
                  </div>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", color: '#003f87' }}>
                    verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.stats}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>500+</div>
              <p className={styles.statLabel}>Chambres Vérifiées</p>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>25</div>
              <p className={styles.statLabel}>Cités Partenaires</p>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>1.2k</div>
              <p className={styles.statLabel}>Étudiants Logés</p>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>98%</div>
              <p className={styles.statLabel}>Satisfaction</p>
            </div>
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJWSBpJvN5pB9wR-uifNvkSN6FLkE4i13-65IOWN_8FdRynvaXzbqF4vVrKmj1eA5xro25fF7nGPWAmeI1r2BMj_5xr9WQFaw5fy6Mk0gre7p1aX5NSPFOSpwduTCmj66_xgpuOJ_cMGtD0XIAN1cWvPO6g9oAacd4xX6XWCMlCQmoJtHjyjT6pRxpyar625i3jEWtZvle5F0jrEs6RUDLbQogLKlRay-doxurwCINKZL5gniCT3b93NxIXzReBLmQSt00jt1zdP8" 
                alt="Intérieur chambre étudiante"
              />
            </div>

            <div className={styles.sideFeature}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#003f87', marginBottom: '1.5rem' }}>analytics</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>Stats en temps réel</h3>
              <p style={{ fontSize: '0.875rem', color: '#424752' }}>Suivez l'occupation de votre cité et vos revenus mensuels depuis un tableau de bord intuitif.</p>
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
                <Link to="/dashboard/owner" className={styles.discoverLink}>
                  Découvrir le portail propriétaire <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
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
            <h4 className={styles.footerColTitle}>Plateforme</h4>
            <div className={styles.footerLinks}>
              <a href="#" className={styles.footerLink}>About</a>
              <a href="#" className={styles.footerLink}>Contact</a>
              <a href="#" className={styles.footerLink}>Terms</a>
              <a href="#" className={styles.footerLink}>Privacy</a>
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
          © 2024 LogeStudent. The Digital Concierge for Labé.
        </div>
      </footer>
    </div>
  );
};

export default StudentLanding;
