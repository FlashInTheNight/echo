import { createListenerMiddleware } from "@reduxjs/toolkit"
import { userApi } from "@/lib/servicies/userApi"

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners()

    console.log(action.payload)
    localStorage.setItem("test", action.payload + '')
    if (action.payload.accessToken) {
      localStorage.setItem("token", action.payload.accessToken)
    }
  },
})
