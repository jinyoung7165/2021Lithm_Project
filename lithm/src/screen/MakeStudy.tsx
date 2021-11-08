import React, {useState} from "react";
import { SafeAreaView, StyleSheet, Text,TextInput, View, TouchableOpacity,Platform } from "react-native";
import NumericInput from 'react-native-numeric-input';
import SelectDropdown from 'react-native-select-dropdown'
// import { widthNavigation } from 'react-navigation';
import styles from '../styles/styles';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; 

const MakeStudy = ({navigation} : {navigation:any}) => {
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [solve, setSolve] = useState(3);
    const [day, setDay] = useState('Sunday');
    const [penalty, setPenalty] = useState(1000);

    const onSubmitHandler = () => {
        const payload = {
            title,
            solve,
            day,
            penalty
        };
        fetch(`${API_URL}/makestudy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    setIsError(false);
                    setMessage(jsonRes.message);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };
    
    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    const date = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <SafeAreaView>
            {/* <TouchableOpacity style={{width: scaleWidth(66) onPress={() => this.props.navigation.toggleDrawer()}}}>메뉴 아이콘 자리</TouchableOpacity> */}
            <View style={styles.card}>
                <Text style={styles.heading}>Create a New Study</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle}/>
                        <Text>Rules</Text>
                        <Text>Solve </Text><NumericInput rounded value={solve} onChange={setSolve} /><Text> problems a week</Text>
                        <Text>Deadline    every </Text>
                        <SelectDropdown
                        	data={date}
                        	onSelect={(selectedItem, index) => setDay(selectedItem)}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                        <Text>Penalty    </Text><TextInput style={styles.input} placeholder="1000" onChangeText={(value)=>{const newvalue=parseInt(value);setPenalty(newvalue)}} keyboardType="numeric"/><Text>won</Text>
                        <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                        
                        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>    
                </View>
            </View>
        </SafeAreaView>
    );
}

export default MakeStudy;