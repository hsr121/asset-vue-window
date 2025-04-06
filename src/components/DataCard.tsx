
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DataCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, value, icon, trend, className }) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className={cn(
          "text-2xl font-bold",
          trend === 'up' && "text-financial-green",
          trend === 'down' && "text-financial-red",
          trend === 'neutral' && "text-financial-neutral"
        )}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
