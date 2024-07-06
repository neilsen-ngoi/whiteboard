//hook to prevent users with larger screens from triggering a scroll on your screen when they move their cursor out of your screen bounds

import { useEffect } from "react";

export const useDisableScrollBounce = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden", "overscroll-none");
    return () => {
      document.body.classList.remove("overflow-hidden", "overscroll-none");
    };
  }, []);
};
