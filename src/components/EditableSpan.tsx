import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
  oldTitle: string
  callback: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = ({oldTitle, callback}) => {
  const [newTitle, setNewTitle] = useState(oldTitle)
  const [isOpen, setIsOpen] = useState(false)


  const isOpenHandler = () => {
    setIsOpen(!isOpen)
    if (isOpen && newTitle) {
      callback(newTitle)
    }

  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  };
  return (
     isOpen
        ? <TextField
           value={newTitle}
           onChange={onChangeHandler}
           onBlur={isOpenHandler}
           autoFocus
        />
        : <span onDoubleClick={isOpenHandler}>{oldTitle}</span>
  )


};
