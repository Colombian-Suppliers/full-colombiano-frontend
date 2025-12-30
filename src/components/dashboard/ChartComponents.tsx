// @ts-nocheck
import React from 'react';import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';

// Colores para los gráficos
const COLORS = {
  primary: '#46802f',
  secondary: '#1b5903',
  accent: '#83cb83',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  success: '#10b981',
  purple: '#8b5cf6',
  pink: '#ec4899',
};

// Componente de gráfico de barras
export const MetricBarChart = ({
  data,
  dataKey,
  color = 'primary',
  height = 300,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Bar
          dataKey={dataKey}
          fill={COLORS[color]}
          radius={[4, 4, 0, 0]}
          animationDuration={1000}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Componente de gráfico de líneas
export const MetricLineChart = ({
  data,
  dataKey,
  color = 'primary',
  height = 300,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={COLORS[color]}
          strokeWidth={3}
          dot={{ fill: COLORS[color], strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, stroke: COLORS[color], strokeWidth: 2 }}
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Componente de gráfico de área
export const MetricAreaChart = ({
  data,
  dataKey,
  color = 'primary',
  height = 300,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id={`gradient${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS[color]} stopOpacity={0.3} />
            <stop offset="95%" stopColor={COLORS[color]} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#666' }}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={COLORS[color]}
          fillOpacity={1}
          fill={`url(#gradient${color})`}
          strokeWidth={2}
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Componente de gráfico circular (dona)
export const MetricPieChart = ({ data, height = 300 }) => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    if (percent < 0.05) return null; // No mostrar labels para valores muy pequeños

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          innerRadius={40}
          fill="#8884d8"
          dataKey="value"
          animationDuration={1500}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.color] || COLORS.primary}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Componente de tarjeta de métrica mejorada
export const MetricCard = ({
  title,
  value,
  subtitle,
  icon,
  color = 'primary',
  trend,
  trendValue,
  className = '',
}) => {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-50 border-primary-200',
    secondary: 'text-secondary-600 bg-secondary-50 border-secondary-200',
    success: 'text-green-600 bg-green-50 border-green-200',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    danger: 'text-red-600 bg-red-50 border-red-200',
    info: 'text-blue-600 bg-blue-50 border-blue-200',
  };

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-6 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p
            className={`text-3xl font-bold ${colorClasses[color].split(' ')[0]}`}
          >
            {value}
          </p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium ${
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend === 'up' ? '↗' : '↘'} {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]} text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Componente de KPI compacto
export const KPICard = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
  className = '',
}) => {
  const changeColor =
    changeType === 'positive' ? 'text-green-600' : 'text-red-600';
  const changeBg = changeType === 'positive' ? 'bg-green-50' : 'bg-red-50';

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-xs font-medium ${changeColor} mt-1`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-2 rounded-lg ${changeBg} ${changeColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export { COLORS };
