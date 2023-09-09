import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
  oldTitle: string
}

export const EditableSpan: FC<EditableSpanPropsType> = ({oldTitle}) => {
  const [newTitle, setNewTitle] = useState(oldTitle)
  const [isOpen, setIsOpen] = useState(false)


  const isOpenHandler = () => {
    setIsOpen(!isOpen)
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  };
  return (
     isOpen
        ? <input
           value={newTitle}
           onChange={onChangeHandler}
           onBlur={isOpenHandler}
           autoFocus/>
        : <span onDoubleClick={isOpenHandler}>{oldTitle}</span>
  )


};
