import React, { useState, useEffect } from 'react';
import Card from '../reusable/UIKit/Cards/Card/Card';
import LabeledInput from '../reusable/UIKit/Forms/Inputs/LabeledInput';
import Button from '../reusable/UIKit/Forms/Button';
import './CreateStoryPage.scss';

import EasySpeech from 'easy-speech';

const CreateStoryPage = (props) => {
    const [text, setText] = useState('');

    useEffect(() => EasySpeech.init() , [])
    const onTextChange = (e) => setText(e.target.value);

    return (
        <div className="CreateStoryPage">
            <Card>
                <textarea className="myArea" onChange={onTextChange} value={text} />

                <Button clickHandler={() => EasySpeech.speak({ text, voice: EasySpeech.voices()[1] })} disabled={speechSynthesis.speaking} className='readbtn' size="large">Read aloud!</Button>
            </Card>
        </div>
    );
}
export default CreateStoryPage;
