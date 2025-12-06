import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface BeforeAfterProps {
  before?: {
    strategic: number;
    admin: number;
  };
  after?: {
    strategic: number;
    admin: number;
  };
  employeeRole?: string;
}

const BeforeAfter = ({
  before = { strategic: 30, admin: 70 },
  after = { strategic: 80, admin: 20 },
  employeeRole = "Senior Employee"
}: BeforeAfterProps) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const CapacityBar = ({
    strategic,
    admin,
    label,
    isAnimated
  }: {
    strategic: number;
    admin: number;
    label: string;
    isAnimated: boolean;
  }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm">{label}</span>
        <span className="text-xs text-muted-foreground">{strategic + admin}% Total</span>
      </div>

      <div className="relative h-16 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden">
        {/* Admin Work */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-1000 ease-out flex items-center justify-center"
          style={{
            width: isAnimated ? `${admin}%` : '0%',
            transitionDelay: '200ms'
          }}
        >
          {admin > 15 && (
            <span className="text-white font-bold text-sm px-2">
              {admin}% Admin Work
            </span>
          )}
        </div>

        {/* Strategic Work */}
        <div
          className="absolute top-0 right-0 h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-1000 ease-out flex items-center justify-center"
          style={{
            width: isAnimated ? `${strategic}%` : '0%',
            transitionDelay: '400ms'
          }}
        >
          {strategic > 15 && (
            <span className="text-white font-bold text-sm px-2">
              {strategic}% Strategic Work
            </span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded"></div>
          <span>Repetitive/Admin ({admin}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded"></div>
          <span>Strategic/High-Value ({strategic}%)</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Capacity Transformation</h3>
          <p className="text-muted-foreground">
            How {employeeRole} time allocation shifts with Employee Amplification
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          {/* Before */}
          <div>
            <CapacityBar
              strategic={before.strategic}
              admin={before.admin}
              label="BEFORE"
              isAnimated={animated}
            />

            <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
              <p className="text-sm text-red-900 dark:text-red-100">
                <strong>{before.admin}%</strong> of premium salary paying for admin work
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex flex-col items-center">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-4">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
            <span className="text-xs font-semibold text-orange-600 mt-2 whitespace-nowrap">
              Employee<br />Amplification
            </span>
          </div>

          {/* After */}
          <div>
            <CapacityBar
              strategic={after.strategic}
              admin={after.admin}
              label="AFTER"
              isAnimated={animated}
            />

            <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <p className="text-sm text-green-900 dark:text-green-100">
                <strong>{after.strategic}%</strong> of time now driving strategic value
              </p>
            </div>
          </div>
        </div>

        {/* Impact Summary */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                +{after.strategic - before.strategic}%
              </div>
              <div className="text-sm text-muted-foreground">
                Increase in Strategic Work
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                -{before.admin - after.admin}%
              </div>
              <div className="text-sm text-muted-foreground">
                Reduction in Admin Tasks
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {Math.round(((after.strategic - before.strategic) / before.strategic) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Strategic Capacity Increase
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BeforeAfter;
