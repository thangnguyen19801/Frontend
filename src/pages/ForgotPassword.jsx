import Header from "../components/Header"
import ForgotPassword from "../components/ForgotPassword"

export default function ForgotPasswordPage() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Full viewport height
        textAlign: 'center', // Center text if needed
      }}>
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <Header
            heading="Account recovery"
          />
          <ForgotPassword />
        </div>
      </div>
    );
  }