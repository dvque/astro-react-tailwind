import { useReducer } from 'react'
import type { State, Action } from './types.d'

// 1. Create a initialState https://docs.astro.build/en/core-concepts/framework-components/#using-framework-components
const initialState: State = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
}

// 2. Create a reducer https://docs.astro.build/en/guides/typescript/
function reducer(state: State, action: Action) {
    const { type } = action

    if (type === 'INTERCHANGE_LANGUAGES') {
        return {
            ...state,
            fromLanguage: state.toLanguage,
            toLanguage: state.fromLanguage
        }
    }

    if (type === 'SET_FROM_LANGUAGE') {
        return {
            ...state,
            fromLanguage: action.payload
        }
    }

    if (type === 'SET_TO_LANGUAGE') {
        return {
            ...state,
            toLanguage: action.payload
        }
    }

    if (type === 'SET_FROM_TEXT') {
        return {
            ...state,
            loading: true,
            fromText: action.payload,
            result: ''
        }
    }

    if (type === 'SET_RESULT') {
        return {
            ...state,
            loading: false,
            result: action.payload
        }
    }

    return state
}

function App() {
    // 3. Usar el hook reducer
    const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] = useReducer(reducer, initialState)

    return (
        <div className="App">
            <h1>Google Translate</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => {
                    dispatch({ type: 'SET_FROM_LANGUAGE', payload: 'es' })
                }}>
                Cambiar a Español
            </button>
            {fromLanguage}
        </div>
    )
}

export default App