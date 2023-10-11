import styles from "./card.styles.module.css";
const Card = ({ children, ...props }) => {
  return (
    <div {...props} className={styles.shop_card} >
      {children}
    </div>
  );
};

export default Card;
