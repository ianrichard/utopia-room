import React, { useEffect, useState } from 'react';
import JSXRenderer from '../components/JSXRenderer';
import TextEditor from '../components/TextEditor';
import Frame from '../components/Frame';

import renderApp from './renderApp';

import patterns from '../snippets/patterns';

const Home = () => {
    const updateFrames = (code) => {
        const frames = window.frames;
        
        [...Array(frames.length).keys()].forEach((index) => {
            frames[index].postMessage({code});
        });
    }

    // useEffect(() => {
    //     updateFrames(patterns);
    // }, []);

    return (
        <>
            <TextEditor
                defaultLanguage="javascript"
                defaultValue={patterns}
                onChange={updateFrames}
                // formatOnType
                // theme="vs-dark"
            />
            <Frame.Group>
                <Frame src="./frame/" size="mobile" />
                <Frame src="./frame/" size="desktop" />
            </Frame.Group>
        </>
    );
};

export default renderApp(Home, 'home');
