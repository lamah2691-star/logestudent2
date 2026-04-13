import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();
  const isReservationPage = location.pathname === '/reservation';

  if (isReservationPage) {
    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>LogeStudent</Link>
          <div className={styles.checkoutStatus}>
            <span className="material-symbols-outlined">lock</span>
            <span>Paiement sécurisé</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>LogeStudent</Link>
        
        <div className={styles.navLinks}>
          <Link 
            to="/" 
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
          >
            Accueil
          </Link>
          <Link 
            to="/cites" 
            className={`${styles.navLink} ${location.pathname === '/cites' ? styles.active : ''}`}
          >
            Résidences
          </Link>
          <Link to="/login" className={styles.navLink}>
            Connexion
          </Link>
          <Link to="/register" className={styles.registerBtn}>
            Inscription
          </Link>
        </div>

        <button className={styles.mobileToggle}>
          <span className="material-symbols-outlined">menu</span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
