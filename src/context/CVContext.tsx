import { createContext, useState, useContext, ReactNode } from "react";
import mockData from "../mock/cv-data.json";

// Définition du type pour les sections du CV
type CVSection = {
  id: string;
  title: string;
  content: string;
};

// Définition du type de l'état global
type CVState = {
  name: string;
  title: string;
  sections: CVSection[];
  updateCV: (updatedCV: Partial<CVState>) => void;
};

// 🔹 Créer le contexte avec une valeur par défaut
export const CVContext = createContext<CVState>({
  ...mockData,
  updateCV: () => {},
});

// 🔹 Provider du contexte
export const CVProvider = ({ children }: { children: ReactNode }) => {
  const [cv, setCV] = useState<CVState>({
    ...mockData,
    updateCV: (updatedCV) => setCV((prev) => ({ ...prev, ...updatedCV })),
  });

  return <CVContext.Provider value={cv}>{children}</CVContext.Provider>;
};

// 🔹 Hook personnalisé pour utiliser le contexte
export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
};
