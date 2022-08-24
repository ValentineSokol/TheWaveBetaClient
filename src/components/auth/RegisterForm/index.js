import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RegisterForm.scss';
import { register, login } from '../../../redux/actions/api';
import SocialLogin from "../../reusable/SocialLogin/SocialLogin";
import PasswordRecoveryForm from "../PasswordRecoveryForm/PasswordRecoveryForm";
import Button from "../../reusable/UIKit/Forms/Button";
import LabeledInput from "../../reusable/UIKit/Forms/Inputs/LabeledInput";
import {getIsError, getIsLoading} from '../../../redux/LoadersSlice/selectors';
import { createNotification } from "../../../redux/NotificationSlice";

const RegisterForm = ({ history, redirect = true, redirectTo='' }) => {
    const TABS = {
        REGISTER: 'register',
        LOGIN: 'login',
        RECOVERY: 'recovery'
    };
    const tabInfo = {
        [TABS.REGISTER]: {
            button: {
                text: 'Log In',
                to: TABS.LOGIN
            },
            handler: register
        },
        [TABS.LOGIN]: {
            button: {
                text: 'Create a new account',
                to: TABS.REGISTER
            },
            handler: login
        },
        [TABS.RECOVERY]: {
            button: {
                text: 'Create a new account',
                to: TABS.REGISTER
            }
        },
    };
    const dispatch = useDispatch();
    const isRegisterLoading = useSelector(getIsLoading(register));
    const isRegisterError = useSelector(getIsError(register));
    const user = useSelector(state => state.global.user);

    const [state, setState] = useState({ tab: TABS.REGISTER, hasSubmitted: false });
    useEffect(() => {
        if (!state.hasSubmitted || isRegisterLoading || isRegisterError) return;
        setTab(TABS.LOGIN);
    }, [isRegisterLoading, isRegisterError]);
    useEffect(() => {
        if (!redirect || !user?.id) return;
        history.push(redirectTo || `/profile/${user.id}`)
    }, [user]);
    const { tab } = state;

    const onChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

    const setTab = tab => setState({ ...state, tab });

    const cancelRecovery = () => setTab(TABS.LOGIN);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!state.username) {
            dispatch(createNotification(
                'Please, provide a valid username!',
                'warning'
            ));
            return;
        }
        setState({ ...state, hasSubmitted: true });
        dispatch(tabInfo[tab].handler(state));
    }

    if (tab === TABS.RECOVERY) {
        return <PasswordRecoveryForm cancelRecovery={cancelRecovery} />;
    }
    return (
            <div className='RegisterFormWrapper'>
                <form onSubmit={onSubmit}>
                    <SocialLogin classNames='mt-2 mb-2' />
                    { tab === TABS.REGISTER && <LabeledInput testId='registerEmailInput' inputClassName='m-auto mb-2' id='emailInput' name='email' value={state.email} onChange={onChange} type='email' label='Email'  />}
                    <LabeledInput testId='registerUsernameInput' inputClassName='m-auto mb-2' id='usernameInput' name='username' onChange={onChange} label='Username' value={state.username} required />
                    <LabeledInput testId='registerPasswordInput' inputClassName='m-auto mb-2' id='passwordInput' name='password' onChange={onChange} label='Password' type='password' value={state.password} required />
                    { tab === TABS.REGISTER && <LabeledInput testId='registerBirthdayInput' required inputClassName='m-auto mb-2' id='bdayInput' name='birthday' value={state.birthday} onChange={onChange} type='date' label='Birthday'  />}
                    {
                        tab === TABS.LOGIN &&
                        <div>
                            <Button
                                className='mt-1 mb-1'
                                size='large'
                                transparent
                                hover='underline'
                                clickHandler={() => setTab(TABS.RECOVERY)}
                            >
                                Forgot your username or password?
                            </Button>
                        </div>
                    }
                            <Button disabled={isRegisterLoading} testId='registerSubmitBtn' type='submit' className='mt-2 mb-2 p-1'>Submit</Button>
                    { tab &&
                        <>
                            <div style={{ position: 'relative'}}>
                                <span className='TextOnTheLine'>or</span>
                            </div>
                            <div className='mt-2'><Button testId='registerTabSwitchBtn' color='green' size='medium' className='p-1' clickHandler={() => setTab(tabInfo[tab].button.to)}>{tabInfo[tab].button.text}</Button></div>
                        </>
                    }
                        </form>
            </div>
    );
}
export default RegisterForm;