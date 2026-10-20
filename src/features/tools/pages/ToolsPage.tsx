import { integrationCatalog } from '../data/integrationCatalog'
import { IntegrationCard } from '../components/IntegrationCard'

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-ink-soft">Tools and integrations will let agents act on the outside world. None are connected yet, and no connection flows are offered until the backend supports them.</p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {integrationCatalog.map((i) => (
          <IntegrationCard key={i.id} integration={i} />
        ))}
      </div>
    </div>
  )
}
