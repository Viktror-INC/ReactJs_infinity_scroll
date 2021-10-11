import React from "react";

import styles from "./TableItems.module.scss";

const Tabitem = (
  { pageData, onSortByTitle, onTimeAdded, onDomain, onEndScroll, lastItemRef }
) => {
  const activeTime = React.useRef();
  const activeTitle = React.useRef();
  const activeDomain = React.useRef();

  const setActiveTime = (activeElement) => {
    activeTime.current.classList.remove(styles.activeItem);
    activeTitle.current.classList.remove(styles.activeItem);
    activeDomain.current.classList.remove(styles.activeItem);
    activeElement.current.classList.add(styles.activeItem);
  };

  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <div className={styles.tabelItem} onClick={() => onTimeAdded(() => setActiveTime(activeTime))} ref={activeTime}>
          <h2>time added</h2>
        </div>
        <div
          className={styles.tabelItem}
          onClick={() => onSortByTitle(() => setActiveTime(activeTitle))}
          ref={activeTitle}
        >
          <h2>title</h2>
        </div>
        <div
          className={styles.tabelItem}
          onClick={() => onDomain(() => setActiveTime(activeDomain))}
          ref={activeDomain}
        >
          <h2>domain</h2>
        </div>
      </div>
      <ul className={styles.tableBody}>
        {pageData.map((item, index) => {
          if (pageData.length === index + 1) {
            return (
              <li ref={lastItemRef} key={`${index}_${item.time_ago}`}>
                <span>{item.time_ago}</span>
                <span><a href={item.url}>{item.title}</a></span>
                <span>{item.domain}</span>
              </li>
            );
          } else {
            return (
              <li key={`${index}_${item.time_ago}`}>
                <span>{item.time_ago}</span>
                <span><a href={item.url}>{item.title}</a></span>
                <span>{item.domain}</span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Tabitem;
