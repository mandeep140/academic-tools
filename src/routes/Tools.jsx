import React from 'react'
import ToolInput from '../components/ToolInput'
import ToolKitList from '../components/ToolKitList'


const Tools = () => {
    return (
        <>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100">
                <ToolInput />
                <ToolKitList />
            </div>

        </>
    )
}

export default Tools