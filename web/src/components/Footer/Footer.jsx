import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const location = useLocation();
  const isReservationPage = location.pathname === '/reservation';
  const isCitesPage = location.pathname === '/cites' || location.pathname.startsWith('/cites/');

  if (isReservationPage) {
    return (
      <footer className={styles.reservationFooter}>
        <div className={styles.reservationContainer}>
          <div className={styles.reservationBrand}>
            <p className={styles.brandName}>LogeStudent</p>
            <p className={styles.copyright}>© {new Date().getFullYear()} LogeStudent. L'excellence du logement étudiant à Labé.</p>
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
            <h4 className={styles.brandName}>LogeStudent</h4>
            <p className={styles.description}>
              La solution digitale pour l'hébergement étudiant à Labé, facilitant la vie des jeunes académiques.
            </p>
          </div>
 
          {/* Explorer */}
          <div className={styles.column}>
            <h4 className={styles.heading}>EXPLORER</h4>
            <ul className={styles.list}>
              <li><Link to="/" className={styles.link}>ACCUEIL</Link></li>
              <li><Link to="/cites" className={styles.link}>RÉSIDENCES</Link></li>
              <li><a href="#" className={styles.link}>À PROPOS</a></li>
              <li><a href="#" className={styles.link}>LISTER VOTRE PROPRIÉTÉ</a></li>
            </ul>
          </div>
 
          {/* Popular Neighborhoods */}
          <div className={styles.column}>
            <h4 className={styles.heading}>QUARTIERS POPULAIRES</h4>
            <ul className={styles.list}>
              <li><a href="#" className={styles.link}>TATA</a></li>
              <li><a href="#" className={styles.link}>DOWSARÉ</a></li>
              <li><a href="#" className={styles.link}>KOULIDARA</a></li>
              <li><a href="#" className={styles.link}>POUNTHIOUN</a></li>
            </ul>
          </div>
 
          {/* Contact Us */}
          <div className={styles.column}>
            <h4 className={styles.heading}>CONTACTEZ-NOUS</h4>
            <ul className={styles.list}>
              <li className={styles.contactItem}>BP 123, Labé, Guinée</li>
              <li className={styles.contactItem}>+224 600 00 00 00</li>
              <li className={styles.contactItem}>contact@logestudent.gn</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.bottomText}>
            © {new Date().getFullYear()} LogeStudent. The Digital Concierge for Labé.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
