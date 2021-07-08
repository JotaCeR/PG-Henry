import React, { useState } from 'react';
import { NavBarAlpha, SignButton, Cart, Linked } from './Styles';
import SignForm from './SignForm';


export default function NavBar() {
    let [viewForm, setViewForm] = useState(false);

    function handleClick (e) {
        e.preventDefault();
        setViewForm(viewForm = true);
    }

    // Hasta añadir funcionalidad on close al reducer
    // function onClose(e) {
    //     e.preventDefault();

    //     setViewForm(viewForm = false);
    // }

    return (
        <NavBarAlpha>
            <div><Linked to='/home'>Home</Linked></div>
            <div><Linked to='/billboard'>Billboard</Linked></div>
            <div><Linked to='/comingsoon'>Coming Soon</Linked></div>
            <div><Linked to='/contact'>Contact</Linked></div>
            <div><Linked to='/products'>Merchandaising</Linked></div>
            <Linked to='/mycart'><Cart size="25" /></Linked>
            <Linked><SignButton onClick={(e) => handleClick(e)}>Sign In / Sign Up</SignButton></Linked>
            {!viewForm ? true : <SignForm />}
        </NavBarAlpha>
    )
}