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
          <h3>Post Donation</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <>
            <div className="upload-box">
              <div className="upload-icon">🖼️</div>
              <p>Upload cover image</p>
              <span>minimum width 480 pixels, 16:9 recommended</span>
            </div>

            <label>Donation Campaign Name<span>*</span></label>
            <input
              type="text"
              placeholder="ex: Scholarship Fund for Future Leaders"
            />

            <label>Compaign Description<span>*</span></label>
            <textarea
              placeholder="ex: Scholarship Fund for Future Leaders"
            />

            <button className="next-btn" onClick={() => setStep(2)}>
              Next
            </button>
          </>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <>
            <label>Categories<span>*</span></label>
            <select>
              <option>Select</option>
              <option>Blog</option>
              <option>News</option>
              <option>Donation</option>
            </select>

            <label>Goal Amount<span>*</span></label>
            <input
              type="text"
              placeholder="ex: UX Design, Mentorship, Alumni Success"
            />

            <label>Payment Methods<span>*</span></label>
            <select>
              <option>Select</option>
              <option>Blog</option>
              <option>News</option>
              <option>Donation</option>
            </select>
            <input type="text" />
            <label>Add Payment Detail<span>*</span></label>
            <input
              type="text"
              placeholder="ex: Your UPI id"
            />
            <label className="toggle-label">
              Allow Commenting<span>*</span>
            </label>

            <div className="toggle-row">
              <span>Don’t Allow</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
              <span>Allow</span>
            </div>

            <div className="modal-actions">
              <button className="discard-btn" onClick={onClose}>
                Discard
              </button>
              <button className="create-btn">
                Create
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default PostArticleModal;
