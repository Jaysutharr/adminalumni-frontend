import React from "react";
import "./AnnouncementModel.css";
import { FaTimes } from "react-icons/fa";

const AnnouncementModel = ({ onClose }) => {
  return (
    <div className="announce-overlay">
      <div className="announce-modal">

        {/* HEADER */}
        <div className="announce-header">
          <h3>Announce</h3>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        {/* FORM */}
        <div className="announce-body">
          <label>Title/Heading</label>
          <input type="text" />

          <label>Description</label>
          <textarea rows="5"></textarea>
        </div>

        {/* FOOTER */}
        <div className="announce-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="announce-btn">
            Announce
          </button>
        </div>

      </div>
    </div>
  );
};

export default AnnouncementModel;
