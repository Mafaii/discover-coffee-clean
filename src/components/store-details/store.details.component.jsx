import Image from "next/image";
import Link from "next/link";
import styles from "./store.details.module.css";
import Tag from "../tag/tag.component";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "../button/button.component";

function StoreDetails({ name, address, categories, votes, id, handleUpVote }) {
  const [vote, setVote] = useState(votes ?? 0);

  const [storeImages, setStoreImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const fetcher = (url) => fetch(url).then((r) => r.json()).catch(err => "");

  const { data, error } = useSWR(`/api/getStoreById?id=${id}`, fetcher);

  const internalVoteHandler = () => {
    handleUpVote();
    setVote((vote) => vote + 1);
  };

  useEffect(() => {
    if (!error && data && data.votes) {
      setVote(data.votes);
    }
  }, [data]);

  const fetchImages = async () => {
    if (id) {
      const images = await fetch(`/api/fetchImageForShop?id=${id}`);
      if (images.status === 200) {
        const data = await images.json();
        
        if (data.length > 0) setStoreImages(data);
      }
    }
  };

  const nextImage = () => {
    const nextNum = (currentImage + 1) % storeImages.length;

    setCurrentImage(nextNum);
  };

  useEffect(() => {
    //fetch image
    fetchImages();
  }, [id]);

  useEffect(() => {}, [storeImages]);

  return (
    <>
      <Image
        className={styles.image}
        alt="Hero image"
        width={1000}
        height={600}
        // fill
        src="/hero.svg"
        style={{ position: "fixed" }}
      />
      <div className={styles.shop_info}>
        <div className={styles.shop_container}>
          <Link href={`/`} className={styles.back_link}>
            <i className="fa-solid fa-arrow-left icon"></i>Go Back to coffee
            list
          </Link>
          <div className={styles.shop_info_data}>
            <h1>{name}</h1>
            <div className={styles.info_container}>
              <Image
                onClick={nextImage}
                className={styles.img}
                width={300}
                height={450}
                src={
                  storeImages[currentImage] ||
                  "https://images.unsplash.com/photo-1538587888044-79f13ddd7e49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80"
                }
                alt={`${name}'s image`}
              ></Image>
              {
                <div className={styles.info}>
                  <i className="fa-solid fa-location-dot icon"></i>
                  <div className={styles.address}>
                    <span>{address && address.address}</span>
                    <span>
                      {address && address.locality}{" "}
                      {address && address.postcode}
                    </span>
                    <span>{address && address.region}</span>
                  </div>
                  <i className="fa-solid fa-tag"></i>
                  <div className={styles.tags}>
                    {categories &&
                      categories.map((el) => (
                        <Tag text={el.name} key={el.name} />
                      ))}
                  </div>
                  <i className="fa-solid fa-heart"></i>
                  <div className={styles.fav}>
                    <Button
                      clickHandler={internalVoteHandler}
                      className={styles.fav_btn}
                    >
                      {vote}
                    </Button>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreDetails;
