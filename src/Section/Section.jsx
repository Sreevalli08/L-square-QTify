import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Card from "../Card/Card";
import styles from "./Section.module.css";
import { Tabs, Tab } from "@mui/material";

function Section({ title, url, type }) {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch section data (songs/albums etc.)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching section data", err);
        setError("Failed to load data. Please Try again")
      } finally{
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  // Fetch genres if type === songs
  useEffect(() => {
    if (type === "songs") {
      const fetchGenres = async () => {
        try {
          const response = await axios.get(
            "https://qtify-backend-labs.crio.do/genres"
          );
          setGenres(response.data.data); // API gives {data: [...]}
        } catch (err) {
          console.error("Error fetching genres", err);
          setError("Failed to load genres.");
        } finally {
          setLoading(false);
        }
      };
      fetchGenres();
    }
  }, [type]);

  // Filtered data based on selected tab
  const filteredData =
    type === "songs" && selectedGenre !== "all"
      ? data.filter((song) => song.genre.key === selectedGenre)
      : data;

      if(loading){
        return <div className={styles.loading}>Loading {title}...</div>;
      }

      if(error){
       return <div className= {styles.error}>{error}</div>;
      }

  return (
    <div className="section">
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>
        {type !== "songs" && (
          <button
            className={styles.collapseButton}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Collapse" : "Show All"}
          </button>
        )}
      </div>

      {/* Tabs for Songs */}
      {type === "songs" && (
        <Tabs
          value={selectedGenre}
          onChange={(e, newValue) => setSelectedGenre(newValue)}
          textColor="inherit"
          indicatorColor="secondary"
          className={styles.tabs}
          TabIndicatorProps={{
            style: { backgroundColor: "#34C94B", height: "3px" }  // Custom green underline
          }}
        >
          <Tab value="all"
           label="All" 
           className={styles.tab}
           disableRipple 
            data-testid="tab-all"
             />
          {genres.map((genre) => (
            <Tab 
            key={genre.key} 
            value={genre.key} 
            label={genre.label} 
            className={styles.tab}
            disableRipple
              data-testid={`tab-${genre.key}`}/>
          ))}
        </Tabs>
      )}

      {/* Cards */}
      <div className="cardsWrapper">
        {showAll && type !== "songs" ? (
          <div className="cardsGrid">
            {filteredData.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                title={item.title}
                subtitle={
                  type === "songs"
                    ? item.artists?.join(", ")
                    : item.subtitle ||
                      (item.songs?.length ? `${item.songs.length} songs` : "")
                }
                follows={item.follows}
                likes={item.likes}
                type={type}
              />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={1}
            slidesPerView={7}
            navigation
            className="albumSwiper"
          >
            {filteredData.map((item) => (
              <SwiperSlide key={item.id}>
                <Card
                  image={item.image}
                  title={item.title}
                  subtitle={
                    type === "songs"
                      ? item.artists?.join(", ")
                      : item.subtitle ||
                        (item.songs?.length ? `${item.songs.length} songs` : "")
                  }
                  follows={item.follows}
                  likes={item.likes}
                  type={type}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default Section;
