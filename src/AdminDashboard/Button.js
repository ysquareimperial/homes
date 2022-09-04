import React from 'react'

export default function Button({ onClick, btnText, icon, className }) {
    return (
        <div>
            <button className='action-btn shadow mt-3' style={{ float: 'right' }} onClick={onClick}>{icon}{' '}{btnText}</button>
        </div>
    )
}
