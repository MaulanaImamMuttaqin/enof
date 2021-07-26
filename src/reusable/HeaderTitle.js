import React from 'react'

export function HeaderTitle({children}) {
    return (
        <div className="border-b-2 border-gray-400 w-full p-2 text-2xl mb-4 font-semibold text-gray-600">
            <h2>{children}</h2>
        </div>
    )
}

export function SubHeaderTitle({children}){
    return (
        <div className="border-b-2 border-gray-400 w-full p-2 text-lg mb-4 font-semibold text-gray-600">
            <h2>{children}</h2>
        </div>
    )
}
