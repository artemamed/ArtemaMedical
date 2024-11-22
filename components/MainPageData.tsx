"use client";
import React from 'react';
import HeroSection from './HeroSection';
import MedicalEquipment from './MedicalEquipment';

export default function MainPageData() {
    return (
        <>
            <header>
                <HeroSection />
            </header>
            <MedicalEquipment />
        </>
    );
}
