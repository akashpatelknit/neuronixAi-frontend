import { describe, expect, it } from 'vitest'
import { formatDuration } from './dateUtils'

describe('formatDuration', () => {
  it('returns undefined when a timestamp is missing', () => {
    expect(formatDuration('2026-01-01T00:00:00Z', undefined)).toBeUndefined()
  })
  it('formats seconds', () => {
    expect(formatDuration('2026-01-01T00:00:00Z', '2026-01-01T00:00:12Z')).toBe('12.0 s')
  })
})
