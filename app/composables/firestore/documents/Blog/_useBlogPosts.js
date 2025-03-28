export function useBlogPosts() {
  const fetch = useBlogPostFetch()
  const create = useBlogPostCreate()
  const deletePost = useBlogPostDelete()
  const update = useBlogPostUpdate()

  return {
    ...fetch,
    ...create, 
    ...deletePost,
    ...update
  }
}
