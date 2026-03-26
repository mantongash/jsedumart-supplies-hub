import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useMemo } from "react";
import type { DbOrder } from "@/hooks/useOrders";

interface Props {
  orders: DbOrder[];
}

const AdminSalesChart = ({ orders }: Props) => {
  const chartData = useMemo(() => {
    const months: Record<string, { sales: number; orders: number }> = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    orders.forEach((o) => {
      const d = new Date(o.created_at);
      const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
      if (!months[key]) months[key] = { sales: 0, orders: 0 };
      months[key].sales += Number(o.total);
      months[key].orders += 1;
    });

    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-7)
      .map(([key, val]) => ({
        month: monthNames[parseInt(key.split("-")[1])],
        sales: Math.round(val.sales),
        orders: val.orders,
      }));
  }, [orders]);

  if (chartData.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {["Revenue", "Orders"].map((label) => (
          <div key={label} className="bg-card rounded-xl shadow-card p-6">
            <h3 className="font-display font-bold mb-4">
              <i className={`fa-solid ${label === "Revenue" ? "fa-chart-column" : "fa-chart-line"} mr-2 text-accent`} />
              Monthly {label}
            </h3>
            <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
              <div className="text-center">
                <i className="fa-solid fa-chart-simple text-3xl mb-2 opacity-30" />
                <p>No data yet — charts will appear as orders come in</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card rounded-xl shadow-card p-6">
        <h3 className="font-display font-bold mb-4">
          <i className="fa-solid fa-chart-column mr-2 text-accent" />
          Monthly Revenue (KSh)
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value: number) => [`KSh ${value.toLocaleString()}`, "Revenue"]}
                contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
              />
              <Bar dataKey="sales" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-card p-6">
        <h3 className="font-display font-bold mb-4">
          <i className="fa-solid fa-chart-line mr-2 text-success" />
          Orders Trend
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                formatter={(value: number) => [value, "Orders"]}
                contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
              />
              <Line type="monotone" dataKey="orders" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminSalesChart;
