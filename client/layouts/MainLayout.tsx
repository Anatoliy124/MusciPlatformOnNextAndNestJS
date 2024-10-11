import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
import Player from "../components/Player";
import Head from "next/head";

interface MainLayoutProps {
    children: ReactNode; 
    title?: string;
    description?: string;
}

const MainLayout = ({ children, title, description}: MainLayoutProps) => {
    return (
        <>
        <Head>
                <title>{title || 'Tolik music'}</title>
                <meta name="description" content={`Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым.` + description}/>
                <meta name="robots" content="index, follow"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
        <Navbar/>
        <Container style={{margin: '90px 0'}}>
        {children}
        </Container>
        <Player/>
        </>
    );
};

export default MainLayout;
