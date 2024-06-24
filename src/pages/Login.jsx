import Header from "../components/Header"
import Login from "../components/Login"

export default function LoginPage() {
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
            heading="Login to your account"
            paragraph="Don't have an account yet?"
            linkName="Sign up"
            linkUrl="/sign-up"
          />
          <Login />
        </div>
      </div>
    );
  }