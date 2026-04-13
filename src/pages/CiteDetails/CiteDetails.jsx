import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { citeDetails, featuredCites, allCites, allBuildings } from '../../data/mockData';
import styles from './CiteDetails.module.css';

const CiteDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Try to find the cite by ID from all data sources, fallback to citeDetails
  const allAvailable = [...featuredCites, ...allCites];
  const foundCite = allAvailable.find(c => String(c.id) === String(id));
  const cite = foundCite ? { ...citeDetails, ...foundCite } : citeDetails;

  // Filter buildings for this cite
  const buildings = allBuildings.filter(b => b.citeId === Number(id || 1));

  // Fallback to mock buildings if none found in allBuildings (for demo stability)
  const displayBuildings = buildings.length > 0 ? buildings : [
    {
      id: "b1",
      name: "Tour Alpha",
      letter: "Bâtiment A",
      price: "450 000 GNF",
      roomsCount: 48,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbMKPMBpRnP1JwkoyHsw7RuCQm3qx1JucRKHO8X3-U85SrYYhCB2KdhYK14Jpad4b08QP1Y1b9m8TrFutqK0a2rZJ_MftnZOyFRI_ov80KIcGvpfhqDyXe1n69mgmK32k7J9_9MWG96jXzgx2fVGcqrBt-yqQ6HYM1q2uGp4JTkFqsGN55Fc9Z-NEgj1a0zQv9M1k9ZnQRhhGwE68lxiQD5InOC8U05EjEq72vibJ0MHVvfj5QYTXeaBBCIlJwrZhiEhiwcLY2mW0",
      amenities: [
        { icon: "water_drop", label: "Eau", active: true },
        { icon: "bolt", label: "Électricité", active: true },
        { icon: "wifi", label: "Wifi", active: true }
      ]
    }
  ];

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <img src={cite.image} alt={cite.name} className={styles.heroImage} />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          {(cite.tags || []).map((tag, i) => (
            <div key={i} className={styles.heroTag}>{tag}</div>
          ))}
          <h1 className={styles.heroTitle}>{cite.name}</h1>
          <div className={styles.heroLocation}>
            <span className="material-symbols-outlined">location_on</span>
            <span>{cite.location}</span>
          </div>
        </div>
      </header>

      {/* Info Section */}
      <section className={styles.infoSection}>
        <div className={styles.infoGrid}>
          {/* Stats Bento */}
          <div className={styles.statsBento}>
            <div className={styles.statsRow}>
              {(cite.stats || []).map((stat, i) => (
                <div key={i} className={styles.statCard}>
                  <span className={`material-symbols-outlined ${stat.icon === 'apartment' ? styles.primaryIcon : styles.tertiaryIcon}`}>
                    {stat.icon}
                  </span>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <p className={styles.statValue}>{stat.value}</p>
                </div>
              ))}
            </div>
            {cite.availability && (
              <div className={styles.availabilityCard}>
                <div className={styles.availHeader}>
                  <div className={styles.availText}>
                    <p className={styles.availLabel}>{cite.availability.label}</p>
                    <p className={styles.availValue}>{cite.availability.value}</p>
                  </div>
                  <div className={styles.availBadge}>
                    {cite.availability.status}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className={styles.descriptionCol}>
            <h2 className={styles.descriptionTitle}>Un cadre de vie d'excellence</h2>
            <div className={styles.descriptionText}>
              {(cite.description || []).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className={styles.badgesRow}>
              {(cite.badges || []).map((badge, i) => (
                <div key={i} className={`${styles.badge} ${styles[badge.type]}`}>
                  <span className="material-symbols-outlined">{badge.icon}</span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Buildings Section */}
      <section className={styles.buildingsSection}>
        <div className={styles.sectionHeading}>
          <div>
            <h2 className={styles.sectionTitle}>Bâtiments de cette Cité</h2>
            <p className={styles.sectionSubtitle}>Chaque bâtiment offre des configurations de chambres
              uniques et des espaces partagés adaptés aux différents besoins académiques.</p>
          </div>
          <div className={styles.headingDivider}></div>
          <button className={styles.filterButton}>
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>

        <div className={styles.buildingsGrid}>
          {displayBuildings.map((building) => (
            <div key={building.id} className={styles.buildingCard}>
              <div className={styles.buildingImageWrapper}>
                <img src={building.image} alt={building.name} className={styles.buildingImage} />
                <div className={styles.buildingLetter}>{building.letter}</div>
              </div>
              <div className={styles.buildingContent}>
                <div className={styles.buildingHeader}>
                  <h3 className={styles.buildingName}>{building.name}</h3>
                  <div className={styles.buildingPrice}>
                    <span className={styles.priceLabel}>À partir de</span>
                    <span className={styles.priceValue}>
                      {building.price} <span className={styles.pricePeriod}>/Ans</span>
                    </span>
                  </div>
                </div>
                <div className={styles.buildingRooms}>
                  <span className="material-symbols-outlined">bed</span>
                  <span>{building.roomsCount || building.rooms}</span>
                </div>
                <div className={styles.amenitiesRow}>
                  {(building.amenities || [
                    { icon: "water_drop", label: "Eau", active: true },
                    { icon: "bolt", label: "Électricité", active: true },
                    { icon: "wifi", label: "Wifi", active: true }
                  ]).map((amenity, i) => (
                    <div key={i} className={`${styles.amenityItem} ${!amenity.active ? styles.inactive : ''}`}>
                      <div className={styles.amenityIcon}>
                        <span className="material-symbols-outlined">{amenity.icon}</span>
                      </div>
                      <span className={styles.amenityLabel}>{amenity.label}</span>
                    </div>
                  ))}
                </div>
                <button
                  className={styles.reserveButton}
                  onClick={() => navigate(`/buildings/${building.id}/rooms`)}
                >
                  Voir les chambres
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proximity Section */}
      <section className={styles.proximitySection}>
        <div className={styles.proximityGrid}>
          <div>
            <h2 className={styles.proximityTitle}>Localisation & Proximité</h2>
            <p className={styles.proximitySubtitle}>La Cité Universitaire de Labé est
              parfaitement située en bordure du quartier Tata,
              offrant un accès piéton direct aux bâtiments principaux
              de la faculté en 5 minutes de marche.</p>
            <div className={styles.proximityList}>
              {cite.proximity.map((item, i) => (
                <div key={i} className={styles.proximityItem}>
                  <div className={styles.proximityIconWrapper}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <div>
                    <p className={styles.proximityName}>{item.name}</p>
                    <p className={styles.proximityDetails}>{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.mapWrapper}>
            <img src={cite.mapImage} alt="Carte" className={styles.mapImage} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CiteDetails;
