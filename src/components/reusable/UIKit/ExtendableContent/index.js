import React, {useState} from "react";
import ReactTooltip from "react-tooltip";
import './ExtendableContent.scss';
import upArrow from '../../../../assets/upArrow.svg';
//import questionIcon from '../../../../assets/questionIcon.svg';

const ExtendableContent = ({children, label, tooltip}) => {
    const [isOpen, setIsOpen] = useState(false);
    const tooltipElement =  <img alt='arrow' data-tip={tooltip} style={{maxWidth: '18px'}} src=''/>;
    return (
    <div className='ExtendableContentContainer'>
        <ReactTooltip />
        <p className='ExtendableContentLabel' onClick={() => setIsOpen(!isOpen)}>
            <span className={`arrow-${isOpen? 'open' : 'closed' }`}>
                <img alt='arrow' src={upArrow}/>
            </span>{` ${label} `}{tooltip && tooltipElement} </p>
        {isOpen && children}
    </div>
    );
}

export default ExtendableContent;
