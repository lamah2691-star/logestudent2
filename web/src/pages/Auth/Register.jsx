import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Auth.module.css';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'owner' ? 'owner' : 'student';
  const [role, setRole] = useState(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    
    const fullName = `${firstName} ${lastName}`;

    setLoading(true);
    setError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const { data } = await axios.post(`${API_URL}/users/register`, {
        name: fullName,
        email,
        password,
        role
      });

      if (data.success && data.data) {
        const user = data.data;

        // Save to local storage for dashboards
        localStorage.setItem('user_name', user.name);
        localStorage.setItem('user_email', user.email);
        localStorage.setItem('user_role', user.role);
        localStorage.setItem('user_token', user.token);

        // Redirect to appropriate dashboard based on selected role
        if (user.role === 'owner') {
          navigate('/dashboard/owner');
        } else {
          navigate('/dashboard/student');
        }
      } else {
        setError(data.message || "Erreur d'inscription.");
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || "Une erreur est survenue lors de l'inscription.");
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
            <p className={styles.subtitle}>Créez votre compte pour commencer </p>
          </div>

          <div className={styles.roleSelection} style={{ gridTemplateColumns: '1fr', marginBottom: '24px' }}>
            <button 
              type="button"
              className={`${styles.roleBtn} ${styles.roleActive}`}
            >
              Espace Étudiant Uniquement
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
              <input type="email" name="email" placeholder="nom@exemple.com" required />
            </div>

            <div className={styles.inputGroup}>
              <label>Mot de passe</label>
              <div className={styles.passwordWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
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
            {error && <div className={styles.errorAlert} style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Création du compte...' : 'Créer mon compte'}
            </button>
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
