import React, { useEffect, useState } from 'react'
import "./row.css";
import axios from "../../../utilis/Axios";
import backendAxios from 'axios';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
import MovieDetailsModal from '../../MovieDetailsModal/MovieDetailsModal';

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovie] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    const base_url = "https://image.tmdb.org/t/p/original";

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    }

    useEffect(() => {
        (async () => {
            try {
                const request = await axios.get(fetchUrl);
                setMovie(request.data.results);
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, [fetchUrl]);

    const addToList = async (movie, e) => {
        e.stopPropagation(); // Avoid opening modal when clicking add
        const token = localStorage.getItem('userToken');
        if (!token) {
            showToast("Please sign in to add to your list!", "error");
            return;
        }

        try {
            await backendAxios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/watchlist`, 
            { movie }, 
            { headers: { Authorization: `Bearer ${token}` } });
            showToast(`${movie.title || movie.name} added to My List!`);
        } catch (error) {
            showToast(error.response?.data?.message || "Something went wrong", "error");
        }
    };
    
    const handleClick = (movie) => {
        if (selectedMovie && selectedMovie.id === movie.id) {
            setSelectedMovie(null);
        } else {
            setSelectedMovie(movie);
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies?.map((movie, index) => {
                    const imagePath = isLargeRow ? movie.poster_path : movie.backdrop_path;
                    if (!imagePath) return null;
                    
                    return (
                        <div key={index} className="row__poster_container">
                            <img
                                onClick={() => handleClick(movie)}
                                src={`${base_url}${imagePath}`}
                                alt={movie.name}
                                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                            />
                            <div className="row__add_btn" onClick={(e) => addToList(movie, e)}>
                                <span>+</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedMovie && (
                <MovieDetailsModal 
                    movie={selectedMovie} 
                    onClose={() => setSelectedMovie(null)} 
                    showToast={showToast}
                />
            )}

            {/* Success/Error Toast */}
            {toast.show && (
                <div className={`global__toast ${toast.type}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}

export default Row;