import React, { useState } from 'react'
import { FirebaseAuthService } from '../FirebaseAuthService'

const LoginForm = ({ existingUser }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await FirebaseAuthService.loginUser(username, password);
            setUsername("");
            setPassword("");
        } catch (error) {
            alert(error.message);
        }
    }
    
    // FirebaseAuthService

    function handleLogout() {
        FirebaseAuthService.logoutUser();
    }

    async function handleSendResetPasswordEmail() {
        if (!username) {
            alert('mission username!');

            return;
        }

        try {
            await FirebaseAuthService.sendPasswordResetEmail(username);
            alert('sent the password reset email')
        } catch (error) {
            alert(error.message)
        }
    }

    // async function handleLoginWithGoogle() {
    //     try {
    //         await FirebaseAuthService.loginWithGoogle();
    //     } catch (error) {

    //         alert(error.message);
            
    //     }
    // }
    
    return (
        <div className="login-form-container">
            {
                existingUser ? (
                    <div className="">
                        <h3>Welcome, {existingUser.email}</h3>
                        <button type='button' className='primary-button' onClick={handleLogout}>Logout</button>
                    </div> ) : (
                    <form onSubmit={handleSubmit} className='login-form'>
                        <label htmlFor='name' className='input-label login-label'>
                            Username (email):
                            <input 
                                className='input-text' 
                                type="email" 
                                name="email"
                                required 
                                value={username} 
                                onChange={e=>setUsername(e.target.value)} 
                            />
                        </label>
                        <label htmlFor='password' className='input-label login-label'>
                            Password:
                            <input 
                                className='input-text' 
                                type="password" 
                                name='password'
                                required 
                                value={password} 
                                onChange={e=>setPassword(e.target.value)} 
                            />
                        </label>

                        <div className="button-box">
                            <button className='primary-button'>Login</button>
                            <button type="button" onClick={handleSendResetPasswordEmail} className='primary-button'>Reset Password</button>
                            {/* <button type="button" onClick={handleLoginWithGoogle} className='primary-button'>Login with Google</button> */}
                        </div>
                    </form>
                )
            }
        </div>
    )
}

export default LoginForm