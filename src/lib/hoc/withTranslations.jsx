import { useEffect, useState } from 'react'
import { LoadingBlock } from '~su/components'
import { i18n, object } from '~su/utilities'
import store from '~su/store'

const withTranslations = (Component, context) => {
  const WrappedComponent = ({ ...componentProps }) => {
    const [isLoading, setIsLoading] = useState(true)

    const translations = store.useTranslations()

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
