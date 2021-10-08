import { DutchLang } from '../locales/de'
import { EnglishLang } from '../locales/en-US'
import i18next from 'i18next'

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: `en`, // language to use
  resources: {
    en: EnglishLang, // 'common' is our custom namespace
    de: DutchLang,
  },
})
