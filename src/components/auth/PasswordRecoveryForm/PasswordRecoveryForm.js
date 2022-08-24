import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sendPasswordRecoveryCode, changePassword } from '../../../redux/actions/api';
import Button from "../../reusable/UIKit/Forms/Button";
import LabeledInput from "../../reusable/UIKit/Forms/Inputs/LabeledInput";

  const PasswordRecoveryForm = (props) =>  {
    const [state, setState] = useState('');

    const onChange = (e) => setState({ [e.target.name]: e.target.value });
    const sendCode = (e) => {
        e.preventDefault();
        const { username } = props;
        props.sendPasswordRecoveryCode({ username });
    } 
   const onSubmit = (e) => {
        e.preventDefault();
        const { recoveryCode, password } = state;
        props.changePassword({ username: props.username, recoveryCode, password });
    }
        return (
            <div className='RegisterFormWrapper'>
                <form>
                    {!props.recoveryCodeSent?
                    <>
                     <LabeledInput inputClassName='m-auto mb-2' id='usernameInput' name='username' onChange={onChange} label='Username' value={state.username} required />
                    <div>
                        <Button clickHandler={props.cancelRecovery}>Cancel</Button>
                        <Button clickHandler={sendCode}>Reset</Button>
                    </div>
                    </>
                    :
                    <>
                    <input name='recoveryCode' onChange={onChange} placeholder='16-symbol recovery code' />
                    <input name='password' onChange={onChange} type='password' placeholder='New Password' />
                    <input onClick={onSubmit} className='FormSubmitButton' type='submit' />
                    </>
                }   
                </form>
            </div>
        );
}
const mapStateToProps = (state) => ({ recoveryCodeSent: state.global.recoveryCodeSent });
export default connect(mapStateToProps, { sendPasswordRecoveryCode, changePassword })(PasswordRecoveryForm);