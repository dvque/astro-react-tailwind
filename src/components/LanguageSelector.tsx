
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../hooks/constants"
import { type FromLanguage, type Language, SectionType } from "./types.d"

type Props =
    | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
    | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector = ({ onChange, type, value }: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }

    return (
        <form aria-label='Selecciona el idioma' className="w-1/3">
            <select onChange={handleChange} value={value} className="form-select block w-full border border-gray-200 rounded py-3 px-4">

                {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detect language</option>}

                {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                ))}

            </select>
        </form>
    )
}