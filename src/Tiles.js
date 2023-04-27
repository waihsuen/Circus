import { useState, useRef, useEffect, useLayoutEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import Name from "./Name";
import "./Tiles.css";

const names = [
  "Vivian",
  "Martin",
  "Sethu",
  "Rukshan",
  "Valencia",
  "Shank",
  "Cheryl",
  "Jiayi",
  "Ruhaim",
  "Shixiang",
  "Vionna",
  "Parikshit",
  "Confluence",
  "IT Support",
  "Level 6 Toilet",
  "Galaxy Meeting Room",
  "Cendex",
  "Jira",
  "Figma",
  "Al Capone",
  "Aleph",
  "Slack Channels",
  "Bamboo HR",
  "OKR PROFIT",
  "Bus 147",
  "Bukit Merah",
  "Squeaky Chairs",
  "Walk Around The Block",
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

shuffle(names);

const Tiles = () => {
  let columns = 0,
    rows = 0,
    toggled = false;

  const tilesRef = useRef(null);
  const refIndex = useRef(0);
  const [showName, setShowName] = useState(refIndex.current);

  let wrapper = tilesRef.current;
  // console.log(refIndex.current);

  useEffect(() => {
    wrapper = tilesRef.current;
    createGrid();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      doAnimation();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // useLayoutEffect(() => {
  //   window.addEventListener("resize", updateWindowSize);
  //   // updateWindowSize();
  //   return () => window.removeEventListener("resize", updateWindowSize);
  // }, []);

  window.onresize = () => createGrid();

  const toggle = () => {
    toggled = !toggled;
    document.body.classList.toggle("toggled");
  };

  const createTile = (index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.opacity = toggled ? 0 : 1;
    tile.onclick = (e) => handleOnClick(index);
    return tile;
  };

  const createTiles = (quantity) => {
    Array.from(Array(quantity)).map((tile, index) => {
      wrapper.appendChild(createTile(index));
    });
  };

  const createGrid = () => {
    wrapper.innerHTML = "";
    const size = document.body.clientWidth > 800 ? 50 : 20;
    columns = Math.floor(document.body.clientWidth / size);
    rows = Math.floor(document.body.clientHeight / size);
    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);
    createTiles(columns * rows);
  };

  const handleOnClick = (index) => {
    toggle();

    anime({
      targets: ".tile",
      opacity: toggled ? 0 : 1,
      delay: anime.stagger(50, {
        grid: [columns, rows],
        from: index,
      }),
    });
  };

  const radius = 5;
  const animeTiming = 40;

  const doAnimation = () => {
    // console.log(Math.random())
    toggle();
    // console.log(columns, rows);
    const randX = Math.round(
      Math.random() * (radius * 2) - radius + columns / 2
    );
    const randY = Math.round(Math.random() * (radius * 2) - radius + rows / 2);
    const randCenter = columns * randY + randX;

    anime({
      targets: ".tile",
      opacity: toggled ? 0 : 1,
      delay: anime.stagger(animeTiming, {
        grid: [columns, rows],
        from: randCenter,
      }),
      complete: () => {
        if (!toggled) {
          changeName();
          setShowName(refIndex.current);
        }
      },
    });
  };

  const changeName = () => {
    if (refIndex.current < names.length - 1) {
      refIndex.current += 1;
    } else {
      refIndex.current = 0;
    }
  };

  return (
    <div className="tiles">
      <div ref={tilesRef} id="tiles"></div>
      <div className="centered" id="title">
        <div className="fancy">
          👋🏼
          <Name propsName={names[showName]} />
        </div>
      </div>
    </div>
  );
};

export default Tiles;
