import React from "react";
import Input from "Components/common/Input";
import { isEng, isPwNum, isSpe } from "Utils/validator.js";

const Password = ({ value, error, setPasswordError, icon, type, setFormData }) => {
  const passwordErrorCheck = (e) => {
    const { name, value } = e.target;
    setPasswordError((prev) => ({
      ...prev,
      eng: isEng(value) >= 0,
      pwNum: isPwNum(value) >= 0,
      spe: isSpe(value) >= 0,
      digit: value.length >= 8,
    }));
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Input
      name="pw"
      value={value}
      error={error}
      onChange={passwordErrorCheck}
      placeholder="비밀번호를 입력하세요"
      type={type}
      icon={icon}
      errorMessage="비밀번호를 다시 입력해 주세요"
    />
  );
};

Password.propTypes = {};

export default Password;
