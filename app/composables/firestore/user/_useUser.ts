

export function useUser() {

  return {
    ...useUserUpdate(),
    ...useUserDelete(),
    ...useUserCreate(),
    ...useUserRead(),
  }
}
