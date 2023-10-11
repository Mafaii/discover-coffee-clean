import ShopCard from "./../shop-card/shop.card.component";
import styles from "./shop.container.styles.module.css";
const ShopsContainer = ({ shops, header }) => {  
  return (
    <section style={{ padding: "2rem" }}>
      <h3 className={styles.header}>{header}</h3>
      <div className={styles.shop_sections}>
        {shops.map((shop) => (
          <ShopCard item={shop} key={shop.id} />
        ))}
      </div>
    </section>
  );
};
export default ShopsContainer;
