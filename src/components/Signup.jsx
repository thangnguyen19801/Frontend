import { useState } from 'react';
import { signupFields } from "../constants/formField";
import FormAction from "./FormAction";
import Input from "./Input";

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount = async () => {
    try {
      if (signupState["password"] !== signupState["confirm-password"]) {
        alert('Passwords do not match. Please enter matching passwords.');
        return;
      }
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          username: signupState.username,
          password: signupState.password,
          email: signupState["email-address"]
        }),
      });

      if (response.status === 200) {
        window.location.href = '/log-in';
      } else if (response.status === 400) {
        // Username already exists
        alert('Username or Email already exists. Please choose a different username/email.');
      } else {
        console.error('Failed to create account:', response.status);
        // Handle other status codes or errors
      }
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <div className='input-form'>
        <div className="form-container">
        <form className="form-content mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
            {
                fields.map(field =>
                <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={signupState[field.id]}
                    labelText={field.labelText}
                    labelFor={field.labelFor}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    isRequired={field.isRequired}
                    placeholder={field.placeholder}
                />
                )
            }
            <FormAction handleSubmit={handleSubmit} text="Signup" />
            </div>
        </form>
        </div>
    </div>
  )
}