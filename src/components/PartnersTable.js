import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Button,
  Table,
  Dropdown,
  ButtonGroup,
  Alert,
} from "@themesberg/react-bootstrap";
import UpdatePartner from "../containers/Partners/UpdatePartner";

import Axios from "axios";

export const PartnersTable = ({ reload, setReload }) => {
  const [partners, setPartners] = useState([]);
  const [isError, setError] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://staging-api.famunera.com/partner/v1/partners",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      // params: { featured: true, limit: 6 },
    })
      .then((res) => {
        setPartners(res.data.data.partners);
        setReload(false);
      })
      .catch((err) => setError(err));
  }, [, reload]);

  const totalPartners = partners.length;

  const TableRow = (props) => {
    const { logoUrl, partnername, refeerallink, website, ID } = props;

    return (
      <tr>
        <td>
          <span className="fw-normal">{logoUrl}</span>
        </td>
        <td>
          <span className="fw-normal">{partnername}</span>
        </td>
        <td>
          <span className="fw-normal">{refeerallink}</span>
        </td>
        <td>
          <span className="fw-normal">{website}</span>
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
              <UpdatePartner partnerId={ID} setReload={setReload} />
              {/* <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
              </Dropdown.Item> */}
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
              <th className="border-bottom">Image</th>
              <th className="border-bottom">Partner name</th>
              <th className="border-bottom">Referal Link</th>
              <th className="border-bottom">Website URL</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          {isError && (
            <Alert variant="danger">{`Something wrong happened, contact network admin`}</Alert>
          )}
          <tbody>
            {partners.length !== 0 &&
              partners.map((t) => <TableRow key={t.ID} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          {/* <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav> */}
          <small className="fw-bold">
            Showing <b>{totalPartners}</b> out of <b>{totalPartners}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
