import { HTMLProps, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FONT_SIZE, SHADOW, SPACING } from '../style/style';
import {
  COLOR_CONTRAST_PRIMARY,
  COLOR_DARK_FILTER,
  COLOR_TERTIARY,
  COLOR_WHITE,
} from '../style/theme';
import ClickAwayListener from './ClickAwayListener';

interface Option {
  value: string;
  text: React.ReactNode;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string | null) => void;
  width?: string;
  outerStyle?: React.CSSProperties;
}

const Container = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const StyledSelect = styled.div`
  border: 2px solid ${COLOR_CONTRAST_PRIMARY};
  padding: ${SPACING.sm};
  font-size: ${FONT_SIZE.md};
  border-radius: ${SPACING.sm};
  user-select: none;
`;

const StyledOption = styled.li<
  HTMLProps<HTMLLIElement> & { selected?: boolean }
>`
  padding: ${SPACING.sm};
  &:hover {
    background-color: ${COLOR_DARK_FILTER};
  }
  ${({ selected }) => selected && `background-color: ${COLOR_TERTIARY}`}
`;

const OptionsContainer = styled.ul`
  list-style: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${COLOR_WHITE};
  border-radius: ${SPACING.sm};
  overflow: auto;
  max-height: 300px;
  width: 100%;
  box-shadow: ${SHADOW.md};
`;

const Select = ({
  options,
  value,
  onChange,
  width,
  outerStyle,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(
    options.find((option) => option.value === value) ?? null
  );

  useEffect(() => {
    onChange(selected?.value ?? null);
  }, [selected?.value, onChange]);

  const handleOptionPick = (option: Option) => {
    setSelected(option);
    setOpen(false);
  };

  const renderedOptions = useMemo(
    () =>
      options.map(({ value, text }) => (
        <StyledOption
          key={value}
          value={value}
          onClick={() => handleOptionPick({ value, text })}
          selected={value === selected?.value}
        >
          {text}
        </StyledOption>
      )),
    [options, selected?.value]
  );

  return (
    <Container style={outerStyle}>
      <ClickAwayListener listen={open} onClickAway={() => setOpen(false)}>
        <div style={{ position: 'relative' }}>
          <StyledSelect
            style={{ width: width ?? '200px' }}
            onClick={() => setOpen((old) => !old)}
          >
            <span>{selected?.text}</span>
          </StyledSelect>
          {open && <OptionsContainer>{renderedOptions}</OptionsContainer>}
        </div>
      </ClickAwayListener>
    </Container>
  );
};

export default Select;
