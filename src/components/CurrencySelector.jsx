import styled from "@emotion/styled";

const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0.5rem 0;
`;

const Select = styled.select`
  width: 30%;
  padding: 12px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  border: none;
  font-size: 1rem;
  font-weight: bold;
`;

const CurrencyInput = styled.input`
  width: 63%;
  padding: 12px;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  border: none;
  border-right: 1px solid #000;
  font-size: 1rem;
  font-weight: bold;
`;

const CurrencySelector = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  onChangeAmount,
  amount,
}) => {
  return (
    <SelectContainer>
      <CurrencyInput type="number" value={amount} onChange={onChangeAmount} />
      <Select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </Select>
    </SelectContainer>
  );
};

export default CurrencySelector;
