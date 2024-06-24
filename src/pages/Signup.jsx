import React from "react";
import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignupPage() {
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
          heading="Sign up to start with us"
          paragraph="Already have an account?"
          linkName="Log in"
          linkUrl="/log-in"
        />
        <Signup />
      </div>
    </div>
  );
}
