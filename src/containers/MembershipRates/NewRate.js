import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Spinner,
  Alert,
} from "@themesberg/react-bootstrap";
import Axios from "axios";
import "./MembershipRates.css";
export default ({ setReload }) => {
  const [showDefault, setShowDefault] = useState(false);

  console.log("showDefault ---", showDefault);
  const handleClose = () => setShowDefault(false);

  let initialState = {
    no_of_months: "",
    amount: "",
  };

  let [formValues, onChangeValue] = useState(initialState);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState({});
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    Axios({
      method: "POST",
      url: "http://staging-api.famunera.com/private/v1/admin/rates/Create",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        no_of_months: formValues.no_of_months,
        amount: formValues.amount,
      },
    })
      .then((res) => {
        setIsSuccess(res);
        setLoadingStatus(false);
        setReload(true);
        handleClose();
      })
      .catch((err) => {
        setLoadingStatus(false);
        setIsError(err.response);
      });
  };

  return (
    <React.Fragment>
      <Button
        variant="outline-secondary"
        // size="sm"
        onClick={() => setShowDefault(true)}
      >
        Add Rate
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="h6">Add a New Rate</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>No. of Months</Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder=""
                  value={formValues.no_of_months}
                  onChange={(d) =>
                    onChangeValue({
                      ...formValues,
                      no_of_months: d.target.value,
                    })
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
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder=""
                  value={formValues.amount}
                  onChange={(d) =>
                    onChangeValue({ ...formValues, amount: d.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          {isError && (
            <Alert variant="danger">{`Something wrong happend, contact system admin`}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="btn btn-outline-primary addRate"
            onClick={handleSubmit}
          >
            {!loadingStatus ? (
              `Add Rate`
            ) : (
              <Spinner animation="border" size="sm" />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
