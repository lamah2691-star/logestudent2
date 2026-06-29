import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const { data } = await axios.get(`${API_URL}/dashboard/admin`);
        if (data.success && data.data) {
          setAdminData(data.data);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Chargement du dashboard administrateur...</div>;
  if (!adminData) return <div style={{ textAlign: 'center', padding: '5rem' }}>Données non disponibles.</div>;

  const { totalRevenue, pendingApprovals, activeStudents } = adminData;

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar role="admin" />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Administration Centrale</h1>
          <div className={styles.headerActions}>
            <button className={styles.iconBtn}><span className="material-symbols-outlined">notifications</span></button>
            <button className={styles.iconBtn}><span className="material-symbols-outlined">settings</span></button>
          </div>
        </header>

        <section className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.revenueCard}`}>
            <span className="material-symbols-outlined">payments</span>
            <p className={styles.statLabel}>Revenu Total</p>
            <h2 className={styles.statValue}>{totalRevenue}</h2>
          </div>
          <div className={`${styles.statCard} ${styles.studentsCard}`}>
            <span className="material-symbols-outlined">group</span>
            <p className={styles.statLabel}>Étudiants Actifs</p>
            <h2 className={styles.statValue}>{activeStudents}</h2>
          </div>
          <div className={`${styles.statCard} ${styles.pendingCard}`}>
            <span className="material-symbols-outlined">verified</span>
            <p className={styles.statLabel}>Approbations en attente</p>
            <h2 className={styles.statValue}>{pendingApprovals}</h2>
          </div>
        </section>

        <section className={styles.adminGrid}>
          <div className={styles.chartSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Tendances de réservation</h3>
              <select className={styles.select}>
                <option>Derniers 30 jours</option>
                <option>6 derniers mois</option>
                <option>Cette année</option>
              </select>
            </div>
            <div className={styles.chartPlaceholder}>
              <div className={styles.barGrid}>
                {[45, 65, 55, 85, 75, 95, 65, 80, 70, 90].map((h, i) => (
                  <div key={i} className={styles.bar} style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.recentUsers}>
            <h3 className={styles.sectionTitle}>Utilisateurs Récents</h3>
            <div className={styles.userList}>
              {[
                { name: "Amadou Diallo", role: "Étudiant", time: "à l'instant" },
                { name: "Sow Mamadou", role: "Propriétaire", time: "Il y a 5m" },
                { name: "Aissatou Barry", role: "Étudiant", time: "Il y a 12m" },
                { name: "Kouyaté Lamine", role: "Étudiant", time: "Il y a 20m" }
              ].map((user, i) => (
                <div key={i} className={styles.userItem}>
                  <div className={styles.userAvatar}>{user.name[0]}</div>
                  <div className={styles.userInfo}>
                    <p className={styles.userName}>{user.name}</p>
                    <p className={styles.userRole}>{user.role}</p>
                  </div>
                  <span className={styles.userTime}>{user.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
