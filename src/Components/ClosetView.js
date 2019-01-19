import React from 'react'


const ClosetView = props => {
    return <div> {props.count > 1 ? 
        `You currently have ${props.count} items in your closet!`
      : null}
    </div>
}

export default ClosetView