"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profileImg from "@/public/profile.png";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";

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

const Profile = () => {
    const [user, setUser] = useState<ApiResponse | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );
                const data = await response.json();
                setUser(data[0]);
            } catch (error) {
                console.error("Error fetching data" + error);
            }
        };

        fetchUser();
    }, []);
    
    return (
        <section className="px-[8%] mt-10 mb-10">
            {user ? (
                <>
                    <div className="flex items-center gap-3">
                    <Link href="/"><FaArrowLeftLong  className="hover:cursor-pointer" size={30}/></Link>
                    <h2 className="font-semibold text-xl text-[#55AD9B]">
                        Welcome, {user.name}
                    </h2>
                    </div>
                    <div className="mt-7 border-2 rounded-md px-7 py-10">
                        <div className="flex gap-5 items-center">
                            <Image
                                src={profileImg}
                                width={100}
                                height={100}
                                alt="profile-photo"
                            />
                            <div>
                                <p className="font-semibold text-xl">{user.name}</p>
                                <p className="text-gray-400 text-sm">{user.email}</p>
                            </div>
                        </div>
                        <div className="grid mt-7 gap-y-6 gap-x-7 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                            <div>
                                <h3  className="text-gray-400 mb-1">User ID</h3>
                                <div className="rounded-md bg-background-color px-3 py-3  text-sm font-semibold">{user.id}</div>
                            </div>
                            <div>
                                <h3 className="text-gray-400 mb-1">Name</h3>
                                <div className="rounded-md bg-background-color px-3 py-3 text-sm font-semibold">{user.name}</div>
                            </div>
                            <div>
                                <h3 className="text-gray-400 mb-1">Email ID</h3>
                                <div className="rounded-md bg-background-color px-3 py-3 text-sm font-semibold">{user.email}</div>
                            </div>
                            <div>
                                <h3 className="text-gray-400 mb-1">Address</h3>
                                <div className="rounded-md bg-background-color px-3 py-3 text-sm font-semibold">{user.address.street + ", " + user.address.suite + ", " + user.address.city + ", " + user.address.zipcode }</div>
                            </div>
                            <div>
                                <h3 className="text-gray-400 mb-1">Phone</h3>
                                <div className="rounded-md bg-background-color px-3 py-3 text-sm font-semibold">{user.phone}</div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>User details wasn't fetched</>
            )}
        </section>
    );

};

export default Profile;
