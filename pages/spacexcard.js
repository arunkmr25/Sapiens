import React from "react";

export default function Spacexcard(props) {
  return (
    <>
      {props.spacexList.map((x) => {
        return (
          <div className="spacecard__items" key={x.flight_number}>
            <div className="spacecard__image">
              <img src={x.links.mission_patch} alt="" />
            </div>
            <div className="spacecard_content">
              <div className="val pd-tpbt-5">
                {x.mission_name} #{x.flight_number}
              </div>
              {x.mission_id.length ? (
                <div>
                  <div className="bold">Mission Ids:</div>
                  <ul className="mr-tpbt-5">{x.mission_id.map((y) => {
                      return <li key={y} className="val">{y}</li>
                  })}</ul>
                </div>
              ) : null}
              <div className="bold pd-tpbt-5">Launch Year : <span className="val">{x.launch_year}</span></div>
              <div className="bold pd-tpbt-5">Successful Launch : <span className="val">{x.launch_success ? 'True' : 'False'}</span></div>
              <div className="bold pd-tpbt-5">Successful Landing : <span className="val">{x.launch_success ? (x.rocket.first_stage.cores[0].land_success ? 'True' : 'False'): 'False'}</span></div>

            </div>
          </div>
        );
      })}
    </>
  );
};

Spacexcard.getInitialProps =async function(){
  return {spacexList: []};
}