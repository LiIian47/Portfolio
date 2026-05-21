
async function fetchRepos() {
  const cachedData = localStorage.getItem('reposData');
  const cacheTimestamp = localStorage.getItem('reposTimestamp');
  
  const now = new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (cachedData && cacheTimestamp) {
    if (now - parseInt(cacheTimestamp) < oneDay) {
      return JSON.parse(cachedData);
    }
  }

  try {
    const response = await fetch(`https://api.github.com/users/LiIian47/repos?sort=updated`);
    const data = await response.json();
    
    localStorage.setItem('reposData', JSON.stringify(data));
    localStorage.setItem('reposTimestamp', now.toString());
    
    return data;
  } catch (error) {
    console.error("Error fetching repos:", error);
    return cachedData ? JSON.parse(cachedData) : [];
  }    
} 

export default fetchRepos;