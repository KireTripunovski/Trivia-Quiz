export interface TriviaCategory {
  id: number;
  name: string;
}

export const fetchCategories = async (): Promise<TriviaCategory[]> => {
  try {
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchQuestions = async (
  amount = 10,
  category?: string,
  difficulty?: string
) => {
  try {
    let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;

    if (category && category !== "") {
      url += `&category=${category}`;
    }

    if (difficulty && difficulty !== "") {
      url += `&difficulty=${difficulty}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.response_code === 0) {
      return data.results;
    } else {
      throw new Error("Failed to fetch questions");
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

export const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};
