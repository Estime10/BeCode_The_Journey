const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={`z-10 flex justify-center items-center fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-40 opacity-0 pointer-events-none transition-opacity duration-500 ${
        active ? "opacity-100 pointer-events-auto" : ""
      }`}
      onClick={() => setActive(false)}
    >
      <div
        className={`p-4 rounded-lg bg-white w-1/4 transform scale-50 transition-transform duration-400 ${
          active ? "scale-100 absolute z-10" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
