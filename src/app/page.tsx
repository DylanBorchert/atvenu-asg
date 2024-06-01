'use client';
import InventorySummary from '@/components/InventorySummary';
import PosterList from '@/components/PosterList';
import { ItemContext } from '@/context/ItemProvider';

import { useContext, useEffect, useMemo, useState } from "react";

export default function Home() {
  const { posters, setPosters } = useContext(ItemContext);
  const [isLocked, setIsLocked] = useState(false);

  /**
   * Calculates the total number of units sold based on the given posters array.
   *
   * @param posters - An array of posters.
   * @returns The total number of units sold.
   */
  const unitsSold = useMemo(() => {
    return posters?.reduce((acc: any, option: any) => {
      return acc + option.options.reduce((acc: any, option: any) => {
        return acc + ((option.CountIn + option.Add) - option.CountOut - option.Comp)
      }, 0);
    }, 0);
  }, [posters]);

  /**
   * Calculates the total gross value based on the given posters array.
   * The total gross value is calculated by summing the product of each poster's
   * (CountIn + Add - CountOut - Comp) and its corresponding Cost.
   *
   * @param posters - An array of posters.
   * @returns The total gross value.
   */
  const totalGross = useMemo(() => {
    return posters?.reduce((acc: any, option: any) => {
      return acc + option.options.reduce((acc: any, option: any) => {
        return acc + ((option.CountIn + option.Add) - option.CountOut - option.Comp) * option.Cost
      }, 0);
    }, 0);
  }, [posters]);


  /**
   * Calculates the total count out based on the provided posters.
   *
   * @param posters - An array of posters.
   * @returns The total count out.
   */
  const totalCountOut = useMemo(() => {
    return posters?.reduce((acc: any, option: any) => {
      return acc + option.options.reduce((acc: any, option: any) => {
        return acc + option.CountOut
      }, 0);
    }, 0);
  }, [posters]);


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
      <InventorySummary handleLock={handleLock} unitsSold={unitsSold} totalGross={totalGross} totalCountOut={totalCountOut} isLocked={isLocked} />
      <div className='w-fit ml-auto p-3'>
        <a href="https://github.com/DylanBorchert/atvenu-asg" target='_blank' className="text-blue-500 align">See git repo</a>
      </div>
    </main>
  );
}
