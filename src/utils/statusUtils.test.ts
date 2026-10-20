import { describe, expect, it } from 'vitest'
import { normalizeStatus } from './statusUtils'

describe('normalizeStatus', () => {
  it('maps backend spellings', () => {
    expect(normalizeStatus('IN_PROGRESS')).toBe('running')
    expect(normalizeStatus('DONE')).toBe('completed')
    expect(normalizeStatus('Error')).toBe('failed')
    expect(normalizeStatus(undefined)).toBe('pending')
  })
})
