import { Check } from 'lucide-react';

const steps = ['Issue Details', 'Location', 'Review & Submit'];

export function ReportProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-6">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isComplete = currentStep > stepNumber;

        return (
          <div className="flex items-center gap-2 sm:gap-3" key={label}>
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${isActive || isComplete ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white text-slate-500'}`}>
              {isComplete ? <Check size={17} /> : stepNumber}
            </div>
            <span className={`hidden text-sm font-semibold sm:inline ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>{label}</span>
            {stepNumber < steps.length && <div className={`hidden h-0.5 flex-1 sm:block ${isComplete ? 'bg-primary' : 'bg-slate-200'}`} />}
          </div>
        );
      })}
    </div>
  );
}
