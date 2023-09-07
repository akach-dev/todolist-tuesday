import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
  title: string
  onChangeCallback: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = ({title, onChangeCallback}) => {
  const [editMode, setEditMode] = useState(false)
  const [spanTitle, setSpanTitle] = useState('')

  const onDoubleClickHandler = () => {
    setEditMode(true)
    setSpanTitle(title)
  };
  const activateViewMode = () => {
    setEditMode(false)
    onChangeCallback(spanTitle)
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSpanTitle(e.currentTarget.value)
  };
  return editMode
     ? <input value={spanTitle} autoFocus onBlur={activateViewMode} onChange={onChangeHandler}/>
     : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
};
