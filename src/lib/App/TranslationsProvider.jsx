import { useEffect } from 'react'
import PropTypes from 'prop-types'
import store from '~su/store'

const TranslationProvider = ({ children, translations }) => {
  const setTranslations = store.useTranslationsStore((state) => state.setTranslations)

  useEffect(() => {
    if (translations) {
      setTranslations(translations)
    }
  }, [setTranslations, translations])

  return <>{children}</>
}

TranslationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  translations: PropTypes.object
}

export default TranslationProvider
