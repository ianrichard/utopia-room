import prettier from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';

export function usePrettier() {
    const format = async (code: string) => {
        try {
            return await prettier.format(code, {
                parser: 'babel',
                plugins: [parserBabel, parserEstree],
                singleQuote: true,
                trailingComma: 'es5',
            });
        } catch (e) {
            console.error('Formatting failed:', e);
            return code; // Return original code on failure
        }
    };

    return { format };
}
