import Swiper, { SwiperProps, SwiperSlide } from "@/components/shared/Swiper";
import { Watched } from "@/types";
import React from "react";
import EpisodeCard from "@/components/features/anime/EpisodeCard";
import { useRouter } from "next/router";
import { getTitle } from "@/utils/data";

interface WatchedSwiperProps extends SwiperProps {
  data: Watched[];
}

const WatchedSwiper: React.FC<WatchedSwiperProps> = ({ data, ...props }) => {
  const router = useRouter();

  return (
    <Swiper speed={500} {...props}>
      {data.map(({ anime, episode }, index) => (
        <SwiperSlide key={index}>
          <EpisodeCard
            onClick={() => {
              const episodeIndex = anime.episodes.findIndex(
                (e) => e.id === episode.id
              );

              router.push(`/anime/watch/${anime.ani_id}?index=${episodeIndex}`);
            }}
            episode={{
              ...episode,
              thumbnail_image:
                episode.thumbnail_image ||
                anime.banner_image ||
                anime.cover_image.extra_large,
            }}
            title={getTitle(anime)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default React.memo(WatchedSwiper);