import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login and redirect to the student dashboard
    navigate('/dashboard/student');
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.logoSection}>
            <Link to="/" className={styles.logo}>LogeStudent</Link>
            <p className={styles.subtitle}>Connectez-vous pour gérer vos réservations</p>
          </div>

          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label>Adresse email</label>
              <input type="email" placeholder="nom@exemple.com" required />
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label>Mot de passe</label>
                <a href="#" className={styles.forgotPass}>Oublié ?</a>
              </div>
              <input type="password" placeholder="••••••••" required />
            </div>

            <button type="submit" className={styles.submitBtn}>Se connecter</button>
          </form>

          <p className={styles.switchAuth}>
            Pas encore de compte ? <Link to="/register">Créer un compte</Link>
          </p>
          
          <div className={styles.divider}>
            <span>Ou continuer avec</span>
          </div>

          <div className={styles.socialAuth}>
            <button className={styles.socialBtn}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
