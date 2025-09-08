import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { EmailAuthProvider, reauthenticateWithCredential,updatePassword } from 'firebase/auth';
import {auth} from '../src/services/firebaseConfig'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroScreen() {
  // Estados para armazenar os valores digitados
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const router = useRouter()//Hook para navegação

  // Função para simular o envio do formulário
  const handleAlterarSenha = async() => {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    if(novaSenha!==confirmarSenha){
        Alert.alert("Erro","As senhas não coincidem!")
        return
    }
    if(novaSenha.length<6){
        Alert.alert("Erro","A nova senha de no mínimo 6 caracteres.")
        return
    }
    try{
        const user = auth.currentUser
        if(!user || !user.email){
            Alert.alert("Erro","Nenhum usuário logado.")
            return
        }

        //Cria as credenciais para reautenticar o usuário
        const credencial = EmailAuthProvider.credential(user.email,senhaAtual)
        await reauthenticateWithCredential(user,credencial)

        //Atualizar a senha
        await updatePassword(user,novaSenha)
        Alert.alert("Suceso","Senha alterada com sucesso.")
        router.push("/HomeScreen")

    }catch(error){
        console.log("Erro ao atualizar senha")    
        Alert.alert("Senha não alterada")
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alterar Senha</Text>

      {/* Campo Senha Atual */}
      <TextInput
        style={styles.input}
        placeholder="Digite a senha atual"
        placeholderTextColor="#aaa"
        value={senhaAtual}
        onChangeText={setSenhaAtual}
      />

      {/* Campo Nova Senha */}
      <TextInput
        style={styles.input}
        placeholder="Digite a nova senha"
        placeholderTextColor="#aaa"
        value={novaSenha}
        onChangeText={setNovaSenha}
      />

      {/* Campo Confirmar Senha */}
      <TextInput
        style={styles.input}
        placeholder="Digite novamente a nova senha"
        placeholderTextColor="#aaa"
        //secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      {/* Botão */}
      <TouchableOpacity style={styles.botao} onPress={handleAlterarSenha}>
        <Text style={styles.textoBotao}>Alterar Senha</Text>
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
