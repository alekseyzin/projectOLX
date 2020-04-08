import React from 'react';
import classnames from 'classnames'

interface IProps {
  type: string;
  id: string;
  labelText: string;
  value: string;
  onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  dataTooltip?: string;
  dataLength?: number;
}

const InputTypeText = (props: IProps) => {

  document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems, {});
  });

  return (
    <div className="row">
      <div className="input-field col s12">
        <input
          value={props.value}
          onChange={props.onChangeHandler}
          id={props.id}
          type={props.type}
          className={classnames("validate", (props.dataTooltip ? "tooltipped" : ""))}
          data-position="right"
          data-tooltip={props.dataTooltip}
          placeholder=""
          data-length={props.dataLength}
        />
        <label htmlFor={props.id} className="active">{props.labelText}</label>
      </div>
    </div>
  )
}

export default React.memo(InputTypeText)