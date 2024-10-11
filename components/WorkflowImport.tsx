import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Workflow } from './WorkflowDashboard';

interface WorkflowImportProps {
  setWorkflows: React.Dispatch<React.SetStateAction<Workflow[]>>;
}

export default function WorkflowImport({ setWorkflows }: WorkflowImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedWorkflows = JSON.parse(e.target?.result as string);
          setWorkflows(prevWorkflows => [...prevWorkflows, ...importedWorkflows]);
        } catch (error) {
          console.error('Error parsing imported workflows:', error);
          // You might want to show an error message to the user here
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImport}
        accept=".json"
      />
      <Button onClick={() => fileInputRef.current?.click()} variant="outline">
        <Upload className="h-4 w-4 mr-1" /> Import
      </Button>
    </>
  );
}