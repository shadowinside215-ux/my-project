import React from 'react';
import { useAdmin } from '../AdminContext';
import { LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const AdminPanel: React.FC = () => {
  const { isAdmin, logout, saveChanges, loginWithGoogle, user, isLoginLoading } = useAdmin();

  if (!isAdmin) return null;

  const handleSave = async () => {
    try {
      await saveChanges();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Missing or insufficient permissions')) {
        alert('Permission Denied: Please click "Connect to Cloud" to authenticate with your admin account.');
      } else {
        alert('Failed to save changes. Please check your connection.');
      }
    }
  };

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-24 right-4 z-[200] flex flex-col space-y-2"
    >
      {!user && (
        <button
          onClick={loginWithGoogle}
          disabled={isLoginLoading}
          className="flex items-center justify-center space-x-3 bg-white text-navy px-4 py-2 rounded-full border border-gold/30 hover:bg-gold hover:text-navy transition-all shadow-xl font-bold group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className={cn("w-2 h-2 rounded-full", isLoginLoading ? "bg-gold animate-spin" : "bg-red-500 animate-pulse")} />
          <span className="text-[10px] uppercase tracking-widest">
            {isLoginLoading ? 'Connecting...' : 'Connect to Cloud'}
          </span>
        </button>
      )}
      <button
        onClick={handleSave}
        className="flex items-center justify-center space-x-3 bg-gold text-navy px-4 py-2 rounded-full border border-navy/30 hover:bg-navy hover:text-ivory transition-all shadow-xl font-bold"
      >
        <span className="text-[10px] uppercase tracking-widest">Save Changes</span>
      </button>
      <button
        onClick={logout}
        className="flex items-center space-x-3 bg-navy/90 text-ivory px-4 py-2 rounded-full border border-gold/30 hover:bg-gold hover:text-navy transition-all shadow-xl group backdrop-blur-md"
      >
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest font-bold">Admin Mode</span>
        <LogOut size={14} className="ml-2 opacity-50 group-hover:opacity-100" />
      </button>
    </motion.div>
  );
};
