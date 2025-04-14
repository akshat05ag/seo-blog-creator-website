
import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface StepsProps {
  currentStep: number;
  className?: string;
  children: React.ReactNode;
}

interface StepProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
  step?: number;
}

export function Steps({ currentStep, className, children }: StepsProps) {
  const childrenArray = React.Children.toArray(children);
  const steps = childrenArray.map((step, index) => {
    const isActive = currentStep === index;
    const isCompleted = currentStep > index;
    
    return React.cloneElement(step as React.ReactElement<StepProps>, {
      isActive,
      isCompleted,
      step: index + 1,
    });
  });

  return (
    <div className={cn("flex justify-between", className)}>
      {steps}
    </div>
  );
}

export function Step({
  title,
  description,
  icon,
  isActive,
  isCompleted,
  step,
}: StepProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center relative">
        {step !== 1 && (
          <div
            className={cn(
              "absolute right-full w-full h-0.5 -mr-2",
              isCompleted ? "bg-primary" : "bg-muted"
            )}
          />
        )}
        <div
          className={cn(
            "relative flex items-center justify-center border-2 rounded-full w-10 h-10 font-semibold text-center z-10",
            isActive
              ? "border-primary text-primary"
              : isCompleted
              ? "border-primary bg-primary text-white"
              : "border-muted text-muted-foreground"
          )}
        >
          {isCompleted ? <CheckIcon className="h-5 w-5" /> : step}
        </div>
        {step !== 3 && (
          <div
            className={cn(
              "absolute left-full w-full h-0.5 -ml-2",
              isCompleted ? "bg-primary" : "bg-muted"
            )}
          />
        )}
      </div>
      <h3 className={cn(
        "mt-2 text-sm font-medium",
        isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
      )}>
        {title}
      </h3>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground text-center max-w-[120px]">
          {description}
        </p>
      )}
    </div>
  );
}
