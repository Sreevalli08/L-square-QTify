import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

const Section = ({ title, apiEndpoint }) => {
  const [albums, setAlbums] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    axios.get(apiEndpoint).then((res) => setAlbums(res.data));
  }, [apiEndpoint]);

  const toggleExpand = () => setExpanded(!expanded);
  const visibleAlbums = expanded ? albums : albums.slice(0, 10);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <button onClick={toggleExpand} className={styles.toggleBtn}>
          {expanded ? "Collapse" : "Show All"}
        </button>
      </div>

      <div className={styles.cardGrid}>
        {visibleAlbums.map((album) => (
          <Card
            key={album.id}
            image={album.image}
            follows={album.follows}
            title={album.title}
            subtitle={album.songs.length + " Songs"}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
