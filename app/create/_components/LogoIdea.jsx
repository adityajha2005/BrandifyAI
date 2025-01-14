import React, { useState, useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Prompt from "@/app/_data/Prompt";

function LogoIdea({ formData, onHandleInputChange }) {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(formData?.idea);

    useEffect(() => {
        generateLogoDesignIdea();
    }, []);

    const generateLogoDesignIdea = async () => {
        try {
            setLoading(true);
            const PROMPT = Prompt.DESIGN_IDEA_PROMPT
                .replace('{logoType}', formData?.design.title)
                .replace('{logoTitle}', formData.title)
                .replace('{logoDesc}', formData.description)
                .replace('{logoPrompt}', formData.design.prompt);

            // Mock API Response for Demo
            const mockResponse = [
                "Smiling Gear with Wreath",
                "Happy Cloud holding Lightning",
                "Friendly Star with Wand",
                "Animated Book with Quill",
                "Playful Sun with Palette"
            ];
            setIdeas(mockResponse);

            // Uncomment for real API call
            // const result = await axios.post('/api/ai-design-ideas', {
            //     prompt: PROMPT
            // });

            // setIdeas(result.data.ideas);
        } catch (error) {
            console.error("Error generating ideas:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (idea) => {
        setSelectedOption(idea);
        onHandleInputChange(idea);
    };

    return (
        <div className='my-10'>
            <HeadingDescription
                title={Lookup.LogoIdeaTitle}
                description={Lookup.LogoIdeaDesc}
            />
            {loading ? (
                <div className='flex items-center justify-center mt-10'>
                    <Loader2Icon className='animate-spin w-8 h-8 text-gray-600' />
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
                    {ideas?.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleClick(item)}
                            className={`p-4 text-center border rounded-lg cursor-pointer 
                            transition-all duration-300 hover:border-primary hover:shadow-md 
                            ${selectedOption === item ? 'border-primary bg-primary/10' : ''}`}
                        >
                            <p className='text-sm font-medium text-gray-800'>{item}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LogoIdea;
