import * as React from 'react'

import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  'flex w-full rounded-md border border-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:hover:cursor-pointer file:opacity-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'placeholder:text-muted-foreground bg-transparent text-white',
      },
      sizeType: {
        default: 'min-h-8 px-3 py-1 text-sm',
        lg: 'min-h-11 px-3 py-1 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      sizeType: 'default',
    },
  },
)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, sizeType, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, sizeType, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
