import React from 'react';
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import './RichEditor.scss';
import 'quill-emoji/dist/quill-emoji.css';

class RichEditor extends React.Component {
  onChange = (content, delta, source, editor) => {
    const isEmpty = editor.getText().replace(/\n/g, '');
    const message = isEmpty ? '' : content;
    const { onChange: changeHandler } = this.props;
    changeHandler(message);
  };

  render() {
    const {
      className, onKeyDown, onKeyUp, onSubmit, value,
    } = this.props;
    return (
      <div className="RichEditor">
        <ReactQuill
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          className={className}
          onChange={this.onChange}
          value={value}
          modules={{ toolbar: false }}
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
