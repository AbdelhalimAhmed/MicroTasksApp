import React, { useState, useEffect } from 'react';
import TasksContext from '.';
import { DUMMY_IMAGE } from '../../constants/DummyData';


type TaskType = {
  id: number;
  title: string;
  desc: string;
  imageURL?: string;
  videoURL?: string;
  type: 'video' | 'image' | 'news' | 'record'
};

type TasksType = {
  tasks: TaskType[];
  progress: number;
  id: number;
  title: string;
};

type TasksStateType = {
  data: TasksType[]
};

export type TasksContextType = {
  updateProgress: (parentId: number, progress: number) => void;
} & TasksStateType;

const initialState = {
  data: []
}
export function TasksProvider(props: { children: React.ReactNode}) {
  const [state, setState] = useState<TasksStateType>(initialState);

  useEffect(() => {
    setState({data: [{
      tasks: [
        {
          id: 1,
          title: 'test title for news',
          desc: 'some description about test news card',
          type: 'news' 
        },
        {
          id: 2,
          title: 'test title for video',
          desc: 'some description about test video card',
          videoURL: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          type: 'video',
        },
        {
          id: 3,
          title: 'test title for image',
          desc: 'some description about test image card',
          imageURL: DUMMY_IMAGE,
          type: 'image'
        },
        {
          id: 4,
          title: 'Record Audio',
          desc: 'recode audio response',
          type: 'record'
        }
      ],
      progress: 0,
      id: 1,
      title: 'Task 1'
    }]})
  }, [])

  const updateProgress = (parentId: number, progress: number) => {
    const selectedIndex = state.data.findIndex(ele => ele.id == parentId);
    const copyData = [...state.data];
    copyData[selectedIndex] = { ...copyData[selectedIndex], progress }
    setState({
      data: copyData
    });
  }
  return (
    <TasksContext.Provider value={{
      data: state.data,
      updateProgress
    }}>
      {props.children}
    </TasksContext.Provider>
  )
}