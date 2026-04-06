import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, BookOpen } from 'lucide-react';
import StudentNavbar from '../../components/StudentNavbar';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-slate-950 font-sans text-white">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center relative">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[100px] -top-24 -left-24 animate-pulse pointer-events-none"></div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
            Welcome to the Student Hub
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Access your assessments and track your learning progress.
          </p>

          <div className="flex justify-center">
            <button 
              onClick={() => navigate('/student/spot-test')}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-700/50 transition-all group flex flex-col items-center gap-4 w-full max-w-xs cursor-pointer"
            >
              <div className="w-16 h-16 bg-teal-500/20 text-teal-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">View Spot Tests</h3>
              <p className="text-sm text-slate-500">Quick quizzes and assignments</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
