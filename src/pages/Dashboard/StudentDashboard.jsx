import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { dashboardData } from '../../data/mockData';
import styles from './StudentDashboard.module.css';

const StudentDashboard = () => {
  const { name: defaultName, activeStay, activities } = dashboardData.student;
  const storedName = localStorage.getItem('user_name');
  const name = storedName || defaultName;

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar role="student" />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.welcome}>
            <h1 className={styles.welcomeTitle}>Salut, {name}</h1>
            <p className={styles.welcomeSubtitle}>Bienvenue dans votre espace étudiant.</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.iconButton}>
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100"
              alt="Profile"
              className={styles.profilePic}
            />
          </div>
        </header>

        <section className={styles.grid}>
          {/* Active Booking Card */}
          <div className={styles.featuredCard}>
            <div className={styles.cardInfo}>
              <span className={styles.cardTag}>Séjour Actif</span>
              <h2 className={styles.roomTitle}>{activeStay.room}, {activeStay.building}</h2>
              <p className={styles.citeTitle}>{activeStay.cite}</p>

              <div className={styles.detailsRow}>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>Arrivée</p>
                  <p className={styles.detailValue}>{activeStay.checkIn}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>Prochain Paiement</p>
                  <p className={`${styles.detailValue} ${styles.warning}`}>
                    {activeStay.nextPayment}
                  </p>
                </div>
              </div>

              <button className={styles.manageButton}>
                Gérer ma réservation
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <div className={styles.cardImageContainer}>
              <img
                src="https://images.unsplash.com/photo-1555854877-bab0e561142f?auto=format&fit=crop&q=80&w=500"
                alt="Chambre"
                className={styles.cardImage}
              />
            </div>
          </div>

          {/* Activity Section */}
          <div className={styles.activityCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>s récentes</h3>
              <button className={styles.viewAll}>Tout voir</button>
            </div>
            <div className={styles.activityList}>
              {activities.map(activity => (
                <div key={activity.id} className={styles.activityItem}>
                  <div className={`${styles.iconBox} ${styles[activity.type]}`}>
                    <span className="material-symbols-outlined">
                      {activity.type === 'payment' ? 'payments' : 'engineering'}
                    </span>
                  </div>
                  <div className={styles.activityInfo}>
                    <p className={styles.activityTitle}>{activity.title}</p>
                    <p className={styles.activityDesc}>{activity.desc}</p>
                    <p className={styles.activityTime}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className="material-symbols-outlined">wifi</span>
              <h4>Wi-Fi</h4>
              <p>Actif • Haut Débit</p>
            </div>
            <div className={styles.statCard}>
              <span className="material-symbols-outlined">description</span>
              <h4>Contrat</h4>
              <p>Signé • Valide</p>
            </div>
            <div className={styles.statCard}>
              <span className="material-symbols-outlined">support_agent</span>
              <h4>Concierge</h4>
              <p>Disponible 24/7</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
