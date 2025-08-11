import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroScreen() {
  // Estados para armazenar os valores digitados
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const router = useRouter();

  useEffect(async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem('user')
      if(usuarioSalvo){
        router.push('/HomeScreen')
      }
    } catch (error) {
      console.log(error);
    }
    //chamando a funcao
    verificarUsuarioLogado()
  }, []);

  // Função para simular o envio do formulário
  const handleCadastro = () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user
        await AsyncStorage.setItem('user', JSON.stringify(user))
        router.push('/HomeScreen');
      })
      .catch((error) => {
        const errorCode= error.code
        const errorMessage = error.message
        console.log(errorMessage)
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Conta</Text>

      {/* Campo Nome */}
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
      />

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
      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>
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
    backgroundColor: '#00B37E',
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
function verificarUsuarioLogado() {
  throw new Error('Function not implemented.');
}

