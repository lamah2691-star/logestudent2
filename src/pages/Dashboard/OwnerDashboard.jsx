import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { dashboardData } from '../../data/mockData';
import styles from './OwnerDashboard.module.css';

const OwnerDashboard = () => {
  const { stats, properties } = dashboardData.owner;

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar role="owner" />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Dashboard Propriétaire</h1>
            <p className={styles.subtitle}>Gérez vos cités et suivez vos performances.</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.reportButton}>Générer Rapport</button>
            <button className={styles.addButton}>
              <span className="material-symbols-outlined">add</span>
              Ajouter une Cité
            </button>
          </div>
        </header>

        <section className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={`material-symbols-outlined ${styles.statIcon}`}>{stat.icon}</span>
                <span className={styles.growthBadge}>{stat.growth}</span>
              </div>
              <p className={styles.statLabel}>{stat.label}</p>
              <h2 className={styles.statValue}>{stat.value}</h2>
            </div>
          ))}
        </section>

        <section className={styles.propertiesSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Gestion des Propriétés</h3>
            <div className={styles.filterActions}>
              <span className="material-symbols-outlined">filter_list</span>
              <span className="material-symbols-outlined">search</span>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Cité / Localisation</th>
                  <th>Unités</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(property => (
                  <tr key={property.id}>
                    <td>
                      <div className={styles.propertyInfo}>
                        <div className={styles.propertyThumb}>
                          <img 
                            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=100" 
                            alt={property.name} 
                          />
                        </div>
                        <div>
                          <p className={styles.propertyName}>{property.name}</p>
                          <p className={styles.propertyLoc}>
                            <span className="material-symbols-outlined">location_on</span>
                            {property.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className={styles.unitsCount}>{property.units}</p>
                      <p className={styles.roomsCount}>{property.rooms}</p>
                    </td>
                    <td>
                      <span className={styles.statusBadge}>{property.status}</span>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button className={styles.editBtn}>
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className={styles.addBtn}>
                          <span className="material-symbols-outlined">add_circle</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OwnerDashboard;
