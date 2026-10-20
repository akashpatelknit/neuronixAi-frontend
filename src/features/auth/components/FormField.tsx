import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  trailing?: ReactNode
}

/** shadcn Label + Input with error/hint wiring for accessible forms. */
export function FormField({ label, error, hint, trailing, id, ...rest }: FormFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
  return (
    <div className="space-y-1.5">
      <Label htmlFor={inputId}>{label}</Label>
      <div className="relative">
        <Input id={inputId} aria-invalid={error ? true : undefined} aria-describedby={describedBy} className={trailing ? 'h-11 pr-11' : 'h-11'} {...rest} />
        {trailing && <div className="absolute inset-y-0 right-1 flex items-center">{trailing}</div>}
      </div>
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="text-sm text-coral-ink">{error}</p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}
