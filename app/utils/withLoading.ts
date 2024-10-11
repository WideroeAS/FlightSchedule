// Sets loading state to true when Promise is computing.
// When the Promise has been resolved or rejected the loading state is set to false.
export const withLoading = async <T>(compute: () => Promise<T>, setLoading: (value: boolean) => void): Promise<T> => {
  try {
    setLoading(true)
    return await compute()
  } finally {
    setLoading(false)
  }
}
