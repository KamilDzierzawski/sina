import React, { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';

export default function (Node: ComponentType<any>) {
  return (targetDiv: Element) => {
    const root = createRoot(targetDiv);
    return {
      render: (props?: any) => {
        root.render(<Node {...props} />);
      },
      destroy: () => {
        root.unmount();
      },
    };
  };
}