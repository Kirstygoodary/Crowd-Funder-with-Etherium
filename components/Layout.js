/**
 * reusable components are in here ready to be imported :)
 */

import React from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";

export default (props) => {
  return (
    <div>
      <Container>
        <Header />
        {props.children}
      </Container>
    </div>
  );
};
