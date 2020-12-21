import React, { useState } from "react";
import "../App.css";
import { Check, X } from "react-feather";

interface Props {
  text: string;
  valid: boolean;
  color: string;
}

// text-green-500 text-red-500

const Validation: React.FC<Props> = ({ text, valid, color }) => {
  return (
    <div>
      <div className="flex items-center font-medium my-1">
        {valid ? (
          <Check className="text-green-500" />
        ) : (
          <X className="text-red-500" />
        )}
        <div className="ml-2">
          <span className={color}>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default Validation;
