export function track(event: string, props?: Record<string, string>) {
  if (typeof window !== 'undefined') {
    const w = window as unknown as { plausible?: (e: string, o: object) => void }
    w.plausible?.(event, { props: props || {} })
  }
}
