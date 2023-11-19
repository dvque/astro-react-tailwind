import { OpenAI } from "openai";

import { SUPPORTED_LANGUAGES } from '../hooks/constants';
import type { FromLanguage, Language } from '../components/types.d';

// OpenAI API
const openai = new OpenAI({
    apiKey: import.meta.env.PUBLIC_POKEAPI, dangerouslyAllowBrowser: true
});

export async function translate({ fromLanguage, toLanguage, text }: {
    fromLanguage: FromLanguage,
    toLanguage: Language,
    text: string
}) {

    // If the language is the same, return the text
    if (fromLanguage === toLanguage) return text;

    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage];
    const toCode = SUPPORTED_LANGUAGES[toLanguage];

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'You are a AI that trasnlates text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `{{`. You can also receive {{auto}} which means that toy have to detect the language. The language you translate to is surrounded by `[[` and `]]`.'
            },
            {
                role: 'user',
                content: `Hola mundo {{Español}} [[English]]`
            },
            {
                role: 'assistant',
                content: `Hello world`
            },
            {
                role: 'user',
                content: `How are you? {{auto}} [[Deutsch]]`
            },
            {
                role: 'assistant',
                content: `Wie geht es dir?`
            },
            {
                role: 'user',
                content: `Bon dia, com estas? {{auto}} [[Español]]`
            },
            {
                role: 'assistant',
                content: `Buenos días, ¿cómo estás?`
            },
            {
                role: 'user',
                content: `${text} {{${fromCode}}} [[${toCode}]}`
            }
        ]
    })

    return completion.choices[0]?.message?.content
}