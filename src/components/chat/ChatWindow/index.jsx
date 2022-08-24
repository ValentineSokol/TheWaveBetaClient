import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ChatWindow.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import withTranslation from '../../reusable/withTranslation';
import { actions as preferencesAPI } from '../../../redux/PreferencesSlice';
import Message from './Message';
import { sendWsMessage } from '../../../redux/WebSocketSlice';
import { createNotification } from '../../../redux/NotificationSlice';
import ChatSelector from '../ChatSelector';
import setBodyScroll from '../../../utils/setBodyScroll';
import RichEditor from '../../reusable/UIKit/RichEditor';
import * as ChatApi from '../../../redux/actions/api/chat';
import Header from './Header/Header';
import { getSelectedChatroomHistory, getSelectedChatroomId } from '../../../redux/ChatSlice/selectors';

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      redirect: false,
    };
  }

  async componentDidMount() {
    const { queryParams, fetchChatroomFromQuery } = this.props;
    setBodyScroll(false);
    if (Number.isNaN(Number(queryParams?.id))) return;
    fetchChatroomFromQuery(queryParams);
  }

  async componentDidUpdate(prevProps) {
    const {
      fetchChatroomById,
      fetchChatroomFromQuery,
      selectedChatroomId,
      queryParams,
    } = this.props;
    const { selectedChatroomId: prevSelectedChatroomId, queryParams: prevQueryParams } = prevProps;
    if (prevSelectedChatroomId !== selectedChatroomId) {
      fetchChatroomById(selectedChatroomId);
    }
    if (
      prevQueryParams?.id !== queryParams?.id
        || prevQueryParams.chatType !== queryParams.chatType
    ) {
      if (Number.isNaN(Number(queryParams?.id))) return;
      fetchChatroomFromQuery(queryParams);
    }
  }

  componentWillUnmount() {
    const { setNavbarVisibility } = this.props;
    setBodyScroll(true);
    setNavbarVisibility(true);
    if (this.stopTypingTimeout) clearTimeout(this.stopTypingTimeout);
  }

  renderMessages = () => {
    const { selectedChatroomHistory } = this.props;
    const { messages } = selectedChatroomHistory ?? {};
    if (!messages) return [];
    const result = [];
    const renderNewMessage = (message, displaySenderInfo) => {
      result.push(
        <Message
          key={message.id}
          message={message}
          displaySenderInfo={displaySenderInfo}
          shouldPlayEnterAnimation={message.shouldPlayEnterAnimation}
        />,
      );
    };
    for (let i = 0; i < messages.length; i += 1) {
      const message = messages[i];
      if (i === 0) renderNewMessage(message, true);
      else {
        const prevMessage = messages[i - 1];
        renderNewMessage(message, prevMessage.from !== message.from);
      }
    }
    return result;
  };

  sendMessage = async () => {
    const { message } = this.state;
    const { sendMessage, selectedChatroomId } = this.props;
    if (!message?.trim()) return;
    sendMessage({ chatroomId: selectedChatroomId, text: message });
  };

  onEnterPress = (e) => {
    if (e.key === 'Shift') this.shiftPressed = true;
    if (e.key === 'Enter' && !this.shiftPressed) {
      this.sendMessage();
    }
  };

  onKeyUp = (e) => {
    if (e.key === 'Shift') this.shiftPressed = false;
  };

  typeMessage = ({ target: { value: message } }) => {
    this.setState({ message });
  };

  render() {
    const { selectedChatroomId, queryParams } = this.props;
    const { redirect, message } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="ChatWindow">
        <section className="TopOverlay">
          <div className="TopOverlayIcons">
            {
                            queryParams.id
                            && (
                            <div className="ChatSelectionIcon">
                              <Link to="/chat">
                                <FontAwesomeIcon
                                  icon={faArrowLeft}
                                />
                              </Link>
                            </div>
                            )
                        }
          </div>
          <Header />
        </section>
        <div className="ChatContainer">
          <ChatSelector />
          <div className={classNames(
            'ChatMainSection',
            { Empty: !selectedChatroomId },
          )}
          >
            <div className="MessageBox">
              {this.renderMessages()}
            </div>
            {
                         selectedChatroomId
                         && (
                         <section className="BottomSection">
                           <section className="SendMessagePanel">
                             <div className="RichArea">
                               <RichEditor
                                 onKeyUp={this.onKeyUp}
                                 onKeyDown={this.onEnterPress}
                                 onSubmit={this.sendMessage}
                                 className="MessageEditor"
                                 onChange={this.typeMessage}
                                 value={message}
                                 toolbar={false}
                                 emoji
                               />
                             </div>
                           </section>
                         </section>
                         )
                     }
          </div>
        </div>
      </div>
    );
  }
}

ChatWindow.propTypes = {
  setNavbarVisibility: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  fetchChatroomFromQuery: PropTypes.func.isRequired,
  fetchChatroomById: PropTypes.func.isRequired,
  selectedChatroomId: PropTypes.number.isRequired,
  selectedChatroomHistory: PropTypes.shape({
    messages: PropTypes.shape({
      id: PropTypes.number.isRequired,
      chatroomId: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      author: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
  queryParams: PropTypes.shape({
    id: PropTypes.number.isRequired,
    chatType: PropTypes.oneOf(['direct', 'chat']).isRequired,
  }),
};
ChatWindow.defaultProps = {
  queryParams: null,
};

export default withTranslation(
  ChatWindow,
  'chat',
  (state) => ({
    selectedChatroomId: getSelectedChatroomId(state),
    selectedChatroomHistory: getSelectedChatroomHistory(state),
    queryParams: state.global.queryParams,
    isNavbarVisible: state.preferences.isNavbarVisible,
    user: state.global.user,
    isWsOpen: state.WebSocket.isWsOpen,
    wsMessage: state.WebSocket.message,
  }),
  {
    setNavbarVisibility: preferencesAPI.setNavbarVisibility,
    sendWsMessage,
    fetchChatroomFromQuery: ChatApi.fetchChatroomFromQuery,
    fetchChatroomById: ChatApi.fetchChatroomById,
    sendMessage: ChatApi.sendMessage,
    createNotification,
  },
  true,
);
