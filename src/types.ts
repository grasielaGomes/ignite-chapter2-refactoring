export interface FoodObj {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: FoodObj;
  handleUpdateFood: (food: FoodObj) => void;
}

export interface FoodProps {
  food: FoodObj;
  handleDelete: (foodId: Number) => void;
  handleEditFood: (food: FoodObj) => void;
}