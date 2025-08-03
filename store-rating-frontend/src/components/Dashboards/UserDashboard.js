import React, { useState, useEffect, useCallback } from 'react';
import StoreService from '../../services/store.service';
import AuthService from '../../services/auth.service';
import { Navigate } from 'react-router-dom';

const UserDashboard = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState({ sortBy: 'name', order: 'ASC' });

    const currentUser = AuthService.getCurrentUser();

    const fetchStores = useCallback(() => {
        setLoading(true);
        const params = { search: filter, sortBy: sort.sortBy, order: sort.order };
        StoreService.getAllStores(params).then(
            (response) => {
                setStores(response.data);
                setLoading(false);
            },
            (error) => {
                setMessage(error.response?.data?.message || "An error occurred");
                setLoading(false);
            }
        );
    }, [filter, sort]);

    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    const handleRating = (storeId, rating) => {
        StoreService.rateStore(storeId, rating).then(
            () => {
                fetchStores(); // Refresh stores to show updated ratings
            },
            (error) => {
                setMessage(error.response?.data?.message || "Rating submission failed");
            }
        );
    };
    
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1>Find & Rate Stores</h1>
                <p className="lead">Welcome, {currentUser.name}! Discover stores and share your experience.</p>
            </header>

            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    All Stores
                    <input type="text" className="form-control w-25" placeholder="Filter by name or address..." value={filter} onChange={e => setFilter(e.target.value)} />
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th onClick={() => setSort({ sortBy: 'name', order: sort.order === 'ASC' ? 'DESC' : 'ASC' })}>Store {sort.sortBy === 'name' && (sort.order === 'ASC' ? '▲' : '▼')}</th>
                                <th onClick={() => setSort({ sortBy: 'averageRating', order: sort.order === 'ASC' ? 'DESC' : 'ASC' })}>Avg. Rating {sort.sortBy === 'averageRating' && (sort.order === 'ASC' ? '▲' : '▼')}</th>
                                <th>Your Rating</th>
                                <th>Submit/Update Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <tr><td colSpan="4">Loading stores...</td></tr> : stores.map((store) => (
                                <tr key={store.id}>
                                    <td>
                                        <strong>{store.name}</strong>
                                        <div className="text-muted small">{store.address}</div>
                                    </td>
                                    <td>
                                        <strong>{store.averageRating ? `${store.averageRating.toFixed(2)} ★` : 'N/A'}</strong>
                                    </td>
                                    <td>
                                        {store.userRating ? (
                                            <span className="user-rating-badge">{store.userRating} ★</span>
                                        ) : (
                                            <span className="text-muted">Not Rated</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="rating-stars">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button key={star} onClick={() => handleRating(store.id, star)} className={store.userRating === star ? 'active' : ''}>
                                                    ★
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
