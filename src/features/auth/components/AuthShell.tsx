import type { ReactNode } from 'react'
import { Bot, Code2, LineChart, ListChecks, PenLine, Microscope } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { appConfig } from '@/config/appConfig'
import { SimulatedNotice } from '@/components/feedback/SimulatedNotice'

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-10 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <Logo />
          <h1 className="mt-8 text-2xl font-semibold">{title}</h1>
          <p className="mt-1 text-ink-soft">{subtitle}</p>
          {appConfig.useMockData && <div className="mt-4"><SimulatedNotice>Demo mode: any valid credentials sign you into a simulated session.</SimulatedNotice></div>}
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6 shadow-card">{children}</div>
        </div>
      </div>
      <aside className="relative hidden overflow-hidden bg-hero-gradient lg:flex lg:items-center lg:justify-center" aria-hidden="true">
        <div className="grid grid-cols-3 gap-4 p-12">
          {[ListChecks, Code2, PenLine, Microscope, LineChart, Bot].map((Icon, i) => (
            <div key={i} className="float-soft flex size-24 items-center justify-center rounded-3xl bg-surface text-violet shadow-lift" style={{ animationDelay: `${i * 0.4}s` }}>
              <Icon size={34} />
            </div>
          ))}
        </div>
        <p className="absolute bottom-10 px-10 text-center text-lg font-medium text-violet-ink">One AI Workspace. A Team of Specialized Agents.</p>
      </aside>
    </div>
  )
}
