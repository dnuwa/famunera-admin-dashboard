import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisH,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Card,
  Button,
  Table,
  Dropdown,
  Pagination,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../routes";
import rates from "../data/xrates";
import UpdateRate from "../containers/MembershipRates/UpdateRate";

export const RatesTable = ({ setReload, reload }) => {
  const totalRates = rates.length;

  const TableRow = (props) => {
    const { ID, months, amount } = props;

    return (
      <tr>
        <td>
          <span className="fw-normal">{months}</span>
        </td>
        <td>
          <span className="fw-normal">{amount}</span>
        </td>
        <td>
          <td className="d-lg-flex">
            {/* <Button variant="outline-success" className="m-1" size="sm">
            <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
          </Button> */}
            {/* <UpdateAdvert /> */}
            <Card.Link
              as={Link}
              to={`membership_rates/${ID}`}
              className="fw-normal"
            ></Card.Link>

            <UpdateRate rateId={ID} setReload={setReload} />
          </td>
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
              <th className="border-bottom">No. of Months</th>
              <th className="border-bottom">Amount in UGX</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((t) => (
              <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalRates}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
