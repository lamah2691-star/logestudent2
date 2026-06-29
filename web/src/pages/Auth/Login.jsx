import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Auth.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    setLoading(true);
    setError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const { data } = await axios.post(`${API_URL}/users/login`, { email, password });
      
      if (data.success && data.data) {
        const user = data.data;
        
        // Save to local storage for dashboards
        localStorage.setItem('user_name', user.name);
        localStorage.setItem('user_email', user.email);
        localStorage.setItem('user_role', user.role);
        localStorage.setItem('user_token', user.token);

        if (user.role === 'owner') {
          navigate('/dashboard/owner');
        } else if (user.role === 'admin') {
          navigate('/dashboard/admin');
        } else {
          navigate('/dashboard/student');
        }
      } else {
        setError(data.message || 'Email ou mot de passe incorrect.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Identifiants invalides ou problème de connexion.');
    } finally {
      setLoading(false);
    }
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
            {error && <div className={styles.errorAlert}>{error}</div>}
            
            <div className={styles.inputGroup}>
              <label>Adresse email</label>
              <input type="email" name="email" placeholder="nom@exemple.com" required />
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label>Mot de passe</label>
                <a href="#" className={styles.forgotPass}>Oublié ?</a>
              </div>
              <input type="password" name="password" placeholder="••••••••" required />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
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
