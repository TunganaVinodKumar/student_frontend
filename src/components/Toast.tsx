import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`toast-notification toast-${toast.type}`}>
      <div className="toast-icon">
        {toast.type === 'success' ? (
          <CheckCircle2 size={22} className="text-green" />
        ) : (
          <AlertCircle size={22} className="text-red" />
        )}
      </div>
      <div className="toast-body">
        <h4 className="toast-title">{toast.title}</h4>
        <p className="toast-desc">{toast.message}</p>
      </div>
      <button className="toast-close" onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
};
