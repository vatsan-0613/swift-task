'use client'
import React, { useState, useEffect } from 'react'
import swiftLogo  from '@/public/swift-logo.svg'
import Image from 'next/image'
import Link from 'next/link'

interface Geo {
    lat: string;
    lng: string;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface ApiResponse {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

const Nav: React.FC = () => {

    const [user, setUser] = useState<ApiResponse | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await response.json();
                setUser(data[0]);
            } catch (error) {
                console.error("Error fetching data" + error);
            }
        }

        fetchUser();
    }, [])


    return (
        <nav className='flex justify-between px-[8%] py-4 items-center bg-background-color'>
            <Image src={swiftLogo} width={100} height={100} alt='logo' />
            <Link href="/profile"><div className='font-semibold text-primary-color'>{user && user.name}</div></Link>
        </nav>
    )
}

export default Nav