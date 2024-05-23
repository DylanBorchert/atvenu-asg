'use client';
import InventorySummary from '@/components/InventorySummary';
import PosterList from '@/components/PosterList';
import { getPosters } from '@/util/posterUtil';

import { useEffect, useState } from "react";

export default function Home() {
  const [isLocked, setIsLocked] = useState(false);
  const [posters, setPosters] = useState([]);

  const handleLock = () => {
    console.log('Locking inventory');
    setIsLocked(true);
  }

  useEffect(() => {
    setPosters(getPosters());
  }, []);

  return (
    <main className="max-w-4xl w-full mx-auto">
      <PosterList posters={posters} isLocked={isLocked} />
      <InventorySummary handleLock={handleLock} />
    </main>
  );
}
