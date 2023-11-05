import type { State } from './types.d'

// 1. Create a initialState
const initialState: State = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
}

// 2. Create a reducer
function reducer(state: State, action) {
    const { type, payload } = action

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
            fromLanguage: payload
        }
    }

    if (type === 'SET_TO_LANGUAGE') {
        return {
            ...state,
            toLanguage: payload
        }
    }

    if (type === 'SET_FROM_TEXT') {
        return {
            ...state,
            loading: true,
            fromText: payload,
            result: ''
        }
    }

    if (type === 'SET_RESULT') {
        return {
            ...state,
            loading: false,
            result: payload
        }
    }

    return state
}

function App() {
    // 3. Usar el hook reducer
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <div className="App">
            <h1>Google Translate</h1>
        </div>
    )
}

export default App