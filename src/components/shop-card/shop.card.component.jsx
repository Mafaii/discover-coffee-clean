import Link from "next/link";
import Card from "../card/card.component";
import styles from "./shop.card.styles.module.css";
import Image from "next/image";
import Tag from "../tag/tag.component";
const ShopCard = ({ item }) => {
  return (
    <Card >
      <Link href={`/shops/${item.id}`} className={styles.cart_link}>
        <h4 className={styles.shop_name}>{item.name}</h4>
        <div className={styles.shop_info}>
          <span>Location</span>
          <span>{item.address.address}</span>
          <div className={styles.tags}>
            {item.categories.map(el => <Tag text={el.name} key={el.name}/>)}
          </div>
        </div>
      </Link>
    </Card>
  );
};
export default ShopCard;
