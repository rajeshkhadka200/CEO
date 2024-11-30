const API_URL = "https://ceo-api-project.hypermode.app/graphql";
const token =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjQxNjk2MTUsImlhdCI6MTczMjYzMzYxNSwiaXNzIjoiaHlwZXJtb2RlLmNvbSIsInN1YiI6ImFway0wMTkzNjkwMi1kYWI4LTczNDAtOTNmMS1iODRkMWZiMWNjNTAifQ.N9p-3sVQ0-R-5NLZuT3ZZTFepic_elqaMAof1PdaPlR2iby2Mbz9rXWP9UDRP17t7QCCBVnU2yFc0qROipFGGQ";

export const fetchGraphQL = async (query, variables = {}) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any authentication headers if needed
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data;
  } catch (error) {
    throw error;
  }
};
