import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './CiteDetails.module.css';

const CiteDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Filter states
  const [priceRange, setPriceRange] = useState(500); // in k GNF
  const [hasShowerOnly, setHasShowerOnly] = useState(true);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selectedBloc, setSelectedBloc] = useState('Tous les Blocs');
  const [expandedBuilding, setExpandedBuilding] = useState('b1');
  const [visibleRooms, setVisibleRooms] = useState(4);

  const [cite, setCite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCite = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const { data } = await axios.get(`${API_URL}/cites/${id}`);
        if (data.success && data.data) {
          setCite(data.data);
          if (data.data.buildings && data.data.buildings.length > 0) {
            setExpandedBuilding(data.data.buildings[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching cite details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCite();
  }, [id]);

  const buildings = cite?.buildings || [];
  const allRooms = buildings.flatMap(b => b.rooms || []);

  // Filtered rooms logic
  const rooms = useMemo(() => {
    return allRooms.filter(room => {
      // Filter by availability
      if (availableOnly && room.status !== 'Disponible') return false;
      
      // Filter by shower
      if (hasShowerOnly && !room.hasShower) return false;
      
      // Filter by price (converting price string to number)
      const roomPrice = parseInt(String(room.price).replace(/\s/g, '')) || 0;
      if (roomPrice > priceRange * 1000) return false;

      // Filter by building (since sidebar expands by building)
      if (room.buildingId !== expandedBuilding) return false;
      
      return true;
    });
  }, [availableOnly, hasShowerOnly, priceRange, expandedBuilding, allRooms]);

  const handleLoadMore = () => {
    setVisibleRooms(prev => prev + 4);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Chargement des détails de la cité...</div>;
  if (!cite) return <div style={{ textAlign: 'center', padding: '5rem' }}>Cité non trouvée.</div>;

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        {/* Breadcrumbs & Header */}
        <header className={styles.header}>
          <nav className={styles.breadcrumbs}>
            <Link to="/cites">Résidences</Link>
            <span className="material-symbols-outlined">chevron_right</span>
            <span>Labé</span>
            <span className="material-symbols-outlined">chevron_right</span>
            <span className={styles.activeBreadcrumb}>{cite.name}</span>
          </nav>
          
          <div className={styles.headerTop}>
            <div>
              <h1 className={styles.title}>{cite.name}</h1>
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  <span>{cite.location}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>near_me</span>
                  <span>{cite.distance} de l'université</span>
                </div>
                <div className={styles.metaItem}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>domain</span>
                  <span>{cite.units}</span>
                </div>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.actionBtn}>
                <span className="material-symbols-outlined">share</span> Partager
              </button>
              <button className={styles.actionBtn}>
                <span className="material-symbols-outlined">favorite</span> Enregistrer
              </button>
            </div>
          </div>
        </header>

        {/* Bento Gallery */}
        <section className={styles.gallery}>
          <div className={styles.mainImage}>
            <img src={cite.image} alt="Vue principale" />
            <div className={styles.imageLabel}>Entrée principale</div>
          </div>
          <div className={styles.sideImages}>
            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1500" alt="Chambre" />
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1500" alt="Salon" />
          </div>
          <div className={styles.bottomImage}>
            <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1500" alt="Extérieur" />
            <button className={styles.viewPhotosBtn}>
              <span className="material-symbols-outlined">grid_view</span> Voir toutes les photos
            </button>
          </div>
        </section>

        {/* Sticky Filters */}
        <section className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <div className={styles.sliderControl}>
              <span className={styles.filterLabel}>Gamme de prix (GNF)</span>
              <input 
                type="range" 
                min="50" 
                max="500" 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className={styles.slider}
              />
              <div className={styles.sliderTicks}><span>50k</span><span>500k</span></div>
            </div>
            
            <div className={styles.divider}></div>
            
            <div className={styles.toggleControl}>
              <span className={styles.toggleLabel}>Avec douche</span>
              <button 
                className={`${styles.toggle} ${hasShowerOnly ? styles.active : ''}`}
                onClick={() => setHasShowerOnly(!hasShowerOnly)}
              >
                <div className={styles.toggleCircle}></div>
              </button>
            </div>

            <div className={styles.toggleControl}>
              <span className={styles.toggleLabel}>Uniquement disponible</span>
              <button 
                className={`${styles.toggle} ${availableOnly ? styles.active : ''}`}
                onClick={() => setAvailableOnly(!availableOnly)}
              >
                <div className={styles.toggleCircle}></div>
              </button>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.selectControl}>
              <span className={styles.selectLabel}>Sélectionner un bloc</span>
              <button className={styles.selectBtn}>
                {selectedBloc}
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>

            <button className={styles.applyBtn}>Appliquer les filtres</button>
          </div>
        </section>

        {/* Main Content Split */}
        <div className={styles.contentSplit}>
          {/* Sidebar: Buildings */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarTitle}>Structure de la cité</div>
            {buildings.map(building => (
              <div key={building.id} className={`${styles.buildingAccordion} ${expandedBuilding === building.id ? styles.expanded : ''}`}>
                <div 
                  className={styles.accordionHeader}
                  onClick={() => setExpandedBuilding(expandedBuilding === building.id ? null : building.id)}
                >
                  <div className={styles.buildingInfo}>
                    <div className={styles.buildingIcon}>
                      <span className="material-symbols-outlined">apartment</span>
                    </div>
                    <div>
                      <h3 className={styles.buildingName}>{building.name}</h3>
                      <p className={styles.buildingStatus}>{building.roomsCount} Chambres</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
                {expandedBuilding === building.id && (
                  <div className={styles.accordionContent}>
                    {(() => {
                      const buildingRooms = building.rooms || [];
                      // Group by letter prefix of room number, or fallback to 'A', 'B'
                      const blocs = Array.from(new Set(buildingRooms.map(r => {
                        const match = String(r.number).match(/[A-Za-z]/);
                        return match ? match[0].toUpperCase() : 'A';
                      })));
                      if (blocs.length === 0) blocs.push('A');
                      
                      return blocs.map(bloc => {
                        const availCount = buildingRooms.filter(r => {
                          const match = String(r.number).match(/[A-Za-z]/);
                          const currentBloc = match ? match[0].toUpperCase() : 'A';
                          return currentBloc === bloc && r.status === 'Disponible';
                        }).length;

                        return (
                          <div 
                            key={bloc} 
                            className={`${styles.blocItem} ${selectedBloc.includes(bloc) ? styles.selectedBloc : ''}`}
                            onClick={() => setSelectedBloc(`Bloc ${bloc}`)}
                          >
                            <span>Bloc {bloc}</span>
                            <span className={styles.blocAvail}>{availCount} Libres</span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>
            ))}
          </aside>

          {/* Room Grid */}
          <div className={styles.roomList}>
            <div className={styles.roomListHeader}>
              <h2 className={styles.listTitle}>Chambres disponibles</h2>
              <p className={styles.listCount}>Affichage de {Math.min(visibleRooms, rooms.length)} sur {rooms.length} chambres</p>
            </div>

            <div className={styles.grid}>
              {rooms.slice(0, visibleRooms).map(room => (
                <div key={room.id} className={styles.roomCard}>
                  <div className={styles.roomImage}>
                    <img 
                      src={room.image || cite.image || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1500"} 
                      alt={`Chambre ${room.number}`} 
                    />
                    <div className={`${styles.statusBadge} ${room.status === 'Disponible' ? styles.avail : styles.occupied}`}>
                      {room.status}
                    </div>
                    {room.hasShower && (
                      <div className={styles.amenityBadge}>
                        <span className="material-symbols-outlined">shower</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.roomDetails}>
                    <div className={styles.roomHeader}>
                      <div>
                        <h4 className={styles.roomNumber}>Chambre #{room.number}</h4>
                        <p className={styles.roomMeta}>{room.floor}</p>
                      </div>
                      <div className={styles.roomPrice}>
                        <span className={styles.priceValue}>{room.price}</span>
                        <span className={styles.priceUnit}>GNF/mois</span>
                      </div>
                    </div>
                    <button 
                      className={styles.reserveBtn}
                      disabled={room.status !== 'Disponible'}
                      onClick={() => navigate('/reservation', { state: { roomId: room.id } })}
                    >
                      {room.status === 'Disponible' ? 'Réserver maintenant' : 'Non disponible'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {visibleRooms < rooms.length && (
              <div className={styles.loadMore}>
                <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                  Charger plus de chambres <span className="material-symbols-outlined">refresh</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className={styles.mobileNav}>
        <Link to="/"><span className="material-symbols-outlined">search</span><p>Explorer</p></Link>
        <Link to="/cites"><span className="material-symbols-outlined">favorite</span><p>Enregistré</p></Link>
        <Link to="/reservation"><span className="material-symbols-outlined">event_available</span><p>Réservations</p></Link>
        <Link to="/dashboard/student"><span className="material-symbols-outlined">person</span><p>Profil</p></Link>
      </nav>
    </div>
  );
};

export default CiteDetails;
