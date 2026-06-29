import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ListingCard from '../../components/Card/ListingCard';
import styles from './CitesListing.module.css';

const CitesListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cites, setCites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('budget') ? parseInt(searchParams.get('budget')) : 2000000);
  const [distance500, setDistance500] = useState(true);
  const [distance1000, setDistance1000] = useState(true);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Populaires');

  useEffect(() => {
    // Update local filter state if URL search query changes
    const loc = searchParams.get('location');
    if (loc !== null) {
      setLocationFilter(loc);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchCites = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const { data } = await axios.get(`${API_URL}/cites`);
        if (data.success && data.data && data.data.cites) {
          setCites(data.data.cites);
        }
      } catch (error) {
        console.error('Error fetching cites:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCites();
  }, []);

  const handleResetFilters = () => {
    setLocationFilter('');
    setMaxPrice(2000000);
    setDistance500(true);
    setDistance1000(true);
    setSelectedAmenities([]);
    setActiveCategory('Populaires');
    setSearchParams({});
  };

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  // Client-side dynamic filtering
  const filteredCites = cites.filter(cite => {
    // Location Filter
    if (locationFilter && !cite.location.toLowerCase().includes(locationFilter.toLowerCase()) && !cite.name.toLowerCase().includes(locationFilter.toLowerCase())) {
      return false;
    }

    // Budget / Price Filter
    // Find min room price in this cite
    let minPrice = 99999999;
    if (cite.buildings) {
      cite.buildings.forEach(b => {
        if (b.rooms) {
          b.rooms.forEach(r => {
            if (r.price < minPrice) minPrice = r.price;
          });
        }
      });
    }
    if (minPrice !== 99999999 && minPrice > maxPrice) {
      return false;
    }

    // Distance Filter
    const isClose = cite.location.toLowerCase().includes('5 min') || cite.location.toLowerCase().includes('2 min') || cite.location.toLowerCase().includes('faculté');
    if (!distance500 && isClose) return false;
    if (!distance1000 && !isClose) return false;

    // Categories Filter
    if (activeCategory === 'Proche Campus' && !isClose) {
      return false;
    }
    if (activeCategory === 'Budget' && minPrice > 600000) {
      return false;
    }

    return true;
  });
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Explorez les Cités à Hafia
        </h1>
        <p className={styles.subtitle}>
          Des espaces de vie étudiants sélectionnés près de l'Université de Labé. Des complexes paisibles aux résidences urbaines modernes.
        </p>
      </header>

      <div className={styles.content}>
        {/* Professional Filters Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.filterCard}>
            <div className={styles.sidebarHeader}>
              <h3 className={styles.sidebarTitle}>Filtres</h3>
              <button className={styles.resetBtn} onClick={handleResetFilters}>Effacer tout</button>
            </div>

            {/* Neighborhood Search inside filter */}
            <div className={styles.sidebarSection}>
              <div className={styles.sectionHeader}>
                <span className="material-symbols-outlined">search</span>
                <label className={styles.sidebarLabel}>Recherche rapide</label>
              </div>
              <input 
                type="text" 
                placeholder="Quartier ou Nom..." 
                className={styles.sidebarInput} 
                value={locationFilter} 
                onChange={(e) => setLocationFilter(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
              />
            </div>

            {/* Price Range Section */}
            <div className={styles.sidebarSection}>
              <div className={styles.sectionHeader}>
                <span className="material-symbols-outlined">payments</span>
                <label className={styles.sidebarLabel}>Gamme de prix</label>
              </div>
              <div className={styles.priceInfo}>
                <span>300k GNF</span>
                <span>{(maxPrice / 1000).toFixed(0)}k GNF</span>
              </div>
              <input 
                type="range" 
                min="300000" 
                max="2000000" 
                step="50000" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className={styles.sidebarRange} 
              />
            </div>

            {/* Distance Section */}
            <div className={styles.sidebarSection}>
              <div className={styles.sectionHeader}>
                <span className="material-symbols-outlined">distance</span>
                <label className={styles.sidebarLabel}>Distance campus</label>
              </div>
              <div className={styles.checkOptions}>
                <label className={styles.checkItem}>
                  <input type="checkbox" checked={distance500} onChange={(e) => setDistance500(e.target.checked)} />
                  <span>&lt; 500 m</span>
                </label>
                <label className={styles.checkItem}>
                  <input type="checkbox" checked={distance1000} onChange={(e) => setDistance1000(e.target.checked)} />
                  <span>500 m - 1 km</span>
                </label>
              </div>
            </div>

            {/* Amenities Section */}
            <div className={styles.sidebarSection}>
              <div className={styles.sectionHeader}>
                <span className="material-symbols-outlined">settings_input_composite</span>
                <label className={styles.sidebarLabel}>Services inclus</label>
              </div>
              <div className={styles.sidebarChips}>
                {['Wi-Fi', 'Sécurité', 'Eau 24/7', 'Énergie'].map(amenity => (
                  <button 
                    key={amenity}
                    className={`${styles.sidebarChip} ${selectedAmenities.includes(amenity) ? styles.chipActive : ''}`}
                    onClick={() => toggleAmenity(amenity)}
                    style={{ backgroundColor: selectedAmenities.includes(amenity) ? '#003f87' : '', color: selectedAmenities.includes(amenity) ? '#white' : '' }}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Grid Area */}
        <div className={styles.mainArea}>
          {/* Industry Standard Categories Chips */}
          <div className={styles.categoriesBar}>
            {['Populaires', 'Proche Campus', 'Vérifiées', 'Budget'].map(cat => (
              <button 
                key={cat} 
                className={`${styles.catChip} ${activeCategory === cat ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span className="material-symbols-outlined">
                  {cat === 'Populaires' ? 'grade' : cat === 'Proche Campus' ? 'near_me' : cat === 'Vérifiées' ? 'verified' : 'euro_symbol'}
                </span>
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.gridContainer}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>Chargement...</div>
            ) : filteredCites.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem', color: '#666' }}>Aucune cité ne correspond à vos filtres.</div>
            ) : (
              <div className={styles.grid}>
                {filteredCites.map(cite => (
                  <ListingCard key={cite.id} cite={cite} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map View CTA */}
      <div className={styles.mapCta}>
        <button className={styles.mapButton}>
          <span className="material-symbols-outlined">map</span>
          Explorer sur la carte
        </button>
      </div>
    </div>
  );
};

export default CitesListing;
