import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { HeaderComponent, MainComponent } from '../components/NoteComponent';
import { useEffect } from 'react';
import { useState } from 'react';
import realm from '../../store/realm';

const EditNoteScreen = (props) => {
    const { route, navigation } = props;
    const [dataToUpdate, setDataToUpdate] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const { id } = route.params

    useEffect(() => {
        console.log('edit screen');
        console.log(dataToUpdate);
    }, [dataToUpdate]);

    useEffect(() => {
        const data = realm.objects('Note').filtered(`id = ${id}`);
        setDataToUpdate(data)
    }, []);

    const dateFormat = (date) => {
        const months = [
            "January", "February",
            "March", "April", "May",
            "June", "July", "August",
            "September", "October",
            "November", "December"
        ];
        const noteDate = new Date(date);
        const dateOnly = noteDate.getDate();
        const monthOnly = noteDate.getMonth();
        const yearOnly = noteDate.getFullYear();
        return months[monthOnly] + ' ' + dateOnly + ', ' + yearOnly;
    };

    const editNote = (value, editStatus) => {
        setNewNote(value);
        setIsEdit(editStatus);
    };

    const saveNote = (value) => {
        if (value === '') {
            alert(`Note can't be empty!`);
        }
        else {
            const allData = realm.objects('Note');
            allData.forEach((item) => {
                if (item.id === id && item.note !== value) {
                    realm.write(() => {
                        item.note = value;
                        item.date = new Date().toISOString();
                    });
                    navigation.navigate('NoteList');
                } else if (item.id === id &&
                    item.note === value) {
                    alert('Nothing changed!');
                }
            });
        }
    };


    return (
        <View>
            <HeaderComponent
                title="Edit"
                onPress={() => saveNote(
                    isEdit ?
                        newNote : dataToUpdate[0].note)
                }
            />
            <MainComponent
                date={dateFormat(dataToUpdate[0].date)}
                value={dataToUpdate[0].note}
                onChangeText={(text) => editNote(text, true)}
            />
        </View>
    )
}

export default EditNoteScreen