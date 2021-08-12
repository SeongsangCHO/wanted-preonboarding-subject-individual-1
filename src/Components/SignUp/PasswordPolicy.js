import React from "react";
import styled, { css } from "styled-components";
import { checkIcon } from "Components/common/SvgExporter";

const PasswordPolicy = ({ passwordError }) => {
  return (
    <Container passwordError={passwordError}>
      <div>
        <span className="password-pwNum">숫자</span>
      </div>
      <div>
        <span className="password-spe">특수문자</span>
      </div>
      <div>
        <span className="password-eng">영문</span>
      </div>
      <div>
        <span className="password-digit">8자리 이상</span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => theme.flexSet("space-around")};

  > div {
    span {
      color: ${({ theme }) => theme.color.borderline};
      text-align: center;
      font-size: 15px;
    }
    &::before {
      display: inline-block;
      background: url(${checkIcon});
      content: "";
      width: 20px;
      height: 16px;
    }
    .password-pwNum {
      ${(props) =>
        props.passwordError.pwNum &&
        css`
          color: ${({ theme }) => theme.color.green};
          font-weight: 600;
        `};
    }
    .password-eng {
      ${(props) =>
        props.passwordError.eng &&
        css`
          color: ${({ theme }) => theme.color.green};
          font-weight: 600;
        `};
    }
    .password-spe {
      ${(props) =>
        props.passwordError.spe &&
        css`
          color: ${({ theme }) => theme.color.green};
          font-weight: 600;
        `};
    }
    .password-digit {
      ${(props) =>
        props.passwordError.digit &&
        css`
          color: ${({ theme }) => theme.color.green};
          font-weight: 600;
        `};
    }
  }
`;
export default PasswordPolicy;
