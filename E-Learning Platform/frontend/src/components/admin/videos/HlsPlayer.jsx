// Enhanced HlsPlayer with better error handling and UX
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import {
  FaPlay,
  FaPause,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";

const HlsPlayer = ({ src, autoPlay = true, onError, onReady }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setIsPlaying(false);

    if (Hls.isSupported()) {
      // Clean up previous instance
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      hlsRef.current = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        maxLoadingTimeout: 15000,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        // Better error recovery
        fragLoadingTimeOut: 20000,
        manifestLoadingTimeOut: 20000,
      });

      hlsRef.current.loadSource(src);
      hlsRef.current.attachMedia(video);

      hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        onReady?.();
        if (autoPlay) {
          video.play().catch((err) => {
            console.warn("Auto-play failed:", err);
          });
        }
      });

      hlsRef.current.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS Error:", data);

        if (data.fatal) {
          setError("Failed to load video");
          setLoading(false);
          onError?.(data);

          // Attempt recovery for network errors
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            console.log("Attempting to recover from network error...");
            setTimeout(() => {
              hlsRef.current.startLoad();
            }, 1000);
          } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            console.log("Attempting to recover from media error...");
            setTimeout(() => {
              hlsRef.current.recoverMediaError();
            }, 1000);
          }
        }
      });

      video.addEventListener("play", () => setIsPlaying(true));
      video.addEventListener("pause", () => setIsPlaying(false));
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari native HLS support
      video.src = src;

      video.addEventListener("loadedmetadata", () => {
        setLoading(false);
        onReady?.();
        if (autoPlay) {
          video.play().catch((err) => {
            console.warn("Auto-play failed:", err);
          });
        }
      });

      video.addEventListener("error", (e) => {
        setError("Failed to load video");
        setLoading(false);
        onError?.(e);
      });

      video.addEventListener("play", () => setIsPlaying(true));
      video.addEventListener("pause", () => setIsPlaying(false));
    } else {
      setError("HLS not supported in this browser");
      setLoading(false);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, autoPlay, onError, onReady]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  if (error) {
    return (
      <div className="w-full h-64 bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <FaExclamationTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-lg font-semibold mb-2">⚠️ {error}</p>
          <p className="text-gray-300 text-sm">
            Please try refreshing the page or check your connection
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <FaSpinner className="w-8 h-8 animate-spin mx-auto mb-3" />
            <p className="text-sm">Loading video...</p>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full h-auto max-h-[70vh] bg-black"
        controls
        playsInline
        preload="metadata"
        poster={videoRef.current?.poster}
      />

      {/* Custom Play/Pause Overlay for better UX */}
      {!loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            onClick={handlePlayPause}
            className="pointer-events-auto w-20 h-20 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all duration-200"
          >
            {isPlaying ? (
              <FaPause className="w-8 h-8" />
            ) : (
              <FaPlay className="w-8 h-8 ml-1" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default HlsPlayer;
