import React from "react";

import postIcon from '../../assets/icon-post.png';
import manageIcon from '../../assets/icon-manage.png';
import viewIcon from '../../assets/icon-view.png';


const QuickSettings = ({ onPostClick }) => {
  return (
    <div className="quick-settings-card">
      <h3>Quick settings</h3>

      <div className="qs-actions">
        <div className="qs-item" onClick={onPostClick}>
          <img src={postIcon} alt="Post" />
          <span>Post article</span>
        </div>

        <div className="qs-item">
          <img src={manageIcon} alt="Manage" />
          <span>Manage articles</span>
        </div>

        <div className="qs-item">
          <img src={viewIcon} alt="View" />
          <span>View all</span>
        </div>
      </div>
    </div>
  );
};

export default QuickSettings;
