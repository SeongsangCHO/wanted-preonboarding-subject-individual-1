import React from "react";
import PropTypes from "prop-types";
import Input from "Components/common/Input";
import styled from "styled-components";
import { Card } from "Components/common/SvgExporter";

const CreditCard = ({ openModal, value, error }) => {
  return (
    <CreditCardWrapper onClick={openModal}>
      <Input
        name="creditCardNum"
        value={value}
        error={error}
        placeholder="신용카드 정보를 입력하세요"
        icon={<Card />}
        errorMessage="카드번호를 다시 입력해 주세요"
      />
      <span>번호입력</span>
    </CreditCardWrapper>
  );
};

const CreditCardWrapper = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 12.5px;
    right: 2px;
    color: ${({ theme }) => theme.color.green};
    font-size: 13px;
    font-weight: 600;
    padding: 10px 50px 13px 0;
    cursor: pointer;
    background-color: white;
  }
  svg {
    z-index: 1;
  }
`;
export default CreditCard;
