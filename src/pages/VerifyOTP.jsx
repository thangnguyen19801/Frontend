import React, { useState } from 'react';
import Header from "../components/Header";
import VerifyOTP from '../components/VerifyOTP';

export default function VerifyOTPPage() {
    const [otp, setOtp] = useState("");
    const handleOtpChange = (value) => {
        setOtp(value);
    };
    
    const handleSubmit = () => {
    console.log("OTP Submitted: ", otp);
    };
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
            heading="Enter OTP Code"
            paragraph="Don't receive any OTP Code?"
            linkName="Resend it"
            linkUrl="/log-in"
          />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
        <h2>Enter OTP</h2>
        <VerifyOTP length={6} onChange={handleOtpChange} />
        </div>
        </div>
      </div>
    );
  }
