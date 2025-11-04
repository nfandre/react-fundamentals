import React from 'react'

const HeaderListItem = ({ children }: React.LiHTMLAttributes<HTMLLIElement>) => {
    return (
        <li>{children}</li>
    )
}

export default HeaderListItem