import "./App.scss";
import React from "react";
import axios from "axios";
import Tabitem from "./components/TabItem/TabItems";

function App() {
  const [pageData, setPageData] = React.useState([]);
  const [updatePage, setUpdatePage] = React.useState(false);
  const [error, setError] = React.useState();
  const [curentPage, setCurrentPage] = React.useState(1);
  const [currentTable, setCurrentTable] = React.useState('');

  /** Took data from JSON */
  React.useEffect(() => {
    try {
      const getResponse = async () => {
        await axios({
          method: 'GET',
          url: 'https://api.hnpwa.com/v0/news/1.json',
          params: {pageNumber: curentPage},
        }).then((res) => {
          setPageData( prevData => {
            let inOneArray = [].concat.apply([], [...prevData , res.data]);
            if(currentTable === 'onSortByTitle') { onSortByTitle(() =>{}, inOneArray)};
            if(currentTable === 'onTimeAdded') { onTimeAdded(() =>{}, inOneArray)};
            if(currentTable === 'onDomain') { onDomain(() =>{}, inOneArray)};
            return inOneArray
          });
        })
      };
      getResponse();
    } catch (err) {
      setError(err);
    }
  },[curentPage, currentTable]);

  if(error) console.log(error);

  /**Sorting table */
  const onSortByTitle = (callBack = () =>{}, data = pageData) => {
    if (data) {
      console.log(data);
      setPageData(
        data.sort( (a, b) => {
          return a.title.localeCompare(b.title);
        })
      );
    }
      setUpdatePage(!updatePage);
    setCurrentTable('onSortByTitle');
    callBack();
  };

  const onTimeAdded =(callBack = () =>{}, data = pageData) => {
    if (data) {
      setPageData(
        data.sort((a, b) => {
          return b.time.toString().localeCompare(a.time);
        })
      );
    }
    setCurrentTable('onTimeAdded');
    setUpdatePage(!updatePage);
    callBack();
  };

  const onDomain = (callBack = () =>{}, data = pageData) => {
    if (data) {
      setPageData(
        data.sort( (a, b) => {
          if (a.domain && b.domain) {
            return a.domain.localeCompare(b.domain);
          } else {
            return '';
          }
        })
      );
    }
    setCurrentTable('onDomain');
    setUpdatePage(!updatePage);
    callBack();
  };

  /**When Scroll to bottom page */

  const lastItemRef = React.useCallback((node) => {
    if(lastItemRef.current) lastItemRef.current.disconnect()
    lastItemRef.current = new IntersectionObserver(item => {
      if (item[0].isIntersecting) {
        setCurrentPage(previousPage => previousPage + 1)
      }
    })
    if(node) lastItemRef.current.observe(node)
  },[]);

  
  return pageData ? (
    <div className="App">
      <Tabitem
        onDomain={onDomain}
        onTimeAdded={onTimeAdded}
        onSortByTitle={onSortByTitle}
        pageData={pageData}
        lastItemRef={lastItemRef}
      />
    </div>
  ) : (
    <div>Cant reload</div>
  );
}

export default App;
