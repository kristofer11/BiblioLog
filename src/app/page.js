import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import './home.scss'

export default function Home() {
    return (
        <>
            <h3 className='welcomeMsg'>Welcome to My Library</h3>
            <div className='homeLinks'>
                <Link href="/my-library">View Library</Link>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>                
            </div>
        </>
    )
}
