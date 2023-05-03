import { HTMLProps, useId, useRef } from 'react';
import styled from 'styled-components';
import Button from './Button';

type InputProps = Omit<HTMLProps<HTMLInputElement>, 'label'>;

const Label = styled.label`
  display: inline-block;
`;

const Input = ({ type, id, ...rest }: InputProps) => {
  const defaultId = useId();
  const labelRef = useRef<HTMLLabelElement>(null);
  const elemId = id ?? defaultId;

  return (
    <div style={{ position: 'relative', width: 'fit-content' }}>
      {type === 'text' ? (
        <input type="text" id={elemId} {...rest} />
      ) : type === 'file' ? (
        <>
          <input style={{ display: 'none' }} type="file" id={elemId} {...rest} />
          <Label ref={labelRef} htmlFor={elemId} style={{ display: 'inline-block' }}>
            <Button onClick={() => labelRef.current?.click()}>Choose file</Button>
          </Label>
        </>
      ) : (
        <input type={type} id={elemId} {...rest} />
      )}
    </div>
  );
};

export default Input;
