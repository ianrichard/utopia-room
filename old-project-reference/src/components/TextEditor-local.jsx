import Editor from '@monaco-editor/react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import './TextEditor.scss';

const TextEditor = ({onChange}) => {
    const [monacoEditor, setMonacoEditor] = useState(monaco.editor.IStandaloneCodeEditor);
    const monacoRef = useRef();

    useEffect(() => {
		if (monacoRef && !monacoEditor) {
			setMonacoEditor(
				monaco.editor.create(monacoRef.current, {
					value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
					language: 'typescript',

				})
			);
		}

		return () => monacoEditor?.dispose();
	}, []);

    useEffect(() => {
        if (monacoEditor) {
            monacoEditor.onDidChangeModelContent(function (e) {
                onChange(monacoEditor.getValue());
            });
        }
    }, monacoEditor);


    return (
        <div className="text-editor">
            <div className="text-editor__toolbar">
                <button
                    onClick={() => {
                        monacoEditor
                            ?.getAction('editor.action.formatDocument')
                            .run();
                    }}
                    type="button"
                >
                    <FormatAlignLeftIcon /> Format
                </button>
            </div>
            <div
                className="text-editor__monaco"
                ref={monacoRef}
            />
        </div>
    );
};

export default TextEditor;
