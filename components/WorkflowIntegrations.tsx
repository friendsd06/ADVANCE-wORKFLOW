import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Workflow } from './WorkflowDashboard';
import { Layers } from 'lucide-react';

interface WorkflowIntegrationsProps {
  workflow: Workflow;
  updateWorkflow: (updatedWorkflow: Workflow) => void;
}

export default function WorkflowIntegrations({ workflow, updateWorkflow }: WorkflowIntegrationsProps) {
  const [newIntegration, setNewIntegration] = useState('');

  const addIntegration = () => {
    if (newIntegration) {
      updateWorkflow({
        ...workflow,
        integrations: [...(workflow.integrations || []), newIntegration]
      });
      setNewIntegration('');
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Layers className="mr-2" /> Workflow Integrations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-2">
          <Input
            value={newIntegration}
            onChange={(e) => setNewIntegration(e.target.value)}
            placeholder="Enter integration name"
          />
          <Button onClick={addIntegration}>Add</Button>
        </div>
        <ul className="list-disc pl-5">
          {workflow.integrations?.map((integration, index) => (
            <li key={index}>{integration}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}