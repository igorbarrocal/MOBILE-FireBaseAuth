import { Link } from 'expo-router';
import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import {auth} from '../services/firebaseConfig';


export default function LoginScreen() {
  // Estados para armazenar os valores digitados

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const router = useRouter()//Hook para navegação

  useEffect(()=>{
    const verificarUsuarioLogado = async () =>{
      try{
        const usuarioSalvo = await AsyncStorage.getItem('@user')
        if(usuarioSalvo){
          router.push('/HomeScreen')//Redireciona para tela bem-vindo
        }
      }catch(error){
        console.log("Error ao verificar login",error)
      }
    }
    //Chamando a função
    verificarUsuarioLogado()
  },[])

  // Função para simular o envio do formulário
  const handleLogin= () => {
    if ( !email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    //Funcao para realizar login
    signInWithEmailAndPassword(auth,email,senha)
      .then(async(userCredential)=>{
        const user = userCredential.user
        AsyncStorage.setItem('@user',JSON.stringify(user))
        router.push('/HomeScreen')
        //console.log(user)
      }).catch((error)=>{
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage)
      });

    const esqueceuSenha = () => {
      if (!email) {
        Alert.alert('Atenção', 'Por favor, insira seu e-mail para redefinir a senha.');
        return;
      }
      sendPasswordResetEmail(auth, email)
      .then(() => alert('E-mail de redefinição de senha enviado com sucesso!')) 
      .catch((error) => alert('Erro ao enviar e-mail de redefinição de senha: '));
    }
  };

  const esqueceuSenha = () => {
    if (!email) {
      Alert.alert('Atenção', 'Por favor, insira seu e-mail para redefinir a senha.');
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => Alert.alert('Sucesso', 'E-mail de redefinição de senha enviado com sucesso!'))
      .catch((error) => Alert.alert('Erro', 'Erro ao enviar e-mail de redefinição de senha: ' + error.message));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Realizar login</Text>


      {/* Campo Email */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Campo Senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Botão */}
      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Login</Text>
      </TouchableOpacity>

      <Link href="CadastrarScreen" style={{marginTop:20,color:'white',marginLeft:150}}>Cadastre-se</Link>

      <Text style={{marginTop:20,color:'white',marginLeft:130}} onPress={esqueceuSenha}>Esqueceu a senha?</Text>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  botao: {
    backgroundColor: '#b30000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
