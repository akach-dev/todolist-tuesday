import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

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

       <TextField value={inputTitle}
                  onChange={onChangeHandler}
                  onKeyDown={onKeyPressHandler}
                  error={!!error}
                  label={'Title'}
                  helperText={error}
       />
       <IconButton onClick={addTaskHandler} color={"primary"}>
         <AddBox/>
       </IconButton>
     </div>
  );
};
