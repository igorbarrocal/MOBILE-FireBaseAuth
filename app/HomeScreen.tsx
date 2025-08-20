import { Alert, Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { auth } from "../services/firebaseConfig";
import {deleteUser} from "firebase/auth";


export default function HomeScreen(){
    const router = useRouter() //Hook de navegacao
    const realizarLogoff = async()=>{
        await AsyncStorage.removeItem('@user')
        router.push('./')//Redireciona para index.tsx
    }
    const exluirConta = async()=>{
        Alert.alert("CONFIRMA EXCLUSAO", "Deseja excluir sua conta?", [
            {text: "Cancelar", style: "cancel"},
            {text: "Excluir",
                onPress: async()=>{
                    try {   
                        const user = auth.currentUser;
                        if(user){
                            await deleteUser(user);
                            await AsyncStorage.removeItem('@user');
                            Alert.alert("Sucesso", "Conta excluida com sucesso");
                            router.push('./');
                        }
                }catch(error){
                    Alert.alert("Erro", "Erro ao excluir conta")
                }
            } 
            }
               
           
        ],{
            cancelable: true,
        }
    )
}



    
    return(
        <SafeAreaView>
            <Text>Seja bem-vindo - Você está Logado!!</Text>
            <Button title="Sair da conta" onPress={realizarLogoff} />
            <Button title="Excluir conta" color="red" onPress={exluirConta} />
            <Button  title="Alterar Senha" onPress={()=>router.push('AlterarSenhaScreen')}/>
        </SafeAreaView>
    )
}