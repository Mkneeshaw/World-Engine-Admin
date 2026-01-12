import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

interface TimeSeriesChartProps {
  data: Array<{ timestamp: string; [key: string]: any }>;
  dataKeys: Array<{ key: string; color: string; name: string }>;
  title: string;
  loading?: boolean;
}

export const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  dataKeys,
  title,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700">
        <div className="h-6 bg-slate-700 rounded w-1/3 mb-4 animate-pulse" />
        <div className="h-64 bg-slate-700 rounded animate-pulse" />
      </div>
    );
  }

  const formattedData = data.map((item) => ({
    ...item,
    time: format(new Date(item.timestamp), 'HH:mm'),
  }));

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700 hover:border-titan-cyan/50 transition-colors">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="time"
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#f1f5f9',
            }}
          />
          <Legend
            wrapperStyle={{ color: '#94a3b8' }}
            iconType="line"
          />
          {dataKeys.map((dataKey) => (
            <Line
              key={dataKey.key}
              type="monotone"
              dataKey={dataKey.key}
              stroke={dataKey.color}
              strokeWidth={2}
              name={dataKey.name}
              dot={false}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
