import React from 'react';
import Dashboard from '../Components/Dashboard';
import AdminLayout from '../Layout/AdminLayout';

function AdminContainer() {

    return (
        <AdminLayout>
            <Dashboard></Dashboard>
        </AdminLayout>
    );
}

export default AdminContainer