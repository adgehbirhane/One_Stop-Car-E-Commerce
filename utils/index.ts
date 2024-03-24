export async function fetchCars() {
  const headers = {
    "X-RapidAPI-Key": "57647ed38dmsh631e314237ed788p109ff9jsn72de5063e389",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const response = await fetch(
    "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla",
    {
      headers,
    }
  );
  
  const result = await response.json();
  return result;
}
