import React, { ComponentType } from 'react';
import { createRoot, Root } from 'react-dom/client';

export default function (Node: ComponentType<any>) {
  return (targetDiv: Element) => {
    let root: Root | null = null;
    
    return {
      render: (props?: any) => {
        if (!root) {
          root = createRoot(targetDiv);
        }
        root.render(<Node {...props} />);
      },
      destroy: () => {
        if (root) {
          root.unmount();
          root = null;
        }
      },
    };
  };
}