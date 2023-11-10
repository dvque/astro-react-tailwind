import { useStore } from '../hooks/useStore'

function App() {
    const { fromLanguage, setFromLanguage } = useStore();

    return (
        <div className="App">
            <h1>Google Translate</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => { setFromLanguage('es') }}>
                Cambiar a Español
            </button>
            {fromLanguage}
        </div>
    )
}

export default App