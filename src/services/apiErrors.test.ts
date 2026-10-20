import { describe, expect, it } from 'vitest'
import { apiErrorFromResponse, extractServerMessage } from './apiErrors'

describe('apiErrorFromResponse', () => {
  it('maps status codes to kinds', () => {
    expect(apiErrorFromResponse(409, {}).kind).toBe('conflict')
    expect(apiErrorFromResponse(429, {}).kind).toBe('rate-limited')
    expect(apiErrorFromResponse(503, {}).kind).toBe('server')
  })

  it('keeps safe 4xx messages but hides 5xx details', () => {
    expect(apiErrorFromResponse(409, { message: 'Email already registered' }).message).toBe('Email already registered')
    expect(apiErrorFromResponse(500, { message: 'NullPointerException' }).serverMessage).toBeUndefined()
  })

  it('rejects stack-trace-like messages', () => {
    expect(extractServerMessage({ message: 'x at com.foo.Bar(Bar.java:10)' })).toBeUndefined()
  })
})
