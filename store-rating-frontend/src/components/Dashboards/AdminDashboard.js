import React, { useState, useEffect, useCallback } from 'react';
import AdminService from '../../services/admin.service';
import AuthService from '../../services/auth.service';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ userCount: 0, storeCount: 0, ratingCount: 0 });
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    // Filter and sort state
    const [userFilter, setUserFilter] = useState('');
    const [storeFilter, setStoreFilter] = useState('');
    const [userSort, setUserSort] = useState({ sortBy: 'name', order: 'ASC' });
    const [storeSort, setStoreSort] = useState({ sortBy: 'name', order: 'ASC' });

    // Form states remain the same...
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserAddress, setNewUserAddress] = useState('');
    const [newUserRole, setNewUserRole] = useState('Normal User');
    const [newStoreName, setNewStoreName] = useState('');
    const [newStoreEmail, setNewStoreEmail] = useState('');
    const [newStoreAddress, setNewStoreAddress] = useState('');
    const [newStoreOwnerId, setNewStoreOwnerId] = useState('');

    const currentUser = AuthService.getCurrentUser();

    const fetchData = useCallback(() => {
        setLoading(true);
        const userParams = { search: userFilter, sortBy: userSort.sortBy, order: userSort.order };
        const storeParams = { search: storeFilter, sortBy: storeSort.sortBy, order: storeSort.order };

        Promise.all([
            AdminService.getDashboardStats(),
            AdminService.getAllUsers(userParams),
            AdminService.getAllStores(storeParams)
        ]).then(([statsRes, usersRes, storesRes]) => {
            setStats(statsRes.data);
            setUsers(usersRes.data);
            setStores(storesRes.data);
            setLoading(false);
        }).catch(error => {
            setMessage(error.response?.data?.message || "An error occurred");
            setLoading(false);
        });
    }, [userFilter, userSort, storeFilter, storeSort]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCreateUser = (e) => {
        e.preventDefault();
        AdminService.createUser(newUserName, newUserEmail, newUserPassword, newUserAddress, newUserRole)
            .then(() => {
                fetchData();
                setNewUserName(''); setNewUserEmail(''); setNewUserPassword(''); setNewUserAddress(''); setNewUserRole('Normal User');
            })
            .catch(error => setMessage(error.response.data.message));
    };

    const handleCreateStore = (e) => {
        e.preventDefault();
        AdminService.createStore(newStoreName, newStoreEmail, newStoreAddress, newStoreOwnerId)
            .then(() => {
                fetchData();
                setNewStoreName(''); setNewStoreEmail(''); setNewStoreAddress(''); setNewStoreOwnerId('');
            })
            .catch(error => setMessage(error.response.data.message));
    };

    if (!currentUser || currentUser.role !== 'System Administrator') {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container-fluid">
            <header className="jumbotron">
                <h1>Admin Dashboard</h1>
                <p className="lead">Manage users, stores, and monitor system activity.</p>
            </header>

            {/* --- Stats Section --- */}
            <div className="row mb-4">
                <div className="col-md-4"><div className="card stat-card"><h3>{stats.userCount}</h3><p>Total Users</p></div></div>
                <div className="col-md-4"><div className="card stat-card"><h3>{stats.storeCount}</h3><p>Total Stores</p></div></div>
                <div className="col-md-4"><div className="card stat-card"><h3>{stats.ratingCount}</h3><p>Total Ratings</p></div></div>
            </div>

            {message && <div className="alert alert-danger">{message}</div>}

            {/* --- Create Forms Section --- */}
            <div className="row mb-5">
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header">Create New User</div>
                        <div className="card-body"><form onSubmit={handleCreateUser}>
                            {/* User form fields... */}
                            <div className="form-group"><label>Name</label><input type="text" value={newUserName} onChange={e => setNewUserName(e.target.value)} className="form-control" required/></div>
                            <div className="form-group"><label>Email</label><input type="email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} className="form-control" required/></div>
                            <div className="form-group"><label>Password</label><input type="password" value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} className="form-control" required/></div>
                            <div className="form-group"><label>Address</label><input type="text" value={newUserAddress} onChange={e => setNewUserAddress(e.target.value)} className="form-control" /></div>
                            <div className="form-group"><label>Role</label><select value={newUserRole} onChange={e => setNewUserRole(e.target.value)} className="form-control"><option value="Normal User">Normal User</option><option value="Store Owner">Store Owner</option><option value="System Administrator">System Administrator</option></select></div>
                            <button type="submit" className="btn btn-primary btn-block mt-3">Create User</button>
                        </form></div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header">Create New Store</div>
                        <div className="card-body"><form onSubmit={handleCreateStore}>
                            {/* Store form fields... */}
                            <div className="form-group"><label>Store Name</label><input type="text" value={newStoreName} onChange={e => setNewStoreName(e.target.value)} className="form-control" required/></div>
                            <div className="form-group"><label>Store Email</label><input type="email" value={newStoreEmail} onChange={e => setNewStoreEmail(e.target.value)} className="form-control" required/></div>
                            <div className="form-group"><label>Store Address</label><input type="text" value={newStoreAddress} onChange={e => setNewStoreAddress(e.target.value)} className="form-control" /></div>
                            <div className="form-group"><label>Owner</label><select value={newStoreOwnerId} onChange={e => setNewStoreOwnerId(e.target.value)} className="form-control"><option value="">Select Owner (Optional)</option>{users.filter(u => u.role === 'Store Owner').map(owner => (<option key={owner.id} value={owner.id}>{owner.name} ({owner.email})</option>))}</select></div>
                            <button type="submit" className="btn btn-primary btn-block mt-3">Create Store</button>
                        </form></div>
                    </div>
                </div>
            </div>

            {/* --- Data Tables Section --- */}
            <div className="card mb-5">
                <div className="card-header d-flex justify-content-between align-items-center">
                    Users ({users.length})
                    <input type="text" className="form-control w-25" placeholder="Filter by name or email..." value={userFilter} onChange={e => setUserFilter(e.target.value)} />
                </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        {/* Users table with sorting... */}
                        <thead><tr>
                            <th onClick={() => setUserSort({ sortBy: 'name', order: userSort.order === 'ASC' ? 'DESC' : 'ASC' })}>Name {userSort.sortBy === 'name' && (userSort.order === 'ASC' ? '▲' : '▼')}</th>
                            <th onClick={() => setUserSort({ sortBy: 'email', order: userSort.order === 'ASC' ? 'DESC' : 'ASC' })}>Email {userSort.sortBy === 'email' && (userSort.order === 'ASC' ? '▲' : '▼')}</th>
                            <th>Address</th>
                            <th onClick={() => setUserSort({ sortBy: 'role', order: userSort.order === 'ASC' ? 'DESC' : 'ASC' })}>Role {userSort.sortBy === 'role' && (userSort.order === 'ASC' ? '▲' : '▼')}</th>
                        </tr></thead>
                        <tbody>{loading ? <tr><td colSpan="4">Loading...</td></tr> : users.map(user => (<tr key={user.id}><td>{user.name}</td><td>{user.email}</td><td>{user.address}</td><td>{user.role}</td></tr>))}</tbody>
                    </table>
                </div>
            </div>

            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    Stores ({stores.length})
                    <input type="text" className="form-control w-25" placeholder="Filter by name or address..." value={storeFilter} onChange={e => setStoreFilter(e.target.value)} />
                </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        {/* Stores table with sorting... */}
                        <thead><tr>
                            <th onClick={() => setStoreSort({ sortBy: 'name', order: storeSort.order === 'ASC' ? 'DESC' : 'ASC' })}>Name {storeSort.sortBy === 'name' && (storeSort.order === 'ASC' ? '▲' : '▼')}</th>
                            <th>Email</th><th>Address</th>
                            <th onClick={() => setStoreSort({ sortBy: 'averageRating', order: storeSort.order === 'ASC' ? 'DESC' : 'ASC' })}>Avg. Rating {storeSort.sortBy === 'averageRating' && (storeSort.order === 'ASC' ? '▲' : '▼')}</th>
                        </tr></thead>
                        <tbody>{loading ? <tr><td colSpan="4">Loading...</td></tr> : stores.map(store => (<tr key={store.id}><td>{store.name}</td><td>{store.email}</td><td>{store.address}</td><td>{store.averageRating ? `${store.averageRating.toFixed(2)} ★` : 'N/A'}</td></tr>))}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
