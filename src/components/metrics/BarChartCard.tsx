import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BarChartCardProps {
  data: Array<{ [key: string]: any }>;
  dataKeys: Array<{ key: string; color: string; name: string }>;
  xAxisKey: string;
  title: string;
  loading?: boolean;
}

export const BarChartCard: React.FC<BarChartCardProps> = ({
  data,
  dataKeys,
  xAxisKey,
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

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700 hover:border-titan-cyan/50 transition-colors">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey={xAxisKey}
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
          <Legend wrapperStyle={{ color: '#94a3b8' }} />
          {dataKeys.map((dataKey) => (
            <Bar
              key={dataKey.key}
              dataKey={dataKey.key}
              fill={dataKey.color}
              name={dataKey.name}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
