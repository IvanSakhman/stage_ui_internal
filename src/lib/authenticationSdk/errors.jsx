export function handleGetFlowError({ router, flowType, resetFlow, redirects, triggerError }) {
  return async (err) => {
    switch (err.response?.data.error?.id) {
      case 'session_inactive':
        await router(`${redirects.login}?return_to=` + window.location.href)
        return
      case 'session_aal2_required':
        if (err.response?.data.redirect_browser_to) {
          const redirectTo = new URL(err.response?.data.redirect_browser_to)
          if (flowType === 'settings') {
            redirectTo.searchParams.set('return_to', window.location.href)
          }
          window.location.href = redirectTo.toString()
          return
        }
        await router(`${redirects.login}/login?aal=aal2&return_to=` + window.location.href)
        return
      case 'session_already_available':
        await router(`${redirects.home}`)
        return
      case 'session_refresh_required':
        window.location.href = err.response?.data.redirect_browser_to
        return
      case 'self_service_flow_return_to_forbidden':
        triggerError('The return_to address is not allowed.')
        resetFlow(undefined)
        await router(redirects[flowType])
        return
      case 'self_service_flow_expired':
        triggerError('Your interaction expired, please fill out the form again.')
        resetFlow(undefined)
        await router(redirects[flowType])
        return
      case 'security_csrf_violation':
        triggerError('A security violation was detected, please fill out the form again.')
        resetFlow(undefined)
        await router(redirects[flowType])
        return
      case 'security_identity_mismatch':
        resetFlow(undefined)
        await router(redirects[flowType])
        return
      case 'browser_location_change_required':
        window.location.href = err.response.data.redirect_browser_to
        return
    }

    switch (err.response?.status) {
      case 410:
        resetFlow(undefined)
        await router(redirects[flowType])
        return
    }

    return Promise.reject(err)
  }
}

export const handleFlowError = handleGetFlowError
