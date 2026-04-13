import React from 'react';
import { useLocation } from 'react-router-dom';
import { reservationData, allRooms, allBuildings } from '../../data/mockData';
import styles from './Reservation.module.css';

const Reservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = location.state || {};
  
  // Try to find the specific room if provided in state
  const selectedRoom = allRooms.find(r => r.id === roomId);
  const selectedBuilding = selectedRoom ? allBuildings.find(b => b.id === selectedRoom.buildingId) : null;
  
  // Use selected room data or fallback to default mock reservationData
  const displayRoom = selectedRoom ? {
    name: `Chambre ${selectedRoom.number} • ${selectedRoom.type}`,
    location: `${selectedBuilding?.name || 'Résidence'} • ${selectedRoom.floor}`,
    image: selectedBuilding?.image || reservationData.room.image,
    amenities: [
      { icon: "shower", text: selectedRoom.hasShower ? "Douche privée" : "Douche commune" },
      { icon: "wifi", text: "Wi-Fi haut débit" }
    ]
  } : reservationData.room;

  const roomPriceNum = selectedRoom ? parseInt(selectedRoom.price.replace(/\s/g, '')) : 450000;
  const cautionPriceNum = 750000;
  
  const displayPayment = {
    items: [
      { label: "Caution", value: `${cautionPriceNum.toLocaleString()} GNF` },
      { label: "Premier mois de loyer", value: `${roomPriceNum.toLocaleString()} GNF` }
    ],
    total: `${(cautionPriceNum + roomPriceNum).toLocaleString()} GNF`,
    moveInDate: "1er Septembre 2024"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Félicitations ! Votre demande de réservation a été envoyée au propriétaire.');
    navigate('/dashboard/student');
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Finaliser la <span className={styles.primary}>réservation</span></h1>
          <p className={styles.subtitle}>
            Vous êtes à une étape de sécuriser votre logement étudiant premium à Labé.
          </p>
        </header>

        {/* Progress Steps */}
        <div className={styles.progressSection}>
          <div className={styles.progressTrack}>
            <div className={styles.progressLine}></div>
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${styles.stepActive}`}>1</div>
              <span className={`${styles.stepLabel} ${styles.stepLabelActive}`}>Détails</span>
            </div>
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${styles.stepActive}`}>2</div>
              <span className={`${styles.stepLabel} ${styles.stepLabelActive}`}>Paiement</span>
            </div>
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${styles.stepPending}`}>3</div>
              <span className={styles.stepLabel}>Confirmation</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.container}>
          {/* Left Column: Forms */}
          <div className={styles.formCol}>
            <form onSubmit={handleSubmit}>
              {/* Student Info */}
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className="material-symbols-outlined">person</span>
                  <h2 className={styles.sectionTitle}>Informations de l'étudiant</h2>
                </div>
                <div className={styles.inputGrid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Nom complet</label>
                    <input type="text" placeholder="Abdoulaye Diallo" className={styles.input} required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Numéro étudiant</label>
                    <input type="text" placeholder="UGL-2024-XXXX" className={styles.input} required />
                  </div>
                  <div className={styles.fullWidth}>
                    <label className={styles.label}>Adresse email</label>
                    <input type="email" placeholder="abdoulaye.diallo@universite.edu" className={styles.input} required />
                  </div>
                  <div className={styles.fullWidth}>
                    <label className={styles.label}>Numéro de téléphone</label>
                    <div className={styles.phoneGroup}>
                      <span className={styles.phonePrefix}>+224</span>
                      <input type="tel" placeholder="620 00 00 00" className={styles.phoneInput} required />
                    </div>
                  </div>
                </div>
              </section>

              {/* Room Summary */}
              <section className={styles.roomSection}>
                <div className={styles.sectionHeader}>
                  <span className="material-symbols-outlined">apartment</span>
                  <h2 className={styles.sectionTitle}>Chambre sélectionnée</h2>
                </div>
                <div className={styles.roomSummaryCard}>
                  <div
                    className={styles.roomImage}
                    style={{ backgroundImage: `url(${displayRoom.image})` }}
                  ></div>
                  <div className={styles.roomInfo}>
                    <div className={styles.roomHeader}>
                      <div>
                        <h3 className={styles.roomName}>{displayRoom.name}</h3>
                        <p className={styles.roomLoc}>{displayRoom.location}</p>
                      </div>
                      <span className={styles.selectedBadge}>
                        {selectedRoom?.type || "Standard"}
                      </span>
                    </div>
                    <div className={styles.roomAmenities}>
                      {displayRoom.amenities.map((item, i) => (
                        <span key={i} className={styles.amenityBadge}>
                          <span className="material-symbols-outlined">{item.icon}</span>
                          {item.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Terms */}
              <section className={styles.section}>
                <div className={styles.checkboxList}>
                  <label className={styles.checkboxItem}>
                    <input type="checkbox" className={styles.checkbox} required />
                    <span className={styles.checkboxText}>
                      Je confirme que les informations fournies sont exactes et j'accepte les <a href="#" className={styles.link}>Conditions d'utilisation</a> et le <a href="#" className={styles.link}>Règlement intérieur</a> de la résidence.
                    </span>
                  </label>
                </div>
              </section>

              <button type="submit" className={styles.submitBtn}>
                <span>Confirmer la réservation</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
          </div>

          {/* Right Column: Booking Summary */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>
              <div className={styles.paymentCard}>
                <h3 className={styles.paymentTitle}>Récapitulatif</h3>
                <div className={styles.paymentItems}>
                  {displayPayment.items.map((item, i) => (
                    <div key={i} className={styles.paymentRow}>
                      <span>{item.label}</span>
                      <input type="text" defaultValue={item.value} className={styles.paymentInput} />
                    </div>
                  ))}
                  <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Total à payer</span>
                    <div className={styles.totalValueGroup}>
                      <input type="text" defaultValue={displayPayment.total} className={styles.totalInput} />
                    </div>
                  </div>
                </div>
                <div className={styles.moveInInfo}>
                  <span className="material-symbols-outlined">calendar_month</span>
                  <div>
                    <p className={styles.moveInLabel}>Date d'emménagement</p>
                    <p className={styles.moveInValue}>{displayPayment.moveInDate}</p>
                  </div>
                </div>
              </div>

              <div className={styles.secureCard}>
                <div className={styles.secureIcon}>
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <div>
                  <p className={styles.secureTitle}>Réservation sécurisée</p>
                  <p className={styles.secureText}>Vos données sont chiffrées et protégées.</p>
                </div>
              </div>

              <div className={styles.helpBox}>
                <span className="material-symbols-outlined">help_outline</span>
                <span>Besoin d'aide ? <a href="#" className={styles.helpLink}>Contacter le support</a></span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
