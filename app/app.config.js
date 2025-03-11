export default defineAppConfig({
  ui: {
    colors: {
      primary: 'yellow',
      neutral: 'zinc'
    },
    card: {
      slots: {
        root: 'flex flex-col h-full',
        body: 'flex-grow'
      }
    }
  }
})
