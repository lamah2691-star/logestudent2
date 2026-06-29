import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CiteCard.module.css';

const CiteCard = ({ cite }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={cite.image} 
          alt={cite.name} 
          className={styles.image}
        />
        {cite.isFeatured && (
          <div className={styles.badge}>En vedette</div>
        )}
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{cite.name}</h3>
          <span className={styles.price}>
            {cite.price} <span className={styles.period}>{cite.period}</span>
          </span>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className="material-symbols-outlined">{cite.distanceIcon}</span>
            <span>{cite.distance}</span>
          </div>
          <div className={styles.detailItem}>
            <span className="material-symbols-outlined">{cite.amenityIcon}</span>
            <span>{cite.amenity}</span>
          </div>
        </div>

        <button 
          className={styles.button}
          onClick={() => navigate(`/cites/${cite.id}`)}
        >
          Voir les détails
        </button>
      </div>
    </div>
  );
};

export default CiteCard;
