export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xs rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-200 animate-in fade-in zoom-in duration-200">
        <h3 className="text-lg font-semibold text-slate-900">Confirm Logout</h3>
        <p className="mt-2 text-sm text-slate-500">
          Are you sure you want to log out of your{" "}
          <span className="font-medium text-emerald-600">Buyer</span> account?
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={onConfirm}
            className="w-full rounded-xl cursor-pointer bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 active:scale-[0.98]"
          >
            Yes, Log out
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-xl cursor-pointer bg-slate-50 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
