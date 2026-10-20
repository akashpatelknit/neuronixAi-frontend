import { Card } from '@/components/ui/card'
import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, Loader2, UploadCloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ApiError } from '@/services/apiErrors'
import { getErrorMessage } from '@/utils/errorUtils'
import { appConfig } from '@/config/appConfig'
import { knowledgeBaseApi } from '../services/knowledgeBaseApi'

export function DocumentUpload() {
  const input = useRef<HTMLInputElement>(null)
  const [done, setDone] = useState<string>()
  const queryClient = useQueryClient()
  const upload = useMutation({
    mutationFn: knowledgeBaseApi.uploadDocument,
    onSuccess: (_, file) => {
      setDone(appConfig.useMockData ? `${file.name} (demo mode: nothing was actually uploaded)` : `${file.name} uploaded. Indexing status updates below.`)
      void queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })

  const onFile = (file?: File) => {
    if (!file) return
    setDone(undefined)
    upload.mutate(file)
    if (input.current) input.current.value = ''
  }

  const message = upload.error instanceof ApiError && upload.error.kind === 'conflict' ? 'This document has already been uploaded.' : upload.error ? getErrorMessage(upload.error) : undefined

  return (
    <Card className="border-2 border-dashed p-6 text-center shadow-none">
      <UploadCloud className="mx-auto text-mint-ink" size={28} aria-hidden="true" />
      <p className="mt-2 text-sm font-medium">Add a document to your knowledge base</p>
      <input ref={input} id="document-file" type="file" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
      <Button className="mt-3" variant="outline" disabled={upload.isPending} onClick={() => input.current?.click()}>
        {upload.isPending && <Loader2 className="animate-spin" />}Choose file
      </Button>
      <div aria-live="polite">
        {message && <p role="alert" className="mt-3 text-sm text-coral-ink">{message}</p>}
        {done && !message && <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-mint-ink"><CheckCircle2 size={15} aria-hidden="true" /> {done}</p>}
      </div>
    </Card>
  )
}
