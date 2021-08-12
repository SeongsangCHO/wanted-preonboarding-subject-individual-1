import React from "react";
import Input from "Components/common/Input";
import { Calendar } from "Components/common/SvgExporter";

const DateOfBirth = ({ value, error, setFormData }) => {
  const handleDateOfBirth = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Input
      name="dateOfBirth"
      value={value}
      error={error}
      onChange={handleDateOfBirth}
      placeholder="생년월일 6자리를 입력하세요"
      icon={<Calendar />}
      maxLength={6}
      errorMessage="생년월일을 다시 입력해 주세요"
    />
  );
};

DateOfBirth.propTypes = {};

export default DateOfBirth;
