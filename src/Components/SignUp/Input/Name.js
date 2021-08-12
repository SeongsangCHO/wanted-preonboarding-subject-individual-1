import React from "react";
import Input from "Components/common/Input";
import { Person } from "Components/common/SvgExporter";

const Name = ({ value, error, setFormData }) => {
  const handleNameData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Input
      name="name"
      value={value}
      error={error}
      onChange={handleNameData}
      placeholder="이름을 입력하세요"
      icon={<Person />}
      errorMessage="이름을 다시 입력해 주세요"
    />
  );
};

Name.propTypes = {};

export default Name;
