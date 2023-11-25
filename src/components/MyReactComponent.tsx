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
        <div className="App">

            <div className="bg-white py-12 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">ChatGPT Traductor</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to deploy your app
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
                            pulvinar et feugiat blandit at. In mi viverra elit nunc.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center mx-auto">

                <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />

                <div className="mx-6">
                    <button className="rounded-md  px-3.5 py-2.5 text-sm font-semibold t hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled={fromLanguage === AUTO_LANGUAGE} onClick={() => {
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
                    <button className="rounded-md px-3.5 py-2.5 text-sm font-semibold t hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleClipboard}>
                        <i className="fas fa-clipboard"></i>
                    </button>
                    <button className="rounded-md px-3.5 py-2.5 text-sm font-semibold t hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleVolume}>
                        <i className="fas fa-volume-up"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App