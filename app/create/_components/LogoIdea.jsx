import axios from 'axios';
import { useState } from 'react';

export default function LogoIdea() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logoIdea, setLogoIdea] = useState('');

  const generateLogoDesignIdea = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await axios.post('/api/ai-logo-model', {
        prompt: PROMPT
      });
      
      if (result.data.success) {
        setLogoIdea(result.data.result);
      } else {
        throw new Error(result.data.error || 'Failed to generate logo idea');
      }
    } catch (error) {
      console.error('Error generating logo idea:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : logoIdea ? (
        <div>{logoIdea}</div>
      ) : (
        <button onClick={generateLogoDesignIdea}>Generate Logo Idea</button>
      )}
    </div>
  );
}