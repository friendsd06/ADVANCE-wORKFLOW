import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Workflow } from './WorkflowDashboard';

interface WorkflowVersioningProps {
  workflow: Workflow;
  setWorkflows: React.Dispatch<React.SetStateAction<Workflow[]>>;
}

export default function WorkflowVersioning({ workflow, setWorkflows }: WorkflowVersioningProps) {
  const createNewVersion = () => {
    const newVersion: Workflow = {
      ...workflow,
      id: `${workflow.id}-v${workflow.version + 1}`,
      version: workflow.version + 1,
      updatedAt: new Date()
    };
    setWorkflows(prevWorkflows => [...prevWorkflows, newVersion]);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Version Control</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Current Version: {workflow.version}</p>
        <p>Last Updated: {workflow.updatedAt.toLocaleString()}</p>
        <Button onClick={createNewVersion} className="mt-2">Create New Version</Button>
      </CardContent>
    </Card>
  );
}