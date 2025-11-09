function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-600 to-green-500 text-white py-6 mt-20 shadow-md">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="flex items-center justify-center gap-3 text-base font-medium tracking-wide">
          {/* Ícono pelota/escudo */}
          <svg
            className="w-6 h-6 text-white drop-shadow-md"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="10" className="opacity-95" />
            <path
              d="M12 2L9 8l3 2 3-2-3-6zM4 8l2 8 6 4 6-4 2-8H4z"
              className="fill-white"
            />
          </svg>
          <span className="drop-shadow-sm">
            © {new Date().getFullYear()}{" "}
            <strong className="font-semibold">
              Sistema de Reservas de Canchas
            </strong>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
