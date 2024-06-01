'use client';
import InventorySummary from '@/components/InventorySummary';
import PosterList from '@/components/PosterList';
import { ItemContext } from '@/context/ItemProvider';

import { useContext, useEffect, useMemo, useState } from "react";

export default function Home() {
  const { posters, setPosters } = useContext(ItemContext);
  const [isLocked, setIsLocked] = useState(false);

  /**
   * Updates the posters array with a new poster object.
   *
   * @param {any} newPoster - The new poster object to be added or updated in the posters array.
   */
  const updatePosters = (newPoster: any) => {
    let newPosters = posters?.map((poster: any) => {
      if (poster.id === newPoster.id) {
        return newPoster;
      }
      return poster;
    })
    setPosters(newPosters);
  }

  const handleLock = () => {
    setIsLocked(true);
  }


  return (
    <main className="max-w-4xl w-full mx-auto">
      <PosterList posters={posters} isLocked={isLocked} updatePosters={updatePosters} />
      <InventorySummary handleLock={handleLock} isLocked={isLocked} />
      <div className='w-fit ml-auto p-3'>
        <a href="https://github.com/DylanBorchert/atvenu-asg" target='_blank' className="text-blue-500 align">See git repo</a>
      </div>
    </main>
  );
}
