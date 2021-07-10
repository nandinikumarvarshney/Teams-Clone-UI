import React from "react";
import Logout from './logout';
import TeamsVedio from './TeamsVedio'
import { ContextProvider } from '../../Context';

const Dashboard = () => {
  return (
    <div>
      <div className="container">
        <ContextProvider>
          <TeamsVedio />
        </ContextProvider>
      </div>
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <Logout />
      </div>
    </div>
  );
}


export default Dashboard;