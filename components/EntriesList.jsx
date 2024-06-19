import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { db } from '../config/firebase';
import EntryCard from './EntryCard';
import { getEntries } from '../services/DbService';

function EntriesList() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    handleGettingAllEntries()
  }, []);

  const handleGettingAllEntries = async () => {
    var allEntries = await getEntries()
    setEntries(allEntries)
  }

  return (
    <FlatList
      data={entries}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <EntryCard
          username={item.username}
          profilePicture={item.profilePicture}
          imageUrl={item.imageUrl}
          likes={item.likes}
          photoTitle={item.photoTitle}
          description={item.description}
        />
      )}
    />
  );
}

export default EntriesList;