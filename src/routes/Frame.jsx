import React, { useEffect, useState } from 'react';
import JSXRenderer from '../components/JSXRenderer';
import TextEditor from '../components/TextEditor';
import components from '../design-systems/material-ui';

import renderApp from './renderApp';

const Frame = () => {
    const [code, setCode] = useState('<div><p>Test dude</p></div>');

    window.addEventListener('message', (message) => {
        const updatedCode = message?.data?.code;
        if (updatedCode) {
            setCode(updatedCode);
        }
    });

    return (
        <>
            <JSXRenderer
                code={code}
                components={components}
            />
        </>
    );
};

export default renderApp(Frame, 'frame');
