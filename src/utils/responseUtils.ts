import type { Paged } from '@/types/common.types'

/** Accepts a bare array or a Spring Data style page ({ content, totalElements }). */
export function unwrapList<T>(raw: unknown): Paged<T> {
  if (Array.isArray(raw)) return { items: raw as T[], total: raw.length, page: 1, pageSize: raw.length }
  if (raw && typeof raw === 'object') {
    const r = raw as Record<string, unknown>
    const items = (r.content ?? r.items ?? r.data ?? []) as T[]
    return {
      items: Array.isArray(items) ? items : [],
      total: Number(r.totalElements ?? r.total ?? (Array.isArray(items) ? items.length : 0)),
      page: Number(r.number ?? r.page ?? 0) + (r.number !== undefined ? 1 : 0) || 1,
      pageSize: Number(r.size ?? r.pageSize ?? (Array.isArray(items) ? items.length : 0)),
    }
  }
  return { items: [], total: 0, page: 1, pageSize: 0 }
}

export function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value ? value : undefined
}
