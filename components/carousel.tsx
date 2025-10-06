"use client"

import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselOptions = NonNullable<React.ComponentProps<typeof useEmblaCarousel>[0]>
type CarouselPlugin = NonNullable<React.ComponentProps<typeof useEmblaCarousel>[1]>

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: UseEmblaCarouselType[1]) => void
  withArrows?: boolean
  withDots?: boolean
} & React.ComponentPropsWithoutRef<"div">

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  selectedIndex: number
  scrollSnaps: number[]
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  CarouselProps & {
    emblaRef?: ReturnType<typeof useEmblaCarousel>[0]
    emblaApi?: ReturnType<typeof useEmblaCarousel>[1]
  }
>(
  (
    {
      opts,
      plugins,
      orientation = "horizontal",
      setApi,
      className,
      children,
      withArrows = true,
      withDots = true,
      emblaRef: propEmblaRef,
      emblaApi: propEmblaApi,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, carouselApi] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

    const onSelect = React.useCallback((api: UseEmblaCarouselType[1]) => {
      setSelectedIndex(api.selectedScrollSnap())
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const onInit = React.useCallback((api: UseEmblaCarouselType[1]) => {
      setScrollSnaps(api.scrollSnapList())
    }, [])

    const scrollPrev = React.useCallback(() => {
      carouselApi?.scrollPrev()
    }, [carouselApi])

    const scrollNext = React.useCallback(() => {
      carouselApi?.scrollNext()
    }, [carouselApi])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext],
    )

    React.useEffect(() => {
      if (!carouselApi) {
        return
      }

      onInit(carouselApi)
      onSelect(carouselApi)
      carouselApi.on("reInit", onInit)
      carouselApi.on("reInit", onSelect)
      carouselApi.on("select", onSelect)
      if (setApi) {
        setApi(carouselApi)
      }
    }, [carouselApi, onInit, onSelect, setApi])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef: propEmblaRef || carouselRef,
          api: propEmblaApi || carouselApi,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          selectedIndex,
          scrollSnaps,
          opts,
          orientation,
          withArrows,
          withDots,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          <div ref={propEmblaRef || carouselRef} className="overflow-hidden">
            <div className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col")}>{children}</div>
          </div>
          {withArrows && <CarouselPrevious />}
          {withArrows && <CarouselNext />}
          {withDots && <CarouselDots />}
        </div>
      </CarouselContext.Provider>
    )
  },
)
Carousel.displayName = "Carousel"

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useCarousel()

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    )
  },
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel()

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        onClick={scrollNext}
        disabled={!canScrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    )
  },
)
CarouselNext.displayName = "CarouselNext"

const CarouselDots = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { api, scrollSnaps, selectedIndex } = useCarousel()

    return (
      <div ref={ref} className={cn("flex justify-center space-x-2 mt-4", className)} {...props}>
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full bg-gray-400 transition-colors",
              index === selectedIndex ? "bg-gold" : "bg-gray-600",
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    )
  },
)
CarouselDots.displayName = "CarouselDots"

export { Carousel, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots }
