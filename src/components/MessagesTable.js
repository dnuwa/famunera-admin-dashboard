import React, { useState, useEffect } from "react";
import {
  Nav,
  Card,
  Table,
  Pagination,
  Spinner,
  Alert,
} from "@themesberg/react-bootstrap";

import messages from "../data/messages";
import Axios from "axios";

export const MessagesTable = ({ reload }) => {
  const [message, setMessages] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isError, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoadingStatus(true);
    Axios({
      method: "GET",
      url: `http://staging-api.famunera.com/partner/v1/messages`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    })
      .then((res) => {
        setMessages(res.data.data.blogs);
        setLoadingStatus(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingStatus(false);
      });
  }, [, limit, page, reload]);

  const totalMessages = messages.length;

  const TableRow = (props) => {
    const { id, group, message, count, created } = props;

    return (
      <tr>
        <td>
          <span className="fw-normal">{id}</span>
        </td>
        <td>
          <span className="fw-normal">{group}</span>
        </td>
        <td>
          <span className="fw-normal">{message}</span>
        </td>
        <td>
          <span className="fw-normal">{count}</span>
        </td>
        <td>
          <span className="fw-normal">{created}</span>
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
              <th className="border-bottom">Group</th>
              <th className="border-bottom">Message</th>
              <th className="border-bottom">Count</th>
              <th className="border-bottom">Created</th>
            </tr>
          </thead>
          <tbody>
            {isError && (
              <Alert variant="danger">{`Something wrong happend, contact system admin`}</Alert>
            )}
            {/* {loadingStatus ? (
              <Spinner animation="border" />
            ) : (
              messages.map((t) => (
                <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />
              ))
            )} */}
          </tbody>
        </Table>
        {!loadingStatus && (
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev>Previous</Pagination.Prev>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Next>Next</Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{totalMessages}</b> out of <b>25</b> entries
            </small>
          </Card.Footer>
        )}
      </Card.Body>
    </Card>
  );
};
