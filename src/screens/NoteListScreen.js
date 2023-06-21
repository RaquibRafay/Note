import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useState, useEffect } from 'react';
import realm from '../../store/realm';
import { FlatList } from 'react-native';
import { TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';



const NoteListScreen = (props) => {
    const { navigation } = props;
    const [data, setData] = useState([]);
    const [final, setFinal] = useState([])
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setData(realm.objects('Note'));
        const notes = data
        const final = [...notes].sort((a, b) => b.id - a.id)
        const newData = final.map((item) => {
            item.checkedStatus = false
            return item
        })
        setFinal(newData)
        setSearchText('focus');
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

    const searchData = (value) => {
        const dataFromDatabase = realm.objects('Note').
            sorted('date', true);
        const searchedData = dataFromDatabase.
            filter((item) => {
                const itemData = item.note.toLowerCase();
                const valueData = value.toLowerCase()
                return itemData.indexOf(valueData) > -1;
            });
        setData(searchedData);
        setSearchText(value);
    };

    const setCheckBox = (id, status) => {
        const newData = final.map((item) => {
            if (item.id === id) {
                item.checkedStatus = !status
            }
            return item
        })
        setData(newData)
    };

    return (

        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>
                    Notes
                </Text>
            </View>
            <FlatList
                contentContainerStyle={styles.flatListContainer}
                data={final}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.mainDataContainer}>
                            <TouchableOpacity
                                style={styles.noteButton}
                                onPress={() => navigation.navigate('EditNote', {
                                    id: item.id,
                                }
                                )}
                            >
                                <View style={styles.noteContainer}>
                                    <Text style={styles.noteText}>
                                        {item.note}
                                    </Text>
                                </View>
                                <Text style={styles.dateText}>
                                    {dateFormat(item.date)}
                                </Text>
                            </TouchableOpacity>
                            <CheckBox
                                size={20}
                                containerStyle={styles.checkBox}
                                onPress={() => setCheckBox(item.id, item.checkedStatus)}
                                checked={item.checkedStatus}
                            />
                        </View>
                    )
                }}
                ListHeaderComponent={
                    <View style={styles.searchBox}>
                        <Icon
                            name="search"
                            type="font-awesome"
                            size={18}
                            style={styles.searchIcon}
                            color="grey"
                        />
                        <TextInput
                            placeholder='Search here'
                            style={styles.searchInput}
                            onChangeText={(text) => searchData(text)}
                            value={searchText}
                        />
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.noItem}>
                        <Text>
                            No items.
                        </Text>
                    </View>
                }
            />
            < View style={styles.buttonContainer} >
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('CreateNote')}
                >
                    <Icon
                        name="plus"
                        type="antdesign"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </View >
        </View >

    )
};

export default NoteListScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        padding: 8,
        backgroundColor: 'moccasin',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 20,
        padding: 8,
        fontWeight: 'bold'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    addButton: {
        backgroundColor: 'pink',
        padding: 16,
        borderRadius: 100,
    },
    flatListContainer: {
        padding: 8
    },
    mainDataContainer: {
        margin: 8,
        backgroundColor: 'whitesmoke',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    noteButton: {
        flex: 1,
        padding: 8,
        margin: 8,
    },
    noteContainer: {
        maxHeight: 40,
        paddingBottom: 10,
    },
    noteText: {
        textAlign: 'justify'
    },
    dateText: {
        fontSize: 12
    },
    searchBox: {
        flexDirection: 'row',
        borderWidth: 1,
        margin: 8,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center'
    },
    searchIcon: {
        padding: 8,
        paddingRight: 0
    },
    searchInput: {
        height: 30,
        padding: 8,
        flex: 1
    },
    noItem: {
        alignItems: 'center',
        margin: 8
    },
    checkBox: {
        paddingRight: 0,
        paddingLeft: 0
    }
});