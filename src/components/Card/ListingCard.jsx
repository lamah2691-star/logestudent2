import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ListingCard.module.css';

const ListingCard = ({ cite }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={cite.image} alt={cite.name} className={styles.image} />
        {cite.isVerified && (
          <div className={styles.verifiedBadge}>
            <span className="material-symbols-outlined">verified</span>
            Propriétaire vérifié
          </div>
        )}
        {cite.isStudentFavorite && (
          <div className={styles.favoriteBadge}>
            <span className="material-symbols-outlined">trending_up</span>
            Favori des étudiants
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.name}>{cite.name}</h2>
          <div className={styles.priceTag}>
            <span className={styles.from}>à partir de</span> {cite.price} <span className={styles.currency}>{cite.currency}</span>
          </div>
        </div>

        <p className={styles.location}>
          <span className="material-symbols-outlined">location_on</span>
          {cite.location}
        </p>

        <div className={styles.matrix}>
          <div className={`${styles.matrixItem} ${cite.distanceLabel === 'À pied' ? styles.primary : ''}`}>
            <span className={styles.matrixLabel}>{cite.distanceLabel}</span>
            <span className={styles.matrixValue}>{cite.distance}</span>
          </div>
          <div className={styles.matrixItem}>
            <span className={styles.matrixLabel}>Bâtiments</span>
            <span className={styles.matrixValue}>{cite.units}</span>
          </div>
        </div>

        <button 
          className={styles.button}
          onClick={() => navigate(`/cites/${cite.id}`)}
        >
          Voir les détails
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default ListingCard;
