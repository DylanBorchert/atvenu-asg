'use client';
import InventorySummary from '@/components/InventorySummary';
import PosterList from '@/components/PosterList';
import { getPosters } from '@/util/posterUtil';

import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [isLocked, setIsLocked] = useState(false);
  const [posters, setPosters] = useState([] as any);

  useEffect(() => {
    setPosters(getPosters());
  }, []);

  const unitsSold = useMemo(() => {
    return posters.reduce((acc: any, option: any) => {
      return acc + option.options.reduce((acc: any, option: any) => {
        return acc + ((option.CountIn + option.Add) - option.CountOut - option.Comp)
      }, 0);
    }, 0);
  }, [posters]);

  const totalGross = useMemo(() => {
    return posters.reduce((acc: any, option: any) => {
      return acc + option.options.reduce((acc: any, option: any) => {
        return acc + ((option.CountIn + option.Add) - option.CountOut - option.Comp) * option.Cost
      }, 0);
    }, 0);
  }, [posters]);

  const totalCountOut = useMemo(() => {
    return posters.reduce((acc: any, option: any) => {
      return acc + option.options.reduce((acc: any, option: any) => {
        return acc + option.CountOut
      }, 0);
    }, 0);
  }, [posters]);

  const updatePosters = (newPoster: any) => {
    let newUnitSold = 0;
    let newTotalGross = 0;
    let newPosters = posters.map((poster: any) => {
      if (poster.id === newPoster.id) {
        return newPoster;
      }
      newUnitSold += poster.unitSold;
      newTotalGross += poster.unitSold * poster.cost;
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
      <InventorySummary handleLock={handleLock} unitsSold={unitsSold} totalGross={totalGross} totalCountOut={totalCountOut} />
      <div className='w-fit ml-auto p-3'>
        <a href="https://github.com/DylanBorchert/atvenu-asg" target='_blank' className="text-blue-500 align">See git repo</a>
      </div>
    </main>
  );
}
