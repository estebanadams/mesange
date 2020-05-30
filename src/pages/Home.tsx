import React from "react";
import { PageHeader, Col, Button } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Col span="24">
      <PageHeader
        className="site-page-header"
        title="MESANGE"
        subTitle="React encrypted chat"
      />
      <Link to="/signup">
        <Button className="button" type="primary">
          SignUp
        </Button>
      </Link>
      <Link to="/login">
        <Button className="button" type="primary">
          Login
        </Button>
      </Link>
    </Col>
  );
};

export default Home;
