import React, { useEffect, useState } from 'react';
import Search from './Search';
import { useData } from '../ContextProvider';
import './Calendar.css';
import DateShow from './DateShow';
import CalendarDay from './CalendarDay';
import NavSetting from './NavSetting';
import { getData } from '../Reducer';
import { RingLoader } from 'react-spinners';


export default function Calendar() {
  const [data, dispatch] = useData();
  const [search, setSearch] = useState(false);
  const [state, setState] = useState(false);
  const [upOrDown, setUpOrDown] = useState(false);

  function changeState() {
    setState((t) => !t);
  }

  function handleSearchStatus() {
    setSearch((t) => !t);
  }

  useEffect(() => {
    let options = { type: 'CALENDAR' };
    getData(dispatch, options);
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_MONTH_TODOS' });
  }, [upOrDown]);

  return (
    <div className="w-full h-screen flex flex-col">
      <Search handleSearch={handleSearchStatus} searchStatus={search} />
      <NavSetting handleSearch={handleSearchStatus} />
      <div className="calendar content mx-auto w-[95%] h-full bg-white shadow-md rounded-lg">
        <div className="month-info h-[10%] flex justify-between items-center w-full border-b-2 p-4 bg-gradient-to-r from-teal-500 to-orange-500 text-white rounded-t-lg">
          <span
            className="p-2 bg-orange-400 hover:bg-orange-500 rounded-xl uppercase cursor-pointer"
            onClick={() => {
              dispatch({ type: 'PREV_MONTH_CALENDAR', state: changeState });
              setUpOrDown((t) => !t);
            }}
          >
            Prev Month
          </span>
          <DateShow>{data.currentMonth}</DateShow>
          <span
            className="p-2 bg-orange-400 hover:bg-orange-500 rounded-xl uppercase cursor-pointer"
            onClick={() => {
              dispatch({ type: 'NEXT_MONTH_CALENDAR', state: changeState });
              setUpOrDown((t) => !t);
            }}
          >
            Next Month
          </span>
        </div>
        <div className="overflow-auto grid grid-cols-7 gap-1 p-2 bg-teal-100">
          {data.calendar.slice(0, 7).map((e, i) => (
            <div
              key={i}
              className="day uppercase h-max grid place-content-center border-b-[0.5px] border-teal-400 col-span-1 row-span-1 text-teal-700"
            >
              {e.split(' ')[0]}
            </div>
          ))}
        </div>
        <div style={{zIndex :" -10 !important"}} className="min-w-full p-2 h-[85vh] overflow-auto grid grid-cols-7 gap-1 grid-rows-5   bg-teal-50">
          {!data.loading &&
            data.calendar.map((e, i) => (
              <CalendarDay state={changeState} key={i} tasks={data.taskOfMonth} date={e} />
            ))}
          {data.loading && (
            <div className="w-full h-full flex absolute 
            top-[50%] translate-y-[-50%]
            left-[50%] translate-x-[-50%]
             items-center justify-center">
              <RingLoader color='#38b2ac' size={150} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
