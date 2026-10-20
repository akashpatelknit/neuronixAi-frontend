import { AgentCapabilitiesSection } from '../components/AgentCapabilitiesSection'
import { ExecutionTransparencySection } from '../components/ExecutionTransparencySection'
import { FinalCtaSection } from '../components/FinalCtaSection'
import { HeroSection } from '../components/HeroSection'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { LandingFooter } from '../components/LandingFooter'
import { LandingNavbar } from '../components/LandingNavbar'
import { PlatformCapabilitiesSection } from '../components/PlatformCapabilitiesSection'
import { WorkflowExamplesSection } from '../components/WorkflowExamplesSection'

export default function LandingPage() {
  return (
    <>
      <LandingNavbar />
      <main>
        <HeroSection />
        <WorkflowExamplesSection />
        <AgentCapabilitiesSection />
        <HowItWorksSection />
        <PlatformCapabilitiesSection />
        <ExecutionTransparencySection />
        <FinalCtaSection />
      </main>
      <LandingFooter />
    </>
  )
}
