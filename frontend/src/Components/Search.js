import React from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Search = ({ word, setWord, handleSubmit }) => {
  const onWordChange = (e) => {
    //console.log("onWordChange",e.target.value, e);
    setWord(e.target.value);
  };

  return (
    <Container className="mt-4 ">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Col xs={9}>
                <Form.Control
                  value={word}
                  type="text"
                  onChange={(e) => onWordChange(e)}
                  placeholder="Search for images ..."
                />
              </Col>
              <Col sm={2}>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
