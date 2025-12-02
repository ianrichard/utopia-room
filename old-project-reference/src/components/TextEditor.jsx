import Editor from '@monaco-editor/react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import React, { useRef } from 'react';

import './TextEditor.scss';

const TextEditor = (props) => {
    const ref = useRef();

    return (
        <div className="text-editor">
            <div className="text-editor__toolbar">
                <button
                    onClick={() => {
                        ref?.current
                            ?.getAction('editor.action.formatDocument')
                            .run();
                    }}
                    type="button"
                >
                    <FormatAlignLeftIcon /> Format
                </button>
            </div>
            <Editor
                className="text-editor__monaco"
                onMount={(editor) => (ref.current = editor)}
                {...props}
            />
        </div>
    );
};

export default TextEditor;
