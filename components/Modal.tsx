import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  setShowConfirmation: (val: boolean) => void;
  children: React.ReactNode;
};

const Modal = ({ setShowConfirmation, children }: ModalProps) => {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            type="button"
            onClick={() => setShowConfirmation(false)}
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg cursor-pointer text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="deleteModal"
          >
            <IoClose className="size-5" />
            <span className="sr-only">Close modal</span>
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
