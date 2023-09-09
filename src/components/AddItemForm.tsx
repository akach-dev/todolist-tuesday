import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

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
              onKeyPress={onKeyPressHandler}
              className={error ? "error" : ""}
       />
       <button onClick={addTaskHandler}>+</button>
       {error && <div className="error-message">{error}</div>}
     </div>
  );
};
