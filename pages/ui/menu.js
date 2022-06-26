import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { useState, useEffect } from "react";
import styles from "./menu.module.scss";
import MealCard from "./../../src/components/shared/Mealcard";
import Link from "next/link";

const Menu = () => {
  const [meals, setMeals] = useState([]);

  const getMeals = async () => {
    try {
      const url = "https://yuding.herokuapp.com/meals";
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMeals();
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
          <input type="text" placeholder="nom du met"></input>
          <input type="text" placeholder="description du met"></input>
          <input type="number" placeholder="prix du met en $"></input>
          <input type="file" placeholder="photo"></input>
          <button>Créer le met</button>
        </form>
      </div>
    </div>
  );
};

export default Menu;
