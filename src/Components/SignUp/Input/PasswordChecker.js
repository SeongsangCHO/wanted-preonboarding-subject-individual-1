import React from "react";
import PropTypes from "prop-types";
import { ClosedEye, OpenedEye } from "Components/common/SvgExporter";
import Input from "Components/common/Input";

const PasswordChecker = ({ formData, error, icon, type, setPasswordCheckError, setFormData }) => {
  const validCheck = (e) => {
    const { name, value } = e.target;
    setPasswordCheckError(value !== formData.pw);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Input
      name="pwCheck"
      value={formData.pwCheck}
      error={error}
      onChange={validCheck}
      placeholder="비밀번호를 다시 입력하세요"
      type={type}
      icon={icon}
      errorMessage="비밀번호를 다시 입력해 주세요"
    />
  );
};

PasswordChecker.propTypes = {};

export default PasswordChecker;
