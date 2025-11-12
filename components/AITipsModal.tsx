import React from 'react';

interface AITipsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tips: string;
  isLoading: boolean;
}

const AITipsModal: React.FC<AITipsModalProps> = ({ isOpen, onClose, tips, isLoading }) => {
  if (!isOpen) return null;

  const formattedTips = (text: string): string => {
    if (!text) return '';

    const lines = text.split('\n');
    let html = '';
    let inList = false;

    lines.forEach(line => {
      let processedLine = line;

      // Skip empty lines for cleaner output
      if (processedLine.trim() === '') return;

      // Headers - check for this first
      let isHeader = false;
      if (processedLine.startsWith('### ')) {
        processedLine = `<h3>${processedLine.substring(4)}</h3>`;
        isHeader = true;
      } else if (processedLine.startsWith('## ')) {
        processedLine = `<h2>${processedLine.substring(3)}</h2>`;
        isHeader = true;
      } else if (processedLine.startsWith('# ')) {
        processedLine = `<h1>${processedLine.substring(2)}</h1>`;
        isHeader = true;
      }

      // Bold text - can be on any line
      processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // List items
      const isListItem = line.trim().startsWith('* ') || line.trim().startsWith('- ');
      if (isListItem) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        // Use original line and substring(2) to avoid processing bold tags again as list markers
        html += `<li>${line.trim().substring(2)}</li>`;
      } else {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        if (isHeader) {
            html += processedLine;
        } else {
            html += `<p>${processedLine}</p>`;
        }
      }
    });

    if (inList) {
      html += '</ul>';
    }

    // This is a safeguard against unterminated bold tags causing issues.
    return html.replace(/\*\*/g, '');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-11/12 max-w-2xl max-h-[80vh] overflow-y-auto p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-3xl leading-none">&times;</button>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Gemini's Study Plan</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: formattedTips(tips) }} />

        )}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITipsModal;