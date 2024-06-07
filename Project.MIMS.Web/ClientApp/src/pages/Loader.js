import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Loader() {
    const animationContainer = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../MIMS_Lottie.json')
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/dashboard/app');
        }, 5000);
        return () => clearTimeout(timer);

    },);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <div
                ref={animationContainer}
                style={{
                    height: '500px',
                    width: '500px'
                }}
            ></div>
        </div>
    );
}