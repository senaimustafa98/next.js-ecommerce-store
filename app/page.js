import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
        <div><h1>Available Products :D</h1>
        </div>
        <div className="home-page-products">
        <div ><Image
        src="/logo.svg"
        alt="UpLeveled"
        height={350}
        width={350}
      /></div>
        <div><Image
        src="/logo.svg"
        alt="UpLeveled"
        height={350}
        width={350}
      /></div>
        <div><Image
        src="/logo.svg"
        alt="UpLeveled"
        height={350}
        width={350}
      /></div>
        <div><Image
        src="/logo.svg"
        alt="UpLeveled"
        height={350}
        width={350}
      /></div>
      </div>
        </>
  );
}
