import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { HeaderComponent, MainComponent } from '../components/NoteComponent';
import { useEffect } from 'react';
import { useState } from 'react';

const EditNoteScreen = (props) => {
    const { route, navigation } = props;
    const [dataToUpdate, setDataToUpdate] = useState([]);
    const { id } = route.params

    useEffect(() => {
        console.log('edit screen');
        console.log(dataToUpdate);
        }, [dataToUpdate]);

    useEffect(() => {
        const data = realm.objects('Note').filtered(`id = ${id}`);
            setDataToUpdate(data)
            }, []);
            
return (
    <View style={styles.mainContainer}>
        <HeaderComponent
            title="Edit"
        />
        <MainComponent
            date="Date"
        />
    </View>
)
}

export default EditNoteScreen