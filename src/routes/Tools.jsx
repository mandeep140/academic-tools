import React from 'react'
import ToolInput from '../components/ToolInput'
import ToolKitList from '../components/ToolKitList'


const Tools = () => {
    return (
        <>
            <div className=" bg-linear-to-r/decreasing from-sky-100 to-teal-300">
                <ToolInput />
                <ToolKitList />
            </div>

        </>
    )
}

export default Tools