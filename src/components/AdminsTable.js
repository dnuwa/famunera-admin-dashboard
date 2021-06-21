import React, { useEffect, useState } from "react";
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
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../routes";
import moment from "moment-timezone";
import Axios from "axios";

export const AdminsTable = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    Axios.get(`http://staging-api.famunera.com/private/v1/admin`).then(
      (res) => {
        const persons = res.data.data.adminUsers;
        setState({ persons });
      }
    );
  }, []);

  const TableRow = (props) => {
    const { username, fullname, phone, email, role, created } = props;

    return (
      <tr>
        <td>
          <span className="fw-normal">{username}</span>
        </td>
        <td>
          <span className="fw-normal">{fullname}</span>
        </td>
        <td>
          <span className="fw-normal">{phone}</span>
        </td>
        <td>
          <span className="fw-normal">{email}</span>
        </td>
        <td>
          <span className="fw-normal">{role}</span>
        </td>
        <td>
          <span className="fw-normal">
            {moment(created).format("DD MMM YYYY")}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
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
                <FontAwesomeIcon icon={faEye} className="me-2" /> View
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
              <th className="border-bottom">Username</th>
              <th className="border-bottom">Full Name</th>
              <th className="border-bottom">Phone</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">Role</th>
              <th className="border-bottom">Created</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.length !== 0 &&
              state.persons
                .filter(
                  (itemInArray) =>
                    itemInArray.partnerId ===
                    parseInt(localStorage.getItem("partnerId"))
                )
                .map((t) => <TableRow key={t.ID} {...t} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
