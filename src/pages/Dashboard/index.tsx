import { useState, useEffect } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodObj } from 'types';
import { FoodsContainer } from './styles';


function DashBoard() {
  const [foods, setFoods] = useState<FoodObj[]>([]);
  const [editingFood, setEditingFood] = useState({
    id: 1,
    name: "",
    description: "",
    price: "",
    available: true,
    image: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/foods');
      setFoods(response.data);
    }
    fetchData();
  }, []);

  const handleAddFood = async (food: FoodObj) => {
    try {
      await api.post("/foods", {
        ...food,
        available: true,
      });
      setFoods([...foods, food]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditFood = (food: FoodObj) => {
    setEditingFood(food);
    setEditModalOpen(true);
  };

  const handleUpdateFood = async (food: FoodObj) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );
      setFoods(foodsUpdated);

    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: Number) => {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);
    setFoods(foodsFiltered);
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  }

  return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map((food: FoodObj) => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
};

export default DashBoard;