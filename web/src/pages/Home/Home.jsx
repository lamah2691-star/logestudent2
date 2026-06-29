import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CiteCard from '../../components/Card/CiteCard';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [featuredCites, setFeaturedCites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search States
  const [searchLocation, setSearchLocation] = useState('');
  const [searchBudget, setSearchBudget] = useState('');

  const handleSearch = () => {
    let query = '?';
    if (searchLocation) {
      query += `location=${encodeURIComponent(searchLocation)}&`;
    }
    if (searchBudget) {
      const numericBudget = searchBudget.replace(/\D/g, ''); // keep only numbers
      if (numericBudget) {
        query += `budget=${numericBudget}&`;
      }
    }
    // Navigate to CitesListing page with search query
    navigate(`/cites${query.slice(0, -1)}`);
  };

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        // Fetch featured cites (or slice of cites)
        const citesRes = await axios.get(`${API_URL}/cites`);
        if (citesRes.data.success && citesRes.data.data && citesRes.data.data.cites) {
          setFeaturedCites(citesRes.data.data.cites.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>
              Trouvez votre <span className={styles.italic}>logement étudiant</span> idéal à Labé.
            </h1>
            <p className={styles.subtitle}>
              Des espaces de vie sélectionnés pour le parcours académique moderne. 
              Sécurisés, confortables et proches du l'université  .
            </p>
            
            {/* Search Bar */}
            <div className={styles.searchBar}>
              <div className={styles.searchItem}>
                <span className="material-symbols-outlined">location_on</span>
                <div className={styles.searchField}>
                  <label>Cité</label>
                  <input 
                    type="text" 
                    placeholder="Quel quartier ?" 
                    value={searchLocation} 
                    onChange={(e) => setSearchLocation(e.target.value)} 
                  />
                </div>
              </div>
              <div className={styles.searchItem}>
                <span className="material-symbols-outlined">directions_walk</span>
                <div className={styles.searchField}>
                  <label>Distance</label>
                  <input type="text" placeholder="Max 15 min" />
                </div>
              </div>
              <div className={styles.searchItem}>
                <span className="material-symbols-outlined">payments</span>
                <div className={styles.searchField}>
                  <label>Budget</label>
                  <input 
                    type="text" 
                    placeholder="Prix max GNF" 
                    value={searchBudget} 
                    onChange={(e) => setSearchBudget(e.target.value)} 
                  />
                </div>
              </div>
              <button className={styles.searchButton} onClick={handleSearch}>
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>

          <div className={styles.heroImageContainer}>
            <div className={styles.mainImageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1500" 
                alt="Résidence étudiante moderne" 
                className={styles.heroImage}
              />
            </div>
            <div className={styles.floatingBadge}>
              <div className={styles.badgeHeader}>
                <span className={styles.badgeIcon}>
                  <span className="material-symbols-outlined">verified</span>
                </span>
                <span className={styles.badgeTitle}>Propriétaires vérifiés</span>
              </div>
              <p className={styles.badgeText}>Chaque propriété à Labé
                 est personnellement inspectée par notre équipe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cités Section */}
      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionTag}>Sélections triées sur le volet</span>
            <h2 className={styles.sectionTitle}>Cités en vedette</h2>
          </div>
          <Link to="/cites" className={styles.exploreLink}>
            Explorer toutes les résidences <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        <div className={styles.citesGrid}>
          {loading ? (
            <p>Chargement des résidences...</p>
          ) : (
            featuredCites.map(cite => (
              <CiteCard key={cite.id} cite={cite} />
            ))
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;
