import { AUTO_LANGUAGE } from '../hooks/constants';
import { useStore } from '../hooks/useStore'
import { LanguageSelector } from './LanguageSelector';
import { SectionType } from './types.d';

function App() {
    const { fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage } = useStore();

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
                    <button className="rounded-md  px-3.5 py-2.5 text-sm font-semibold t hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
                        <i className="fas fa-exchange-alt"></i>
                    </button>
                </div>

                <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
            </div>

            <div className="flex flex-row mt-5">
                <div className="basis-1/2">
                    <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='Introducir texto' autoFocus
                        defaultValue={''}
                    /></div>
                <div className="basis-1/2">
                    <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                    /></div>
            </div>
        </div>
    )
}

export default App