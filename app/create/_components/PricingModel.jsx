"use client";
import React, { useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PricingModel = ({ formData }) => {
    const { user } = useUser();
    const router = useRouter();

    const handlePricingClick = (pricingType) => {
        if (user && pricingType === 'Free') {
            router.push(`/generate-logo?type=${pricingType}`);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (formData?.design?.title) {
                try {
                    console.log("Storing formData:", formData);
                    localStorage.setItem("formData", JSON.stringify(formData));
                } catch (error) {
                    console.error("Error storing formData:", error);
                }
            }
        }
    }, [formData]);

    return (
        <div className="">
            <HeadingDescription
                title={Lookup.LogoPricingTitle}
                description={Lookup.LogoPricingDesc}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {Lookup.pricingOption.map((pricing, index) => (
                    <div
                        className="flex flex-col items-center p-5 border rounded-xl"
                        key={index}
                    >
                        <Image
                            src={pricing.icon}
                            alt="Pricing Plan Icon"
                            width={60}
                            height={60}
                        />
                        <h2 className="font-medium text-2xl">{pricing.title}</h2>
                        <div>
                            {pricing.features.map((feature, index) => (
                                <h2 className="text-lg mt-3" key={index}>
                                    {feature}
                                </h2>
                            ))}
                        </div>
                        <div className="mt-5">
                            {user ? (
                                pricing.title === 'Free' ? (
                                    <Link href={`/generate-logo?type=${pricing.title}`}>
                                        <Button onClick={() => handlePricingClick(pricing.title)}>
                                            {pricing.button}
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button 
                                        disabled
                                        className="mt-5 cursor-not-allowed"
                                        title="Coming Soon"
                                    >
                                        Coming Soon
                                    </Button>
                                )
                            ) : (
                                <SignInButton
                                    mode="modal"
                                    aftersigninurl={`/generate-logo?type=${pricing.title}`}
                                >
                                    <Button 
                                        className="mt-5"
                                        disabled={pricing.title !== 'Free'}
                                        title={pricing.title !== 'Free' ? 'Coming Soon' : ''}
                                    >
                                        {pricing.title !== 'Free' ? 'Coming Soon' : pricing.button}
                                    </Button>
                                </SignInButton>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingModel;
