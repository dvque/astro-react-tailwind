import { OpenAI } from "openai";

import { SUPPORTED_LANGUAGES } from '../hooks/constants';
import type { FromLanguage, Language } from '../components/types.d';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export async function translate({ fromLanguage, toLanguage, text }: {
    fromLanguage: FromLanguage,
    toLanguage: Language,
    text: string
}) {
    const message = [
        {
            role: 'system',
            content: 'You are a AI that trasnlates text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `{{`. You can also receive {{auto}} which means that toy have to detect the language. The language you translate to is surrounded by `[[` and `]]`.'
        }
    ]
}