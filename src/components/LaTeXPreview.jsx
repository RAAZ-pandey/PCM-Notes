import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export const LaTeXPreview = ({ content }) => {
  const renderContent = (text) => {
    if (!text) {
      return <p className="text-gray-500 italic">No content to preview</p>;
    }

    const lines = text.split('\n');
    const renderedLines = [];

    lines.forEach((line, lineIndex) => {
      if (line.trim() === '') {
        renderedLines.push(<br key={`br-${lineIndex}`} />);
        return;
      }

      const blockMatches = line.match(/\$\$(.*?)\$\$/g);
      if (blockMatches) {
        blockMatches.forEach((match) => {
          const equation = match.replace(/^\$\$|\$\$$/g, '');
          try {
            renderedLines.push(
              <div key={`block-${lineIndex}-${equation}`} className="my-4 text-center">
                <BlockMath math={equation} />
              </div>
            );
          } catch (error) {
            renderedLines.push(
              <div
                key={`block-error-${lineIndex}`}
                className="my-4 p-2 bg-red-50 border border-red-200 rounded text-red-700"
              >
                Error rendering equation: {equation}
              </div>
            );
          }
        });
        return;
      }

      const parts = line.split(/(\$[^$]+\$)/);
      const lineContent = [];

      parts.forEach((part, partIndex) => {
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const equation = part.slice(1, -1);
          try {
            lineContent.push(
              <InlineMath key={`inline-${lineIndex}-${partIndex}`} math={equation} />
            );
          } catch (error) {
            lineContent.push(
              <span
                key={`inline-error-${lineIndex}-${partIndex}`}
                className="bg-red-50 text-red-700 px-1 rounded"
              >
                Error: {equation}
              </span>
            );
          }
        } else if (part.trim()) {
          lineContent.push(
            <span key={`text-${lineIndex}-${partIndex}`}>{part}</span>
          );
        }
      });

      if (lineContent.length > 0) {
        renderedLines.push(
          <p key={`line-${lineIndex}`} className="mb-2">
            {lineContent}
          </p>
        );
      }
    });

    return <div className="prose max-w-none">{renderedLines}</div>;
  };

  return (
    <div className="min-h-[400px] p-4 bg-white rounded border">
      <div className="text-lg leading-relaxed">
        {renderContent(content)}
      </div>
    </div>
  );
};
