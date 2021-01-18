import React, { useEffect, useState } from "react";
import axios from "axios";
import Spacexcard from "./Spacexcard";
import fetch from 'isomorphic-unfetch';

export default function Index(props) {
  const [SpaceXData, setSpaceXData] = useState([]);
  const {SpaceList} = props;
  let FilterYears = [
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
  ];
  useEffect(() => {
    setSpaceXData(SpaceList);
  }, [SpaceList]);

  const fectchApiData = (url) => {
    const apiData = axios.get(url);
    apiData.then((x) => {
      setSpaceXData(x.data);
    });
  };
  const launchSuccessFilter = (e) => {
    const url =
      "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=" +
      e.target.innerText;
    fectchApiData(url);
  };
  const landSuccessFilter = (e) => {
    const url =
      "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=" +
      e.target.innerText;
    fectchApiData(url);
  };
  const yearFilter = (year) => {
    const url =
      "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=" +
      year.target.innerText;
    fectchApiData(url);
  };
  return (
    <div className="App">
      <div className="spacex__header">Space X Launch Programs</div>
      <div className="flx-row">
        <div className="filter__container">
          <h2>Filters</h2>
          <div className="filter__years__title">Launch Year</div>
          <div className="filter__years" onClick={yearFilter}>
            {FilterYears.map((x) => {
              return (
                <div key={x} className="filter__years__items">
                  <button className="filter__years__button">{x}</button>
                </div>
              );
            })}
          </div>

          <div className="filter__years__title">Successful Launch</div>
          <div className="filter__years">
            <div className="filter__years__items">
              <button
                className="filter__years__button"
                onClick={launchSuccessFilter}
              >
                True
              </button>
            </div>
            <div className="filter__years__items">
              <button
                className="filter__years__button"
                onClick={launchSuccessFilter}
              >
                False
              </button>
            </div>
          </div>
          <div className="filter__years__title">Successful Landing</div>
          <div className="filter__years">
            <div className="filter__years__items">
              <button
                className="filter__years__button"
                onClick={landSuccessFilter}
              >
                True
              </button>
            </div>
            <div className="filter__years__items">
              <button
                className="filter__years__button"
                onClick={landSuccessFilter}
              >
                False
              </button>
            </div>
          </div>
        </div>
        <div className="item__container rel">
          <div className="item__list">
            {SpaceXData.length ? <Spacexcard spacexList={SpaceXData} /> : <div className="nodata">No Data Found</div>}{" "}
          </div>
        </div>
      </div>
      <div className="developedby">Developed By : Arun Kumar Janardhanan</div>
    </div>
  );
}

Index.getInitialProps =async function(){
    const url = await fetch("https://api.spaceXdata.com/v3/launches?limit=100");
    const data = await url.json();
    console.log(data)
    return {SpaceList: data}
}