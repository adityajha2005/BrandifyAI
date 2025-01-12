"use client";
import React, { useState } from 'react';
import LogoTitle from './_components/LogoTitle';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import LogoDesigns from './_components/LogoDesigns';
import LogoIdea from './_components/LogoIdea';
import LogoDesc from './_components/LogoDesc';
import LogoColorPalatte from './_components/LogoColorPalatte';
const CreateLogo = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({}); //This Holds the form data

    // to handle input changes dynamically
    const onHandleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        console.log(formData);
    };

    return (
        <div className="mt-28 p-10 border rounded-xl 2xl:mx-72">
            {/* Conditional rendering steps based */}
            {step == 1 ? 
                <LogoTitle onHandleInputChange={(v) => onHandleInputChange('title', v)} />
            : step==2 ?
                <LogoDesc onHandleInputChange={(v) => onHandleInputChange('desc', v)} />
            : step==3 ?
                <LogoColorPalatte onHandleInputChange={(v) => onHandleInputChange('palette', v)} />
            : step==4 ?
                <LogoDesigns onHandleInputChange={(v) => onHandleInputChange('design', v)} />
            : step==5 ?
                <LogoIdea onHandleInputChange={(v) => onHandleInputChange('idea', v)} />:
            null
            }
            
            <div className="flex items-center justify-between mt-10">
                {step != 1 && (
                    <Button onClick={() => setStep(step - 1)} variant="outline">
                        <ArrowLeft /> Previous
                    </Button>
                )}
                <Button onClick={() => setStep(step + 1)}>
                    <ArrowRight /> Continue
                </Button>
            </div>
        </div>
    );
};

export default CreateLogo;
