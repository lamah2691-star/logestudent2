import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    
    // Save to localStorage for the dashboard to pick up
    if (firstName && lastName) {
      localStorage.setItem('user_name', `${firstName} ${lastName}`);
    }

    // Simulate register and redirect to the student dashboard
    navigate('/dashboard/student');
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.logoSection}>
            <Link to="/" className={styles.logo}>LogeStudent</Link>
            <p className={styles.subtitle}>Créez votre compte pour commencer </p>
          </div>

          <div className={styles.roleSelection}>
            <button 
              type="button"
              className={`${styles.roleBtn} ${role === 'student' ? styles.roleActive : ''}`}
              onClick={() => setRole('student')}
            >
              Étudiant
            </button>
            <button 
              type="button"
              className={`${styles.roleBtn} ${role === 'owner' ? styles.roleActive : ''}`}
              onClick={() => setRole('owner')}
            >
              Propriétaire
            </button>
          </div>

          <form className={styles.form} onSubmit={handleRegister}>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Prénom</label>
                <input type="text" name="firstName" placeholder="Ex: Jean" required />
              </div>
              <div className={styles.inputGroup}>
                <label>Nom</label>
                <input type="text" name="lastName" placeholder="Ex: Dupont" required />
              </div>
            </div>
            
            <div className={styles.inputGroup}>
              <label>Adresse email</label>
              <input type="email" placeholder="nom@exemple.com" required />
            </div>

            <div className={styles.inputGroup}>
              <label>Mot de passe</label>
              <div className={styles.passwordWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Min. 8 caractères" 
                  required 
                />
                <button 
                  type="button" 
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>Créer mon compte</button>
          </form>

          <p className={styles.switchAuth}>
            Déjà un compte ? <Link to="/login">Connectez-vous</Link>
          </p>

          <div className={styles.termsBox}>
            En créant un compte, vous acceptez nos <a href="#">Conditions</a> et notre <a href="#">Politique de confidentialité</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
