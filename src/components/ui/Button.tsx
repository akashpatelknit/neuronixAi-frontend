import { forwardRef, type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import { LoadingSpinner } from './LoadingSpinner'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand-gradient text-white shadow-card hover:shadow-lift hover:-translate-y-px',
  secondary: 'bg-surface text-ink border border-line hover:border-violet/40 hover:bg-violet-soft',
  ghost: 'text-ink-soft hover:bg-violet-soft hover:text-violet-ink',
  danger: 'bg-coral-soft text-coral-ink border border-coral/30 hover:bg-coral/20',
}
const sizes: Record<Size, string> = {
  sm: 'min-h-9 px-3 text-sm',
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

export const buttonClasses = (variant: Variant = 'primary', size: Size = 'md', extra?: string) =>
  clsx(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-ui disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    extra,
  )

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading, disabled, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={buttonClasses(variant, size, className)} {...rest}>
      {loading && <LoadingSpinner size={16} />}
      {children}
    </button>
  )
})
