import React from "react";
import Radio from "Components/common/Radio";
import { AUTH_LEVEL } from "Utils/constants";

const AUTH_SELECTOR_LABEL = [
  { value: AUTH_LEVEL.teacher, label: "선생님" },
  { value: AUTH_LEVEL.parent, label: "부모님" },
];

const AuthSelector = ({ value, error, setFormData }) => {
  const changeAuthority = (authority) => {
    setFormData((prev) => ({
      ...prev,
      authority,
    }));
  };
  return (
    <Radio
      name="authority"
      value={value}
      onChange={changeAuthority}
      data={AUTH_SELECTOR_LABEL}
      error={error}
      errorMessage="원하시는 계정 유형을 선택해 주세요."
    />
  );
};

AuthSelector.propTypes = {};

export default AuthSelector;
