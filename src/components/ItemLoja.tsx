import { StyleSheet, View, Text, Pressable,Alert } from "react-native";
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useEffect, useState } from "react";
import {updateDoc,doc,db,deleteDoc} from '../services/firebaseConfig'

export default function ItemLoja(props: any) {
    const [isChecked, setIsChecked] = useState(props.isChecked)

    const updateIsChecked = async()=>{
        const itemRef = doc(db,'items',props.id)

        await updateDoc(itemRef,{
            isChecked:isChecked
        })
    }

    const deletarItem = async ()=>{
        Alert.alert("Confirmar Exclusão?","Tem certeza que deeja excluir o produto?",[
            {text:'Cancelar'},
            {text:'Excluir',onPress:async()=>await deleteDoc(doc(db,'items',props.id))}
        ],{
            cancelable:true
        })
       
    }

    useEffect(()=>{
        updateIsChecked()
    },[isChecked])

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setIsChecked(!isChecked)}>
                {isChecked ? (
                    <AntDesign name="checkcircle" color='black' size={24} />
                ):(
                    <AntDesign name="checkcircleo" color='black' size={24} />
                )}

            </Pressable>
            <Text style={styles.title}>{props.nomeProduto}</Text>
            <Pressable onPress={deletarItem}>
                <MaterialIcons name='delete' color='black' size={24} />
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 500
    }
})