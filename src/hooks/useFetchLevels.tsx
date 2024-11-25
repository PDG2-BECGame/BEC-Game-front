import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';
import { levels as defaultLevels } from '../consts/levels';

// Importamos las imágenes directamente
import iconProblem from '../assets/icon-problem.svg';
import iconSolution from '../assets/icon-solution.svg';
import iconGame from '../assets/icon-game.svg';

interface Level {
  id: number;
  nivel: string;
  titulo: string;
  puntaje: number;
  descripcion: string;
  logo: string;
}

const useFetchLevels = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const logoMapping: { [key: number]: string } = {
      1: iconProblem,
      2: iconSolution,
      3: iconGame,
    };

    const fetchLevels = async () => {
      try {
        const levelsCollection = collection(firestore, 'levels');
        const snapshot = await getDocs(levelsCollection);

        if (!snapshot.empty) {
          const fetchedLevels: Level[] = snapshot.docs.map(doc => ({
            id: doc.data().id,
            nivel: doc.data().nivel,
            titulo: doc.data().titulo,
            puntaje: doc.data().puntaje || 0,
            descripcion: doc.data().descripcion,
            logo: logoMapping[doc.data().logo] 
          }));
          setLevels(fetchedLevels);
        } else {
          console.warn('No data in Firestore, using default levels.');
          setLevels(defaultLevels);
        }
      } catch (err) {
        console.error('Error fetching levels from Firestore:', err);
        setError('Error loading levels, using default data.');
        setLevels(defaultLevels);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLevels();
  }, []);

  return { levels, isLoading, error };
};

export default useFetchLevels;
