import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import NoteListScreen from './NoteListScreen';
import realm from '../../store/realm';
import { HeaderComponent, MainComponent } from '../components/NoteComponent';

const AddNoteScreen = (props) => {
    const { navigation } = props;
    const [tempNote, setTempNote] = useState('');

    const saveNote = (newNote) => {
        const allData = realm.objects('Note');
        const dataLength = allData.length;
        let lastIdFromRealm = 0;
        if (dataLength !== 0) {
            lastIdFromRealm = allData[dataLength - 1].id;
        }
        if (newNote !== '') {
            realm.write(() => {
                realm.create("Note", {
                    id: dataLength === 0 ? 1 : lastIdFromRealm + 1,
                    date: new Date().toISOString(),
                    note: newNote
                });
            });
            alert(
                "Success",
                "Successfully save your note!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('NoteList')
                    }
                ]
            );
            const data = realm.objects('Note');
            console.log(data);
        } else {
            alert('Empty note!');
        }
    };
    const getCurrentDate = () => {
        const months = [
            "January", "February",
            "March", "April", "May",
            "June", "July", "August",
            "September", "October",
            "November", "December"
        ];
        const currentDate = new Date();
        const dateOnly = currentDate.getDate();
        const monthOnly = currentDate.getMonth();
        const yearOnly = currentDate.getFullYear();
        return months[monthOnly] + ' ' + dateOnly + ', ' + yearOnly;
    };

    return (
        <View style={styles.mainContainer}>
            <HeaderComponent
                title="Create"
                onPress={() => saveNote(tempNote)}
            />
            {/* <MainComponent
                date={getCurrentDate()}
                onChangeText={(text) => setTempNote(text)}
            /> */}
            <View style={styles.mainContainer} >
            <Text style={styles.date}>{getCurrentDate()}</Text>
            <TextInput
                multiline
                placeholder="Write here"
                style={styles.input}
                onChangeText={(text) => setTempNote(text)}
            />
        </View>
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
});

export default AddNoteScreen;