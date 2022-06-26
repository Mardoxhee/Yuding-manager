import styles from "./mealcard.module.scss";
import Image from "next/image";

const MealCard = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.imgContainer}>
        <Image
          src="https://media.gqmagazine.fr/photos/5d8b7254c7191e00083ebdbb/4:3/w_1440,h_1080,c_limit/como%20hacer%20la%20mejor%20pizza%20del%20mundo.jpg"
          alt=""
          width={500}
          height={360}
        />
      </div>
      <div className={styles.title}>
        <h4>pondu madesu</h4>
        <p>le pondu c est le meilleur des légume blabla</p>
      </div>

      <small>50£</small>
    </div>
  );
};

export default MealCard;
