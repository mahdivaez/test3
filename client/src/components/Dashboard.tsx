import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import FormComponent from './FormComponent';
import BpmnRenderer from './BpmnRenderer';

const Dashboard: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger shadow-sm">
          Please log in to view the dashboard.
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="container py-5">
        <h1 className="text-center text-white mb-5">Dashboard</h1>
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card shadow-lg h-100">
              <div className="card-header bg-primary text-white text-center">
                <h2 className="h4 mb-0">Leave Request Form</h2>
              </div>
              <div className="card-body">
                <FormComponent />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card shadow-lg h-100">
              <div className="card-header bg-success text-white text-center">
                <h2 className="h4 mb-0">BPMN Diagram</h2>
              </div>
              <div className="card-body">
                <BpmnRenderer />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-container {
          background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
          min-height: 100vh;
          padding: 20px 0;
        }
        .card {
          border: none;
          transition: transform 0.3s ease-in-out;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        .card-header {
          border-bottom: none;
          padding: 1.5rem;
        }
        .card-body {
          padding: 2rem;
        }
        h1 {
          font-weight: 300;
          letter-spacing: 2px;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;