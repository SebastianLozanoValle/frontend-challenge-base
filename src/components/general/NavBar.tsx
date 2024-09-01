'use client'
import styles from "@/styles/NavBar.module.css"
import { Logo } from "../svgs/Logo"
import Link from "next/link"
import { FaCircleUser } from "react-icons/fa6";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

export const NavBar = () => {

    const [isOpenNav, setIsOpenNav] = useState(false);

    return (
        <nav className={isOpenNav ? styles.opennavbar : styles.navbar}>
            <Link href="/"><Logo /></Link>
            <ul className={isOpenNav ? styles.openlinks: styles.links}>
                <div className={styles.principallinks}>
                    <li>
                        <Link href="/">popular</Link>
                    </li>
                    <li>
                        <Link href="/">favorites</Link>
                    </li>
                </div>
                <li> 
                    <button className={styles.activesession}>
                        <FaCircleUser />
                    </button>
                </li>
            </ul>
            <button onClick={() => {setIsOpenNav(!isOpenNav)}} className={styles.togglemenu}>
                {
                    isOpenNav ? <IoCloseSharp /> : <IoMenu />
                }
            </button>
        </nav>
    )
}