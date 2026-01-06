import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateDonation.css';

const CreateDonation = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        DonationId: `D${Math.floor(Math.random() * 100000)}`, // Auto-generate ID for now
        CampaignTitle: '',
        CampaignDescription: '',
        Categories: '',
        GoalAmount: '',
        PaymentMethods: '',
        Paymentdetail: '',
        AllowCommenting: 'true',
        Comment: '',
        userId: '85201' // Default userId as per request
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/createdonations`, formData);
            if (response.data) {
                setStatus({ type: 'success', message: 'Donation campaign created successfully!' });
                setTimeout(() => {
                    navigate('/dashboard/donation-tracking');
                }, 2000);
            }
        } catch (error) {
            console.error('Error creating donation:', error);
            setStatus({ type: 'danger', message: 'Failed to create donation campaign. Please try again.' });
        }
    };

    return (
        <Container className="create-donation-container mt-4">
            <div className="form-wrapper">
                <h2 className="mb-4 text-center" style={{ color: '#58a4b0' }}>Create Donation Campaign</h2>
                {status.message && <Alert variant={status.type}>{status.message}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Campaign Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="CampaignTitle"
                                    value={formData.CampaignTitle}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter campaign title"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Categories"
                                    value={formData.Categories}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Environment, Education"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="CampaignDescription"
                            value={formData.CampaignDescription}
                            onChange={handleChange}
                            required
                            placeholder="Describe your campaign"
                        />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Goal Amount ($)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="GoalAmount"
                                    value={formData.GoalAmount}
                                    onChange={handleChange}
                                    required
                                    placeholder="5000"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Payment Methods</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="PaymentMethods"
                                    value={formData.PaymentMethods}
                                    onChange={handleChange}
                                    required
                                    placeholder="Credit Card, PayPal, etc."
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Payment Details</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name="Paymentdetail"
                            value={formData.Paymentdetail}
                            onChange={handleChange}
                            required
                            placeholder="Bank account or PayPal details"
                        />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Allow Commenting</Form.Label>
                                <Form.Select
                                    name="AllowCommenting"
                                    value={formData.AllowCommenting}
                                    onChange={handleChange}
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Initial Comment (Optional)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Comment"
                                    value={formData.Comment}
                                    onChange={handleChange}
                                    placeholder="Add an initial comment"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <Button variant="outline-secondary" onClick={() => navigate('/dashboard/donation-tracking')}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" style={{ backgroundColor: '#58a4b0', borderColor: '#58a4b0' }}>
                            Create Campaign
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default CreateDonation;
