import React from 'react';
import AdminLayout from '../../Hoc/AdminLayout';

const Dashboard = () => {
    return (
        <div className="user_dashboard">
            <AdminLayout>
                <div className="user_dashboard">
                    <div>
                        This is the main dashboard
                    </div>
                </div>
            </AdminLayout>
        </div>
    );
};

export default Dashboard;