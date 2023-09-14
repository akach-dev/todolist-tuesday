import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
  oldTitle: string
  onChangeOldTitle: (title: string) => void
}


export const EditableSpan: FC<EditableSpanPropsType> = ({oldTitle, onChangeOldTitle}) => {
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState(oldTitle)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)

  };
  const editMode = () => {
    setEdit(!edit)
    if (edit) onChangeOldTitle(title)

  };

  return (
     edit
        ? <input value={title} onChange={onChangeHandler} onBlur={editMode} autoFocus/>
        : <span onDoubleClick={editMode}>{oldTitle}</span>
  )
};
