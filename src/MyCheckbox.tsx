import React, {ChangeEvent, FC} from 'react';

type MyCheckboxPropsType = {
  checked: boolean
  onChange: (event: boolean) => void
}

export const MyCheckbox: FC<MyCheckboxPropsType> = ({checked, onChange}) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.checked)
  };
  return <input type="checkbox" checked={checked} onChange={onChangeHandler}/>
};
