export const tplStore = defineStore('tplStore', () => {
  const {addLoading, alertError, alertSuccess} = $(notificationStore())
  let isLoading = $ref(false)
  const form = $ref({})
  let item = $ref({})
  let items = $ref([])

  const loadData = async () => {
    if (isLoading) return
    isLoading = true

    const {data, error} = $(await useGetRequest('/api/xxx', {page: 1}))
    if (error) {
      isLoading = false
      return alertError(error)
    }
    items = data
    isLoading = false
  }

  const doSubmit = async () => {
    if (isLoading) return
    isLoading = true

    const loading = addLoading('some middle step loading information')
    const { error } = await doPost('/api/xxx/create', form)
    if (error) {
      isLoading = false
      return alertError(error, null, loading)
    }

    alertSuccess('Submit Successed!', null, loading)
    isLoading = false
  }

  return $$({ isLoading, form, item, items, loadData, doSubmit })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(tplStore, import.meta.hot))
