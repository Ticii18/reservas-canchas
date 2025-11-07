function Footer() {
  return (
    <>
      <style>{`
        .footer {
          background: linear-gradient(135deg, #1e7e34 0%, #28a745 100%);
          color: white;
          text-align: center;
          padding: 25px 40px;
          margin-top: 60px;
          box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-text {
          margin: 0;
          font-size: 15px;
          opacity: 0.95;
          font-weight: 400;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .footer-icon {
          width: 20px;
          height: 20px;
        }

        @media (max-width: 768px) {
          .footer {
            padding: 20px 20px;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2L9 8l3 2 3-2-3-6zM4 8l2 8 6 4 6-4 2-8H4z" fill="currentColor" stroke="none"/>
            </svg>
            © {new Date().getFullYear()} Sistema de Reservas de Canchas
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;