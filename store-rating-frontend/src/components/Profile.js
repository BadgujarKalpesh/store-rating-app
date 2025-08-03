import React, { useState } from 'react';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);

    const currentUser = AuthService.getCurrentUser();

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        setSuccessful(false);

        UserService.updatePassword(currentPassword, newPassword)
            .then(response => {
                setMessage(response.data.message);
                setSuccessful(true);
                setLoading(false);
                // Clear form on success
                setCurrentPassword('');
                setNewPassword('');
            })
            .catch(error => {
                const resMessage = (error.response?.data?.message) || error.message || error.toString();
                setMessage(resMessage);
                setSuccessful(false);
                setLoading(false);
            });
    };

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1>My Profile</h1>
                <p className="lead">Manage your account details here.</p>
            </header>

            <div className="card card-container" style={{maxWidth: '600px'}}>
                <div className="card-header">
                    Update Your Password
                </div>
                <div className="card-body">
                    <form onSubmit={handleUpdatePassword}>
                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <small className="form-text text-muted">
                                Must be 8-16 characters, with at least one uppercase letter and one special character.
                            </small>
                        </div>

                        <div className="form-group mt-3">
                            <button className="btn btn-primary btn-block" disabled={loading}>
                                {loading && <span className="spinner-border spinner-border-sm"></span>}
                                <span>Update Password</span>
                            </button>
                        </div>

                        {message && (
                            <div className="form-group mt-3">
                                <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;