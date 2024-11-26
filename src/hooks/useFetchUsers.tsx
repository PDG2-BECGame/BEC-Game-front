import { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, getDocs, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';

export interface UserData {
  id: string;
  name: string;
  email: string;
  organization: string;
  organitationId: string;
  totalScore: number;
  levelStatus: {
    [level: string]: {
      score: number;
      maxScore: number;
    };
  };
}

const useFetchUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para obtener las organizaciones en batch
    const fetchOrganizations = async (organitationIds: Set<string>) => {
      const organizationData: { [id: string]: string } = {};
      const orgDocsPromises = Array.from(organitationIds).map(async (orgId) => {
        try {
          const orgDocRef = doc(firestore, 'organitations', orgId);
          const orgDocSnap = await getDoc(orgDocRef);
          if (orgDocSnap.exists()) {
            const orgData = orgDocSnap.data();
            organizationData[orgId] = orgData.name || 'Sin nombre';
          } else {
            organizationData[orgId] = 'Organización no encontrada';
          }
        } catch (err) {
          console.error(`Error fetching organization ${orgId}:`, err);
          organizationData[orgId] = 'Error al obtener organización';
        }
      });
      await Promise.all(orgDocsPromises);
      return organizationData;
    };

    // Suscripción en tiempo real a los usuarios
    const unsubscribe = onSnapshot(
      collection(firestore, 'users'),
      async (snapshot) => {
        try {
          const usersData: UserData[] = [];
          const organitationIds: Set<string> = new Set();

          snapshot.forEach((userDoc) => {
            const data = userDoc.data();

            // Obtener organitationId y agregarlo al conjunto
            const organitationId = data.organitationId || '';
            if (organitationId) {
              organitationIds.add(organitationId);
            }

            // Calcular totalScore
            const levelStatus = data.levelStatus || {};
            let totalScore = 0;

            for (const levelKey in levelStatus) {
              const level = levelStatus[levelKey];
              if (level && typeof level.score === 'number') {
                totalScore += level.score;
              }
            }

            usersData.push({
              id: userDoc.id,
              name: data.name || 'Sin nombre',
              email: data.email || 'Sin email',
              organitationId,
              organization: '', // Se asignará después
              totalScore,
              levelStatus,
            });
          });

          // Obtener organizaciones en batch
          const organizationData = await fetchOrganizations(organitationIds);

          // Asignar nombres de organizaciones a los usuarios
          const usersWithOrg = usersData.map((user) => ({
            ...user,
            organization: organizationData[user.organitationId] || 'Sin organización',
          }));

          // Ordenar usuarios por totalScore descendente
          usersWithOrg.sort((a, b) => b.totalScore - a.totalScore);

          setUsers(usersWithOrg);
          setIsLoading(false);
        } catch (err) {
          console.error('Error processing users:', err);
          setError('Error al cargar los usuarios.');
          setIsLoading(false);
        }
      },
      (err) => {
        console.error('Error fetching users:', err);
        setError('Error al cargar los usuarios.');
        setIsLoading(false);
      }
    );

    // Limpiar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  return { users, isLoading, error };
};

export default useFetchUsers;
