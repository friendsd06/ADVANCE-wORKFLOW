import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, X, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Step, Operator } from './WorkflowDashboard';

interface WorkflowStepProps extends Step {
  updateStep: (step: Step) => void;
  removeStep: (id: string) => void;
  moveStep: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

const operators: Operator[] = [
  'AND', 'OR', 'XOR', 'NAND', 'NOR', 'XNOR', 'IMPLIES', 'NOT',
  'EQUALS', 'NOT_EQUALS', 'GREATER_THAN', 'LESS_THAN', 'GREATER_THAN_OR_EQUAL',
  'LESS_THAN_OR_EQUAL', 'CONTAINS', 'NOT_CONTAINS', 'STARTS_WITH', 'ENDS_WITH',
  'IS_NULL', 'IS_NOT_NULL', 'IN', 'NOT_IN', 'MATCHES_REGEX', 'NOT_MATCHES_REGEX',
  'IS_EMPTY', 'IS_NOT_EMPTY', 'HAS_LENGTH', 'TYPE_OF', 'INSTANCE_OF',
  'IS_TRUTHY', 'IS_FALSY', 'BIT_AND', 'BIT_OR', 'BIT_XOR'
];

export default function WorkflowStep(props: WorkflowStepProps) {
  const {
    id,
    type,
    actionType,
    action,
    conditions,
    operator,
    description,
    comment,
    loopCondition,
    switchCases,
    parallelBranches,
    updateStep,
    removeStep,
    moveStep,
    index
  } = props;

  const [showComment, setShowComment] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'workflowStep',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveStep(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'workflowStep',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  const addSwitchCase = () => {
    const newCases = [...(switchCases || []), { case: `Case ${(switchCases?.length || 0) + 1}`, steps: [] }];
    updateStep({ ...props, switchCases: newCases });
  };

  const addParallelBranch = () => {
    const newBranches = [...(parallelBranches || []), []];
    updateStep({ ...props, parallelBranches: newBranches });
  };

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <Card className="workflow-step bg-card text-card-foreground hover:shadow-md transition-shadow duration-200 mb-1">
        <CardContent className="p-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-0 h-6 w-6"
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              <Select
                value={type}
                onValueChange={(value) => updateStep({ ...props, type: value as Step['type'] })}
              >
                <SelectTrigger className="w-[120px] compact-select">
                  <SelectValue placeholder="Step Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="condition">Condition</SelectItem>
                  <SelectItem value="loop">Loop</SelectItem>
                  <SelectItem value="switch">Switch</SelectItem>
                  <SelectItem value="parallel">Parallel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeStep(id)} className="p-0 h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
          {isExpanded && (
            <>
              {type === 'action' && (
                <>
                  <Input
                    value={actionType}
                    onChange={(e) => updateStep({ ...props, actionType: e.target.value })}
                    placeholder="Action Type"
                    className="mb-1 compact-input"
                  />
                  <Input
                    value={action}
                    onChange={(e) => updateStep({ ...props, action: e.target.value })}
                    placeholder="Action"
                    className="mb-1 compact-input"
                  />
                </>
              )}
              {type === 'condition' && (
                <>
                  <Input
                    value={conditions?.join(', ')}
                    onChange={(e) => updateStep({ ...props, conditions: e.target.value.split(',').map(c => c.trim()) })}
                    placeholder="Conditions (comma-separated)"
                    className="mb-1 compact-input"
                  />
                  <Select
                    value={operator}
                    onValueChange={(value) => updateStep({ ...props, operator: value as Operator })}
                  >
                    <SelectTrigger className="w-full compact-select">
                      <SelectValue placeholder="Operator" />
                    </SelectTrigger>
                    <SelectContent>
                      {operators.map((op) => (
                        <SelectItem key={op} value={op}>{op}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
              {type === 'loop' && (
                <Input
                  value={loopCondition}
                  onChange={(e) => updateStep({ ...props, loopCondition: e.target.value })}
                  placeholder="Loop Condition"
                  className="mb-1 compact-input"
                />
              )}
              {type === 'switch' && (
                <div className="mb-1">
                  <Button onClick={addSwitchCase} size="sm" variant="outline" className="mb-1">
                    <Plus className="h-4 w-4 mr-1" /> Add Case
                  </Button>
                  {switchCases?.map((caseItem, caseIndex) => (
                    <div key={caseIndex} className="ml-2 mb-1">
                      <Input
                        value={caseItem.case}
                        onChange={(e) => {
                          const newCases = [...(switchCases || [])];
                          newCases[caseIndex].case = e.target.value;
                          updateStep({ ...props, switchCases: newCases });
                        }}
                        placeholder={`Case ${caseIndex + 1}`}
                        className="compact-input"
                      />
                    </div>
                  ))}
                </div>
              )}
              {type === 'parallel' && (
                <div className="mb-1">
                  <Button onClick={addParallelBranch} size="sm" variant="outline" className="mb-1">
                    <Plus className="h-4 w-4 mr-1" /> Add Branch
                  </Button>
                  <div className="text-sm text-gray-500">
                    {parallelBranches?.length || 0} parallel branches
                  </div>
                </div>
              )}
              <Input
                value={description}
                onChange={(e) => updateStep({ ...props, description: e.target.value })}
                placeholder="Description"
                className="mt-1 compact-input"
              />
              <div className="mt-1 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComment(!showComment)}
                  className="p-0 h-6 w-6"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
              {showComment && (
                <Textarea
                  value={comment}
                  onChange={(e) => updateStep({ ...props, comment: e.target.value })}
                  placeholder="Add a comment..."
                  className="mt-1 text-xs"
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}