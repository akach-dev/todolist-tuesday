import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Button} from "@mui/material";

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = ({addItem}) => {

  let [inputTitle, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)


  const addTaskHandler = () => {
    if (inputTitle.trim()) {
      addItem(inputTitle.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.code === 'Enter') {
      addTaskHandler();
    }
  }
  return (
     <div>
       <input value={inputTitle}
              onChange={onChangeHandler}
              onKeyDown={onKeyPressHandler}
              className={error ? "error" : ""}
       />
       <Button onClick={addTaskHandler} color={"primary"} variant={"contained"}
               style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>+</Button>

       {error && <div className="error-message">{error}</div>}
     </div>
  );
};
