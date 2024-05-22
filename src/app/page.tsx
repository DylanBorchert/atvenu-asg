'use client';
import InventorySummary from '@/components/InventorySummary';
import PosterList from '@/components/PosterList';
import { getPosters } from '@/util/posterUtil';

import { useEffect, useState } from "react";

export default function Home() {
  const [isLocked, setIsLocked] = useState(false);

  const handleLock = () => {
    setIsLocked(true);
  }


  return (
    <main className="max-w-4xl w-full mx-auto">
      <InventorySummary handleLock={handleLock} />
    </main>
  );
}
