import React, { useImperativeHandle, useRef, useEffect, useState } from 'react';
import socket from '../socket';
import { user } from '../Reducer';
import { useData } from '../ContextProvider';

const Notification = React.forwardRef(({ refrech }, ref) => {
  const [_notification, setNotification] = useState([]);
  const [data] = useData();

  useEffect(() => {
    setNotification(data.OldNotification);
    refrech(data.OldNotification.length);
    console.log(_notification)
  }, [data.OldNotification, refrech]);
  console.log(data.OldNotification)
  useEffect(() => {
    socket.on('getNotification', (notification) => {
      if (notification) {
        setNotification((prev) => [...prev, notification]);
        console.log("notifi" , notification)
        refrech((t) => t + 1);
      }
    });
  }, [refrech]);

  const noti = useRef(null);

  const show = () => {
    if (noti.current) {
      noti.current.classList.toggle('hidden');
    }
  };

  useImperativeHandle(ref, () => ({
    show,
    hide: () => {
      noti.current?.classList.add('hidden');
    },
  }));

  const handleClearNotifications = () => {
    socket.emit('readAll', user().user);
    setNotification([]);
    refrech(0);
  };

  const getNotificationMessage = (e) => {
    switch (e.msg) {
      case 'add':
        return `You were added to a task by ${e.sender?.name} (${e.sender?._id})`;
      case 'remove':
        return `You were removed from a task by ${e.sender?.name} (${e.sender?._id})`;
      case 'delete':
        return `A task was deleted by ${e.sender?.name} (${e.sender?._id})`;
        case 'status0':
            return `The task status was paused by ${e.sender?.name} (${e.sender?._id})`;
          case 'status1':
            return `The task status was started  by ${e.sender?.name} (${e.sender?._id})`;
          case 'status2':
            return `The task status was finished to status2 by ${e.sender?.name} (${e.sender?._id})`;
          case 'status3':
            return `The task status was confirmed to status3 by ${e.sender?.name} (${e.sender?._id})`;
      default:
        return 'You have a new notification';
    }
  };

  const getNotificationColor = (e) => {
    switch (e.msg) {
      case 'add':
        return 'bg-green-200';
      case 'remove':
        return 'bg-yellow-200';
      case 'delete':
        return 'bg-red-200';
      case 'status0':
        return 'bg-yellow-400';
        case 'status1':
        return 'bg-orange-500';
        case 'status2':
        return 'bg-green-300';
        case 'status3':
          return 'bg-blue-500';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="absolute hidden" ref={noti}>
      <div className="absolute p-4 w-80 h-80 bg-white shadow-lg rounded-lg z-30 right-[-10%] top-6 text-center border border-gray-200">
        <div className="font-bold text-lg mb-4">Notifications</div>
        <div className="text-sm px-2 flex flex-col h-[70%] overflow-auto">
          {data.OldNotification?.map((e, i) => (
            <span key={i} className={`cursor-pointer mt-2 p-3 rounded-lg ${getNotificationColor(e)}`}>
              {getNotificationMessage(e)}
            </span>
          ))}
        </div>
        <button
          className="p-2 rounded-lg mt-4 cursor-pointer w-32 mx-auto bg-red-400 text-white hover:bg-red-500 transition"
          onClick={handleClearNotifications}
        >
          Clear All
        </button>
      </div>
    </div>
  );
});

export default Notification;
