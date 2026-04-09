import React, { useEffect, useState, useRef, useCallback } from 'react';
import './movieDetailsModal.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import AddIcon from '@mui/icons-material/Add';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import backendAxios from 'axios';

const MovieDetailsModal = ({ movie, onClose, showToast }) => {
    const [trailerUrl, setTrailerUrl] = useState("");
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const playerRef = useRef(null);
    const progressBarRef = useRef(null);
    const intervalRef = useRef(null);
    const hideControlsTimer = useRef(null);
    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        const fetchTrailer = async () => {
            if (movie?.id) {
                try {
                    const API_KEY = "b13f1d57f3e625975500e9273ce26ea6";
                    let trailerData;
                    try {
                        const response = await backendAxios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`);
                        trailerData = response.data.results.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
                    } catch {
                        const response = await backendAxios.get(`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${API_KEY}`);
                        trailerData = response.data.results.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
                    }

                    if (trailerData) {
                        setTrailerUrl(trailerData.key);
                    } else {
                        const url = await movieTrailer(movie?.title || movie?.name || movie?.original_name || "");
                        if (url) {
                            const urlParams = new URLSearchParams(new URL(url).search);
                            setTrailerUrl(urlParams.get('v'));
                        }
                    }
                } catch (error) {
                    console.error("Error fetching trailer:", error);
                }
            }
        };

        fetchTrailer();
        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(hideControlsTimer.current);
        };
    }, [movie]);

    const startProgressTracker = (player) => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (player && !isDragging) {
                const current = player.getCurrentTime();
                const total = player.getDuration();
                if (total > 0) {
                    setCurrentTime(current);
                    setDuration(total);
                    setProgress((current / total) * 100);
                }
            }
        }, 500);
    };

    const onPlayerReady = (event) => {
        playerRef.current = event.target;
        event.target.unMute();
        event.target.setVolume(80);
        setDuration(event.target.getDuration());
        startProgressTracker(event.target);
    };

    const onPlayerStateChange = (event) => {
        // 1 = playing, 2 = paused
        if (event.data === 1) {
            setIsPlaying(true);
            startProgressTracker(event.target);
        } else if (event.data === 2) {
            setIsPlaying(false);
        }
    };

    const togglePlay = (e) => {
        e.stopPropagation();
        if (!playerRef.current) return;
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        if (!playerRef.current) return;
        if (isMuted) {
            playerRef.current.unMute();
        } else {
            playerRef.current.mute();
        }
        setIsMuted(!isMuted);
    };

    const handleFullscreen = (e) => {
        e.stopPropagation();
        const videoContainer = document.querySelector('.video_container');
        if (videoContainer) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoContainer.requestFullscreen();
            }
        }
    };

    const getSeekPosition = (e) => {
        const bar = progressBarRef.current;
        if (!bar) return 0;
        const rect = bar.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        return (x / rect.width) * 100;
    };

    const seekTo = useCallback((percent) => {
        if (!playerRef.current || duration === 0) return;
        const seekTime = (percent / 100) * duration;
        playerRef.current.seekTo(seekTime, true);
        setProgress(percent);
        setCurrentTime(seekTime);
    }, [duration]);

    const handleProgressClick = (e) => {
        e.stopPropagation();
        seekTo(getSeekPosition(e));
    };

    const handleDragStart = (e) => {
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragMove = useCallback((e) => {
        if (!isDragging) return;
        const percent = getSeekPosition(e);
        setProgress(percent);
        setCurrentTime((percent / 100) * duration);
    }, [isDragging, duration]);

    const handleDragEnd = useCallback((e) => {
        if (!isDragging) return;
        seekTo(getSeekPosition(e));
        setIsDragging(false);
    }, [isDragging, seekTo]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleDragMove);
            window.addEventListener('mouseup', handleDragEnd);
            window.addEventListener('touchmove', handleDragMove);
            window.addEventListener('touchend', handleDragEnd);
        }
        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging, handleDragMove, handleDragEnd]);

    const formatTime = (secs) => {
        if (!secs || isNaN(secs)) return "0:00";
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(hideControlsTimer.current);
        hideControlsTimer.current = setTimeout(() => setShowControls(false), 3000);
    };

    const addToList = async () => {
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

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            mute: 0,
            iv_load_policy: 3,
        },
    };

    if (!movie) return null;

    return (
        <div className="modal_overlay" onClick={onClose}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <button className="modal_close" onClick={onClose}>
                    <CloseIcon />
                </button>

                <div className="modal_banner">
                    {trailerUrl ? (
                        <div
                            className="video_container"
                            onMouseMove={handleMouseMove}
                            onTouchStart={handleMouseMove}
                        >
                            <YouTube
                                videoId={trailerUrl}
                                opts={opts}
                                className="youtube_player"
                                onReady={onPlayerReady}
                                onStateChange={onPlayerStateChange}
                            />
                            <div className="video_overlay" />

                            {/* Custom Player Controls */}
                            <div className={`custom_controls ${showControls ? 'visible' : ''}`}>
                                {/* Progress Bar */}
                                <div
                                    className="progress_bar_wrapper"
                                    ref={progressBarRef}
                                    onClick={handleProgressClick}
                                    onMouseDown={handleDragStart}
                                    onTouchStart={handleDragStart}
                                >
                                    <div className="progress_bar_bg">
                                        <div
                                            className="progress_bar_fill"
                                            style={{ width: `${progress}%` }}
                                        />
                                        <div
                                            className="progress_bar_thumb"
                                            style={{ left: `${progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Bottom Controls */}
                                <div className="controls_bottom">
                                    <div className="controls_left">
                                        <button className="ctrl_btn" onClick={togglePlay}>
                                            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                                        </button>
                                        <button className="ctrl_btn" onClick={toggleMute}>
                                            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                                        </button>
                                        <span className="time_display">
                                            {formatTime(currentTime)} / {formatTime(duration)}
                                        </span>
                                    </div>
                                    <div className="controls_right">
                                        <button className="ctrl_btn" onClick={handleFullscreen}>
                                            <FullscreenIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="modal_image_container">
                            <img
                                src={`${base_url}${movie.backdrop_path || movie.poster_path}`}
                                alt={movie.title || movie.name}
                            />
                            <div className="image_overlay" />
                        </div>
                    )}

                    <div className="modal_banner_details">
                        <h1>{movie.title || movie.name}</h1>
                        <div className="modal_actions">
                            {/* Only show play button if no trailer (image fallback) */}
                            {!trailerUrl && (
                                <button className="btn_play">
                                    <PlayArrowIcon />
                                    <span>Play</span>
                                </button>
                            )}
                            <button className="btn_icon" onClick={addToList}>
                                <AddIcon />
                            </button>

                        </div>
                    </div>
                </div>

                <div className="modal_body">
                    <div className="modal_grid">
                        <div className="modal_left">
                            <div className="meta_info">
                                <span className="match_score">98% Match</span>
                                <span className="year">{movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)}</span>
                                <span className="maturity">16+</span>
                                <span className="duration">2h 15m</span>
                                <span className="hd">HD</span>
                            </div>
                            <p className="overview">{movie.overview}</p>
                        </div>
                        <div className="modal_right">
                            <p><span>Cast:</span> Brad Pitt, Angelina Jolie, and more...</p>
                            <p><span>Genres:</span> Action, Adventure, Drama</p>
                            <p><span>This movie is:</span> Exciting, Emotional</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsModal;
