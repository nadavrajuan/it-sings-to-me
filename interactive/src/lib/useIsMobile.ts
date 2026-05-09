import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint = 900) {
  const getIsMobile = () =>
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false;

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const onResize = () => setIsMobile(getIsMobile());
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isMobile;
}
