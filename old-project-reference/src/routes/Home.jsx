import React, { useEffect, useState } from 'react';
import JSXRenderer from '../components/JSXRenderer';
import TextEditor from '../components/TextEditor';
import components from '../design-systems/material-ui';

const Home = () => {
    const [code, setCode] = useState('<div><p>Test</p></div>');

    return (
        <>
            <JSXRenderer
                code={code}
                components={components}
            />
            <TextEditor
                defaultLanguage="javascript"
                defaultValue={code}
                onChange={setCode}
                // formatOnType
                // theme="vs-dark"
            />
        </>
    );
};

export default Home;
