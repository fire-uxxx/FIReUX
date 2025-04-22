export function useBlogPosts() {
  return {
    ...useBlogPostFetch(),
    ...useBlogPostCreate(),
    ...useBlogPostDelete(),
    ...useBlogPostUpdate(),
    ...useBlogPostUtils()
  }
}
