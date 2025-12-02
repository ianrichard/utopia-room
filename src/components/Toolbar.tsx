import { useState } from 'react';

interface ToolbarProps {
    onFormat: () => void;
    onReset: () => void;
    onTemplate: (template: string) => void;
}

const TEMPLATES = {
    Counter: `function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <button 
        onClick={() => setCount(c => c + 1)}
        className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg text-xl font-bold hover:bg-blue-700 transition-all"
      >
        Count: {count}
      </button>
    </div>
  );
}`,
    Gradient: `function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="p-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
        <h1 className="text-5xl font-black text-white tracking-tight">
          Glassmorphism
        </h1>
      </div>
    </div>
  );
}`,
    List: `function App() {
  const [items, setItems] = React.useState(['Learn React', 'Build Utopia', 'Profit']);
  
  return (
    <div className="min-h-screen bg-gray-100 p-10 font-sans">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Todo List</h2>
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}`
};

export function Toolbar({ onFormat, onReset, onTemplate }: ToolbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2 p-1.5 bg-gray-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl transition-all hover:scale-105">

            <button
                onClick={onFormat}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors tooltip-trigger"
                title="Format Code"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            <div className="w-px h-4 bg-white/20 mx-1" />

            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors flex items-center gap-1"
                >
                    Templates
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
                        <div className="absolute bottom-full left-0 mb-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden z-10 animate-in fade-in slide-in-from-bottom-2">
                            {Object.entries(TEMPLATES).map(([name, code]) => (
                                <button
                                    key={name}
                                    onClick={() => {
                                        onTemplate(code);
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors border-b border-gray-700/50 last:border-0"
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="w-px h-4 bg-white/20 mx-1" />

            <button
                onClick={onReset}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                title="Reset"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>

        </div>
    );
}
