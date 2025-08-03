import React, { useState, useEffect } from 'react';
import StoreService from '../../services/store.service';
import AuthService from '../../services/auth.service';
import { Navigate } from 'react-router-dom';

const StoreOwnerDashboard = () => {
    // State now holds an array of stores
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        // Fetches the array of stores from the updated backend endpoint
        StoreService.getOwnerStoreDetails()
            .then(response => {
                setStores(response.data);
                setLoading(false);
            })
            .catch(error => {
                const resMessage =
                    (error.response?.data?.message) ||
                    error.message || error.toString();
                setMessage(resMessage);
                setLoading(false);
            });
    }, []);

    if (!currentUser || currentUser.role !== 'Store Owner') {
        return <Navigate to="/login" />;
    }

    if (loading) return <p>Loading your stores...</p>;

    return (
        <div className="container">
            <header className="jumbotron">
                <h1>My Stores Dashboard</h1>
                <p className="lead">View performance and customer feedback across all your locations.</p>
            </header>
            
            {message && <div className="alert alert-danger">{message}</div>}

            {/* --- THIS IS THE NEW LOGIC --- */}
            {/* Check if the stores array has items, then map over it */}
            {stores && stores.length > 0 ? (
                stores.map(store => (
                    // Render a separate card for each store
                    <div className="card mb-4" key={store.id}>
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="mb-0">{store.name}</h4>
                                <span className="badge bg-success p-2">
                                    Avg. Rating: {store.averageRating ? `${store.averageRating.toFixed(2)} ★` : 'N/A'}
                                </span>
                            </div>
                            <p className="text-muted mb-0">{store.address}</p>
                        </div>

                        <div className="card-body">
                            <h5>Ratings Submitted for this Store</h5>
                            {/* Conditionally render the ratings table for each store */}
                            {store.ratings && store.ratings.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>User Name</th>
                                                <th>User Email</th>
                                                <th>Rating</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {store.ratings.map(rating => (
                                                <tr key={rating.id}>
                                                    <td>{rating.user.name}</td>
                                                    <td>{rating.user.email}</td>
                                                    <td>{rating.rating} ★</td>
                                                    <td>{new Date(rating.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>No ratings have been submitted for this store yet.</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                // This message shows if the owner has no stores assigned
                <div className="card text-center p-5">
                    <p className="lead">You do not have any stores assigned to your account.</p>
                    <p className="text-muted">Please contact a system administrator to have stores assigned to you.</p>
                </div>
            )}
        </div>
    );
};

export default StoreOwnerDashboard;
