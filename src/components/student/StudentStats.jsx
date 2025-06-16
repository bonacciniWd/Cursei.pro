import React from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Clock, Award } from "lucide-react";

const StatCard = ({ title, value, icon, bgColor }) => {
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
        </div>
        
        <div className={`stat-icon ${bgColor}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

const StudentStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Cursos Inscritos"
        value={stats.coursesCount}
        icon={<BookOpen className="h-6 w-6 text-blue-600" />}
        bgColor="bg-blue-100"
      />
      
      <StatCard
        title="Aulas Concluídas"
        value={stats.completedLessons}
        icon={<CheckCircle className="h-6 w-6 text-green-600" />}
        bgColor="bg-green-100"
      />
      
      <StatCard
        title="Horas Estudadas"
        value={`${stats.studyHours}h`}
        icon={<Clock className="h-6 w-6 text-indigo-600" />}
        bgColor="bg-indigo-100"
      />
      
      <StatCard
        title="Média Progresso"
        value={`${stats.averageProgress}%`}
        icon={<Award className="h-6 w-6 text-orange-600" />}
        bgColor="bg-orange-100"
      />
    </div>
  );
};

export default StudentStats;