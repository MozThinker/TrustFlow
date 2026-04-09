import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { Transaction, ScoreBreakdown } from '../types';

interface ChartsSectionProps {
  transactions: Transaction[];
  breakdown: ScoreBreakdown;
}

export default function ChartsSection({ transactions, breakdown }: ChartsSectionProps) {
  // Prepare data for Inflow/Outflow Area Chart
  const last30Days = transactions.slice(0, 60).reverse();
  const dailyData: { [date: string]: { date: string, inflow: number, outflow: number } } = {};
  
  last30Days.forEach(t => {
    const date = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!dailyData[date]) dailyData[date] = { date, inflow: 0, outflow: 0 };
    if (t.type === 'inflow') dailyData[date].inflow += t.amount;
    else dailyData[date].outflow += t.amount;
  });

  const areaData = Object.values(dailyData);

  // Prepare data for Category Pie Chart
  const categoryTotals: { [cat: string]: number } = {};
  transactions.filter(t => t.type === 'outflow').forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  // Score Breakdown Data
  const radarData = [
    { subject: 'Stability', A: breakdown.incomeStability },
    { subject: 'Consistency', A: breakdown.consistency },
    { subject: 'Health', A: breakdown.health },
    { subject: 'Longevity', A: breakdown.longevity },
    { subject: 'Savings', A: breakdown.savings },
    { subject: 'Volatility', A: breakdown.volatility },
  ];

  return (
    <div className="space-y-8">
      {/* Cash Flow Chart */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Cash Flow Trend (Last 30 Days)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="inflow" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorInflow)" />
              <Area type="monotone" dataKey="outflow" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorOutflow)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Spending by Category</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-xs text-slate-600 truncate">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Score Breakdown Bar Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Score Factor Analysis</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={radarData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} width={80} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="A" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
