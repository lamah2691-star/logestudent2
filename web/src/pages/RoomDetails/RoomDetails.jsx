import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './RoomDetails.module.css';

const RoomDetails = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const { data } = await axios.get(`${API_URL}/rooms/${roomId}`);
        if (data.success && data.data) {
          setRoom(data.data);
        }
      } catch (error) {
        console.error('Error fetching room details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);

  if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Chargement...</div>;
  if (!room) return <div className={styles.notFound}>Chambre non trouvée</div>;

  const building = room.building;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <span className="material-symbols-outlined">arrow_back</span>
        Retour
      </button>

      <div className={styles.mainGrid}>
        <div className={styles.imageSection}>
          <img 
            src={building?.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000'} 
            alt="Chambre" 
            className={styles.mainImage}
          />
          <div className={styles.badgeSection}>
            <span className={styles.statusBadge}>{room.status}</span>
            <span className={styles.typeBadge}>{room.type}</span>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.roomTitle}>Chambre {room.number}</h1>
          <p className={styles.buildingInfo}>{building?.name} • {room.floor}</p>
          
          <div className={styles.priceContainer}>
            <span className={styles.price}>{room.price} GNF</span>
            <span className={styles.period}>/An</span>
          </div>

          <div className={styles.amenities}>
            <h3 className={styles.sectionTitle}>Équipements</h3>
            <div className={styles.amenitiesGrid}>
              <div className={styles.amenityItem}>
                <span className="material-symbols-outlined">shower</span>
                <span>{room.hasShower ? 'Douche privée' : 'Douche commune'}</span>
              </div>
              <div className={styles.amenityItem}>
                <span className="material-symbols-outlined">bolt</span>
                <span>Électricité incluse</span>
              </div>
              <div className={styles.amenityItem}>
                <span className="material-symbols-outlined">water_drop</span>
                <span>Eau 24h/24</span>
              </div>
              <div className={styles.amenityItem}>
                <span className="material-symbols-outlined">wifi</span>
                <span>Wifi haut débit</span>
              </div>
            </div>
          </div>

          <div className={styles.description}>
            <h3 className={styles.sectionTitle}>Description</h3>
            <p>
              Cette chambre lumineuse située au {room.floor.toLowerCase()} offre un espace de vie optimisé pour les étudiants. 
              Elle dispose de tous les branchements nécessaires et d'une finition moderne.
              Située dans la {building?.name}, elle bénéficie d'un calme absolu propice aux études.
            </p>
          </div>

          <button 
            className={styles.reserveButton}
            disabled={room.status !== 'Disponible'}
            onClick={() => navigate('/reservation', { state: { roomId: room.id } })}
          >
            {room.status === 'Disponible' ? 'Réserver maintenant' : 'Déjà réservée'}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          <p className={styles.guarantee}>
            <span className="material-symbols-outlined">verified_user</span>
            Réservation sécurisée et garantie par LogeStudent
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
