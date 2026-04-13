import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const location = useLocation();
  const isReservationPage = location.pathname === '/reservation';
  const isCitesPage = location.pathname === '/cites';

  if (isReservationPage) {
    return (
      <footer className={styles.reservationFooter}>
        <div className={styles.reservationContainer}>
          <div className={styles.reservationBrand}>
            <p className={styles.brandName}>LogeStudent</p>
            <p className={styles.copyright}>© 2024 LogeStudent. L'excellence du logement étudiant à Labé.</p>
          </div>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Conditions d'utilisation</a>
            <a href="#" className={styles.footerLink}>Politique de confidentialité</a>
            <a href="#" className={styles.footerLink}>Contacter le support</a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      {/* CTA Banner - Hidden on Cites page to avoid redundant links */}
      {!isCitesPage && (
        <div className={styles.ctaBanner}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaText}>
              <h3 className={styles.ctaTitle}>Prêt à trouver votre logement idéal ?</h3>
              <p className={styles.ctaSubtitle}>Rejoignez des centaines d'étudiants déjà installés à Labé.</p>
            </div>
            <Link to="/cites" className={styles.ctaButton}>
              Explorer les résidences
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      )}

      <div className={styles.mainFooter}>
        <div className={styles.container}>
          {/* Brand Column */}
          <div className={styles.brandColumn}>
            <div className={styles.brand}>
              <span className={styles.brandLogo}>LogeStudent</span>
              <span className={styles.brandDot}></span>
            </div>
            <p className={styles.description}>
              Révolutionner le logement étudiant à Labé par la transparence, la sécurité et la communauté.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon} aria-label="Site web">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Partager">
                <span className="material-symbols-outlined">share</span>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Email">
                <span className="material-symbols-outlined">mail</span>
              </a>
            </div>
          </div>

          {/* Explorer */}
          <div className={styles.column}>
            <h4 className={styles.heading}>Explorer</h4>
            <ul className={styles.list}>
              <li><Link to="/" className={styles.link}>Accueil</Link></li>
              <li><Link to="/cites" className={styles.link}>Résidences</Link></li>
              <li><a href="#" className={styles.link}>À propos</a></li>
              <li><a href="#" className={styles.link}>Lister votre propriété</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className={styles.column}>
            <h4 className={styles.heading}>Support</h4>
            <ul className={styles.list}>
              <li><a href="#" className={styles.link}>Centre d'aide</a></li>
              <li><a href="#" className={styles.link}>Conditions d'utilisation</a></li>
              <li><a href="#" className={styles.link}>Politique de confidentialité</a></li>
              <li><a href="#" className={styles.link}>Contacter le support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.column}>
            <h4 className={styles.heading}>Restez informé</h4>
            <p className={styles.newsletterText}>Rejoignez notre liste de diffusion pour les actualités de la vie étudiante à Labé.</p>
            <div className={styles.newsletter}>
              <input 
                type="email" 
                placeholder="Votre email" 
                className={styles.input}
              />
              <button className={styles.sendButton} aria-label="Envoyer">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <p className={styles.newsletterHint}>
              <span className="material-symbols-outlined">lock</span>
              Nous ne partageons jamais vos données.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.bottomText}>
            © 2024 LogeStudent. L'excellence du logement étudiant à Labé.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Conditions</a>
            <span className={styles.bottomDivider}>·</span>
            <a href="#" className={styles.bottomLink}>Confidentialité</a>
            <span className={styles.bottomDivider}>·</span>
            <a href="#" className={styles.bottomLink}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
