import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Alert,
  Toast,
} from "@themesberg/react-bootstrap";
import { faBootstrap } from '@fortawesome/free-brands-svg-icons';
import Axios from "axios";

export default () => {
  const [showDefault, setShowDefault] = useState(false);

  const [showDefaultToast, setShowDefaultToast] = useState(true);
  const toggleDefaultToast = () => setShowDefaultToast(!showDefault);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  let initialState = {
    username: "",
    fullname: "",
    role: "",
    email: "",
    phone: "",
    password: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  const handleClose = () => {setShowDefault(false); setError(false)};

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios({
      method: "POST",
      url: "http://staging-api.famunera.com/private/v1/admin/Create",
      data: {
        username: formValues.username,
        role: formValues.role,
        fullname: formValues.fullname,
        email: formValues.email,
        phone: formValues.phone,
        password: formValues.password,
        partnerId: parseInt(localStorage.getItem("partnerId")),
      },
    })
      .then((res) => {
        setSuccess(res);
        handleClose();
      })
      .catch((err) => setError(err.response));
  };

  return (
    <React.Fragment>
      {/* <Toast show={showDefaultToast} onClose={toggleDefaultToast} className="my-3">
        <Toast.Header className="text-primary" closeButton={false}>
          <FontAwesomeIcon icon={faBootstrap} />
          <strong className="me-auto ms-2">Volt</strong>
          <small>11 mins ago</small>
          <Button variant="close" size="xs" onClick={toggleDefaultToast} />
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
      </Toast> */}

      <Button
        className="btn btn-primary"
        size="sm"
        onClick={() => setShowDefault(true)}
      >
        Create Admin
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="h6">Add Admin</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.username}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, username: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.fullname}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, fullname: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Role</Form.Label>
                <Form.Select
                  size="sm"
                  value={formValues.role}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, role: d.target.value })
                  }
                >
                  <option>Select</option>
                  <option>Sales</option>
                  <option>Operations</option>
                  <option>Super Admin</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  placeholder=""
                  value={formValues.email}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, email: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  value={formValues.phone}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, phone: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  placeholder=""
                  value={formValues.password}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, password: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          {error && error.status === 400 && (
            <Alert variant="danger">{error.data.message}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
