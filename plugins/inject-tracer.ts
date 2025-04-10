// app/plugins/inject-tracer.ts
export default defineNuxtPlugin(() => {
  if (import.meta.dev && typeof window !== 'undefined') {
    const originalWarn = console.warn
    let hasLogged = false

    console.warn = (...args: unknown[]) => {
      const [firstArg] = args

      const isInjectWarning =
        typeof firstArg === 'string' &&
        firstArg.includes('inject() can only be used')

      if (isInjectWarning) {
        if (!hasLogged) {
          console.groupCollapsed(
            '%c🚨 [Vue Inject Warning]',
            'color: orange; font-weight: bold;'
          )
          originalWarn('[Inject Warning Triggered]:', ...args)
          console.log('%c🔍 Possible cause:', 'color: lightblue;')
          console.log(
            '- An inject was likely called outside of a valid setup()/plugin context\n' +
              '- This could be a misuse of a composable, or an unguarded `useX` call during SSR/hydration'
          )
          console.log(
            '%c🔎 Stack trace for investigation:',
            'color: lightgray;'
          )
          console.trace()
          console.groupEnd()
          hasLogged = true
        }
        return // suppress repeat warnings
      }

      originalWarn(...args)
    }
  }
})
