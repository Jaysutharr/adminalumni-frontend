import React, { useState } from "react";
import { Modal, Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaPen, FaQuestionCircle, FaHeadset, FaBook, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SettingDashboard from "./SettingDashboard";
import './SettingHome.css';

// --- Modals Components ---

const LogoutConfirmationModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;
  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal-content">
        <div className="logout-modal-icon">
          <FaSignOutAlt />
        </div>
        <h3>Log out?</h3>
        <p>Are you sure you want to log out of the admin panel?</p>
        <div className="logout-modal-actions">
          <button className="btn-logout-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-logout-confirm" onClick={onConfirm}>Log out</button>
        </div>
      </div>
    </div>
  );
};

const UpdateFaqModal = ({ onClose }) => {
  return (
    <div className="faq-modal-overlay">
      <div className="faq-modal">
        <span className="faq-close" onClick={onClose}>×</span>
        <h2>Update FAQs</h2>
        <select className="faq-select">
          <option>Select category</option>
          <option>General</option>
          <option>Account</option>
          <option>Payment</option>
        </select>
        <textarea className="faq-textarea" placeholder="Type here" />
        <div className="faq-actions">
          <button className="btn-discard" onClick={onClose}>Discard</button>
          <button className="btn-save">Save changes</button>
        </div>
      </div>
    </div>
  );
};

const LiveSupportModal = ({ onClose }) => {
  return (
    <div className="profilepersonal-modal-overlay">
      <div className="profilepersonal-modal-content" style={{ width: "1100px", height: "650px", maxWidth: "95%" }}>
        <span className="profilepersonal-close" onClick={onClose}>×</span>
        <h2>Live support</h2>
        <div className="live-support-container">
          {/* LEFT – CHAT LIST */}
          <div className="live-support-left">
            <button className="all-messages-btn">All messages</button>
            <input className="chat-search" placeholder="Search" />
            <div className="chat-user active">
              <strong>Ayush Gupta</strong>
              <p>Hello, how are you?</p>
              <span>today</span>
            </div>
            {[1, 2, 3].map((i) => (
              <div className="chat-user" key={i}>
                <strong>User {i}</strong>
                <p>Hello, how are you?</p>
                <span>today</span>
              </div>
            ))}
          </div>

          {/* CENTER – CHAT WINDOW */}
          <div className="live-support-center">
            <div className="chat-header">Ayush Gupta</div>
            <div className="chat-body">
              <div className="message received">Hello, How are you?</div>
              <div className="message sent">Hello, I am fine!</div>
            </div>
            <div className="chat-input">
              <input placeholder="Type a message" />
            </div>
          </div>

          {/* RIGHT – USER INFO */}
          <div className="live-support-right">
            <h4>Ayush Gupta</h4>
            <p className="text-muted small">View profile</p>
            <div className="user-info mt-3">
              <p>📞 +91-7676768989</p>
              <p>✉️ ayushgupta@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TicketsModal = ({ onClose }) => {
  return (
    <div className="profilepersonal-modal-overlay">
      <div className="profilepersonal-modal-content" style={{ width: "900px" }}>
        <span className="profilepersonal-close" onClick={onClose}>×</span>
        <h2>All tickets</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: "100%", fontSize: "14px" }}>
            <thead>
              <tr style={{ color: "#58a4b0", textAlign: "left", borderBottom: '1px solid #eee' }}>
                <th className="p-2">Ticket #</th>
                <th className="p-2">Issue</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                  <td className="p-2">#20240915-00{i + 1}</td>
                  <td className="p-2">Unable to register</td>
                  <td className="p-2"><span className="badge bg-light text-dark border">Open</span></td>
                  <td className="p-2">Sep 15, 2024</td>
                  <td className="p-2 text-primary" style={{ cursor: "pointer" }}>View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const SettingHome = () => {
  const navigate = useNavigate();

  // Modal States
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showTicketsModal, setShowTicketsModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Handlers
  const handleLogout = () => {
    // Perform any cleanup (clear tokens, etc.) here
    console.log("Logging out...");
    navigate('/signin'); // Redirect to signin page
  };

  return (
    <>
      <SettingDashboard />

      <div className="settings-main-content">
        <Container fluid>
          <Row className="mb-4">
            <Col xs={12}>
              <h2 className="mb-1" style={{ fontWeight: '600', color: '#333' }}>Organization Settings</h2>
              <p className="text-muted">Manage your organization profile, security, and preferences.</p>
            </Col>
          </Row>

          <Row className="g-4">
            {/* General Settings */}
            <Col xs={12} lg={6}>
              <Card className="settings-card h-100">
                <Card.Body className="p-4">
                  <div className="settings-card-title">General Settings</div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span>Language</span>
                    <Form.Select style={{ width: '140px', borderRadius: '8px' }} size="sm">
                      <option>English</option>
                      <option>French</option>
                      <option>Spanish</option>
                    </Form.Select>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="d-block">Organization Profile</span>
                      <small className="text-muted">Update name, logo, contact info</small>
                    </div>
                    <Button variant="outline-dark" size="sm" className="px-3 rounded-pill" onClick={() => setProfileModalOpen(true)}>
                      <FaPen className="me-2" size={12} /> Edit
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Legal & Compliance */}
            <Col xs={12} lg={6}>
              <Card className="settings-card h-100">
                <Card.Body className="p-4">
                  <div className="settings-card-title">Legal & Compliance</div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span>Privacy Policy</span>
                    <Button variant="outline-primary" size="sm" className="rounded-pill px-3" onClick={() => setShowPrivacyModal(true)}>
                      Update
                    </Button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span>Terms of Service</span>
                    <Button variant="outline-primary" size="sm" className="rounded-pill px-3" onClick={() => setShowTermsModal(true)}>
                      Update
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Notifications */}
            <Col xs={12} lg={6}>
              <Card className="settings-card h-100">
                <Card.Body className="p-4">
                  <div className="settings-card-title">Notifications</div>

                  {['Email notifications', 'Push notifications', 'In-App notifications'].map((item, idx) => (
                    <div className="d-flex justify-content-between align-items-center mb-3" key={idx}>
                      <span>{item}</span>
                      <Form.Check type="switch" defaultChecked />
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* Security */}
            <Col xs={12} lg={6}>
              <Card className="settings-card h-100">
                <Card.Body className="p-4">
                  <div className="settings-card-title">Security</div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span>Password</span>
                    <Button variant="outline-secondary" size="sm" className="rounded-pill px-3" onClick={() => setShowPasswordModal(true)}>Change</Button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span>Two-Factor Auth (2FA)</span>
                    <Button variant="secondary" size="sm" className="rounded-pill px-3" onClick={() => setShow2FAModal(true)}>Enable</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Data Management */}
            <Col xs={12} lg={6}>
              <Card className="settings-card h-100">
                <Card.Body className="p-4">
                  <div className="settings-card-title">Data Management</div>

                  <Row className="align-items-center mb-3">
                    <Col xs={6}><span>Download Data</span></Col>
                    <Col xs={6}>
                      <Form.Select size="sm" className="rounded-8">
                        <option>Select format</option>
                        <option>CSV</option>
                        <option>PDF</option>
                      </Form.Select>
                    </Col>
                  </Row>

                  <Row className="align-items-center mb-4">
                    <Col xs={6}><span>Retention Period</span></Col>
                    <Col xs={6}>
                      <Form.Select size="sm" className="rounded-8">
                        <option>1 Year</option>
                        <option>3 Years</option>
                        <option>Forever</option>
                      </Form.Select>
                    </Col>
                  </Row>

                  <div className="text-end">
                    <Button variant="dark" size="sm" className="rounded-pill px-4">
                      Execute Action
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Help & Support */}
            <Col xs={12} lg={6}>
              <Card className="settings-card h-100">
                <Card.Body className="p-4">
                  <div className="settings-card-title">Help & Support</div>

                  <Row className="g-3 text-center">
                    <Col xs={4}>
                      <div className="support-card p-3 rounded" onClick={() => setShowTicketsModal(true)}>
                        <FaBook size={24} className="mb-2 text-primary" />
                        <span className="small d-block fw-bold">Tickets</span>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="support-card p-3 rounded" onClick={() => setShowSupportModal(true)}>
                        <FaHeadset size={24} className="mb-2 text-success" />
                        <span className="small d-block fw-bold">Live Support</span>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="support-card p-3 rounded" onClick={() => setShowFaqModal(true)}>
                        <FaQuestionCircle size={24} className="mb-2 text-warning" />
                        <span className="small d-block fw-bold">FAQs</span>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Logout Section */}
            <Col xs={12}>
              <Card className="settings-card border-danger border-1">
                <Card.Body className="p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h5 className="text-danger mb-1">Sign Out</h5>
                    <p className="text-muted small mb-0">Securely log out of your admin account.</p>
                  </div>
                  <Button variant="danger" className="px-4 rounded-pill" onClick={() => setShowLogoutModal(true)}>
                    Log Out
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* --- ALL MODALS --- */}

      <LogoutConfirmationModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />

      {isProfileModalOpen && (
        // Reusing existing profile modal structure but simplified for brevity in this rewrite
        <div className="profilepersonal-modal-overlay">
          <div className="profilepersonal-modal-content">
            <span className="profilepersonal-close" onClick={() => setProfileModalOpen(false)}>×</span>
            <h2>Update Personal Information</h2>
            <div className="profilepersonal-modal-body">
              <Form.Group className="mb-3">
                <Form.Label>Organization Name</Form.Label>
                <Form.Control type="text" defaultValue="University Admin" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact Email</Form.Label>
                <Form.Control type="email" defaultValue="admin@university.edu" />
              </Form.Group>
            </div>
            <div className="profilepersonal-modal-footer">
              <button className="profilepersonal-discard-button" onClick={() => setProfileModalOpen(false)}>Discard</button>
              <button className="profilepersonal-save-button">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      <Modal show={showPrivacyModal} onHide={() => setShowPrivacyModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Update Privacy Policy</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Control as="textarea" rows={6} placeholder="Enter policy text..." />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPrivacyModal(false)}>Discard</Button>
          <Button style={{ background: '#58a4b0', border: 'none' }} onClick={() => setShowPrivacyModal(false)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Terms Modal */}
      <Modal show={showTermsModal} onHide={() => setShowTermsModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Update Terms of Service</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Control as="textarea" rows={6} placeholder="Enter terms text..." />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTermsModal(false)}>Discard</Button>
          <Button style={{ background: '#58a4b0', border: 'none' }} onClick={() => setShowTermsModal(false)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Other Modals Integration */}
      {showFaqModal && <UpdateFaqModal onClose={() => setShowFaqModal(false)} />}
      {showSupportModal && <LiveSupportModal onClose={() => setShowSupportModal(false)} />}
      {showTicketsModal && <TicketsModal onClose={() => setShowTicketsModal(false)} />}

      {showPasswordModal && (
        <div className="profilepersonal-modal-overlay">
          <div className="profilepersonal-modal-content">
            <span className="profilepersonal-close" onClick={() => setShowPasswordModal(false)}>×</span>
            <h2>Change Password</h2>
            <div className="profilepersonal-modal-body">
              <input className="form-control mb-3" type="password" placeholder="Current password" />
              <input className="form-control mb-3" type="password" placeholder="New password" />
              <input className="form-control mb-3" type="password" placeholder="Confirm password" />
            </div>
            <div className="profilepersonal-modal-footer">
              <button className="profilepersonal-discard-button" onClick={() => setShowPasswordModal(false)}>Cancel</button>
              <button className="profilepersonal-save-button">Update</button>
            </div>
          </div>
        </div>
      )}

      {show2FAModal && (
        <div className="twofa-overlay">
          <div className="twofa-modal">
            <div className="twofa-header">
              <h2>Two-Factor Authentication</h2>
              <span className="twofa-close" onClick={() => setShow2FAModal(false)}>×</span>
            </div>
            <div className="twofa-options">
              <label className="twofa-option">
                <input type="radio" name="2fa_method" defaultChecked />
                <div className="ps-2">
                  <h4>Authenticator App</h4>
                  <p>Use an app like Google Authenticator or Authy.</p>
                </div>
              </label>
              <label className="twofa-option">
                <input type="radio" name="2fa_method" />
                <div className="ps-2">
                  <h4>Email Verification</h4>
                  <p>Receive a code via your recovery email address.</p>
                </div>
              </label>
            </div>
            <div className="twofa-footer">
              <button className="twofa-setup-btn">Continue Setup</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingHome;
