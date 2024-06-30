import { useState } from 'react';
import { forgotPasswordFields } from "../constants/formField";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields=forgotPasswordFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function ForgotPassword(){
    const [forgotPasswordState,setForgotPasswordState]=useState(fieldsState);

    const handleChange=(e)=>{
        setForgotPasswordState({...forgotPasswordState,[e.target.id]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        sessionStorage.setItem("email", forgotPasswordState["email-address"])
        await sendOTP();
        window.location.href = '/verify-otp';
    }

    const sendOTP = async () => {
        try {
            const response = await fetch('http://localhost:5000/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: forgotPasswordState["email-address"],
                }),
            });
            if (response.status === 200) {
                return; // Authentication successful
            } else if (response.status === 500) {
                alert('Something went wrong. Try again');
                return;
            } else {
                console.error('Failed to authenticate user:', response.status);
                return;
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
            return false;
        }
    };
    return (
        <div className="centered-form-container">
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="-space-y-px">
                    {fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={forgotPasswordState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )}
                </div>

                <FormAction handleSubmit={handleSubmit} text="Get OTP Code" />
            </form>
        </div>
    );
}