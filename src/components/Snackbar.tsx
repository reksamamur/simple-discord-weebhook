import React, { useState } from "react";
import "../App.css";
import { Toast } from "react-bootstrap";

interface Props {
    text: string;
    showSnack: boolean
}

const Snackbar: React.FC<Props> = ({ text, showSnack }) => {
  const [show, setShow] = useState(showSnack);
  return (
    <div>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
    </div>
  );
};

export default Snackbar;
