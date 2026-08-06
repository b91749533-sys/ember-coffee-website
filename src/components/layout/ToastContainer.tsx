import React from 'react';
import { useStore } from '../../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map(toast => {
          const isSuccess = toast.type === 'success';
          const isWarning = toast.type === 'warning';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto p-4 rounded-xl shadow-2xl backdrop-blur-md border flex items-start gap-3 ${
                isSuccess
                  ? 'bg-espresso/90 border-caramel/40 text-cream'
                  : isWarning
                  ? 'bg-dark-card/90 border-amber-500/40 text-cream'
                  : 'bg-dark-surface/90 border-gold/30 text-cream'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-caramel" />}
                {isWarning && <AlertCircle className="w-5 h-5 text-amber-400" />}
                {!isSuccess && !isWarning && <Info className="w-5 h-5 text-gold" />}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-tight text-cream">{toast.title}</p>
                {toast.description && (
                  <p className="text-xs text-cream/70 mt-1 leading-snug">{toast.description}</p>
                )}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-cream/50 hover:text-cream transition-colors p-0.5 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
