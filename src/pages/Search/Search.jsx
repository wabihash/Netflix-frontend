import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../../utilis/Axios'
import backendAxios from 'axios'
import './search.css'
import MovieDetailsModal from '../../components/MovieDetailsModal/MovieDetailsModal'

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const base_url = "https://image.tmdb.org/t/p/original";

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  }

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        setLoading(true);
        try {
          const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
          const response = await axios.get(`/search/multi?api_key=${API_KEY}&query=${query}`);
          setResults(response.data.results.filter(m => m.poster_path || m.backdrop_path));
        } catch (error) {
          console.error("Search error", error);
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    }
  }, [query]);

  const addToList = async (movie) => {
    const token = localStorage.getItem('userToken');
    if (!token) {
        showToast("Please sign in to add to your list!", "error");
        return;
    }
    try {
      await backendAxios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/watchlist`, 
        { movie }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast(`${movie.title || movie.name} added to My List!`);
    } catch (error) {
      showToast(error.response?.data?.message || "Already in your list", "error");
    }
  };

  if (loading) return <div className="search_status">Searching for "{query}"...</div>;

  return (
    <div className="search_container_page">
      <h1>Results for "{query}"</h1>
      {results.length === 0 ? (
          <p className="no_results">No movies or shows found matching your search.</p>
      ) : (
          <div className="search_grid">
              {results.map((movie) => (
                  <div key={movie.id} className="search_item">
                      <img 
                          onClick={() => setSelectedMovie(movie)}
                          src={`${base_url}${movie.poster_path || movie.backdrop_path}`} 
                          alt={movie.title || movie.name} 
                      />
                      <div className="search_overlay">
                         <button onClick={(e) => { e.stopPropagation(); addToList(movie); }}>+ My List</button>
                      </div>
                  </div>
              ))}
          </div>
      )}

      {selectedMovie && (
        <MovieDetailsModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
          showToast={showToast}
        />
      )}

      {/* Global Toast Notification */}
      {toast.show && (
          <div className={`global__toast ${toast.type}`}>
              {toast.message}
          </div>
      )}
    </div>
  )
}

export default Search
