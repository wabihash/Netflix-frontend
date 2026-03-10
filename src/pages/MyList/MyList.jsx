import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './mylist.css'
import MovieDetailsModal from '../../components/MovieDetailsModal/MovieDetailsModal'

const MyList = () => {
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
        const fetchList = async () => {
            const token = localStorage.getItem('userToken');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/watchlist`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching watchlist", error);
            } finally {
                setLoading(false);
            }
        };

        fetchList();
    }, []);

    const removeMovie = async (id, e) => {
        e.stopPropagation();
        const token = localStorage.getItem('userToken');
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/watchlist/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMovies(response.data);
            showToast("Movie removed from your list");
        } catch (error) {
            showToast("Could not remove movie", "error");
        }
    }

    if (loading) return <div className="mylist_loading">Loading your list...</div>;

    return (
        <div className="mylist_container">
            <h1>My List</h1>
            {movies.length === 0 ? (
                <div className="mylist_empty">
                    <p>You haven't added any titles to your list yet.</p>
                </div>
            ) : (
                <div className="mylist_grid">
                    {movies.map((movie) => (
                        <div key={movie.id} className="mylist_item">
                            <img 
                                onClick={() => setSelectedMovie(movie)}
                                src={`${base_url}${movie.poster_path || movie.backdrop_path}`} 
                                alt={movie.title || movie.name} 
                            />
                            <div className="mylist_item_overlay" onClick={(e) => removeMovie(movie.id, e)}>
                                <span>Remove</span>
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

export default MyList
