import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
} from "@themesberg/react-bootstrap";
import Axios from "axios";

export default ({ setReload }) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  let initialState = {
    currency: "",
    selling_price: "",
    buying_price: "",
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
      url: "http://staging-api.famunera.com/partner/v1/forexRates/Create",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        currency: formValues.currency,
        selling_price: formValues.selling_price,
        buying_price: formValues.buying_price,
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
      <Button variant="outline-secondary" onClick={() => setShowDefault(true)}>
        Add Currency
      </Button>

      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        size="md"
      >
        <Modal.Header>
          <Modal.Title className="h6">Add Forex Rate</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Currency Name</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder=""
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  currency: d.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Selling Price</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder=""
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  selling_price: d.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Buying Price</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder=""
              onChange={(d) =>
                onChangeValue({
                  ...formValues,
                  buying_price: d.target.value,
                })
              }
              required
            />
          </Form.Group>

          {isError && (
            <Alert variant="danger">{`Something wrong happend, contact system admin`}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={handleSubmit}
          >
            {!loadingStatus ? `Save` : <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
