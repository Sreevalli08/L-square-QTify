import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Card from "../Card/Card";
import styles from "./Section.module.css";

const Section = ({ title, url }) => {
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log("Fetched Data:", response.data);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching section data", err);
      }
    };
    fetchData();
  }, [url]);

  return (
    <div className="section">
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>
        <button
          className={styles.collapseButton}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Collapse" : "Show All"}
        </button>
      </div>

      {/* Cards */}
      <div className="cardsWrapper">
        {showAll ? (
          <div className="cardsGrid">
            {data.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                title={item.title}
                subtitle={
                  item.subtitle || (item.songs?.length ? `${item.songs.length} songs` : "")
                }
                follows={item.follows}
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
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <Card
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  subtitle={
                    item.subtitle || (item.songs?.length ? `${item.songs.length} songs` : "")
                  }
                  follows={item.follows}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Section;
