import React, { Component } from 'react';
import './ChatWindow.scss';
import Heading from "../../reusable/UIKit/Headings/Heading/Heading";
import withTranslation from '../../reusable/withTranslation';
import { actions as preferencesAPI } from '../../../redux/PreferencesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import Message from "./Message";
import fetcher from "../../../utils/fetcher";
import Avatar from "../../reusable/Avatar";
import RelativeTime from "../../reusable/UIKit/RelativeTime";

import {sendWsMessage} from '../../../redux/WebSocketSlice';
import {createNotification} from '../../../redux/NotificationSlice';
import {Redirect} from 'react-router';
import ContextMenu from "./Message/ContextMenu";
import Typed from "../../reusable/Typed";
import ChatSelector from "../ChatSelector";
import setBodyScroll from '../../../utils/setBodyScroll';
import classNames from 'classnames';
import {Link} from "react-router-dom";
import RichEditor from "../../reusable/UIKit/RichEditor";
import { fetchChatroomFromQuery, fetchChatroomById } from '../../../redux/actions/api/chat';
import Header from "./Header/Header";
import {getSelectedChatroomHistory, getSelectedChatroomId} from '../../../redux/ChatSlice/selectors';
import { sendMessage } from '../../../redux/actions/api/chat';
class ChatWindow extends Component {
    state = {
        companions: [],
        messages: [],
        typers: [],
        message: '',
        loading: true,
        redirect: false,
        userScrolled: false,
        lastScrollPosition: null,
        showMessageContextMenu: false,
        messageContextMenuX: null,
        messageContextMenuY: null,

    };

    hasUserScrolledToTheBottom = () => {
        const scrollPosFloat = document.scrollingElement.scrollTop + document.scrollingElement.clientHeight;
        const scrollPosInt = Math.round(scrollPosFloat);
        return document.scrollingElement.scrollHeight - scrollPosInt < 1;

        /*
            Here I determine if scrolled pixels from the top + visible pixels === max scroll height of the element
         */
    }
    handleUserScroll = () => {
        const bodyRect = document.querySelector('.MessageBox').getBoundingClientRect();
        const {lastScrollPosition} = this.state;
        if (lastScrollPosition < bodyRect.top) {
            this.setState({ userScrolled: true });
        }

        if (this.hasUserScrolledToTheBottom()) {
            this.setState({ userScrolled: false });
        }
        this.setState({lastScrollPosition: bodyRect.top });
    }
    isDirectChat = () => this.props.queryParams.chatType === 'direct';
    onCompanionTypingChange = ({ username, isDirect, chatId}) => {
        if (Number(chatId) !==this.props.user?.id) return;
        if (this.isDirectChat() !== isDirect) return;
        let typers = [...this.state.typers];
        if (typers.includes(username)) {
            typers = typers.filter(typer => typer !== username);
        }
        else {
            typers.push(username);
        }
        this.setState({ typers });
    }
    renderTypingMessage = () => {
        const wrapInHtml = message => <div className='TypingMessage'>{message}<Typed strings='...' showCursor={false} /></div>;
        const { typers } = this.state;
        if (!typers.length) return null;
        if (typers.length === 1) {
            return wrapInHtml(`${typers[0]} is typing`);
        }
            let result = '';
            for (let i = 0; i <= 5; i += 1) {
                if (i >= typers.length) break;
                const typer = typers[i];
                result += i < 4 ? `${typer},` : typer;
            }
            if (typers.size > 5) {
                result += ' and others ';
            }
            result += 'are typing';
            return  wrapInHtml(result);
    }

    closeContextMenu = (e) => {
        this.setState({ showMessageContextMenu: false });
    }

    async componentDidMount() {
        window.addEventListener('click', this.closeContextMenu);
        window.addEventListener('scroll', this.handleUserScroll);
        setBodyScroll(false);
        if (Number.isNaN(Number(this.props?.queryParams?.id))) return;
        this.props.fetchChatroomFromQuery(this.props?.queryParams);
    }

    renderMessages = () => {
        const { messages } = this.props.selectedChatroomHistory ?? {};
        if (!messages) return [];
        const result = [];
        const renderNewMessage = (message, displaySenderInfo) => {
            result.push(
                <Message
                    key={message.id}
                    message={message}
                    displaySenderInfo={displaySenderInfo}
                    onContextMenu={this.onContextMenu}
                    shouldPlayEnterAnimation={message.shouldPlayEnterAnimation}
                />
            );
        };
        for (let i = 0; i < messages.length; i += 1) {
            const message = messages[i];
            if (i === 0) {
                renderNewMessage(message, true);
                continue;
            }

            const prevMessage = messages[i - 1];
            renderNewMessage(message, prevMessage.from !== message.from);
        }
        return result;
    }

    sendTypingMessage() {
        const message = {
            type: this.state.isTyping ? 'is-typing' : 'stopped-typing',
            payload: {
                username: this.props.user.username,
                isDirect: this.isDirectChat(),
                chatId: this.props.queryParams.id
            }
        };
        this.props.sendWsMessage(message);
    }

  async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedChatroomId !== this.props.selectedChatroomId) {
            this.props.fetchChatroomById(this.props.selectedChatroomId);
        }
        if (
            prevProps.queryParams.id !== this.props.queryParams.id
            || prevProps.queryParams.chatType !== this.props.queryParams.chatType
        ) {
            if (Number.isNaN(Number(this.props?.queryParams?.id))) return;
            this.props.fetchChatroomFromQuery(this.props?.queryParams);
        }
        if (prevProps.queryParams.id && !this.props.queryParams.id) {
            this.setState({
                typers: [],
                companions: []
            })
        }
        if (prevProps.wsMessage !== this.props.wsMessage) {
            this.onWsMessage(this.props.wsMessage);
        }
        if (!prevState.isTyping && this.state.isTyping) {
            this.sendTypingMessage();
        }
        if (prevState.isTyping && !this.state.isTyping) {
            this.sendTypingMessage();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.closeContextMenu);
        window.removeEventListener('scroll', this.handleUserScroll);
        setBodyScroll(true);
        this.props.setNavbarVisibility(true);
        if (this.stopTypingTimeout) clearTimeout(this.stopTypingTimeout);
    }
    onWsMessage(message) {
        if (message.type === `user-status-${this.props.queryParams.id}`) {
            this.onCompanionStatusChange(message.payload);
        }
        if (message.type === 'stopped-typing' || message.type === 'is-typing') {
            this.onCompanionTypingChange(message.payload);
        }
    }
    onCompanionStatusChange = (message) => {
      this.setState({ companionOnline: message.online, lastSeen: message.lastSeen || null });
    }

    sendMessage = async () => {
        if (this.state.editingMessage) {
            if (!this.state.message) return;
            this.setState({ message: '' });
            await fetcher(
                `/chat/editDirectMessage/${this.state.selectedMessage.id}`,
                'PATCH',
                { newText: this.state.message }
            );
            return;
        }
        if (!this.state.message) return;
        const messageObj = {
            text: this.state.message.trim(),
            from: this.props.user.id,
            shouldPlayEnterAnimation: true
        };
        const isMessageEmpty = !this.state.message.trim();
        this.setState({
            messages: [...this.state.messages, messageObj],
            message: '',
            isTyping: false
        });
        if (isMessageEmpty) return;
        try {
           this.props.sendMessage({ chatroomId: this.props.selectedChatroomId, text: this.state.message });
        }
        catch (err) {
            console.error(err);
        }
    };
    typeMessage = message => {
        this.setState({ message, isTyping: true });
        if (this.stopTypingTimeout) {
            clearTimeout(this.stopTypingTimeout);
        }
        this.setStopTypingTimeout();
   }
   setStopTypingTimeout = () => {
        this.stopTypingTimeout = setTimeout(() => {
            this.setState({ isTyping: false });
        }, 5000);
   }
   onEnterPress = e => {
        if (e.key === 'Shift') this.shiftPressed = true;
        if (e.key === 'Enter' && !this.shiftPressed) {
            this.sendMessage();
        }
   }
   onKeyUp = e => {
        if (e.key === 'Shift') this.shiftPressed = false;
   }
    onContextMenu = (pageX, pageY, target) => {
        this.setState({
            selectedMessage: { id: target.dataset.id, text: target.dataset.text },
            showMessageContextMenu: true,
            messageContextMenuX: pageX,
            messageContextMenuY: pageY,
        });
    }
    editMessage = () => {
        const { text } = this.state.selectedMessage;
        this.setState({ message: text, editingMessage: true });

    };

    render() {
        const messageContextMenuActions = [
            {
                label: 'Tag',
                handler: () => 1
            },
            {
                label: 'Edit',
                handler: this.editMessage
            },
            {
                label: 'Delete',
                handler: this.deleteMessage
            }
        ]

        if (this.state.redirect) {
            return <Redirect to='/' />
        }
        return (
            <div className='ChatWindow'>
                <ContextMenu
                    show={this.state.showMessageContextMenu}
                    left={this.state.messageContextMenuX}
                    top={this.state.messageContextMenuY}
                    actions={messageContextMenuActions}
                />
                <section className='TopOverlay'>
                    <div className='TopOverlayIcons'>
                        {
                            this.props.queryParams.id &&
                            <div className='ChatSelectionIcon'>
                                <Link to='/chat'>
                                    <FontAwesomeIcon
                                        icon={faArrowLeft}
                                    />
                                </Link>
                            </div>
                        }
                    </div>
                    <Header />
                </section>
                <div className='ChatContainer'>
                    <ChatSelector />
                 <div className={classNames(
                     'ChatMainSection',
                     { 'Empty': !this.props.selectedChatroomId }
                 )}>
                <div className='MessageBox' >
                    {this.renderMessages()}
                    {this.renderTypingMessage()}
                </div>
                     {
                         this.props.selectedChatroomId &&
                         <section className='BottomSection'>
                             <section className='SendMessagePanel'>
                                 <div className='RichArea'>
                                     <RichEditor
                                         onKeyUp={this.onKeyUp}
                                         onKeyDown={this.onEnterPress}
                                         onSubmit={this.sendMessage}
                                         className='MessageEditor'
                                         onChange={this.typeMessage} value={this.state.message}
                                         toolbar={false}
                                         emoji
                                     />
                                 </div>
                             </section>
                         </section>
                     }
                 </div>
            </div>
            </div>
        );
    }

    getTopOverlayContent() {
        const idFromQuery = Number(this.props.queryParams.id);
        if (Number.isNaN(idFromQuery)) {
           return (
               <div className='ChatSelectionHeading'>
                   <Heading>Your Chats:</Heading>
               </div>
           )
        }
        let topBadgeUrl, chatName;
        if (this.isDirectChat()) {
            const companion = this.state.companions?.find(c => Number(c.id) === Number(idFromQuery));
            chatName = companion?.username;
            topBadgeUrl = companion?.avatarUrl;
        }
        else {
            chatName = this.state?.chatroom?.name;
            topBadgeUrl = this.state?.chatroom?.avatarUrl;
        }
        return (
        <>
        <Avatar url={topBadgeUrl} />
        <section className='OverlayInfo'>
            <Heading size='3'>{chatName}</Heading>
            {
                this.isDirectChat() &&
                <span>{this.state.companionOnline ? 'Online' :
                  <RelativeTime text='Last seen' timestamp={this.state.companions[0]?.lastSeen}/>}
                </span>
            }
        </section>
        </>
        );
    }
}

export default withTranslation(
    ChatWindow,
    'chat',
        state => ({
            selectedChatroomId: getSelectedChatroomId(state),
            selectedChatroomHistory: getSelectedChatroomHistory(state),
            queryParams: state.global.queryParams,
            isNavbarVisible: state.preferences.isNavbarVisible,
            user: state.global.user,
            isWsOpen: state.WebSocket.isWsOpen,
            wsMessage: state.WebSocket.message
        }),
    {
        setNavbarVisibility: preferencesAPI.setNavbarVisibility,
        sendWsMessage,
        fetchChatroomFromQuery,
        fetchChatroomById,
        sendMessage,
        createNotification
    },
    true);
