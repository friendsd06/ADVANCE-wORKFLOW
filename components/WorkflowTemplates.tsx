import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Workflow } from './WorkflowDashboard';
import { FileText } from 'lucide-react';

interface WorkflowTemplatesProps {
  addWorkflow: (workflow: Workflow) => void;
}

const templates: Partial<Workflow>[] = [
  {
    name: 'Basic Workflow',
    steps: [
      { id: 'step1', type: 'action', actionType: 'default', action: 'Start', description: 'Start the workflow' },
      { id: 'step2', type: 'action', actionType: 'default', action: 'Process', description: 'Process data' },
      { id: 'step3', type: 'action', actionType: 'default', action: 'End', description: 'End the workflow' },
    ],
  },
  {
    name: 'Conditional Workflow',
    steps: [
      { id: 'step1', type: 'action', actionType: 'default', action: 'Start', description: 'Start the workflow' },
      { id: 'step2', type: 'condition', conditions: ['condition1'], operator: 'AND', description: 'Check condition' },
      { id: 'step3', type: 'action', actionType: 'default', action: 'Process A', description: 'Process if condition is true' },
      { id: 'step4', type: 'action', actionType: 'default', action: 'Process B', description: 'Process if condition is false' },
      { id: 'step5', type: 'action', actionType: 'default', action: 'End', description: 'End the workflow' },
    ],
  },
];

export default function WorkflowTemplates({ addWorkflow }: WorkflowTemplatesProps) {
  const createFromTemplate = (template: Partial<Workflow>) => {
    const newWorkflow: Workflow = {
      id: `workflow-${Date.now()}`,
      name: template.name || 'New Workflow',
      steps: template.steps || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    };
    addWorkflow(newWorkflow);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2" /> Workflow Templates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{template.steps?.length} steps</p>
                <Button onClick={() => createFromTemplate(template)} className="mt-2">
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}