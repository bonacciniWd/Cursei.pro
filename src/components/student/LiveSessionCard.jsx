import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";
import { motion } from "framer-motion";

const LiveSessionCard = ({ session, onJoin }) => {
  const sessionDate = new Date(`${session.date}T${session.time}`);
  const now = new Date();
  const isActive = sessionDate <= now && now <= new Date(sessionDate.getTime() + session.duration * 60000);
  const isPast = now > new Date(sessionDate.getTime() + session.duration * 60000);
  const isFuture = sessionDate > now;
  
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };
  
  const formatTime = (timeString) => {
    return timeString.substring(0, 5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border shadow-sm overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{session.title}</h3>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive
                ? "bg-green-100 text-green-800"
                : isPast
                ? "bg-gray-100 text-gray-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {isActive ? "Ao vivo agora" : isPast ? "Concluída" : "Agendada"}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">{session.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(session.date)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formatTime(session.time)} ({session.duration} minutos)</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Video className="h-4 w-4 text-muted-foreground" />
            <span>Instrutor: {session.instructorName}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Curso relacionado:</p>
            <p className="text-sm font-medium">{session.courseName}</p>
          </div>
          
          <Button
            onClick={() => onJoin(session.id)}
            disabled={!isActive}
            variant={isActive ? "default" : "outline"}
          >
            {isActive ? "Entrar agora" : isPast ? "Encerrada" : "Lembrar-me"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveSessionCard;