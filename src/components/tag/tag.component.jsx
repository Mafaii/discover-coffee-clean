import styles from "./tag.styles.module.css";

const Tag = ({ text }) => {
  return <div className={styles.tag}>{text}</div>;
};
export default Tag;
