import React from 'react';
import { createRoot } from 'react-dom/client';

// Helper do konwersji tree descriptor na createElement calls
function renderTree(tree) {
  if (typeof tree === 'string' || typeof tree === 'number') {
    return tree;
  }
  if (Array.isArray(tree)) {
    return tree.map(renderTree);
  }
  if (tree && typeof tree === 'object' && tree.type) {
    const { type, props = {}, children = [], key } = tree;
    const reactChildren = Array.isArray(children) ? children.map(renderTree) : renderTree(children);
    return React.createElement(type, { ...props, key }, ...reactChildren);
  }
  return null;
}

export default function wrapper(ComponentOrDescriptor) {
  return (targetDiv) => {
    const root = createRoot(targetDiv);
    return {
      render: (props) => {
        // Jeśli ComponentOrDescriptor jest funkcją, wywołaj ją i renderuj wynik
        const tree = typeof ComponentOrDescriptor === 'function' ? ComponentOrDescriptor(props) : ComponentOrDescriptor;
        root.render(renderTree(tree));
      },
      destroy: () => {
        root.unmount();
      },
    };
  };
}