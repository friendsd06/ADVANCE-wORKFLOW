import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Workflow } from './WorkflowDashboard';
import { Clock } from 'lucide-react';

interface WorkflowSchedulerProps {
  workflow: Workflow;
  updateWorkflow: (updatedWorkflow: Workflow) => void;
}

export default function WorkflowScheduler({ workflow, updateWorkflow }: WorkflowSchedulerProps) {
  const [schedule, setSchedule] = useState(workflow.schedule || '');

  const saveSchedule = () => {
    updateWorkflow({ ...workflow, schedule });
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2" /> Workflow Scheduler
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          placeholder="Enter cron schedule (e.g., 0 0 * * *)"
          className="mb-2"
        />
        <Button onClick={saveSchedule}>Save Schedule</Button>
      </CardContent>
    </Card>
  );
}