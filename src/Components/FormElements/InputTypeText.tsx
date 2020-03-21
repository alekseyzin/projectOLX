import React, { useState } from 'react';

interface IProps {
  type: string;
  labelText: string;
  value: string;
  onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void
}

const InputTypeText = (props: IProps) => {

  return (
    <div className="row">
      <div className="input-field col s12">
        <input
          value={props.value}
          onChange={props.onChangeHandler}
          id={props.type}
          type={props.type}
          className="validate"
        />
        <label htmlFor={props.type}>{props.labelText}</label>
      </div>
    </div>
  )
}

export default React.memo(InputTypeText)