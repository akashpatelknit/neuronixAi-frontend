import type { AgentAccent } from '../types/agent.types'

/** Full class names are listed statically so Tailwind can detect them. */
export const agentAccentClasses: Record<AgentAccent, { soft: string; ink: string; solid: string; border: string; hex: string }> = {
  violet: { soft: 'bg-violet-soft', ink: 'text-violet-ink', solid: 'bg-violet', border: 'border-violet/30', hex: '#7047EB' },
  blue: { soft: 'bg-blue-soft', ink: 'text-blue-ink', solid: 'bg-blue', border: 'border-blue/30', hex: '#3685F5' },
  cyan: { soft: 'bg-cyan-soft', ink: 'text-cyan-ink', solid: 'bg-cyan', border: 'border-cyan/40', hex: '#20C9D7' },
  coral: { soft: 'bg-coral-soft', ink: 'text-coral-ink', solid: 'bg-coral', border: 'border-coral/40', hex: '#FF7867' },
  amber: { soft: 'bg-amber-soft', ink: 'text-amber-ink', solid: 'bg-amber', border: 'border-amber/50', hex: '#FFBE55' },
  mint: { soft: 'bg-mint-soft', ink: 'text-mint-ink', solid: 'bg-mint', border: 'border-mint/50', hex: '#40D9A0' },
}
