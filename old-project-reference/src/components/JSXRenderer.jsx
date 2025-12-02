import React, { useState } from 'react';
import {transform} from '@babel/standalone';
import scopeEval from 'scope-eval';
import { useEffect } from 'react';

import './JSXRenderer.scss';

const JSXRenderer = ({code = '', components = {}}) => {
    const [successfulRender, setSuccessfulRender] = useState(<p>Loading...</p>);
    const [invalidState, setInvalidState] = useState(false);

    useEffect(() => {
        try {
            const jsxToJavaScriptString = transform(`<>${code}</>`, {
                presets: ['react']
            }).code;
        
            const renderedReactCode = scopeEval(jsxToJavaScriptString, {
                React,
                ...components    
            });
    
            if (renderedReactCode) {
                setSuccessfulRender(renderedReactCode);
                setInvalidState(false);
            }
        } catch {
            setInvalidState(true);
        }    
    }, [code]);

    return (<>
        {successfulRender}
        {invalidState && <p className="jsx-renderer__error">Invalid syntax</p>}
    </>);
};

export default JSXRenderer;