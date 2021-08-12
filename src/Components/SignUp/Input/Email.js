import React from "react";
import Input from "Components/common/Input";
import styled from "styled-components";
import { Mail } from "Components/common/SvgExporter";

const Email = ({ children, formData, setFormData, errors, successMessage, errorMessage }) => {
  const handleEmail = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <EmailWrapper>
      <Input
        name="email"
        value={formData.email}
        onChange={handleEmail}
        placeholder="이메일을 입력하세요"
        icon={<Mail />}
        error={errors}
        errorMessage={errorMessage}
        successMessage={successMessage}
        width="75%"
      />
      {children}
    </EmailWrapper>
  );
};

const EmailWrapper = styled.div`
  ${({ theme }) => theme.flexSet("space-between")};
`;

export default Email;
