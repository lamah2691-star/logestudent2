import React from 'react';
import { Link } from 'react-router-dom';
import CiteCard from '../../components/Card/CiteCard';
import { featuredCites, stats } from '../../data/mockData';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>
              Trouvez votre <span className={styles.italic}>logement étudiant</span> idéal à Labé.
            </h1>
            <p className={styles.subtitle}>
              Des espaces de vie sélectionnés pour le parcours académique moderne. 
              Sécurisés, confortables et proches du l'université  .
            </p>
            
            {/* Search Bar */}
            <div className={styles.searchBar}>
              <div className={styles.searchItem}>
                <span className="material-symbols-outlined">location_on</span>
                <div className={styles.searchField}>
                  <label>Cité</label>
                  <input type="text" placeholder="Quel quartier ?" />
                </div>
              </div>
              <div className={styles.searchItem}>
                <span className="material-symbols-outlined">directions_walk</span>
                <div className={styles.searchField}>
                  <label>Distance</label>
                  <input type="text" placeholder="Max 15 min" />
                </div>
              </div>
              <div className={styles.searchItem}>
                <span className="material-symbols-outlined">payments</span>
                <div className={styles.searchField}>
                  <label>Budget</label>
                  <input type="text" placeholder="Prix limite" />
                </div>
              </div>
              <button className={styles.searchButton}>
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>

          <div className={styles.heroImageContainer}>
            <div className={styles.mainImageWrapper}>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACIIWOt_J9zI0LOBGleKK1K1pycHo8EGsvAcFocTChjefGJvsN1y0YF6rbRGwl0A1wSea4XCsF9bboS7BNsLM6TFN6oAg4EoN7xcm8MIc3iDmvQmZCvxvgwAB2-dIvf6FXJcBhg6vjaAz6AN0sxGSL1alwAVb6aYiPfWlbwU4M-ZQFd1enuehWnPeRwxNs5FZ5VRetakPe1_0v9jwuvkY6YpPwgkUY6-cFfrbDuKu-a5BBcTdG9Hb75E8_C1twEOcdEYkRVmjmQ4Y" 
                alt="Résidence étudiante moderne" 
                className={styles.heroImage}
              />
            </div>
            <div className={styles.floatingBadge}>
              <div className={styles.badgeHeader}>
                <span className={styles.badgeIcon}>
                  <span className="material-symbols-outlined">verified</span>
                </span>
                <span className={styles.badgeTitle}>Propriétaires vérifiés</span>
              </div>
              <p className={styles.badgeText}>Chaque propriété à Labé
                 est personnellement inspectée par notre équipe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cités Section */}
      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionTag}>Sélections triées sur le volet</span>
            <h2 className={styles.sectionTitle}>Cités en vedette</h2>
          </div>
          <Link to="/cites" className={styles.exploreLink}>
            Explorer toutes les résidences <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        <div className={styles.citesGrid}>
          {featuredCites.map(cite => (
            <CiteCard key={cite.id} cite={cite} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statValue}>{stat.value}</div>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
