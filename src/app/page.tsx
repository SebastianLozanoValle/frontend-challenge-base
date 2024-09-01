import { HeroBanner } from "@/components/home/HeroBanner";
import { MovieGalery } from "@/components/home/MovieGalery";
import styles from "@/styles/Home.module.css"

export default function home(): JSX.Element {
  return (
    <>
      <HeroBanner />
      <MovieGalery />
    </>
  );
}
