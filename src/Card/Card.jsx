import React from "react";
import {Chip} from "@mui/material";
import styles from "./Card.module.css";


  const Card = ({ image, follows, likes, title, subtitle, type }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.cardImage} />

        {/* Title directly on image */}
        <p className={styles.cardTitle}>{title}</p>

        {/* White box with black pill follows */}
        <div className={styles.followBox}>
          {type === "songs" ? (
            <span className={styles.followChips}>{likes}Likes</span>
          ):(
          
          <span className={styles.followChip}>{follows} Follows</span>
          )}
        </div>
      </div>

      {/* Subtitle outside image */}
      <p>{subtitle}</p>
    </div>
  );
};

export default Card;