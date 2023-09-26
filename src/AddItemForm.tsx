import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title);
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
      addItem();
    }
  }

  const buttonStyle = {
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',
  }

  return <div>
    {/*<input value={title}*/}
    {/*       onChange={onChangeHandler}*/}
    {/*       onKeyPress={onKeyPressHandler}*/}
    {/*       className={error ? "error" : ""}*/}
    {/*/>*/}
    <TextField
       error={!!error}
       id="outlined-basic"
       label={error ? 'Title is required' : ""}
       size="small"
       variant="outlined"
       value={title}
       onChange={onChangeHandler}
       onKeyPress={onKeyPressHandler}
       className={error ? "error" : ""}
    />
    <Button
       size={"small"}
       style={buttonStyle}
       variant="contained"
       onClick={addItem}>+</Button>
  </div>
}
