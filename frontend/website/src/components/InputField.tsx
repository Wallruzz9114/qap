/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from '@emotion/react';
import { ChangeEvent, useContext } from 'react';
import { fontFamily, fontSize, gray2, gray5, gray6 } from '../utils/styles';
import { FormContext } from './CustomForm';

interface IProps {
  name: string;
  label?: string;
  type?: 'Text' | 'TextArea' | 'Password';
}

const baseCSS = css`
  box-sizing: border-box;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  margin-bottom: 5px;
  padding: 8px 10px;
  border: 1px solid ${gray5};
  border-radius: 3px;
  color: ${gray2};
  background-color: white;
  width: 100%;

  :focus {
    outline-color: ${gray5};
  }

  :disabled {
    background-color: ${gray6};
  }
`;

const InputField: React.FC<IProps> = ({ name, label, type = 'Text' }) => {
  const { setValue, touched, setTouched, validate } = useContext(FormContext);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (setValue) {
      setValue(name, event.currentTarget.value);

      if (touched[name]) {
        if (validate) {
          validate(name);
        }
      }
    }
  };

  const handleBlur = () => {
    if (setTouched) {
      setTouched(name);
    }
    if (validate) {
      validate(name);
    }
  };

  return (
    <FormContext.Consumer>
      {({ values, errors }) => (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
          `}
        >
          {label && (
            <label
              css={css`
                font-weight: bold;
              `}
              htmlFor={name}
            >
              {label}
            </label>
          )}
          {(type === 'Text' || type === 'Password') && (
            <input
              type={type.toLowerCase()}
              id={name}
              value={values[name] === undefined ? '' : values[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              css={baseCSS}
            />
          )}
          {type === 'TextArea' && (
            <textarea
              id={name}
              value={values[name] === undefined ? '' : values[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              css={css`
                ${baseCSS};
                height: 100px;
              `}
            ></textarea>
          )}

          {errors[name] &&
            errors[name].length > 0 &&
            errors[name].map((error) => (
              <div
                key={error}
                css={css`
                  font-size: 12px;
                  color: red;
                `}
              >
                {error}
              </div>
            ))}
        </div>
      )}
    </FormContext.Consumer>
  );
};

export { InputField };
