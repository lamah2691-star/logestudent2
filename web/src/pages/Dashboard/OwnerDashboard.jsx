import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './OwnerDashboard.module.css';

const OwnerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({ stats: [], properties: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const { data } = await axios.get(`${API_URL}/dashboard/owner`);
        if (data.success && data.data) {
          setDashboardData(data.data);
        }
      } catch (error) {
        console.error('Error fetching owner dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { stats, properties } = dashboardData;
  const location = useLocation();
  const path = location.pathname;

  // Conditional flags
  const isMain = path === '/dashboard/owner';
  const isProperties = path === '/properties';
  const isAnalytics = path === '/analytics';
  const isSettings = path === '/owner-settings';

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar role="owner" />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>
              {isMain && "Tableau de bord Propriétaire"}
              {isProperties && "Mes Cités"}
              {isAnalytics && "Analytiques détaillées"}
              {isSettings && "Configuration du Compte"}
            </h1>
            <p className={styles.subtitle}>
              {isMain && "Gérez vos cités et suivez vos performances."}
              {isProperties && "Liste de l'ensemble de vos résidences enregistrées."}
              {isAnalytics && "Analyse approfondie de vos revenus et de l'occupation."}
              {isSettings && "Gérez vos informations personnelles et préférences."}
            </p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.reportButton}>Générer Rapport</button>
            <button className={styles.addButton}>
              <span className="material-symbols-outlined">add</span>
              Ajouter
            </button>
          </div>
        </header>

        {/* Global Stats - Only on Main Dashboard */}
        {isMain && (
          <section className={styles.statsGrid}>
            {loading ? <p>Chargement des statistiques...</p> : stats.map((stat, index) => (
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
        )}

        {/* Properties Table - Main Dashboard or dedicated Properties page */}
        {(isMain || isProperties) && (
          <section className={styles.propertiesSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Mes Cités</h3>
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
                  {loading ? (
                    <tr><td colSpan="4">Chargement des cités...</td></tr>
                  ) : (
                    properties.map(property => (
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
                          <p className={styles.roomsCount}>{property.rooms || 'N/A'}</p>
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Analytics and Config - Dedicated Bottom Grid */}
        {(isMain || isAnalytics || isSettings) && (
          <div className={styles.bottomGrid}>
            {/* Analytics Section */}
            {(isMain || isAnalytics) && (
              <section className={styles.quickSection}>
                <h3 className={styles.sectionTitle}>Résumé Analytique</h3>
                <div className={styles.analyticsPreview}>
                  <div className={styles.miniStat}>
                    <span className={styles.miniLabel}>Revenus (Mois)</span>
                    <span className={styles.miniValue}>4.2M GNF</span>
                    <span className={styles.miniTrend}>+12%</span>
                  </div>
                  <div className={styles.miniStat}>
                    <span className={styles.miniLabel}>Dépôts récents</span>
                    <span className={styles.miniValue}>850k GNF</span>
                    <span className={styles.miniTrend}>Stable</span>
                  </div>
                </div>
                {!isAnalytics && <button className={styles.outlineButton}>Détails Statistiques</button>}
              </section>
            )}

            {/* Settings Section */}
            {(isMain || isSettings) && (
              <section className={styles.quickSection}>
                <h3 className={styles.sectionTitle}>Configuration</h3>
                <div className={styles.configLinks}>
                  <div className={styles.configItem}>
                    <span className="material-symbols-outlined">person</span>
                    <span>Gestion du Profil</span>
                  </div>
                  <div className={styles.configItem}>
                    <span className="material-symbols-outlined">notifications_active</span>
                    <span>Alertes de Paiement</span>
                  </div>
                </div>
                {!isSettings && <button className={styles.outlineButton}>Tous les paramètres</button>}
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default OwnerDashboard;
