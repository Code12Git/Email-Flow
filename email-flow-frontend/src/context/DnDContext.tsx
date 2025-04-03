import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type NodeType = 'email' | 'wait' | 'source' | null;

type DnDContextType = {
  type: NodeType;
  setType: Dispatch<SetStateAction<NodeType>>;
};

const DnDContext = createContext<DnDContextType | undefined>(undefined);

interface DnDProviderProps {
  children: ReactNode;
}

export const DnDProvider: React.FC<DnDProviderProps> = ({ children }) => {
  const [type, setType] = useState<NodeType>(null);

  return (
    <DnDContext.Provider value={{ type, setType }}>
      {children}
    </DnDContext.Provider>
  );
};

export const useDnD = (): DnDContextType => {
  const context = useContext(DnDContext);
  if (!context) {
    throw new Error('useDnD must be used within a DnDProvider');
  }
  return context;
};