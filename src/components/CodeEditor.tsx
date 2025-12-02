import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    code: string;
    onChange: (value: string | undefined) => void;
}

export function CodeEditor({ code, onChange }: CodeEditorProps) {
    return (
        <div className="h-full w-full">
            <Editor
                height="100%"
                defaultLanguage="javascript"
                language="javascript"
                theme="vs-dark"
                value={code}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
}
