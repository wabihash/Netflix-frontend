import React, { useEffect, useState } from 'react';
import axios from "../../utilis/Axios";
import requests from "../../utilis/Request";
import actualAxios from 'axios'; // For backend calls
import "./banner.css";
import MovieDetailsModal from '../MovieDetailsModal/MovieDetailsModal';

const Banner = () => {
    const [movie, setMovie] = useState({});
    const [toast, setToast] = useState({ show: false, message: "", type: "" });
    const [showModal, setShowModal] = useState(false);

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    }

    useEffect(() => {
        (async () => {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                const randomIndex = Math.floor(Math.random() * request.data.results.length);
                setMovie(request.data.results[randomIndex]);
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, []);

    const addToList = async () => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            showToast("Please sign in to add to your list!", "error");
            return;
        }

        try {
            await actualAxios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/watchlist`, 
            { movie }, 
            { headers: { Authorization: `Bearer ${token}` } });
            showToast("Added to My List!");
        } catch (error) {
            showToast(error.response?.data?.message || "Something went wrong", "error");
        }
    };
    
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    return (
        <div
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button play" onClick={() => setShowModal(true)}>Play</button>
                    <button onClick={addToList} className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            <div className="banner__fadeBottom" />
            
            {showModal && (
                <MovieDetailsModal 
                    movie={movie} 
                    onClose={() => setShowModal(false)} 
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
    );
};

export default Banner;