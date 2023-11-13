
import { SUPPORTED_LANGUAGES } from "../hooks/constants"

interface Props {
    onChange: (LANGUAGE: string) => void
}

export const LanguageSelector = ({ onChange }: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value)
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