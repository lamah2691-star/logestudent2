import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allRooms, allBuildings } from '../../data/mockData';
import styles from './Rooms.module.css';

const Rooms = () => {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const building = allBuildings.find(b => b.id === buildingId);
  const rooms = allRooms.filter(r => r.buildingId === buildingId);

  if (!building) return <div>Bâtiment non trouvé</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <span className="material-symbols-outlined">arrow_back</span>
          Retour
        </button>
        <h1 className={styles.title}>Chambres - {building.name}</h1>
        <p className={styles.subtitle}>{building.letter} • {rooms.length} chambres disponibles</p>
      </header>

      <div className={styles.grid}>
        {rooms.map(room => (
          <div key={room.id} className={styles.roomCard}>
            <div className={styles.roomHeader}>
              <h3 className={styles.roomNumber}>Chambre {room.number}</h3>
              <span className={`${styles.status} ${room.status === 'Disponible' ? styles.available : styles.occupied}`}>
                {room.status}
              </span>
            </div>
            <div className={styles.roomDetails}>
              <p><span>Type:</span> {room.type}</p>
              <p><span>Étage:</span> {room.floor}</p>
              <p><span>Douche:</span> {room.hasShower ? 'Privée' : 'Commune'}</p>
            </div>
            <div className={styles.priceSection}>
              <span className={styles.price}>{room.price} GNF</span>
              <span className={styles.period}>/Ans</span>
            </div>
            <button 
              className={styles.viewButton}
              onClick={() => navigate(`/rooms/${room.id}`)}
              disabled={room.status !== 'Disponible'}
            >
              Voir les détails
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
