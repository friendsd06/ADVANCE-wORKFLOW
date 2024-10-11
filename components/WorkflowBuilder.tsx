import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Undo2, Redo2 } from 'lucide-react';
import WorkflowStep from './WorkflowStep';
import { Step } from './WorkflowDashboard';

interface WorkflowBuilderProps {
  workflowId: string;
  workflowName: string;
  steps: Step[];
  updateSteps: (newSteps: Step[]) => void;
}

export default function WorkflowBuilder({ workflowId, workflowName, steps, updateSteps }: WorkflowBuilderProps) {
  const [history, setHistory] = useState<Step[][]>([steps]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const addToHistory = useCallback((newSteps: Step[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newSteps);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const addStep = useCallback(() => {
    const newStep: Step = {
      id: `step-${Date.now()}`,
      type: 'action',
      actionType: 'default',
      action: '',
      description: '',
    };
    const newSteps = [...steps, newStep];
    updateSteps(newSteps);
    addToHistory(newSteps);
  }, [steps, updateSteps, addToHistory]);

  const updateStep = useCallback((updatedStep: Step) => {
    const newSteps = steps.map(step => step.id === updatedStep.id ? updatedStep : step);
    updateSteps(newSteps);
    addToHistory(newSteps);
  }, [steps, updateSteps, addToHistory]);

  const removeStep = useCallback((stepId: string) => {
    const newSteps = steps.filter(step => step.id !== stepId);
    updateSteps(newSteps);
    addToHistory(newSteps);
  }, [steps, updateSteps, addToHistory]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      updateSteps(history[historyIndex - 1]);
    }
  }, [historyIndex, history, updateSteps]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      updateSteps(history[historyIndex + 1]);
    }
  }, [historyIndex, history, updateSteps]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-2 text-foreground">{workflowName}</h2>
        <div className="flex space-x-2">
          <Button onClick={undo} disabled={historyIndex <= 0} size="sm" variant="outline">
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button onClick={redo} disabled={historyIndex >= history.length - 1} size="sm" variant="outline">
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {steps.map((step, index) => (
        <WorkflowStep
          key={step.id}
          {...step}
          updateStep={updateStep}
          removeStep={removeStep}
          moveStep={(dragIndex, hoverIndex) => {
            const newSteps = [...steps];
            const [reorderedStep] = newSteps.splice(dragIndex, 1);
            newSteps.splice(hoverIndex, 0, reorderedStep);
            updateSteps(newSteps);
            addToHistory(newSteps);
          }}
          index={index}
        />
      ))}
      <Button onClick={addStep} className="mt-2">
        <Plus className="h-4 w-4 mr-1" /> Add Step
      </Button>
    </div>
  );
}