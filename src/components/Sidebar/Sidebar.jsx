import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = ({ role = 'student' }) => {
  const menuItems = {
    student: [
      { path: '/dashboard/student', icon: 'dashboard', label: 'Dashboard' },
      { path: '/bookings', icon: 'calendar_today', label: 'Mes Réservations' },
      { path: '/payments', icon: 'payments', label: 'Paiements' },
      { path: '/settings', icon: 'settings', label: 'Paramètres' },
    ],
    owner: [
      { path: '/dashboard/owner', icon: 'dashboard', label: 'Dashboard' },
      { path: '/properties', icon: 'domain', label: 'Mes Cités' },
      { path: '/analytics', icon: 'bar_chart', label: 'Analytiques' },
      { path: '/owner-settings', icon: 'settings', label: 'Configuration' },
    ],
    admin: [
      { path: '/dashboard/admin', icon: 'admin_panel_settings', label: 'Vue Globale' },
      { path: '/admin/approvals', icon: 'verified', label: 'Approbations' },
      { path: '/admin/users', icon: 'group', label: 'Utilisateurs' },
      { path: '/admin/reports', icon: 'description', label: 'Rapports' },
    ]
  };

  const currentMenu = menuItems[role] || menuItems.student;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>LogeStudent</h1>
        <p className={styles.roleLabel}>{role.charAt(0).toUpperCase() + role.slice(1)} Portal</p>
      </div>

      <nav className={styles.nav}>
        {currentMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <button className={styles.supportButton}>
          <span className="material-symbols-outlined">help</span>
          Support
        </button>
        <button className={styles.logoutButton}>
          <span className="material-symbols-outlined">logout</span>
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
