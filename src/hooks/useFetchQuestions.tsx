import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebaseConfig";
import { questionsByLevel as defaultQuestions } from "../consts/questions";

// Importa imágenes
import image1 from "../assets/Correo.png";
import image2 from "../assets/BePRO_logo.svg";

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  image?: string;
  feedback: string;
}

const levelIdMap: { [key: string]: string } = {
  "1": "xsnFmviaCfeB5LLsi0rg",
  "2": "GY2C4NFa4zxzjuJajDOH",
  "3": "yie8gZR8yZ5kYvrnEP6R",
};

const useFetchQuestions = (level: string) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const imageMapping: { [key: number]: string } = {
      1: image1,
      2: image2,
    };

    const fetchQuestions = async () => {
      console.log(`Fetching questions for level ${level}...`); // Depuración

      const levelId = levelIdMap[level];
      if (!levelId) {
        console.error(`No Firestore ID found for level ${level}`);
        setQuestions(defaultQuestions[parseInt(level, 10)] || []); // Fallback
        setIsLoading(false);
        return;
      }

      try {
        const questionsCollection = collection(firestore, `levels/${levelId}/questions`);
        const snapshot = await getDocs(questionsCollection);

        console.log(`Documents fetched for level ${level}:`, snapshot.size); // Depuración

        if (!snapshot.empty) {
          const fetchedQuestions: Question[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            console.log("Document data:", data); // Depuración
            return {
              id: data.id,
              question: data.question,
              options: data.options || [],
              answer: data.answer,
              image: data.image ? imageMapping[data.image] : undefined,
              feedback: data.feedback || "Sin feedback disponible",
            };
          });
          setQuestions(fetchedQuestions);
        } else {
          console.warn(`No questions found for level ${level}. Using default.`);
          setQuestions(defaultQuestions[parseInt(level, 10)] || []); // Fallback
        }
      } catch (err) {
        console.error("Error fetching questions from Firestore:", err);
        setError("Error loading questions.");
        setQuestions(defaultQuestions[parseInt(level, 10)] || []); // Fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [level]);

  return { questions, isLoading, error };
};

export default useFetchQuestions;
