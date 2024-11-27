"use client";
import React from 'react';
import HeroSection from './HeroSection';
import MedicalEquipment from './MedicalEquipment';
import TrustedStandard from './TrustedStandard';
import BestSellingProduct from './BestSellingProduct';
import Sustainability from './Sustainability';
import WhyChooseUs from './WhyChooseUs';
import ReliableInstrumnet from './ReliableInstrument';
import TrustedUser from './TrustedUser';
import BlogSection from './BlogSection';

export default function MainPageData() {
    return (
        <>
            <header>
                <HeroSection />
            </header>
            <MedicalEquipment />
            <TrustedStandard />
            <BestSellingProduct />
            <Sustainability />
            <div className='pt-[6rem]'>
                <WhyChooseUs />
            </div>
            <ReliableInstrumnet />
            <TrustedUser />
            <BlogSection />
        </>
    );
}
