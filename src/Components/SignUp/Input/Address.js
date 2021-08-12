import React from "react";
import Input from "Components/common/Input";
import styled from "styled-components";
import { Map } from "Components/common/SvgExporter";

const Address = ({ formData, errors, setFormData, openModal }) => {
  const handleDetailAddress = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <AddressWrapper>
      <div className="address-main" onClick={openModal}>
        <Input
          name="address"
          value={formData.address}
          placeholder="주소를 입력하세요"
          icon={<Map />}
          error={errors.address}
          errorMessage="주소를 다시 입력해 주세요"
        />
        <span>주소검색</span>
      </div>
      {formData.address && (
        <Input
          name="detailAddress"
          value={formData.detailAddress}
          onChange={handleDetailAddress}
          placeholder="상세주소를 입력하세요"
          icon={<Map />}
          error={errors.detailAddress}
          errorMessage="상세주소를 다시 입력해 주세요"
        />
      )}
    </AddressWrapper>
  );
};

const AddressWrapper = styled.div`
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
export default Address;
