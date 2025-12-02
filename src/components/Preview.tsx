import { useEffect, useRef, useState } from 'react';
import * as Babel from '@babel/standalone';

interface PreviewProps {
    code: string;
}

const IFRAME_CODE = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
        #root { padding: 1rem; }
        /* Custom scrollbar for webkit */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    </style>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        window.onerror = function(message, source, lineno, colno, error) {
            window.parent.postMessage({ type: 'ERROR', message: message }, '*');
        };
    </script>
</head>
<body>
    <div id="root"></div>
    <script>
        window.addEventListener('message', (event) => {
            if (event.data.type === 'UPDATE_CODE') {
                const { code } = event.data;
                const rootEl = document.getElementById('root');
                
                try {
                    // Reset root if needed, but React 18 createRoot handles updates well.
                    // However, to fully reset state, we might want to unmount.
                    // For this demo, we'll just try to execute.
                    
                    // We wrap the code in a function to avoid global scope pollution
                    // and allow return values.
                    const run = new Function('React', 'ReactDOM', 'rootEl', code);
                    
                    // We need to handle the rendering logic inside the user code 
                    // OR provide a standard way to render.
                    // Let's inject a helper to render.
                    
                    // Actually, let's just eval the code. The code is expected to:
                    // 1. Define a component
                    // 2. Render it to #root OR export it.
                    
                    // Simplest contract: User writes a component named 'App' or 'Default'.
                    // We render it.
                    
                    // Clear previous content?
                    // rootEl.innerHTML = ''; 
                    // No, let React handle it if possible.
                    
                    // Execute the compiled code
                    // We append it as a script tag to ensure it executes in the global scope of the iframe
                    // but that makes it hard to update.
                    
                    // Better: eval it.
                    // But we need to capture the component.
                    
                    // Let's use a convention: The code MUST render to the root or define App.
                    
                    // Let's try to find 'App' after execution.
                    
                    // Clean up previous execution artifacts if possible? Hard in JS.
                    
                    // Execute
                    eval(code);
                    
                    // Try to find App
                    if (typeof App !== 'undefined') {
                         const root = ReactDOM.createRoot(rootEl);
                         root.render(React.createElement(App));
                         window.parent.postMessage({ type: 'SUCCESS' }, '*');
                    } else {
                        // Maybe they rendered it themselves?
                        // If root is empty, warn.
                        if (!rootEl.hasChildNodes()) {
                             throw new Error("No 'App' component defined and nothing rendered to #root.");
                        }
                        window.parent.postMessage({ type: 'SUCCESS' }, '*');
                    }
                    
                } catch (e) {
                    window.parent.postMessage({ type: 'ERROR', message: e.message }, '*');
                }
            }
        });
    </script>
</body>
</html>
`;

export function Preview({ code }: PreviewProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [error, setError] = useState<string | null>(null);

    // Initial render of the iframe shell
    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.srcdoc = IFRAME_CODE;
        }
    }, []);

    // Handle code updates
    useEffect(() => {
        const updatePreview = () => {
            if (!iframeRef.current?.contentWindow) return;

            try {
                // Compile JSX
                const compiled = Babel.transform(code, {
                    presets: ['react'],
                }).code;

                // Send to iframe
                iframeRef.current.contentWindow.postMessage(
                    { type: 'UPDATE_CODE', code: compiled },
                    '*'
                );

                // Optimistically clear error (iframe will report back if runtime error)
                setError(null);
            } catch (err) {
                setError((err as Error).message);
            }
        };

        const timeout = setTimeout(updatePreview, 600); // Debounce
        return () => clearTimeout(timeout);
    }, [code]);

    // Listen for messages from iframe
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'ERROR') {
                setError(event.data.message);
            } else if (event.data.type === 'SUCCESS') {
                setError(null);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div className="h-full w-full bg-white relative group">
            {/* Error Overlay */}
            {error && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 max-w-lg w-full px-4 animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="bg-red-50/90 backdrop-blur-md border border-red-200 text-red-800 px-4 py-3 rounded-xl shadow-lg flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div className="text-sm font-medium">{error}</div>
                    </div>
                </div>
            )}

            <iframe
                ref={iframeRef}
                title="preview"
                className="w-full h-full border-none bg-white"
                sandbox="allow-scripts allow-same-origin"
            />
        </div>
    );
}
