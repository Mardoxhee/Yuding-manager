import { useState, useEffect } from "react";
import styles from "./menu.module.scss";
import MealCard from "./../../src/components/shared/Mealcard";
import Link from "next/link";
import authHeader from "./../../src/services/authHeader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Menu = () => {
  const [meals, setMeals] = useState([]);

  const schema = yup.object().shape({
    title: yup.string().required("a meal has to have imperativly a name"),
    description: yup.string().min(20).max(80).required(),
    mealType: yup.string(),
    picture: yup.string().required("please update a picture"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getMeals = async () => {
    try {
      const url = "http://127.0.0.1:3000/meals/by-account";
      const requestoptions = {
        method: "GET",
        headers: authHeader(),
      };
      const response = await fetch(url, requestoptions);
      const jsonMeal = await response.json();
      setMeals(jsonMeal);
      console.log("response from meals", meals);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.mainWrapper}>
      <h2>Gérer votre menu</h2>
      <p>
        lorem ispum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry s standard dummy text ever
        since the 1500s
      </p>
      <hr />
      <div>
        <h3>Informations sur le menu</h3>
        <div className={styles.inputWrapper}>
          <textarea type="text" placeholder="Description du menu"></textarea>
          <input type="text" placeholder="Gatronomie "></input>

          {/* <label>Image de profile</label> */}
        </div>
      </div>
      <div className={styles.mealWrapper}>
        <div className={styles.mealList}>
          <h4>Liste des mets</h4>
          <div>
            <MealCard />
            <MealCard />
            <MealCard />
            <MealCard />
            <MealCard />
            <MealCard />
            <MealCard />
          </div>
        </div>
        <form className={styles.mealCreation}>
          <h4>Création de met</h4>
          <input
            type="text"
            placeholder="nom du met"
            {...register("title", { required: true })}
          ></input>
          <input
            type="text"
            placeholder="description du met"
            {...register("description", { required: true })}
          ></input>
          <input
            type="number"
            placeholder="prix du met en $"
            {...register("price", { required: true })}
          ></input>
          <input
            type="file"
            placeholder="photo"
            {...register("picture", { required: true })}
          ></input>
          <button type="submit">Créer le met</button>
        </form>
      </div>
    </div>
  );
};

export default Menu;
