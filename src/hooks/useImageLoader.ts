import { useEffect, useState } from "react";

// Custom hook to track image loading
const useImageLoader = (imageUrls: string[]) => {
  const [loadedImages, setLoadedImages] = useState({});
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (url: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
        img.src = url;
      });
    };

    const loadAllImages = async () => {
      setAllLoaded(false);
      setLoadedImages({});

      try {
        await Promise.all(
          imageUrls.map((url) =>
            loadImage(url)
              .then(() => setLoadedImages((prev) => ({ ...prev, [url]: true })))
              .catch(() =>
                setLoadedImages((prev) => ({ ...prev, [url]: false }))
              )
          )
        );
      } finally {
        setAllLoaded(true);
      }
    };

    if (imageUrls.length > 0) {
      loadAllImages();
    }
  }, [imageUrls]);

  return { loadedImages, allLoaded };
};

export default useImageLoader;
