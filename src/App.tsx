import { useState, useEffect } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { Preview } from './components/Preview';
import { Toolbar } from './components/Toolbar';
import { usePrettier } from './hooks/usePrettier';

const DEFAULT_CODE = `function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          Utopia Room
        </h1>
        <p className="text-gray-600 mb-6">
          Edit the code below to see live updates!
        </p>
        
        <div className="p-4 bg-gray-100 rounded-lg mb-6">
          <p className="text-2xl font-mono font-bold text-gray-800">
            {count}
          </p>
        </div>

        <button 
          onClick={() => setCount(c => c + 1)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
        >
          Increment Counter
        </button>
      </div>
    </div>
  );
}`;

const STORAGE_KEY = 'utopia-code';

function App() {
  const [code, setCode] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_CODE;
  });

  const { format } = usePrettier();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, code);
  }, [code]);

  const handleFormat = async () => {
    const formatted = await format(code);
    setCode(formatted);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-900">
      {/* Top Half: Preview */}
      <div className="h-1/2 w-full border-b border-gray-700 relative group">
        <div className="absolute top-3 left-3 z-10 bg-black/50 text-white/70 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Preview
        </div>

        <Preview code={code} />

        {/* Floating Toolbar in the middle/bottom of preview or top of editor? 
            Let's put it floating at the bottom of the preview for easy access. */}
        <Toolbar
          onFormat={handleFormat}
          onReset={() => setCode(DEFAULT_CODE)}
          onTemplate={setCode}
        />
      </div>

      {/* Bottom Half: Editor */}
      <div className="h-1/2 w-full relative group">
        <div className="absolute top-3 right-4 z-10 bg-black/50 text-white/70 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded backdrop-blur-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          Editor
        </div>
        <CodeEditor
          code={code}
          onChange={(value) => setCode(value || '')}
        />
      </div>
    </div>
  );
}

export default App;
