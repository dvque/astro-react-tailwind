import { SectionType } from "./types.d"

interface Props {
    type: SectionType
    loading?: boolean
    value: string
    onChange: (value: string) => void
}

const commonStyles = {}

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
    if (type === SectionType.From) return 'Introducte texto'
    if (loading) return 'Traduciendo...'
    return 'Traducción'
}

export const TextArea = ({ type, loading, value, onChange }: Props) => {
    const styles: React.CSSProperties = type === SectionType.From
        ? { ...commonStyles }
        : { ...commonStyles, backgroundColor: 'rgb(241 245 249)' }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <div>
            <textarea
                name="{type}-textarea"
                rows={3}
                placeholder={getPlaceholder({ type, loading })}
                autoFocus={type === SectionType.From}
                value={value}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={styles}
            />
        </div>
    )
}