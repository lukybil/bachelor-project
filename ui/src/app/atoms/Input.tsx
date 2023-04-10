import { HTMLProps } from 'react';

const Input = ({ type, ...rest }: HTMLProps<HTMLInputElement>) => {
  if (type === 'text') {
    return <input type="text" />;
  }
  return <input type={type} {...rest} />;
};

export default Input;
