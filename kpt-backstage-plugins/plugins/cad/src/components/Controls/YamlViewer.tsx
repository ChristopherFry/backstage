import Editor, { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import React from 'react';

type YamlViewerProps = {
  height?: string;
  width?: string;
  value: string;
  allowEdit?: boolean;
  onUpdatedValue?: (newValue: string) => void;
};

export const YamlViewer = ({
  height,
  width,
  value,
  allowEdit,
  onUpdatedValue,
}: YamlViewerProps) => {
  loader.config({ monaco });

  const handleUpdatedValue = (yaml?: string): void => {
    if (onUpdatedValue && yaml) {
      onUpdatedValue(yaml);
    }
  };

  return (
    <Editor
      height={height}
      width={width}
      language="yaml"
      value={value}
      onChange={handleUpdatedValue}
      options={{
        minimap: { enabled: false },
        readOnly: !allowEdit,
        scrollBeyondLastLine: false,
      }}
    />
  );
};
