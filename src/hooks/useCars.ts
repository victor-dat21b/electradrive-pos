import { useState, useEffect } from "react";

const carUrl = import.meta.env.VITE_APP_BACKEND_GET_CAR_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export interface Car {
  id: number;
  name: string;
  type: string;
  color: string;
  battery: string;
  hitch: boolean;
}

const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.error("Trying to fetch data from backend via useCars.ts");
        setIsLoading(true);
        console.log(carUrl);

        const response = await fetch(carUrl, {
          method: "GET",
          headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setCars(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch data from backend via useCars.ts", error);
        setError("Error fetching data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cars, isLoading, error };
};

export default useCars;



  
    /* Brug hvis skeletons skal observeres!
    useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/mycars.json");
        const data = await response.json();

        setTimeout(() => {
          setCars(data);
          setIsLoading(false);
        }, 5000); // delay of 5 seconds
      } catch (error) {
        setError("Error fetching data");
        setIsLoading(false);
      }
    }; */

