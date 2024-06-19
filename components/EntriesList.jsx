import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, FlatList } from 'react-native';
import { db, auth } from '../config/firebase';
import EntryCard from './EntryCard';
import { getEntries } from '../services/DbService';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';

function EntriesList() {
  const [entries, setEntries] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      handleGettingAllEntries();
    }
  }, [isFocused]);

  const handleGettingAllEntries = async () => {
    var allEntries = await getEntries();
    // Assuming each entry has a 'createdAt' timestamp
    allEntries.sort((a, b) => b.timestamp - a.timestamp);
    setEntries(allEntries);
  };

  const handleLikePress = async (entryId) => {
    try {
      const currentUserUid = auth.currentUser ? auth.currentUser.uid : 'anon';
      const entryRef = doc(db, 'entries', entryId);
      const entryDoc = await getDoc(entryRef);
      if (entryDoc.exists()) {
        const entryData = entryDoc.data();
        let updatedLikes;
        if (entryData.likes.includes(currentUserUid)) {
          updatedLikes = entryData.likes.filter(uid => uid !== currentUserUid);
        } else {
          updatedLikes = [...entryData.likes, currentUserUid];
        }
        await updateDoc(entryRef, { likes: updatedLikes });
        setEntries(prevEntries => prevEntries.map(entry =>
          entry.id === entryId ? { ...entry, likes: updatedLikes } : entry
        ));
      } else {
        console.log('Entry does not exist!');
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  return (
    <FlatList
      data={entries}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <EntryCard entryId={item.id} {...item} handleLikePress={handleLikePress} />
      )}
    />
  );
}

export default EntriesList;