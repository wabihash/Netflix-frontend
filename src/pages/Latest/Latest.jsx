import React, { useEffect, useState } from 'react';
import axios from '../../utilis/Axios';
import requests from '../../utilis/Request';
import backendAxios from 'axios';
import './latest.css';
import MovieDetailsModal from '../../components/MovieDetailsModal/MovieDetailsModal';

const Latest = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "", type: "" });
    const base_url = "https://image.tmdb.org/t/p/original";

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    }

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const response = await axios.get(requests.fetchUpcoming);
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching latest", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLatest();
    }, []);

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
            showToast(error.response?.data?.message || "Something went wrong", "error");
        }
    };

    if (loading) return <div className="latest_loading">Fetching new releases...</div>;

    return (
        <div className="latest_container">
            <h1>Newly Released & Upcoming</h1>
            <div className="latest_grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="latest_item">
                        <img 
                            onClick={() => setSelectedMovie(movie)}
                            src={`${base_url}${movie.poster_path}`} 
                            alt={movie.title || movie.name} 
                            loading="lazy"
                        />
                        <div className="latest_overlay">
                            <button onClick={(e) => { e.stopPropagation(); addToList(movie); }}>+ My List</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedMovie && (
                <MovieDetailsModal 
                    movie={selectedMovie} 
                    onClose={() => setSelectedMovie(null)} 
                    showToast={showToast}
                />
            )}

            {toast.show && (
                <div className={`global__toast ${toast.type}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default Latest;
