import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import style from "../mystyle.module.css";
import { FaTrashAlt, FaPenAlt } from "react-icons/fa";

export default function ProductManagement() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [products, setProducts] = useState([]);
  const [productRows, setProductRows] = useState([]);
  const [modeAdd, setModeAdd] = useState(false);

  const refCode = useRef()
  const refName = useRef()
  const refPrice = useRef()
 

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const rows = data.map((e) => {
          return (
            <tr>
              <td>
                <FaPenAlt onClickCapture={handleShow} />
                &nbsp; &nbsp;
                <FaTrashAlt onClick={() => {}} />
              </td>
              <td>{e.code}</td>
              <td>{e.name}</td>
              <td>{e.price}</td>
            </tr>
          );
        });

        setProducts(data);
        setProductRows(rows);
      });
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setModeAdd(false);
  };

  const handleShow = () => setShow(true);

  const handleShowAdd = () => {
    setShow(true);
    setModeAdd(true);
  };

  const handleFormAction = () => {
    if(modeAdd) {
      const newProduct = {
        code: refCode.current.value,
        name: refName.current.value,
        price: refPrice.current.value
      };
        console.log(newProduct);


        fetch(`${API_URL}/products`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          // credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(newProduct) // body data type must match "Content-Type" header
        })
        .then(res => res.json())
        .then(json => {
          console.log("Fetch Result", json)
        })
    } else {
      //update product
    }
    };


  return (
    <>
      <Container>
        API_URL: {API_URL}
        <h1>Product Management</h1>
        <Button variant="outline-success" onClick={handleShowAdd}>
          Add
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "70px" }}>&nbsp;</th>
              <th className={style.textCenter}>Code</th>
              <th className={style.textCenter}>Name</th>
              <th className={style.textCenter}>Price/Unit</th>
            </tr>
          </thead>
          <tbody>{productRows}</tbody>
        </Table>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modeAdd ? "Add new product" : "Update Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>Code</Col>
              <Col>
                <input type="text" ref={refCode} />
              </Col>
            </Row>
            <Row>
              <Col>Name</Col>
              <Col>
                <input type="text"  ref={refName} />
              </Col>
            </Row>
            <Row>
              <Col>Price</Col>
              <Col>
                <input type="number" ref={refPrice} />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormAction}>
              {modeAdd ? 'Add' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
