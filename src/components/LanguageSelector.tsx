
import { SUPPORTED_LANGUAGES } from "../hooks/constants"
import type { Language } from "./types"

interface Props {
    onChange: (LANGUAGE: Language) => void
}

export const LanguageSelector = ({ onChange }: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }

    return (
        <form aria-aria-label='Selecciona el idioma' className="w-1/3">
            <select onChange={handleChange} className="form-select block w-full border border-gray-200 rounded py-3 px-4">
                {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                ))}
            </select>
        </form>
    )
}