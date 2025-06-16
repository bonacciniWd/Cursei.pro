import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  Video, 
  BarChart3, 
  TrendingUp, 
  TrendingDown 
} from "lucide-react";

const StatCard = ({ title, value, icon, bgColor, textColor, trend, trendValue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="stat-card bg-white"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-xs font-medium ${
                  trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {trendValue}
              </span>
            </div>
          )}
        </div>
        
        <div className={`stat-icon ${bgColor}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total de Cursos"
        value={stats.coursesCount}
        icon={<BookOpen className={`h-6 w-6 text-blue-600`} />}
        bgColor="bg-blue-100"
        textColor="text-blue-600"
        trend="up"
        trendValue="+12% este mês"
      />
      
      <StatCard
        title="Total de Alunos"
        value={stats.studentsCount}
        icon={<Users className={`h-6 w-6 text-indigo-600`} />}
        bgColor="bg-indigo-100"
        textColor="text-indigo-600"
        trend="up"
        trendValue="+8% este mês"
      />
      
      <StatCard
        title="Sessões ao Vivo"
        value={stats.liveSessionsCount}
        icon={<Video className={`h-6 w-6 text-purple-600`} />}
        bgColor="bg-purple-100"
        textColor="text-purple-600"
        trend="up"
        trendValue="+15% este mês"
      />
      
      <StatCard
        title="Taxa de Conclusão"
        value={`${stats.completionRate}%`}
        icon={<BarChart3 className={`h-6 w-6 text-green-600`} />}
        bgColor="bg-green-100"
        textColor="text-green-600"
        trend="up"
        trendValue="+5% este mês"
      />
    </div>
  );
};

export default DashboardStats;