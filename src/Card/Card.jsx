import React from "react";
import {Chip} from "@mui/material";
import styles from "./Card.module.css";


  const Card = ({ image, follows, likes, title, subtitle, type }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.cardImage} />

        {/* Title directly on image */}
        <div className={styles.cardTitle}>{title}</div>

        {/* White box with black pill follows */}
        <div className={styles.followBox}>
       <span className={styles.followChip}>
            {type === "songs" ? `${likes} Likes` : `${follows} Follows`}
          </span>
        </div>
      </div>

      {/* Subtitle outside image */}
      <p>{subtitle}</p>
    </div>
  );
};

export default Card;