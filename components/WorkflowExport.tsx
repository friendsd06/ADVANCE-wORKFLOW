import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Workflow } from './WorkflowDashboard';

interface WorkflowExportProps {
  workflows: Workflow[];
}

export default function WorkflowExport({ workflows }: WorkflowExportProps) {
  const exportWorkflows = () => {
    const dataStr = JSON.stringify(workflows, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'workflows.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <Button onClick={exportWorkflows} variant="outline">
      <Download className="h-4 w-4 mr-1" /> Export
    </Button>
  );
}