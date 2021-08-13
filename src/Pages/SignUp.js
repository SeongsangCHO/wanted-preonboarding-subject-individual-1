import React, { useState } from "react";
import styled from "styled-components";
import { hashSync } from "Utils/bcrypt";
import useModalToggle from "Utils/useModalToggle";
import { AUTH_LEVEL, USER_STORAGE } from "Utils/constants";
import { loadLocalStorage, saveLocalStorage, autoIncrementUserId } from "Utils/Storage";
import { isEmail, isPassword, isName, isDateOfBirth, isCreditNum } from "Utils/validator.js";
import { Button, Modal, AddressModal, SignupModal, CreditModal } from "Components/common";
import {
  AuthSelector,
  Password,
  PasswordChecker,
  PasswordPolicy,
  Email,
  Name,
  Address,
  CreditCard,
  DateOfBirth,
} from "Components/SignUp";
import { ClosedEye, OpenedEye, Map } from "Components/common/SvgExporter";

const SignUp = () => {
  const { modalToggle, setModalType, isModalOpen, modalType } = useModalToggle();
  const [emailDuplicateStatus, setEmailDuplicateStatus] = useState(SIGNUP_EMAIL_STATUS.default);
  const [emailDuplicateChecked, setEmailDuplicateChecked] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [passwordError, setPasswordError] = useState({
    pwNum: false,
    eng: false,
    spe: false,
    digit: false,
  });
  const [formData, setFormData] = useState({
    authority: AUTH_LEVEL.unknown,
    email: "",
    pw: "",
    pwCheck: "",
    name: "",
    address: "",
    detailAddress: "",
    creditCardNum: "",
    dateOfBirth: "",
  });

  const initialState = {
    authority: false,
    email: false,
    pw: false,
    pwCheck: false,
    name: false,
    address: false,
    detailAddress: false,
    creditCardNum: false,
    dateOfBirth: false,
  };
  const [errors, setErrors] = useState(initialState);

  const validator = {
    authority: (authority) => !(authority === AUTH_LEVEL.unknown),
    email: (email) => isEmail(email),
    pw: (pw) => isPassword(pw),
    pwCheck: (pwCheck) => pwCheck === formData.pw,
    name: (name) => isName(name),
    address: (address) => !(address === ""),
    detailAddress: (detailAddress) => !(detailAddress === ""),
    dateOfBirth: (dateOfBirth) => isDateOfBirth(dateOfBirth),
    creditCardNum: (creditCardNum) => isCreditNum(creditCardNum),
  };

  const isAllValid = (data) => {
    for (const name in data) {
      const value = data[name];
      const validateFunction = validator[name];

      if (!validateFunction(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: true,
        }));
        return false;
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: false,
        }));
      }
    }
    return true;
  };

  const handleClickDuplicateCheck = () => {
    setEmailDuplicateChecked(true);

    if (!isEmail(formData.email)) {
      setErrors({ ...errors, email: true });
      setEmailDuplicateStatus(SIGNUP_EMAIL_STATUS.invalidType);
      return;
    }

    const userData = loadLocalStorage(USER_STORAGE);
    if (!userData) {
      setErrors({ ...errors, email: false });
      setEmailDuplicateStatus(SIGNUP_EMAIL_STATUS.confirmedSuccess);
      return;
    }

    const searchEmail = userData.filter((user) => user.email === formData.email);
    if (searchEmail.length) {
      setErrors({ ...errors, email: true });
      setEmailDuplicateStatus(SIGNUP_EMAIL_STATUS.confirmedFailure);
    } else {
      setErrors({ ...errors, email: false });
      setEmailDuplicateStatus(SIGNUP_EMAIL_STATUS.confirmedSuccess);
    }
  };

  const getEmailStatusMessage = (status) => {
    let message = errors.email ? "이메일을 입력하세요" : "";
    if (status === SIGNUP_EMAIL_STATUS.invalidType) message = "이메일 형식을 확인해주세요";
    else if (status === SIGNUP_EMAIL_STATUS.unConfirmed) message = "중복 검사를 진행해주세요";
    else if (status === SIGNUP_EMAIL_STATUS.confirmedFailure) message = "중복된 이메일 입니다.";
    return message;
  };

  const toggleModal = (modal) => {
    modalToggle();
    setModalType(modal);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (!emailDuplicateChecked) {
      setErrors((prev) => ({
        ...prev,
        email: true,
      }));
      setEmailDuplicateStatus(SIGNUP_EMAIL_STATUS.unConfirmed);
      return;
    }

    const allValid = isAllValid(formData);
    if (allValid) {
      formData.id = autoIncrementUserId();
      formData.pw = hashSync(formData.pw, 8);
      delete formData.pwCheck;

      const userData = loadLocalStorage(USER_STORAGE);
      userData
        ? saveLocalStorage(USER_STORAGE, [...userData, formData])
        : saveLocalStorage(USER_STORAGE, [formData]);
      toggleModal("success");
    }
  };

  const handleVisiblePasswordIcon = () => {
    return visiblePassword ? (
      <ClosedEye onClick={() => setVisiblePassword(!visiblePassword)} />
    ) : (
      <OpenedEye onClick={() => setVisiblePassword(!visiblePassword)} />
    );
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSignupSubmit} passwordError={passwordError}>
        <h4>회원가입</h4>
        <AuthSelector
          value={formData.authority}
          error={errors.authority}
          setFormData={setFormData}
        />
        <Email
          formData={formData.email}
          setFormData={setFormData}
          errors={errors.email}
          errorMessage={getEmailStatusMessage(emailDuplicateStatus)}
          successMessage={emailDuplicateChecked && "사용 가능한 이메일 입니다"}>
          <Button value="중복확인" width="20%" onClick={handleClickDuplicateCheck} />
        </Email>
        <Password
          value={formData.pw}
          error={errors.pw}
          setPasswordError={setPasswordError}
          icon={handleVisiblePasswordIcon()}
          type={visiblePassword ? "password" : "text"}
          setFormData={setFormData}
        />
        <PasswordPolicy passwordError={passwordError} />

        <PasswordChecker
          formData={formData}
          error={passwordCheckError}
          setPasswordCheckError={setPasswordCheckError}
          setFormData={setFormData}
          type={visiblePassword ? "password" : "text"}
          icon={handleVisiblePasswordIcon()}
        />
        <Name value={formData.name} setFormData={setFormData} error={errors.name} />
        <Address
          openModal={() => toggleModal("address")}
          formData={formData}
          icon={<Map />}
          errors={errors}
          setFormData={setFormData}
        />
        <CreditCard
          value={formData.creditCardNum}
          error={errors.creditCardNum}
          openModal={() => toggleModal("credit")}
        />
        <DateOfBirth
          value={formData.dateOfBirth}
          error={errors.dateOfBirth}
          setFormData={setFormData}
        />

        <Button type="submit" value="회원가입" marginTop="10px" />

        <Modal isOpen={isModalOpen} toggleModal={toggleModal} modalType={modalType}>
          <>
            {modalType === "success" && <SignupModal />}
            {modalType === "address" && (
              <AddressModal toggleModal={toggleModal} setFormData={setFormData} />
            )}
            {modalType === "credit" && (
              <CreditModal
                creditCard={formData.creditCardNum}
                setFormData={setFormData}
                toggleModal={toggleModal}
              />
            )}
          </>
        </Modal>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  width: 100%;
  height: calc(100% - 72px);
`;

const Form = styled.form`
  width: 600px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.color.borderline};

  h4 {
    font-size: 30px;
    margin-bottom: 20px;
    font-weight: 500;
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 0;
  }
`;

const SIGNUP_EMAIL_STATUS = {
  default: 0,
  invalidType: 1,
  unConfirmed: 2,
  confirmedFailure: 3,
  confirmedSuccess: 4,
};

export default SignUp;
