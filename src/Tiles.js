import { useState, useRef, useEffect, useLayoutEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import "./Tiles.css";

const Tiles = () => {
  let columns = 0,
    rows = 0,
    toggled = false;

  const tilesRef = useRef(null);
  let wrapper = tilesRef.current;
  // const [windowSize, setWindowSize] = useState([0, 0]);
  // const updateWindowSize = () => {
  //   // setWindowSize([window.innerWidth, window.innerHeight]);
  //    createGrid();
  // };
  //   const wrapper = document.getElementById("tiles");
  useEffect(() => {
    wrapper = tilesRef.current;
    createGrid();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      doAnimation();
    }, 500);
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
    // document.body.classList.toggle("toggled");
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
    const size = document.body.clientWidth > 800 ? 40 : 20;
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

  const doAnimation = () => {
    toggle();
    console.log(columns, rows);
    let randX = (Math.round(Math.random() * 10 - 5) + Math.round(columns / 2)) + 1;
    let randY = Math.round(Math.random() * 10 - 5) + Math.round(rows / 2) * (Math.round(columns / 2));
    let randCenter = randY;

    anime({
      targets: ".tile",
      opacity: toggled ? 0 : 1,
      delay: anime.stagger(18, {
        grid: [columns, rows],
        from: randCenter,
      }),
    });
  };

  return (
    <div className="tiles">
      <div ref={tilesRef} id="tiles"></div>
      <div className="centered" id="title">
        <div className="fancy">👋🏼 Wai</div>
      </div>
    </div>
  );
};

export default Tiles;
