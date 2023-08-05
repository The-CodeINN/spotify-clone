"use client";

import useLoadImage from "@/hooks/useLoadingImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem = ({ data, onClick }: MediaItemProps) => {
  const imageUrl = useLoadImage(data);
  console.log(imageUrl);

  const handleClick = () => {
    if (onClick) onClick(data.id);
  };
  //  Todo: Default turn on player
  return (
    <div
      onClick={handleClick}
      className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md'
    >
      <div className='relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden'>
        <Image
          src={imageUrl || "/images/liked.png"}
          fill
          alt='Song Cover'
          className='object-cover'
        />
      </div>
      <div className='flex flex-col gap-y-1 overflow-hidden'>
        <p className='text-white truncate'>{data.title}</p>
        <p className='text-neutral-400 truncate text-sm'>{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
