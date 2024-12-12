import { useEffect, useState } from 'react'
import { LoadingBlock } from '~su/components'
import { i18n, object } from '~su/utilities'
import { sessionStore } from '~su/authenticationSdk'

const withTranslations = (Component, context) => {
  const WrappedComponent = ({ ...componentProps }) => {
    const [isLoading, setIsLoading] = useState(true)

    const translations = sessionStore.useTranslations()

    useEffect(() => {
      if (!object.isEmpty(translations) && context) {
        i18n.addResources(translations[context], 'Translations')
      }

      setIsLoading(false)
    }, [translations])

    return isLoading ? <LoadingBlock brandedFullscreen /> : <Component {...componentProps} />
  }

  return WrappedComponent
}

export default withTranslations
