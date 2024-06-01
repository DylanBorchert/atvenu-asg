'use client';
import InventorySummary from '@/components/InventorySummary';
import PosterList from '@/components/PosterList';

import { useState } from "react";

export default function Home() {
  const [isLocked, setIsLocked] = useState(false);

  const handleLock = () => {
    setIsLocked(true);
  }

  return (
    <main className="max-w-4xl w-full mx-auto">
      <PosterList isLocked={isLocked} />
      <InventorySummary handleLock={handleLock} isLocked={isLocked} />
      <div className='w-fit ml-auto p-3'>
        <a href="https://github.com/DylanBorchert/atvenu-asg" target='_blank' className="text-blue-500 align">See git repo</a>
      </div>
    </main>
  );
}
