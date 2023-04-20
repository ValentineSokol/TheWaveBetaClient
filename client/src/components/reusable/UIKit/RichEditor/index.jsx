import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons/faShare';
import './RichEditor.scss';
import 'quill-emoji/dist/quill-emoji.css';

class RichEditor extends React.Component {
  render() {
    const {
      className, onChange, onKeyDown, onKeyUp, onSubmit, value,
    } = this.props;
    return (
      <div className="RichEditor">
        <textarea
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          className={className}
          onChange={onChange}
          value={value}
        />
        {
                value
            && (
            <FontAwesomeIcon
              onClick={onSubmit}
              className="SendButton"
              icon={faShare}
            />
            )
        }
      </div>
    );
  }
}
export default RichEditor;
