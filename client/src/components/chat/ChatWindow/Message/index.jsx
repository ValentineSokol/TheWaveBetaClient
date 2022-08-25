import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '../../../reusable/Avatar';

const isOutgoingMessage = (message, user) => message.from === user?.id;
function Message({ message, displaySenderInfo }) {
  const user = useSelector((state) => state.global.user);
  const getMessageClass = () => {
    let className;
    if (isOutgoingMessage(message, user)) {
      className = 'OutgoingMessageContainer';
    } else className = 'IncomingMessageContainer';

    if (displaySenderInfo) {
      className += ' FirstMessageInGroup';
    }
    return className;
  };
  if (!user) return null;

  return (
    <CSSTransition
      in={false}
      appear
      timeout={500}
      classNames="scale-fade"
    >
      <div className={getMessageClass()}>
        {
                    displaySenderInfo
                        && (
                        <div className="SenderInfo">
                          <Avatar url={message.author.avatarUrl} />
                          <span className="MessageAuthorName ml-1">
                            <Link
                              to={`/profile/${message.author.id}`}
                            >
                              <h5>{message.author?.username}</h5>
                            </Link>
                          </span>
                        </div>
                        )
                }
        <span
          data-id={message.id}
          data-text={message.text}
          className="MessageText"
          dangerouslySetInnerHTML={{ __html: message.text }}
        />
      </div>
    </CSSTransition>
  );
}

export default React.memo(Message);
