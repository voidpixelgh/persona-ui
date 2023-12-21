import React from "react";
import { Card } from "@material-tailwind/react";
import { useResponse } from '../utils/ResponseContext';

function ResponseCard() {
  const { response } = useResponse();

  return (
    <div className="mx-auto max-w-screen-md py-12">
      {response && (
        <div>{JSON.stringify(response)}</div>  // Display the API response
      )}

      {!response && (
        <Card className="mb-12 overflow-hidden">
          <img
            alt="nature"
            className="w-full object-cover object-center max-h-[64rem]"
            src="https://i.ibb.co/GHqdydt/DALL-E-2023-12-20-22-59-42-A-minimalist-conceptual-artwork-representing-the-duality-of-self-on-a-whi.png&q=80"
          />
        </Card>
      )}
      
    </div>
  );
}

export default ResponseCard;
