import React, {FC, useState} from 'react';

type EditableSpanPropsType = {
  title: string
}

export const EditableSpan: FC<EditableSpanPropsType> = ({title}) => {
  const [editMode, setEditMode] = useState(false)

  const onDoubleClickHandler = () => {
    setEditMode(true)
  };
  return (
     editMode ? (
        <input type="text"/>
     ) : (
        <span onDoubleClick={onDoubleClickHandler}>{title}</span>
     )
  )
};
