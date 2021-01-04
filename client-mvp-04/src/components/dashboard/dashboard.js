import React from 'react';
import './dashboard.scss';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.user);
  const userProfile = useSelector((state) => state.auth.userProfile);

  return loggedIn && user ? (
    <div className="flex-container dashboard">
      <h2>Hi {userProfile.firstName},</h2>
      <br />
      <h2>Welcome to VRMS Dashboard!</h2>
    </div>
  ) : (
    <Redirect to="/auth/expired-session" />
  );
};

export default Dashboard;
