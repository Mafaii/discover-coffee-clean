import classNames from "classnames";
import Button from "../button/button.component";
import styles from "./header.section.module.css";
import Image from "next/image";

const HeaderSection = ({ buttonClickHandler, buttonText, ...rest }) => {
  return (
    <>
      <section className={styles["header-section"]}>        
        <h1 className={styles["banner-header"]}>
          Find your <span>Coffee</span>
        </h1>
        <h3 className={styles["banner-subheader"]}>Check coffee shops nearby</h3>
        <Button
          className={classNames(styles["banner-btn"], "btn")}
          title="Find Shops Near You"
          clickHandler={buttonClickHandler}
        >
          {buttonText}
        </Button>
      </section>
    </>
  );
};

export default HeaderSection;
