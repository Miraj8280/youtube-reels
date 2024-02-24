import { useState, useRef, useEffect } from "react";
import "./videoPlayer.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { VolumeUpRounded } from "@mui/icons-material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

// eslint-disable-next-line react/prop-types
function Video({ id, src, desc }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const [Subscribe, setSubscribe] = useState(false);
  const [likes, setLikes] = useState(10);
  const [liked, setLiked] = useState(false);
  const [Disliked, setDisliked] = useState(false);
  const [Dislikes, setDislikes] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const calculatedProgress = (currentTime / duration) * 100;
      setProgress(calculatedProgress);
    };

    videoRef.current.addEventListener("timeupdate", updateProgress);

    const handleVisibilityChange = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          videoRef.current.play();
        } else {
          setPlaying(false);
          videoRef.current.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleVisibilityChange, {
      threshold: 0.5,
    });

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handelVideoplaying = () => {
    if (playing) {
      setPlaying(false);
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handelSubscribe = () => {
    setSubscribe((subs) => !subs);
  };

  const handleLike = () => {
    if (!liked) {
      setLikes((prvLikes) => prvLikes + 1);
      setLiked(true);
    }
    if (Disliked) {
      setDisliked(false);
      setDislikes((prevDislikes) => prevDislikes - 1);
    }
  };

  const handleDislike = () => {
    if (!Disliked) {
      setDislikes((prevDislikes) => prevDislikes + 1);
      setDisliked(true);

      if (liked) {
        setLiked(false);
        setLikes((prvLikes) => prvLikes - 1);
      }
    }
  };

  return (
    <div className="video">
      <div className="video__player">
        <video
          onClick={handelVideoplaying}
          id={id}
          className="videoplay"
          ref={videoRef}
          loop
          src={src}
        />
        <div
          className="video__progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="shortsContainer">
        <div className="shortsVideoTop">
          <div className="shortsVideoTopIcon">
            {playing ? (
              <PauseIcon onClick={handelVideoplaying} />
            ) : (
              <PlayArrowIcon onClick={handelVideoplaying} />
            )}
          </div>
          <div className="shortsVideoTopIcon">
            <VolumeUpRounded />
          </div>
        </div>

        <div className="shortsVideoSideIcons">
          <div className="shortsVideoSideIcon">
            <ThumbUpIcon
              onClick={handleLike}
              style={{
                color: liked ? "blue" : "white",
              }}
            />
            <p className="count">{likes}</p>
          </div>

          <div className="shortsVideoSideIcon">
            <ThumbDownIcon
              onClick={handleDislike}
              style={{
                color: Disliked ? "red" : "white",
              }}
            />
            <p className="count">Dislike</p>
          </div>

          <div className="shortsVideoSideIcon">
            <CommentIcon />
          </div>

          <div className="shortsVideoSideIcon">
            <ShareIcon />
          </div>

          <div className="shortsVideoSideIcon">
            <MoreVertIcon />
          </div>
        </div>

        <div className="shortsBottom">
          <div className="shortsDesc">
            <p className="description">{desc}</p>
          </div>
          <div className="shortDetails">
            <Avatar
              alt="Miraj Asraf"
              src="https://media.geeksforgeeks.org/auth/profile/xhtv45c0z8ypa3b5vsib"
            />
            <p>Miraj Asraf</p>
            <button
              style={{
                background: Subscribe ? "grey" : "white",
                color: Subscribe ? "white" : "",
              }}
              onClick={handelSubscribe}
            >
              {Subscribe ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
