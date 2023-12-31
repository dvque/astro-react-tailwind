import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGES } from '../hooks/constants';
import { useStore } from '../hooks/useStore'
import { LanguageSelector } from './LanguageSelector';
import { TextArea } from './TextArea';
import { SectionType } from './types.d';
import { translate } from '../services/translate';

function App() {
    const { loading, fromLanguage, toLanguage, fromText, result, interchangeLanguages, setFromLanguage, setToLanguage, setFromText, setResult } = useStore();

    const [isInterchangeClicked, setIsInterchangeClicked] = useState(false);


    const debouncedFromText = useDebounce(fromText);

    useEffect(() => {
        if (debouncedFromText === '') return;

        // If the interchange button was clicked, we don't want to translate the text
        if (isInterchangeClicked) {
            setIsInterchangeClicked(false); // Reset the state variable for the next render
            return;
        }

        translate({ fromLanguage, toLanguage, text: debouncedFromText })
            .then(result => {
                // == check for null or undefined
                if (result == null) return;
                setResult(result)
            })
            .catch(error => { setResult('Error') })
    }, [debouncedFromText, fromLanguage, toLanguage])

    const handleClipboard = () => {
        navigator.clipboard.writeText(result)
    }

    const handleVolume = () => {
        const utteration = new SpeechSynthesisUtterance(result);
        utteration.lang = VOICE_FOR_LANGUAGES[toLanguage];
        speechSynthesis.speak(utteration);
    }

    return (
        <div>


            <div className="flex items-center justify-center mx-auto">

                <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />

                <div className="mx-6">
                    <button className="inline-flex justify-center items-center mt-1 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-200 w-8 h-8" disabled={fromLanguage === AUTO_LANGUAGE} onClick={() => {
                        interchangeLanguages();
                        setIsInterchangeClicked(true);
                    }}>
                        <i className="fas fa-exchange-alt"></i>
                    </button>
                </div>

                <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
            </div>

            <div className="flex flex-row mt-5">
                <div className="basis-1/2 pl-5">
                    <TextArea
                        type={SectionType.From}
                        value={fromText}
                        onChange={setFromText}
                    />
                </div>
                <div className="basis-1/2 pr-5">
                    <TextArea
                        type={SectionType.To}
                        value={result}
                        onChange={setResult}
                        loading={loading}
                    />
                    <button className="inline-flex justify-center items-center mt-1 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-200 w-8 h-8"
                        onClick={handleClipboard}>
                        <i className="fas fa-clipboard"></i>
                    </button>
                    <button className="inline-flex justify-center items-center mt-1 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-200 w-8 h-8"
                        onClick={handleVolume}>
                        <i className="fas fa-volume-up"></i>
                    </button>

                </div>
            </div>


        </div>
    )
}

export default App