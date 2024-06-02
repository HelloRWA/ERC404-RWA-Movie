export const litStore = defineStore('litStore', () => {
  const { $lit } = useNuxtApp()
  const {addLoading, alertError, alertSuccess} = $(notificationStore())
  let isLoading = $ref(false)
  const client = $lit();
  console.log(`====> client :`, client)
  return $$({ isLoading, form, item, items, loadData, doSubmit })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(litStore, import.meta.hot))
