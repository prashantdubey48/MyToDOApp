import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MyToDo from '../screens/MyToDo';

test('ToDo Snapshot', () => {
  const snap = renderer.create(<MyToDo />).toJSON();
  expect(snap).toMatchSnapShot();
}); 
