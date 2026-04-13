import React from 'react';
import ListingCard from '../../components/Card/ListingCard';
import { allCites } from '../../data/mockData';
import styles from './CitesListing.module.css';

const CitesListing = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Explorez les Cités à <span className={styles.primary}>Hafia</span>
        </h1>
        <p className={styles.subtitle}>
          Des espaces de vie étudiants sélectionnés près de l'Université de Labé. Des complexes paisibles aux résidences urbaines modernes.
        </p>
      </header>

      <div className={styles.content}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterCard}>
            <h3 className={styles.filterTitle}>
              <span className="material-symbols-outlined">filter_list</span>
              Filtres
            </h3>

            {/* Distance Filter */}
            <div className={styles.filterSection}>
              <label className={styles.sectionLabel}>Distance au campus</label>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked />
                  <span>Moins de 5 min</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>5-15 mins</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>15+ mins</span>
                </label>
              </div>
            </div>

            {/* Price Filter */}
            <div className={styles.filterSection}>
              <label className={styles.sectionLabel}>Fourchette de prix</label>
              <div className={styles.priceInputs}>
                <div className={styles.priceField}>
                  <span className={styles.fieldLabel}>Min</span>
                  <span className={styles.fieldValue}>300k GNF</span>
                </div>
                <div className={styles.priceField}>
                  <span className={styles.fieldLabel}>Max</span>
                  <span className={styles.fieldValue}>2M GNF</span>
                </div>
              </div>
              <input type="range" className={styles.rangeSlider} />
            </div>

            {/* Amenities Filter */}
            <div className={styles.filterSection}>
              <label className={styles.sectionLabel}>Équipements</label>
              <div className={styles.chipsGroup}>
                <button className={styles.chip}>Wi-Fi</button>
                <button className={styles.chip}>Sécurité</button>
                <button className={styles.chip}>Parking</button>
                <button className={styles.chip}>Électricité 24/7</button>
              </div>
            </div>
          </div>
        </aside>

        {/* Cités Grid */}
        <div className={styles.gridContainer}>
          <div className={styles.grid}>
            {allCites.map(cite => (
              <ListingCard key={cite.id} cite={cite} />
            ))}
          </div>
        </div>
      </div>

      {/* Map View CTA */}
      <div className={styles.mapCta}>
        <button className={styles.mapButton}>
          <span className="material-symbols-outlined">map</span>
          Explorer sur la carte
        </button>
      </div>
    </div>
  );
};

export default CitesListing;
