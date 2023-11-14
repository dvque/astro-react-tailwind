import { AUTO_LANGUAGE } from '../hooks/constants';
import { useStore } from '../hooks/useStore'
import { LanguageSelector } from './LanguageSelector';

function App() {
    const { fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage } = useStore();

    return (
        <div className="App">
            <div className="bg-white">
                <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-10 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-8 lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Translate</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center mx-auto">
                <LanguageSelector type='from' value={fromLanguage} onChange={setFromLanguage} />

                <div className="mx-6">
                    <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
                        <i className="fas fa-exchange-alt"></i>
                    </button>
                </div>

                <LanguageSelector type='to' value={toLanguage} onChange={setToLanguage} />
            </div>

            <div className="flex items-center justify-center mx-auto">
                <div> from: {fromLanguage}
                    to: {toLanguage}</div>
            </div>

        </div>

    )



}

export default App