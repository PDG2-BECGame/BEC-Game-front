import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore"; // Importamos query y orderBy
import { firestore } from "../firebase/firebaseConfig";
import { questionsByLevel as defaultQuestions } from "../consts/questions";

// Importa imágenes
import image1 from "../assets/Level3-Questions/1.png";
import image2 from "../assets/Level3-Questions/2.png";
import image3 from "../assets/Level3-Questions/3.png";
import image4 from "../assets/Level3-Questions/4.png";
import image5 from "../assets/Level3-Questions/5.png";

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
  "2": "yie8gZR8yZ5kYvrnEP6R",
  "3": "GY2C4NFa4zxzjuJajDOH",
};

const useFetchQuestions = (level: string) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const imageMapping: { [key: number]: string } = {
      1: image1,
      2: image2,
      3: image3,
      4: image4,
      5: image5,
    };

    const fetchQuestions = async () => {
      const levelId = levelIdMap[level];
      if (!levelId) {
        setQuestions(defaultQuestions[parseInt(level, 10)] || []); // Fallback
        setIsLoading(false);
        return;
      }

      try {
        const questionsCollection = collection(firestore, `levels/${levelId}/questions`);
        const questionsQuery = query(questionsCollection, orderBy("id", "asc"));
        const snapshot = await getDocs(questionsQuery);

        if (!snapshot.empty) {
          const fetchedQuestions: Question[] = snapshot.docs.map((doc) => {
            const data = doc.data();
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
          setQuestions(defaultQuestions[parseInt(level, 10)] || []); // Fallback
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Error al cargar las preguntas.");
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