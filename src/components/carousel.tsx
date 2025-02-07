"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useEffect, useRef, useState, useCallback } from "react";

interface CarouselProps {
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const slides = Array.isArray(children) ? children : [children];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState<number | "auto">("auto");
  const [activeSlide, setActiveSlide] = useState<number>(0); // Track active slide index
  const [partiallyVisibleSlides, setPartiallyVisibleSlides] = useState<Set<number>>(new Set()); // Track partially visible slides

  const checkOverflow = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const totalCardsWidth = slides.length * 340 + (slides.length - 1) * 16; // Assuming each card is 340px wide + 16px spacing
      const overflow = totalCardsWidth > containerWidth;
      setIsOverflowing(overflow);

      setSlidesPerView(overflow ? "auto" : slides.length);
    }
  }, [slides.length]);

  const updatePartiallyVisibleSlides = (swiper: any) => {
    const visibleSlides = new Set<number>();

    swiper.slides.forEach((slide: any, index: number) => {
      const slideRect = slide.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (
        slideRect.right > (containerRect?.left ?? 0) &&
        slideRect.left < (containerRect?.right ?? 0)
      ) {
        // Slide is at least partially visible
        visibleSlides.add(index);
      }
    });

    setPartiallyVisibleSlides(visibleSlides);
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [checkOverflow]);

  const handleSwiperInit = (swiper: any) => {
    checkOverflow();
    updatePartiallyVisibleSlides(swiper);
  };

  const handleSlideChange = (swiper: any) => {
    setActiveSlide(swiper.activeIndex);
    updatePartiallyVisibleSlides(swiper);
  };

  return (
    <div ref={containerRef} className="relative w-full mx-auto overflow-visible pb-4">
      <Swiper
        slidesPerView={slidesPerView}
        loop={false}
        spaceBetween={0}
        pagination={isOverflowing ? { clickable: true } : false}
        modules={[Pagination]}
        className="pb-8"
        onInit={handleSwiperInit} // Handle initialization of Swiper
        onSlideChange={handleSlideChange} // Track active slide index
      >
        {slides.map((child, index) => (
          <SwiperSlide
            key={index}
            className={`w-fit flex-shrink-0 max-w-fit !flex !h-auto ${
              index !== slides.length - 1 ? "mr-4" : ""
            } ${partiallyVisibleSlides.has(index) ? "bg-white bg-opacity-50" : ""}`} // Apply bg class to partially visible slides
          >
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* White shadow effect on the right, but only show if not on the last slide */}
      {isOverflowing && activeSlide !== slides.length - 1 && (
        <div className="absolute right-[-2.25rem] h-[calc(100%-1.25rem)] rounded-lg top-[0.125rem] w-[21rem] bg-white bg-opacity-50 pointer-events-none z-10" />
      )}

      <style jsx global>{`
        .swiper {
          overflow: visible !important;
        }
        .swiper-wrapper {
          overflow: visible !important;
        }
        .swiper-slide {
          overflow: visible !important;
        }
        .swiper-pagination {
          top: calc(100% + 32px) !important;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
        }
        .swiper-pagination-bullet {
          background-color: #df92d4 !important;
          opacity: 1 !important;
          border-radius: 50%;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          width: 14px !important;
          height: 14px !important;
          background-color: #c72bb0 !important;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default Carousel;
