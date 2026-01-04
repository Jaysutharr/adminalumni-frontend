import React, { useState } from "react";

import "./PostArticleModal.css";

// const PostArticleModal = ({ onClose }) => {
//   return (
//     <div className="modal-overlay">
//       <div className="modal-card">
//         <div className="modal-header">
//           <h3>Post Article</h3>
//           <button className="close-btn" onClick={onClose}>×</button>
//         </div>

//         <div className="upload-box">
//           <div className="upload-icon">🖼️</div>
//           <p>Upload cover image</p>
//           <span>minimum width 480 pixels, 16:9 recommended</span>
//         </div>

//         <label>Article title<span>*</span></label>
//         <input
//           type="text"
//           placeholder="ex: Best Practices in UX Design for 2024"
//         />

//         <label>Content Body<span>*</span></label>
//         <textarea
//           placeholder="ex: Best Practices in UX Design for 2024..."
//         />

//         <button className="next-btn">Next</button>
//       </div>
//     </div>
//   );
// };


const PostArticleModal = ({ onClose }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        {/* HEADER */}
        <div className="modal-header">
          <h3>Create Job</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <label>

            <label>Job title<span>*</span></label>
            <input
              type="text"
              placeholder=""
            />

            <label>Company Name<span>*</span></label>
            <textarea
              placeholder=""
            />
            <label>Workplace type<span>*</span></label>
            <select id="workplace">
              <option value="">Select workplace type</option>
              <option value="onsite">On-site</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <label>Job Location<span>*</span></label>
            <textarea
              placeholder=""
            />
            <label>Job Type<span>*</span></label>
            <select id="workplace">
              <option value="">Full time</option>
              <option value="full-time">Full time</option>
              <option value="part-time">Part -time</option>
              <option value="contract">Contract</option>
              <option value="temporary">Temporary</option>
              <option value="internship">Internship</option>
              <option value="freelance">Freelance</option>
            </select>

            <label>Salary<span>*</span></label>
            <select id="workplace">
              <option value="">Select</option>
              <option value="">Select salary type</option>
              <option value="hourly">Hourly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>


            <button className="next-btn" onClick={() => setStep(2)}>
              Next
            </button>
          </label>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <>
            <label>Write job description<span>*</span></label>
            <textarea
              placeholder=""
            />


            <div className="modal-actions">
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button className="submit-button">
                Published
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default PostArticleModal;
