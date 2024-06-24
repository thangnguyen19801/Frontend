import { useState } from 'react';
import { loginFields } from "../constants/formField";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isAuthenticated = await authenticateUser();

        if (isAuthenticated) {
            window.location.href = '/';
        }
    }

    const authenticateUser = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: loginState.username,
                    password: loginState.password,
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

                return true; // Authentication successful
            } else if (response.status === 500) {
                alert('Something went wrong. Try again');
                return false;
            } else {
                console.error('Failed to authenticate user:', response.status);
                return false;
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
                            value={loginState[field.id]}
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

                <FormExtra />
                <FormAction handleSubmit={handleSubmit} text="Login" />
            </form>
        </div>
    );
}