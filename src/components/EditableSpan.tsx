import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
  oldTitle: string
  callback: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = ({oldTitle, callback}) => {
  const [newTitle, setNewTitle] = useState(oldTitle)
  const [isOpen, setIsOpen] = useState(false)


  const isOpenHandler = () => {
    setIsOpen(!isOpen)
    if (isOpen) {
      callback(newTitle)
    }

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