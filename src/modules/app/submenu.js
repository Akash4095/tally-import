import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Icon, Transition } from 'semantic-ui-react';

const Submenu = ({ path, isOpen, setIsOpen, key, menuClicked, setMenuClicked }) => {

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [closeSubMenu, setCloseSubMenu] = useState(false);

    const toggleMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
        setIsOpen(true)
    }

    const closeSubMenuFunction = (path) => {

    }

    useEffect(() => {
        if (!isOpen) {
            // setIsSubMenuOpen(false);
        }
    }, [isOpen])

    useEffect(() => {
        if (menuClicked) {
            setIsSubMenuOpen(false);
            setMenuClicked(false)
        }
    }, [menuClicked])

    return (
        <>
            <div className='submenu' onClick={toggleMenu} title={!isOpen ? `${path.text}` : ""}>
                <div className="submenu_items" style={{ paddingLeft: isOpen ? "" : "4px", }}>
                    <Icon className={isOpen ? "iconSmall" : "iconLarge"} color='blue' name={path.icon} title={path.text} ></Icon>
                    <div className="menu_item_text" style={{ display: isOpen ? "block" : "none", }}>
                        {path.text}
                    </div>
                </div>
                <div style={{ display: isOpen ? "block" : "none", }}>
                    {
                        isSubMenuOpen ? <Icon name="caret down"></Icon>
                            : <Icon name="caret right"></Icon>
                    }

                </div>
            </div>
            <>
                {
                    isSubMenuOpen &&
                    <div className='submenu_container'>
                        {
                            path.subpaths.map((item, index) => {
                                return (
                                    <NavLink
                                        to={item.path}
                                        key={index}
                                        className="link"
                                        activeClassName="nav_active"
                                        onClick={() => closeSubMenuFunction(item.path)}
                                    >
                                        <Icon className="icon" name={item.icon} title={item.text}></Icon>
                                        <div className="sublink_menu_text" style={{ display: isOpen ? "block" : "none" }}>
                                            {item.text}
                                        </div>
                                    </NavLink>
                                )
                            })
                        }
                    </div>

                }
            </>
        </>
    )
}

export default Submenu