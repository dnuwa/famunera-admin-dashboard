import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsisH, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Card,
  Button,
  Table,
  Dropdown,
  Pagination,
  ButtonGroup,
  Alert,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../routes";
import Axios from "axios";

export const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [isError, setError] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `http://staging-api.famunera.com/partner/v1/orders/partnerOrders/${localStorage.getItem(
        "partnerId"
      )}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      // params: { featured: true, limit: 6 },
    })
      .then((res) => setOrders(res.data.data.orders))
      .catch((err) => setError(err));
  }, []);

  const totalOrders = orders.length;

  const TableRow = (props) => {
    const {
      order_id,
      reference_id,
      order_date,
      order_by,
      phone_number,
      payment_method,
      payment_status,
    } = props;

    return (
      <tr>
        <td>
          <Card.Link
            as={Link}
            to={`order/${order_id}`}
            className="fw-normal"
          >
            {reference_id}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{order_date}</span>
        </td>
        <td>
          <span className="fw-normal">{order_by}</span>
        </td>
        <td>
          <span className="fw-normal">{phone_number}</span>
        </td>
        <td>
          <span className="fw-normal">{payment_method}</span>
        </td>
        <td>
          <span className="fw-normal">{payment_method}</span>
        </td>
        <td>
          <span className="fw-normal">{payment_status}</span>
        </td>
        <td>
          <Card.Link
            as={Link}
            to={`order/${order_id}`}
            className="fw-normal"
          >
            <FontAwesomeIcon icon={faEye} className="me-2" /> View
          </Card.Link>
          {/* <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Card.Link
                  as={Link}
                  to={`order/${reference_id}`}
                  className="fw-normal"
                >
                  <FontAwesomeIcon icon={faEye} className="me-2" /> View
                </Card.Link>
              </Dropdown.Item>
              {localStorage.getItem("partnerId") === "1" && (
                <Dropdown.Item>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Update
                  status
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown> */}
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">ID</th>
              <th className="border-bottom">Date</th>
              <th className="border-bottom">Customer</th>
              <th className="border-bottom">Contact</th>
              <th className="border-bottom">Order Method</th>
              <th className="border-bottom">Payment Method</th>
              <th className="border-bottom">Payment Status</th>
              <th className="border-bottom">Bonuses</th>
              {/* <th className="border-bottom"></th> */}
            </tr>
          </thead>
          {isError && (
            <Alert variant="danger">{`Something wrong happened, contact network admin`}</Alert>
          )}
          <tbody>
            {orders.length !== 0 ? (
              orders.map((t) => <TableRow key={t.reference_id} {...t} />)
            ) : (
              <>No Data</>
            )}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              {/* <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item> */}
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalOrders}</b> out of <b>{totalOrders}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
