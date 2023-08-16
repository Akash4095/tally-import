import React, { useState } from 'react';
import { Link, NavLink, } from "react-router-dom";
import { sidebarMenu } from './menu'
import { Icon } from 'semantic-ui-react'
import Submenu from './submenu'
import "./sidebar.css"

const Sidebar = ({ children }) => {

    const [isOpen, setIsOpen] = useState(true);
    const [menuClicked, setMenuClicked] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className='main_container'>
            <div className='sidebar' style={{ width: isOpen ? "14vw" : "4vw", }}>
                <div className='top_section'>
                    <div className="menu_heading_text" style={{ display: isOpen ? "block" : "none", }}>Tally Import</div>
                    <div className='bars' style={{ marginLeft: isOpen ? "38px" : "4px" }}>
                        {
                            isOpen ? <Icon className="icon" size="large" name="angle double left" title="Close" onClick={toggle}></Icon>
                                :
                                <Icon className="icon" size="large" name="bars" onClick={toggle}></Icon>
                        }
                    </div>
                </div>
                <section className='components'>
                    {sidebarMenu.map((m, index) => {
                        if (m.subpaths) {
                            return (
                                <>
                                    <Submenu path={m} isOpen={isOpen} key={m.text} setIsOpen={setIsOpen} menuClicked={menuClicked} setMenuClicked={setMenuClicked} />
                                </>
                            )
                        }
                        return (
                            <NavLink
                                to={m.path}
                                key={index}
                                className="link"
                                activeClassName="nav_active"
                                onClick={() => setMenuClicked(true)}
                                title={!isOpen ? `${m.text}` : ""}
                            >
                                <Icon className={isOpen ? "iconSmall" : "iconLarge"} name={m.icon} title={m.text}></Icon>
                                <div className='menu_item_text' style={{ display: isOpen ? "block" : "none" }}>
                                    {m.text}
                                </div>
                            </NavLink>
                        )
                    })}
                </section>
            </div>
            <main style={{ width: isOpen ? "86vw" : "96vw", }}>{children}</main>
        </div>
    )
}

export default Sidebar