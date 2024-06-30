import React, { useState, useEffect } from 'react';
import FormAction from "./FormAction";

const VerifyOTP = ({ length, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  useEffect(() => {
    if (otp.every(value => value !== "")) {
      handleSubmit();
    }
  }, [otp]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (value.length > 1) return;

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join(""));
    }

    // Focus to next input
    if (value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (element, index, event) => {
    if (event.key === "Backspace" && !otp[index] && element.previousSibling) {
      element.previousSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    console.log(otp.join(""))
    const isVerified = await verifyOTP();
    if (isVerified) {
        window.location.href = '/';
    }
  }


  const verifyOTP = async () => {
    try {
        const response = await fetch('http://localhost:5000/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: sessionStorage.getItem("email"),
                otp: otp.join("")
            }),
        });
        if (response.status === 200) {
            const data = await response.json(); // Parse response JSON
            // Assuming the response JSON includes the username
            const { role, username, access_token } = data; // Extract username from response

            // Save username to localStorage or sessionStorage if needed
            localStorage.setItem('username', username);
            localStorage.setItem('role', role);
            localStorage.setItem('access_token', access_token);
            alert('Verify successfully');
            return true // Authentication successful
        } else if (response.status === 400) {
            alert('OTP expired, resend it again.');
            return false;
        } else if (response.status === 401) {
            alert('Wrong OTP');
            return false;
        } else {
            console.error('Failed to verify OTP:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Error verify OTP:', error);
        return false;
    }
};

  return (
    <div className='input-form'>
        <div className="form-container">
        <form className="form-content mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                    {otp.map((data, index) => (
                    <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    name="otp"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e.target, index, e)}
                    style={{
                        width: "40px",
                        height: "40px",
                        margin: "0 5px",
                        textAlign: "center",
                        fontSize: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                    />
                ))}
            </div>
        </form>
        </div>
    </div>
  )
}
export default VerifyOTP;
