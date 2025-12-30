import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';

export interface TimelineStep {
  label: string;
  date?: string;
  completed: boolean;
  current?: boolean;
}

interface OrderStatusTimelineProps {
  steps: TimelineStep[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * OrderStatusTimeline Component
 * Displays order progress through different stages
 * Fully testable timeline visualization component
 */
export default function OrderStatusTimeline({
  steps,
  orientation = 'horizontal',
  className = '',
}: OrderStatusTimelineProps) {
  if (orientation === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {steps.map((step, index) => (
          <div key={index} className="flex gap-3">
            {/* Icon */}
            <div className="flex flex-col items-center">
              {step.completed ? (
                <MdCheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <MdRadioButtonUnchecked
                  className={`w-6 h-6 ${step.current ? 'text-primary' : 'text-gray-300'}`}
                />
              )}
              {index < steps.length - 1 && (
                <div
                  className={`w-0.5 h-8 ${step.completed ? 'bg-green-600' : 'bg-gray-300'}`}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <p
                className={`font-medium ${
                  step.current
                    ? 'text-primary'
                    : step.completed
                      ? 'text-green-600'
                      : 'text-gray-400'
                }`}
              >
                {step.label}
              </p>
              {step.date && (
                <p className="text-sm text-gray-500">{step.date}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Horizontal orientation
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center flex-1">
            {/* Icon */}
            {step.completed ? (
              <MdCheckCircle className="w-8 h-8 text-green-600 mb-2" />
            ) : (
              <MdRadioButtonUnchecked
                className={`w-8 h-8 mb-2 ${step.current ? 'text-primary' : 'text-gray-300'}`}
              />
            )}

            {/* Label */}
            <p
              className={`text-sm font-medium text-center ${
                step.current
                  ? 'text-primary'
                  : step.completed
                    ? 'text-green-600'
                    : 'text-gray-400'
              }`}
            >
              {step.label}
            </p>
            {step.date && (
              <p className="text-xs text-gray-500 mt-1">{step.date}</p>
            )}
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 flex-1 mx-2 ${step.completed ? 'bg-green-600' : 'bg-gray-300'}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

