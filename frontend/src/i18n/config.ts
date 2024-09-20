import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import de from "../assets/locales/de/translation.json"
import en from "../assets/locales/en/translation.json"

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		resources: {
			de: {
				translation: de,
			},
			en: {
				translation: en,
			},
		},
	})
