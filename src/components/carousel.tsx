"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useEffect, useRef, useState, useCallback, ReactElement } from "react";
import React from "react";
import { CardProps } from "./card";
import Card from "./card";

interface CarouselProps {
  children: React.ReactNode;
}

interface ExtendedSwiper extends SwiperInstance {
  slides: HTMLElement[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const slides = Array.isArray(children) ? children : [children];
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperInstance | null>(null); // Reference to Swiper instance
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState<number | "auto">("auto");
  const [, setActiveSlide] = useState<number>(0); // Track active slide index
  const [partiallyVisibleSlides, setPartiallyVisibleSlides] = useState<
    Set<number>
  >(new Set()); // Track partially visible slides

  const checkOverflow = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const totalCardsWidth = slides.length * 340 + (slides.length - 1) * 8; // Assuming each card is 340px wide + 16px spacing
      const overflow = totalCardsWidth > containerWidth;
      setIsOverflowing(overflow);

      setSlidesPerView(overflow ? "auto" : slides.length);
    }
  }, [slides.length]);

  const updatePartiallyVisibleSlides = (swiper: ExtendedSwiper) => {
    const partiallyVisible = new Set<number>();

    swiper.slides.forEach((slide: HTMLElement, index: number) => {
      const slideRect = slide.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (containerRect) {
        const isFullyVisible =
          slideRect.left >= containerRect.left &&
          slideRect.right <= containerRect.right;

        if (!isFullyVisible) {
          partiallyVisible.add(index);
        }
      }
    });
    setPartiallyVisibleSlides(partiallyVisible);
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", () => {
      checkOverflow();
      // Delay the visibility check after resize to allow Swiper to update
      setTimeout(() => {
        if (swiperRef.current) {
          updatePartiallyVisibleSlides(swiperRef.current);
        }
      }, 0);
    });

    return () => window.removeEventListener("resize", checkOverflow);
  }, [checkOverflow]);

  const handleSwiperInit = (swiper: ExtendedSwiper) => {
    swiperRef.current = swiper;
    checkOverflow();
    setTimeout(() => updatePartiallyVisibleSlides(swiper), 0);
  };

  const handleSlideChange = (swiper: ExtendedSwiper) => {
    setActiveSlide(swiper.activeIndex);
    setTimeout(() => updatePartiallyVisibleSlides(swiper), 0);
  };

  const handleTransitionEnd = (swiper: ExtendedSwiper) => {
    updatePartiallyVisibleSlides(swiper); // Call updatePartiallyVisibleSlides when transition ends
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto overflow-visible pb-4"
    >
      <Swiper
        slidesPerView={slidesPerView}
        loop={false}
        spaceBetween={0}
        pagination={isOverflowing ? { clickable: true } : false}
        modules={[Pagination]}
        className="pb-8"
        onInit={handleSwiperInit} // Handle initialization of Swiper
        onSlideChange={handleSlideChange} // Track active slide index
        onTransitionEnd={handleTransitionEnd} // Handle transition end
      >
        {slides.map((child, index) => {
          // Check if the child is of type 'Card'`
          if (React.isValidElement(child) && child.type === Card) {
            return (
              <SwiperSlide
                key={index}
                className={`w-fit flex-shrink-0 max-w-fit !flex !h-auto ${
                  index !== slides.length - 1 ? "mr-4" : ""
                }`}
              >
                {/* Clone the element and pass whiteCast prop */}
                {React.cloneElement(child as ReactElement<CardProps>, {
                  whiteCast: partiallyVisibleSlides.has(index),
                })}
              </SwiperSlide>
            );
          }
          // If the child is not a Card component
          return (
            <SwiperSlide
              key={index}
              className={`w-fit flex-shrink-0 max-w-fit !flex !h-auto ${
                index !== slides.length - 1 ? "mr-4" : ""
              }`}
            >
              {child}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
