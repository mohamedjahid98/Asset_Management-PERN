import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
    
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> Asset Management
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/home">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/employee">
                    <BsPeopleFill className='icon'/> Employee Master
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/assets-manager">
                    <BsFillGrid3X3GapFill className='icon'/> Asset Master
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/assets-cat-mas">
                    <BsFillArchiveFill className='icon'/> Asset Category Master
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/stock-view">
                    <BsListCheck className='icon'/> Stock View
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/issue-asset">
                    <BsMenuButtonWideFill className='icon'/> Issue Asset
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/return-asset">
                    <BsFillGearFill className='icon'/> Return Asset
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/scrap-asset">
                    <BsMenuButtonWideFill className='icon'/> Scrap Asset
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/asset-history">
                    <BsMenuButtonWideFill className='icon'/> Asset History
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar