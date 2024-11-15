interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}
  
export const CreateSpaceModal = ({isOpen, onClose, title, children}:ModalProps) => {
if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-xl font-bold">×</button>
        </div>
        <div className="mt-4">
          {children}    
        </div>
      </div>
    </div>
  );
}