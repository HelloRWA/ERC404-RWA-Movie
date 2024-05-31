export const tokenStore = defineStore('tokenStore', () => {
  const {addLoading, alertError, alertSuccess} = $(notificationStore())
  let isLoading = $ref(false)
  const form = $ref({})
  let item = $ref({})

  const loadData = async () => {
    if (isLoading) return
    isLoading = true
    const {data, error} = await useGetRequest(`/api/token/${id}`)
      console.log(`====> data, error :`, data, error)
    if (error) {
      isLoading = false
      return alertError(error)
    }
    item = data
    isLoading = false
  }

  return $$({ isLoading, form, item, loadData })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(tokenStore, import.meta.hot))
