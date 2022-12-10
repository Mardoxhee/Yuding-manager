import React from "react";
import styles from "./reglages.module.scss";
import authHeader from "./../src/services/authHeader";
import Moment from "moment";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BasicTimePicker from "./../src/components/shared/TimePicker";
import { Icon } from "@iconify/react";
import {
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Card,
  CardSubtitle,
} from "reactstrap";
import Image from "next/image";
import simg from "../src/assets/images/background/icons2.jpg";

const Reglages = () => {
  const [value, setValue] = React.useState(null);
  const [restaurantObject, setRestaurantObject] = useState({});
  const [restaurantId, setRestaurantId] = useState("");
  const [printIcon, setPrintIcon] = useState(false);

  const HandleIcon = () => {
    setPrintIcon(true);
  };
  const HandleClose = () => {
    setPrintIcon(false);
  };

  console.log("date value", value);

  const getRestaurantInfo = async () => {
    try {
      const url = "https://yuding.herokuapp.com/restaurants/by-account";
      const requestoptions = {
        method: "GET",
        headers: authHeader(),
        // headers: "",
      };
      const response = await fetch(url, requestoptions);
      console.log("results", response);
      if (response.status === 401) {
        Router.push({
          pathname: "http://localhost:8081/Login",
        });
      } else {
        const jsonData = await response.json();
        const taille = jsonData.restaurant.length;
        if (taille !== 0) {
          const restaurantData = jsonData.restaurant[0];
          setRestaurantObject(restaurantData);
          const idResto = restaurantData._id;
          setRestaurantId(idResto);
        } else if (taille === 0) {
          Router.push({
            pathname: "http://localhost:8081/CreationRestaurant",
          });
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("daa", data);
      const requestoptions = {
        method: `PATCH`,
        body: JSON.stringify(data),
        headers: authHeader(),
      };
      console.log("id reto", restaurantId);
      console.log("body", requestoptions.body);
      const url = `https://yuding.herokuapp.com/restaurants/${restaurantId}`;
      const response = await fetch(url, requestoptions);
      console.log("responsePatch", response);
    } catch (error) {
      console.log("error :", error.message);
    }
  };

  useEffect(() => {
    getRestaurantInfo();

    // onSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.mainContainer} onSubmit={handleSubmit(onSubmit)}>
      <h2>Profile du restaurant en ligne</h2>
      <p>
        Toutes les informations nécessaires affichées sur le profile du
        restaurant
      </p>
      <hr className={styles.soulignBar} />
      <div>
        <h3>Informations de base</h3>
        <div className={styles.inputWrapper}>
          <div className={styles.inptbloc}>
            <label>Nom du resto</label>
            <input
              onClick={HandleIcon}
              type="text"
              placeholder="Nom du restaurant"
              defaultValue={restaurantObject.restaurantName}
              {...register("restaurantName")}
            ></input>
            <div>
              <Icon
                icon="dashicons:yes"
                className={
                  printIcon === true
                    ? styles.iconeDisplayed
                    : styles.iconeUndisplayed
                }
                onClick={handleSubmit(onSubmit)}
              />
              <Icon
                icon="charm:cross"
                className={
                  printIcon === true ? styles.redIcon : styles.iconeUndisplayed
                }
                onClick={HandleClose}
              />
            </div>
          </div>
          <div className={styles.inptbloc}>
            <label>Nombre de place</label>
            <input
              type="number"
              placeholder="nombre de places"
              defaultValue={restaurantObject.nbrPlaces}
              // {...register("nbrPlaces")}
            ></input>{" "}
          </div>
          <div className={styles.inptbloc}>
            {" "}
            <label>Heure d&apos;ouverture</label>
            <BasicTimePicker
              label={Moment(restaurantObject.openTime).format("hh:mm:ss A")}
              value={value}
              name="input"
              onChange={(newValue) => {
                setValue(newValue);
              }}
              // {...register("openTime")}
            />
            {/* <input
              type="text"
              // className={styles.deepInpt}
              placeholder="Heure d'ouverture"
              defaultValue={value}
              // defaultValue={value}
              {...register("openTime")}
            /> */}
          </div>
          <div className={styles.inptbloc}>
            {" "}
            <label>Heure de fermeture</label>
            <input
              type="time"
              placeholder="Heure de fermeture"
              defaultValue={restaurantObject.closeTime}

              // {...register("closeTime")}
            ></input>{" "}
          </div>
          <div className={styles.inptbloc}>
            {" "}
            <label>Photo de couverture</label>
            <input
              type="file"
              placeholder=""
              className={styles.iptFile}
            ></input>{" "}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={restaurantObject.coverPicture}
              alt=""
              className={styles.imgPreview}
            />
          </div>

          {/* <label>Image de profile</label> */}
        </div>
      </div>
      <div className={styles.RestaurantAdress}>
        <h3>Adresse du restaurant</h3>
        <div className={styles.inputWrapper}>
          <div className={styles.inptbloc}>
            <label>Commune</label>
            <input
              type="text"
              placeholder="Commune"
              // defaultValue={
              //   restaurantObject.adress
              //     ? restaurantObject.adress[0].township
              //     : ""
              // }
              // {...register("adress[0].township")}
            ></input>
          </div>
          <div className={styles.inptbloc}>
            <label>Quartier</label>
            <input
              type="text"
              placeholder="Quartier"
              // defaultValue={
              //   restaurantObject.adress ? restaurantObject.adress[0].quater : ""
              // }
              // {...register("adress[0].quater")}
            ></input>
          </div>
          <div className={styles.inptbloc}>
            <label>Avenue</label>
            <input
              type="text"
              placeholder="Avenue"
              // defaultValue={
              //   restaurantObject.adress ? restaurantObject.adress[0].street : ""
              // }
              // {...register("adress[0].street")}
            ></input>
          </div>
          <div className={styles.inptbloc}>
            <label>Numéro</label>
            <input
              type="number"
              placeholder="Numéro"
              // defaultValue={
              //   restaurantObject.adress ? restaurantObject.adress[0].number : ""
              // }
              // {...register("adress.number")}
            ></input>
          </div>
        </div>
      </div>
      <div className={styles.RestaurantAdress}>
        <h3>Informations complémentaires</h3>
        <div className={styles.inputWrapper}>
          <div className={styles.inptbloc}>
            <label>Description du restaurant</label>
            <textarea
              type="text multiline"
              placeholder="Description du restaurant"
              defaultValue={restaurantObject.description}
              // {...register("description")}
            ></textarea>
          </div>
          <div className={styles.inptbloc}>
            <label>Catégorie</label>
            <select
              className={styles.inptSelect}
              defaultValue={restaurantObject.category}
              // {...register("category")}
            >
              <option>---choisir la catégorie---</option>
              <option>catégorie 1</option>
              <option>catégorie 2</option>
            </select>
          </div>
          <div className={styles.inptbloc}>
            <label>% de réduction</label>
            <input
              type="number"
              placeholder="% de réduction"
              defaultValue={restaurantObject.reduction}
              // {...register("reduction")}
            ></input>
          </div>
          <div className={styles.inptbloc}>
            <label>Prix minimal en $</label>
            <input
              type="number"
              placeholder="Prix minimal en $"
              defaultValue={restaurantObject.prixMoyen}
              // {...register("prixMoyen")}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reglages;
