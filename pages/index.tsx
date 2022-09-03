import classNames from "classnames";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  interface Advice {
    slip: {
      id: number;
      advice: string;
    };
  }
  const [advice, setAdvice] = useState<Advice>();
  const [isLoading, setIsLoading] = useState(true);
  const getAdvice = () => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => setAdvice(data));
  };
  const buttonClass = classNames(
    "p-4 relative rounded-full bg-[#52ffa8] -bottom-16 ",
    { "shadow-2xl shadow-[#52ffa8]": isLoading }
  );
  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      getAdvice();
    }, 3000);
    setIsLoading(false);
  };
  isLoading ? console.log("loading") : "Not Loading";
  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="bg-[#1f2632] h-screen flex items-center justify-center">
      <Head>
        <title>Advice Generator</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="bg-[#323a49] w-2/5 rounded-lg space-y-5 flex flex-col items-center py-10">
        {!isLoading && advice ? (
          <>
            <h2 className="text-sm tracking-widest text-[#52ffa8] ">
              ADVICE #{advice.slip?.id}
            </h2>
            <p className="text-[#cee3e9] text-2xl text-center w-2/3 ">
              &ldquo;{advice.slip?.advice}&rdquo;
            </p>
          </>
        ) : (
          <>
            <h2 className="text-sm tracking-widest text-[#52ffa8] ">
              ADVICE #ID{" "}
            </h2>
            <p className="text-[#cee3e9] text-2xl text-center w-2/3 ">
              &ldquo;Advice&rdquo;
            </p>
          </>
        )}
        <div className="relative h-4 w-3/4">
          <Image
            src="/pattern-divider-desktop.svg"
            className=""
            layout="fill"
            alt="dice"
          />
        </div>
        <button onClick={handleClick} className={buttonClass}>
          <div className="relative p-[10px]">
            <Image src="/icon-dice.svg" layout="fill" alt="dice" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;
