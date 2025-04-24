// app/plugins/inject-tracer.ts
// Temporarily unhooking the plugin by commenting out the entire implementation
export default defineNuxtPlugin(() => {
  if (import.meta.dev && typeof window !== 'undefined') {
    const originalWarn = console.warn
    let hasLogged = false

    console.warn = (...args: unknown[]) => {
      // Suppress warnings originating from this tracer file itself
      const err = new Error()
      const stack = err.stack || ''
      if (stack.includes('inject-tracer.ts')) {
        return // silently ignore self‑triggered warnings
      }

      const [firstArg] = args

      // Handle Vue inject warnings
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

      // Handle VueFire SSR warnings
      const isVueFireSSRWarning =
        typeof firstArg === 'string' &&
        firstArg.includes(
          '[VueFire SSR]: Could not get the path of the data source'
        )

      if (isVueFireSSRWarning) {
        console.groupCollapsed(
          '%c⚠️ [VueFire SSR Warning]',
          'color: yellow; font-weight: bold;'
        )
        originalWarn('[VueFire SSR Warning Triggered]:', ...args)
        console.log('%c🔍 Possible cause:', 'color: lightblue;')
        console.log(
          '- This warning is related to VueFire struggling to resolve a data source path during SSR.\n' +
            '- Ensure that VueFire composables like useCollection or useDocument are used in valid contexts.\n' +
            '- Check if Firebase operations are being conditionally handled for SSR.'
        )
        console.log('%c🔎 Stack trace for investigation:', 'color: lightgray;')
        console.trace()
        console.groupEnd()
        return // suppress repeat warnings for VueFire SSR
      }

      // Fallback: original warning
      originalWarn(...args)
    }
  }
})
