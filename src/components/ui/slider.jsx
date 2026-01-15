import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, showValue = false, ...props }, ref) => {
  const value = props.value?.[0] || props.defaultValue?.[0] || 0;
  const min = props.min || 0;
  const max = props.max || 100;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full">
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}>
        <SliderPrimitive.Track
          className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-300">
          <SliderPrimitive.Range className="absolute h-full bg-blue-500 rounded-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="relative block h-5 w-5 rounded-full bg-blue-500 shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 cursor-grab active:cursor-grabbing">
          {showValue && (
            <>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2.5 py-1.5 rounded whitespace-nowrap">
                {value}
              </div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-orange-500"></div>
            </>
          )}
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }