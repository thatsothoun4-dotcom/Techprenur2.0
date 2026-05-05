async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Bad response');
      }

      return await response.json();

    } catch (err) {
      if (attempt === maxRetries) {
        throw new Error(
          `Failed to fetch '${url}' after ${maxRetries} attempts`
        );
      }

      const delay = 100 * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

module.exports = fetchWithRetry;

const testSuccess = async () => {
  try {
    const data = await fetchWithRetry('https://jsonplaceholder.typicode.com/users');
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};

const testFail = async () => {
  try {
    const data = await fetchWithRetry('https://this-url-does-not-exist.com', 3);
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};

testSuccess();
testFail();